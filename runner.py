import ast
import imp
import os.path as path
import rgkit.game as game
import rgkit.rg as rg
import traceback
import types
import sys
from cStringIO import StringIO
from rgkit.settings import settings


class MyPlayer(game.Player):
    log = {}

    def _get_action(self, game_state, game_info, robot, seed):
        old_stdout, sys.stdout = sys.stdout, StringIO()
        action = game.Player._get_action(
            self, game_state, game_info, robot, seed)

        MyPlayer.log[robot.location] = log = sys.stdout.getvalue()
        sys.stdout = old_stdout
        if len(log) > 0:
            print log,

        return action


class MyGame(game.Game):
    def get_robots_actions(self):
        MyPlayer.log = {}
        return game.Game.get_robots_actions(self)

    def finish_running_turns_if_necessary(self):
        return


def game_board(game):
    boxes = []
    for y in range(settings.board_size):
        for x in range(settings.board_size):
            if (x, y) in settings.obstacles:
                boxes.append({'type': 'obstacle'})
            elif (x, y) in game.state.robots:
                robot = game.state.robots[(x, y)]
                boxes.append({
                    'type': ['red', 'blue'][robot.player_id],
                    'hp': robot.hp
                })
            else:
                boxes.append({'type': 'normal'})

    return boxes


def find_robot(robots, robot_id):
    for r in robots:
        if r['robot_id'] == robot_id:
            return r
    return None


def record_turn(g):
    return {'scores': g.get_scores(), 'board': game_board(g)}


def _run_turn(g, history):
    directions = {
        (-1, 0): 'left',
        (1, 0): 'right',
        (0, 1): 'down',
        (0, -1): 'up'
    }

    g.run_turn()
    history.append(record_turn(g))

    for loc, action in g.actions_on_turn[g.state.turn - 1].iteritems():
        x, y = action['loc']
        box = history[-2]['board'][x+y*19]
        box['log'] = MyPlayer.log.get((x, y), '')

        if 'spawn' == action['name']:
            continue

        name = action['name']
        box['action'] = name
        if name in ('move', 'attack'):
            target_x, target_y = action['target']
            box['target'] = directions[(target_x - x),
                                       (target_y - y)]


def make_game(code1, code2):
    rgkit_dir = path.dirname(rg.__file__)
    with open(path.join(rgkit_dir, 'maps/default.py')) as mapfile:
        game.init_settings(ast.literal_eval(mapfile.read()))

    g = MyGame(
        MyPlayer(code=code1),
        MyPlayer(code=code2),
        record_actions=True)

    return g


def run_turn(code1, code2, board, turn):
    g = make_game(code1, code2)

    g.state.turn = turn - 1
    for i, box in enumerate(board):
        x, y = i % settings.board_size, i / settings.board_size
        _type = box['type']
        if _type == 'red' or _type == 'blue':
            g.state.add_robot((x, y), int(_type == 'blue'), box['hp'])

    g.state.turn = turn
    history = [record_turn(g)]
    _run_turn(g, history)

    return history[0]


def run_game(code1, code2):
    g = make_game(code1, code2)

    history = [record_turn(g)]
    for i in xrange(settings.max_turns):
        _run_turn(g, history)

    return history
