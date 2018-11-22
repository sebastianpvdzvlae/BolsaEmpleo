from flask import Flask
from flask_restplus import Api

from usersController import api as users
from sessionsController import api as sessions


app = Flask(__name__)

api = Api(app,
    version='1.2',
    title='API Bolsa de empleo'
)

api.add_namespace(users)
api.add_namespace(sessions)


if __name__ == '__main__':
    app.run(debug=True)
