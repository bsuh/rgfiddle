import json
import peewee


database = peewee.SqliteDatabase('rgfiddle.db')


def model_json(model):
    return model.__dict__['_data']


class BaseModel(peewee.Model):
    class Meta:
        database = database


class Robot(BaseModel):
    name = peewee.CharField()
    code = peewee.CharField()


Robot.create_table(True)


def scenario_json(scenario):
    scenario = dict(model_json(scenario))
    scenario['board'] = json.loads(scenario['board'])
    return scenario


class Scenario(BaseModel):
    name = peewee.CharField()
    board = peewee.CharField()
    turn = peewee.IntegerField()


Scenario.create_table(True)
