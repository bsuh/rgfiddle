import ast
import imp
import rgkit.game as game
import rgkit.rg as rg
from rgkit.settings import settings


class MyPlayer(game.Player):
    def __init__(self, code):
        game.Player.__init__(self, code='')

        self._mod = imp.new_module('usercode%d' % id(self))

        def my_import(name, globals={}, locals={}, fromlist=[], level=-1):
            if name == 'rg':
                return rg
            else:
                return real_import(name, globals, locals, fromlist, level)

        builtins = dict(__builtins__)
        real_import, builtins['__import__'] = builtins['__import__'], my_import
        self._mod.__dict__['__builtins__'] = builtins
        exec code in self._mod.__dict__
        self._robots = None
        self._cache = {}


def game_board(game):
    boxes = []
    for y in range(settings.board_size):
        for x in range(settings.board_size):
            robot = game._field[(x, y)]
            if (x, y) in settings.obstacles:
                boxes.append({'type': 'obstacle'})
            elif robot is not None:
                boxes.append({
                    'type': {0: 'red', 1: 'blue'}[robot.player_id],
                    'hp': robot.hp
                })
            else:
                boxes.append({'type': 'normal'})

    return boxes


def run_game(code1, code2):
    directions = {
        (-1, 0): 'left',
        (1, 0): 'right',
        (0, 1): 'down',
        (0, -1): 'up'
    }

    def turn():
        return {'scores': g.get_scores(), 'board': game_board(g)}

    with open('rgkit/maps/default.py') as mapfile:
        game.init_settings(ast.literal_eval(mapfile.read()))

    g = game.Game(
        MyPlayer(code=code1),
        MyPlayer(code=code2),
        record_turns=True)

    history = [turn()]
    for i in xrange(settings.max_turns):
        g.run_turn()

        for (x, y), action in g.action_at[g.turns-1].iteritems():
            box = history[-1]['board'][x+y*19]
            box['action'] = action['name']

            if action['target'] is not None:
                target_x, target_y = action['target']
                box['target'] = directions[(target_x - x), (target_y - y)]

        history.append(turn())

    return history
