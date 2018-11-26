from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db
import hashlib

api = Namespace('sessions', description='Session related operations')


sessionPayload = api.model('sessionPayload', {
    "email": fields.String,
    "password": fields.String
})

@api.route('/')
class Sessions(Resource):
    @api.expect(sessionPayload)
    def post(self):
        collection = get_db()["users"]
        body = api.payload
        body['password'] = str(hashlib.sha256(
            body['password'].encode()).hexdigest())
        user = collection.find_one({"email": body["email"]})
        if user is None:
            return {"invaliCredentials": True}, 401
        if user['password'] == body['password']:
            return {"_id" : str(user['_id'])}, 200
        return {"invaliCredentials": True}, 401
