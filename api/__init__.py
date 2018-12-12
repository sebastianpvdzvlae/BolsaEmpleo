from flask_cors import CORS
from flask import Flask
from flask_restplus import Api

from usersController import api as users
from sessionsController import api as sessions
from coursesController import api as courses
from acuerdosController import api as acuerdos
from artesanosController import api as artesanos
from clientesController import api as clientes
from instructorsController import api as instructors
from servicesController import api as services
from provincesController import api as provinces


app = Flask(__name__)
CORS(app)

api = Api(app,
    version='1.2',
    title='API Bolsa de empleo'
)

api.add_namespace(users)
api.add_namespace(sessions)
api.add_namespace(courses)
api.add_namespace(acuerdos)
api.add_namespace(clientes)
api.add_namespace(artesanos)
api.add_namespace(instructors)
api.add_namespace(services)
api.add_namespace(provinces)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
