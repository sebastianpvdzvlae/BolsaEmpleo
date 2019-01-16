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

passwordPayload = api.model('passwordPayload', {
    "oldPassword": fields.String,
    "newPassword": fields.String
})

lockUsersPayload = api.model('lockUsersPayload',{
    "action": fields.String
})

@api.route('/')
class Sessions(Resource):
    @api.expect(sessionPayload)
    def post(self): 
        collection = get_db()["users"]
        body = api.payload
        if body:
            body['password'] = str(hashlib.sha256(
                body['password'].encode()).hexdigest())
            user = collection.find_one({"email": body["email"]})
            if user is None:
                return {"invaliCredentials": True}, 401
            if user['password'] == body['password'] and user['intentos'] < 3 and user['estado']:
                collection.update_one({"email": body["email"]}, {
                                "$set": {"intentos": 0}})
                return {"_id" : str(user['_id'])}, 200
            elif user['intentos'] >= 3 and user['estado']:   
                collection.update_one({"email": body["email"]}, {
                                "$set": {"estado": False}})
                return {"userBlocked": True}, 403
            elif not user['estado']:
                return {"userBlocked": True}, 403
            elif not user['estado']:   
                return {"userBlocked": True}, 403    
            collection.update_one({"email": body["email"]}, {
                                "$inc": {"intentos": 1}})
        return {"invaliCredentials": True}, 401


@api.route('/<string:id>')
class Session(Resource):
    @api.expect(passwordPayload)
    def put(self, id):
        collection = get_db()["users"]
        body = api.payload
        body['oldPassword'] = str(hashlib.sha256(
            body['oldPassword'].encode()).hexdigest())
        user = collection.find_one({"_id": ObjectId(id)})
        if user is None:
            return {"id": id}, 404
        elif user['password'] == body['oldPassword']:
            collection.update_one({"_id": ObjectId(id)}, {"$set": {"password": body['password']}})
            return {"passwordUpdated": True}, 200
        return {"passwordUpdated": False}, 403

        
@api.route('/unlock-users/<string:id>')
class Lock(Resource):
    @api.expect(lockUsersPayload)
    def post(self, id):
        collection = get_db()["users"]
        user = collection.find_one({"_id": ObjectId(id)})
        if user is None:
            return {"id": id}, 404
        body = api.payload
        status = True
        if body['action'] == "lock":
            status = False
        elif body['action'] == "unlock":
            status = True
        collection.update_one({"_id": ObjectId(id)}, {"$set": {"estado": status, "intentos": 0}})
        return {"UserIsLocked": not status}, 200

