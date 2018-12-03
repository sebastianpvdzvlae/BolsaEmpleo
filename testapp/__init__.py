from flask import Flask
from flask import render_template, flash
import flask
import flask_login
import requests
import os

app = Flask(__name__)
app.secret_key = 'd87383df7300df9dd9c9d6380ff9d0ebcccd28125de9fc69ef55cbd5c05f9989'

login_manager = flask_login.LoginManager()

login_manager.init_app(app)


class User(flask_login.UserMixin):
    nombres = None
    apellidos = None
    tipoUser = None
    identificacion = None
    pass


@login_manager.user_loader
def user_loader(usrid):
    res = requests.get('http://127.0.0.1:5000/users/{}'.format(usrid))
    if res.status_code == 200:
        usrid = res.json()['_id']
        user = User()
        user.id = usrid
        user.nombres = res.json()['nombres']
        user.apellidos = res.json()['apellidos']
        user.tipoUser = res.json()['tipoUser']
        user.identificacion = res.json()['identificacion']
        return user
    return


@login_manager.request_loader
def request_loader(request):
    email = request.form.get('email')
    password = request.form.get('password')
    res = requests.post('http://127.0.0.1:5000/sessions/', data={"email": email,
                                                                 "password": password})
    if res.status_code == 200:
        usrid = res.json()['_id']
        user = User()
        user.id = usrid
        user.is_authenticated = True
        return user
    return


@app.route('/')
@app.route('/index')
def index():
        return render_template('index.html', title='Home')


@app.route('/BusquedaArtesanos')
def BusquedaArtesanos():
    return render_template('BusquedaArtesanos.html', title='Buscar Artesanos')


@app.route('/RegistrarArtesano')
@flask_login.login_required
def RegistrarArtesano():
    return render_template('RegistrarArtesano.html', title='Registrar Artesanos')


@app.route('/InscripcionCurso')
@flask_login.login_required
def InscripcionCurso():
    return render_template('InscripcionCurso.html', title='Inscripcion a Curso')


@app.route('/RegistrarAcuerdo')
@flask_login.login_required
def RegistrarAcuerdo():
    return render_template('RegistrarAcuerdo.html', title='Registrar Acuerdo')


@app.route('/CrearCurso')
@flask_login.login_required
def CrearCurso():
    return render_template('CrearCurso.html', title='Crear Curso')

@app.route('/CambiarContraseña', methods=['GET', 'POST'])
@flask_login.login_required
def CambiarContraseña():
        if flask.request.method == 'GET':
                return render_template('CambiarContraseña.html', title='Cambiar Contraseña')

        password = flask.request.form.get('newpassword')
        res = request.put('http://127.0.0.1:5000/sessions/{}'.format(flask_login.current_user.id), 
        json={"password": password}))


@app.route('/InfoCurso')
@flask_login.login_required
def InfoCurso():
    return render_template('InfoCurso.html', title='Informacion de Curso')


@app.route('/Login', methods=['GET', 'POST'])
def Login():
        if flask.request.method == 'GET':
                return render_template('login.html', title='Login')


        email = flask.request.form.get('email')
        password = flask.request.form.get('password')
        res = requests.post('http://127.0.0.1:5000/sessions/', json={"email": email,
                                                                     "password": password})
        if res.status_code == 200:
                usrid = res.json()['_id']
                user = User()
                user.id = usrid
                flask_login.login_user(user)
                return flask.redirect(flask.url_for('index')

        return 'Bad login'


@app.route('/Registrate', methods=['GET', 'POST'])
def Registrate():
        if flask.request.method == 'GET':
                return render_template('registrate.html', title='Registrarse al Sistema')

        tipoUser = flask.request.form.get('tipoUser')
        tipoId = flask.request.form.get('tipoId')
        identificacion = flask.request.form.get("identificacion")
        email = flask.request.form.get("email")
        nombres = flask.request.form.get("nombres")
        apellidos = flask.request.form.get("apellidos")
        password = flask.request.form.get('password')


        res = requests.post('http://127.0.0.1:5000/users/', json={
                                                                "tipoUser": tipoUser,
                                                                "tipoId": tipoId,
                                                                "identificacion": identificacion,
                                                                "email": email,
                                                                "apellidos": apellidos,
                                                                "nombres": nombres,
                                                                "direccion": "",
                                                                "ubicacion": {
                                                                "provincia": "",
                                                                "canton": "",
                                                                "parroquia": ""
                                                                },
                                                                "telefonos": [
                                                                ""
                                                                ],
                                                                "password": password
                                                                })
        if res.status_code == 200:
                flash('Registro exitoso')
                return flask.redirect(flask.url_for('index'))
        return 'Bad Registro'


@app.route('/Logout')
def logout():
    flask_login.logout_user()
    return flask.redirect(flask.url_for('index'))


@login_manager.unauthorized_handler
def unauthorized_handler():
        flash('No posee la autorizacion adecuada para ingresar a esa pagina')
        return flask.redirect(flask.url_for('index'))

@app.route('/NuevoInstructor')
@flask_login.login_required
def NuevoInstructor():
    return render_template('NuevoInstructor.html', title='Nuevo Instructor de Curso')





if __name__ == '__main__':
    app.run(port=5001)
