import os

class Config(object):
    SECRET_KEY = os.environ.get(
        'SECRET_KEY') or 'd87383df7300df9dd9c9d6380ff9d0ebcccd28125de9fc69ef55cbd5c05f9989'
