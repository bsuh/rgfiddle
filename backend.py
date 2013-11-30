import bottle
from models import Robot, model_json
from runner import run_game


@bottle.route('/')
def index():
    return bottle.static_file('index.html', root='client/src/')


@bottle.route('/client/<path:path>')
def static(path):
    return bottle.static_file(path, root='client')


@bottle.post('/match')
def run_match():
    json = bottle.request.json

    return {'history': run_game(json['player1'], json['player2'])}


@bottle.route('/v1/robots/')
def robot_list():
    return {'robots': map(model_json, Robot.select())}


@bottle.post('/v1/robots/')
def robot_create():
    json = bottle.request.json

    new_robot = Robot.create(**json)
    return {'robot': model_json(new_robot)}


@bottle.put('/v1/robots/<id:int>')
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


if __name__ == '__main__':
    bottle.run(host='localhost', port=8080, debug=True, reloader=True)
