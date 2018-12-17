from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db

api = Namespace('instructors', description='Instructors related operations')


instructorPayload = api.model('instructorPayload', {
    "tipoId": fields.String(["cedula", "ruc", "pasaporte"]),
    "identificacion": fields.String,
    "nombres" : fields.String,
    "apellidos" : fields.String,
    "telefono" : fields.String
})

instructorParser = api.parser()
instructorParser.add_argument(
    'page', type=int, help='page number', location='head')
instructorParser.add_argument('pageSize', type=int,
                          help='page size', location='head')


@api.route('/')
class Instructores(Resource):
    @api.doc(parser=instructorParser)
    def get(self):
        collection = get_db()['instructores']
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        instructores = list(collection.find().skip(
            page * pageSize).limit(pageSize))
        for instructor in instructores:
            instructor['_id'] = str(instructor['_id'])
        return {"count": len(instructores), "courses": instructores}, 200

    @api.expect(instructorPayload)
    def post(self):
        collection = get_db()['instructores']
        body = api.payload
        if collection.find_one({"tipoId": body["tipoId"], "identificacion": body["identificacion"]}):
            return {"instructorExists": True}, 400
        res = collection.insert_one(body)
        return {"_id": str(res.inserted_id)}, 200


@api.route('/<string:id>')
class Instructor(Resource):
    def get(self, id):
        collection = get_db()['instructores']
        res = collection.find_one({"_id": ObjectId(id)})
        if res is None:
            return {"id": id}, 404
        res['_id'] = str(res['_id'])
        return res, 200

    @api.expect(instructorPayload)
    def put(self, id):
        collection = get_db()['instructores']
        instructor = collection.find_one({"_id": ObjectId(id)})
        if instructor == None:
            return {"id": id}, 404
        body = api.payload
        collection.update_one({"_id": ObjectId(id)}, {"$set": body})
        instructor = collection.find_one({"_id": ObjectId(id)})
        instructor['_id'] = str(instructor['_id'])
        return instructor, 200

    def delete(self, id):
        collection = get_db()['instructores']
        res = collection.delete_one({"_id": ObjectId(id)})
        if res.deleted_count <= 0:
            return {"_id": id}, 404
        return {}, 200
