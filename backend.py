import bottle
import json
from models import Robot, Scenario, model_json, scenario_json
from runner import run_game, run_turn


@bottle.route('/')
def index():
    return bottle.static_file('index.html', root='client/src/')


@bottle.route('/client/<path:path>')
def static(path):
    return bottle.static_file(path, root='client')


@bottle.post('/turn')
def _run_turn():
    json = bottle.request.json

    return {
        'turn': run_turn(
            json['player1'], json['player2'],
            json['board'], json['turn'])
    }


@bottle.post('/match')
def run_match():
    json = bottle.request.json

    return {'history': run_game(json['player1'], json['player2'])}


@bottle.route('/v1/robots')
def robot_list():
    bottle.response.content_type = 'application/json'
    return json.dumps(map(model_json, Robot.select()))


@bottle.post('/v1/robots')
def robot_create():
    json = bottle.request.json

    new_robot = Robot.create(**json)
    return {'robot': model_json(new_robot)}


@bottle.post('/v1/robots/<id:int>')
def robot_update(id):
    json = bottle.request.json

    robot = Robot.get(Robot.id == id)
    robot.name = json['name']
    robot.code = json['code']
    robot.save()
    return {'robot': model_json(robot)}


@bottle.delete('/v1/robots/<id:int>')
def robot_delete(id):
    return {'rows': Robot.get(Robot.id == id).delete_instance()}


@bottle.route('/v1/scenarios')
def scenario_list():
    bottle.response.content_type = 'application/json'
    return json.dumps(map(scenario_json, Scenario.select()))


@bottle.post('/v1/scenarios')
def scenario_create():
    jsn = bottle.request.json

    jsn['board'] = json.dumps(jsn['board'])

    new_scenario = Scenario.create(**jsn)

    bottle.response.content_type = 'application/json'
    return json.dumps(scenario_json(new_scenario))


@bottle.post('/v1/scenarios/<id:int>')
def scenario_update(id):
    jsn = bottle.request.json

    scenario = Scenario.get(Scenario.id == id)
    scenario.name = jsn['name']
    scenario.board = json.dumps(jsn['board'])
    scenario.turn = jsn['turn']
    scenario.save()

    bottle.response.content_type = 'application/json'
    return json.dumps(scenario_json(scenario))


@bottle.delete('/v1/scenarios/<id:int>')
def scenario_delete(id):
    Scenario.get(Scenario.id == id).delete_instance()


if __name__ == '__main__':
    bottle.run(host='localhost', port=8080, debug=True, reloader=True)
