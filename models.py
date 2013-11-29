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
