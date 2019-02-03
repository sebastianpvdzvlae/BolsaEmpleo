from flask import Flask
from flask_restplus import Api
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

@app.route('/BusquedaAdministrador')
@flask_login.login_required
def BusquedaAdministrador():
        if flask_login.current_user.tipoUser == 'admin':
                return render_template('BusquedaArtesanosAdmin.html', title='Buscar Artesanos Admininstrador')
        else:
                flash('No posee la autorizacion adecuada para ingresar a esa pagina')
                return flask.redirect(flask.url_for('index'))

@app.route('/RegistrarArtesano')
@app.route('/RegistrarArtesano/<id>')
@flask_login.login_required
def RegistrarArtesano(id = ''):
        if flask_login.current_user.tipoUser == 'admin' or flask_login.current_user.tipoUser == 'artesano':
                return render_template('RegistrarArtesano.html', title='Registrar Artesanos', id = id)
        else:
                flash('No posee la autorizacion adecuada para ingresar a esa pagina')
                return flask.redirect(flask.url_for('index'))

@app.route('/InscripcionCurso/<id>')
@flask_login.login_required
def InscripcionCurso(id=''):
        if flask_login.current_user.tipoUser == 'admin' or flask_login.current_user.tipoUser == 'artesano':
                return render_template('InscripcionCurso.html', title='Inscripcion a Curso', id=id)
        else:
                flash('No posee la autorizacion adecuada para ingresar a esa pagina')
                return flask.redirect(flask.url_for('index'))

@app.route('/RegistrarAcuerdo')
@flask_login.login_required
def RegistrarAcuerdo():
        if flask_login.current_user.tipoUser == 'admin' or flask_login.current_user.tipoUser == 'cliente':
                return render_template('RegistrarAcuerdo.html', title='Registrar Acuerdo')
        else:
                flash('No posee la autorizacion adecuada para ingresar a esa pagina')
                return flask.redirect(flask.url_for('index'))

@app.route('/CrearCurso')
@flask_login.login_required
def CrearCurso():
        if flask_login.current_user.tipoUser == 'admin' or flask_login.current_user.tipoUser == 'cliente':
                return render_template('CrearCurso.html', title='Crear Curso')
        else:
                flash('No posee la autorizacion adecuada para ingresar a esa pagina')
                return flask.redirect(flask.url_for('index'))

@app.route('/CambiarContraseña')
@flask_login.login_required
def CambiarContraseña():
        return render_template('CambiarContraseña.html', title='Cambiar Contraseña', id=flask_login.current_user.id)


@app.route('/InfoCurso')
@app.route('/InfoCurso/<id>')
@flask_login.login_required
def InfoCurso(id = ''):
        if flask_login.current_user.tipoUser == 'admin' or flask_login.current_user.tipoUser == 'cliente':
                return render_template('InfoCurso.html', id = id, title='Informacion de Curso')
        else:
                flash('No posee la autorizacion adecuada para ingresar a esa pagina')
                return flask.redirect(flask.url_for('index'))

@app.route('/NuevoInstructor')
@app.route('/NuevoInstructor/<id>')
@flask_login.login_required
def NuevoInstructor(id = ''):
    if flask_login.current_user.tipoUser == 'admin' or flask_login.current_user.tipoUser == 'cliente':
        return render_template('NuevoInstructor.html', id = id, title='Nuevo Instructor')
    else:
        flash('No posee la autorizacion adecuada para ingresar a esa pagina')
        return flask.redirect(flask.url_for('index'))

        
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
                return flask.redirect(flask.url_for('index'))
        elif res.status_code == 403:
                flash('Usuario bloqueado')
                return flask.redirect(flask.url_for('index'))
        return flask.redirect(flask.url_for('Login'))


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
                                                                "password": password,
                                                                "estado": True,
                                                                "intentos": 0,
                                                                "servicios": [
                                                                ""
                                                                ]
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


@app.route('/Convenios')
@flask_login.login_required
def Convenios():
    return render_template('VerConvenio.html', title='Ver Convenios')


@app.route('/UsuariosBloqueados')
@flask_login.login_required
def UsuariosBloqueados():
        if flask_login.current_user.tipoUser == 'admin' or flask_login.current_user.tipoUser == 'cliente':
                return render_template('UsuariosBloqueados.html', title='Administrar usuarios bloqueados')
        else:
                flash('No posee la autorizacion adecuada para ingresar a esa pagina')
                return flask.redirect(flask.url_for('index'))

@app.route('/ListarCursos')
@flask_login.login_required
def ListarCursos():
    return render_template('ListarCursos.html', title='Listado Cursos')






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
