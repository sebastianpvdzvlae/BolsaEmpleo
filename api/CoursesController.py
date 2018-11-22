from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db

api = Namespace('Courses', description='Courses related operations')


locationPayload = api.model('locationPayload', {
    "provincia": fields.String,
    "canton": fields.String,
    "parroquia": fields.String
})


@api.route('/')
class Courses(Resource):
    def get(self):
        db = get_db()

        return {}, 200
    
    def post(self):
        return {}, 200


@api.route('/<string:id>')
class Course(Resource):
    def get(self, id):
        return {}, 200
