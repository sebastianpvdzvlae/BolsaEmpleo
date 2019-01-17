from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db


api = Namespace('services', description='services related operations')

servicesParser = api.parser()
servicesParser.add_argument(
    'page', type=int, help='page number', location='head')
servicesParser.add_argument('pageSize', type=int,
                             help='page size', location='head')

servicePayload = api.model('servicePayload', {
    "name": fields.String
})

@api.route('/')
class Services(Resource):
    @api.doc(parser=servicesParser)
    def get(self):
        db = get_db()
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        services = list(db["services"].find({}).skip(page * pageSize).limit(pageSize))
        for service in services:
            service['_id'] = str(service['_id'])
        return {"total": db["services"].count_documents({}), "items": services}, 200

    @api.expect(servicePayload)
    def post(self):
        collection = get_db()['services']
        body = api.payload
        if collection.find_one({"name" : body['name']}):
            return {"serviceExists" : True}, 400
        res = collection.insert_one(body)
        return {"_id" : str(res.inserted_id)}, 200


@api.route('/<string:id>')
class Service(Resource):
    def get(self, id):
        collection = get_db()['services']
        service = collection.find_one({"_id": ObjectId(id)})
        if service is None:
            return {"_id" : id}
        service['_id'] = str(service['_id'])
        return service, 200

    def delete(self, id):
        collection = get_db()['services']
        res = collection.delete_one({"_id": ObjectId(id)})
        if res.deleted_count <= 0:
            return {"_id": id}, 404
        return {}, 200

    @api.expect(servicePayload)
    def put(self, id):
        collection = get_db()['services']
        service = collection.find_one({"_id": ObjectId(id)})
        if service == None:
            return {"id": id}, 404
        body = api.payload
        collection.update_one({"_id": ObjectId(id)}, {"$set": body})
        service = collection.find_one({"_id": ObjectId(id)})
        service['_id'] = str(service['_id'])
        return service, 200
