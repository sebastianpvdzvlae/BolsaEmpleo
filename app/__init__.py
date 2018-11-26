from flask import Flask
import flask_login
import requests
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

login_manager = flask_login.LoginManager()

login_manager.init_app(app)


class User(flask_login.UserMixin):
    pass


@login_manager.user_loader
def user_loader(usrid):
    res = requests.get('http://127.0.0.1:5000/users/{}'.format(usrid))
    if res.status_code == 200:
        usrid = res.json()['_id']
        user = User()
        user.id = usrid
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

from app import routes
