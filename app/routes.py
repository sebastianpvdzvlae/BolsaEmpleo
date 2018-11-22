from flask import render_template
from app import app


@app.route('/')
@app.route('/index')
def index():
        return render_template('index.html', title='Home')
@app.route('/BusquedaArtesanos')
def BusquedaArtesanos():
    return render_template('BusquedaArtesanos.html', title='Buscar Artesanos')
@app.route('/RegistrarArtesano')
def RegistrarArtesano():
    return render_template('RegistrarArtesano.html', title='Registrar Artesanos')
@app.route('/InscripcionCurso')
def InscripcionCurso():
    return render_template('InscripcionCurso.html', title='Inscripcion a Curso')
@app.route('/RegistrarAcuerdo')
def RegistrarAcuerdo():
    return render_template('RegistrarAcuerdo.html', title='Registrar Acuerdo')
@app.route('/CrearCurso')
def CrearCurso():
    return render_template('CrearCurso.html', title='Crear Curso')
@app.route('/InfoCurso')
def InfoCurso():
    return render_template('InfoCurso.html', title='Informacion de Curso')
@app.route('/Login')
def Login():
    return render_template('login.html', title='Login')
@app.route('/NuevoInstructor')
def NuevoInstructor():
    return render_template('NuevoInstructor.html', title='Nuevo Instructor de Curso')
@app.route('/Registrate')
def Registrate():
    return render_template('registrate.html', title='Registrarse al Sistema')
    
