from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db


api = Namespace('acuerdos', description='Acuerdos related operations')


acuerdoPayload = api.model('acuerdoPayload', {
    "cliente": fields.String,
    "artesano": fields.String,
    "acuerdo": fields.String,
    "descripcion": fields.String,
    "valor" : fields.Float,
    "fechaInicio" : fields.Date,
    "fechaFin" : fields.Date,
    "comentario" : fields.String
})

acuerdosParser = api.parser()
acuerdosParser.add_argument(
    'page', type=int, help='page number', location='head')
acuerdosParser.add_argument('pageSize', type=int,
                          help='page size', location='head')


@api.route('/')
class Acuerdos(Resource):
    @api.doc(parser=acuerdosParser)
    def get(self):
        collection = get_db()['acuerdos']
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        acuerdos = list(collection.find().skip(
            page * pageSize).limit(pageSize))
        for acuerdo in acuerdos:
            acuerdo['_id'] = str(acuerdo['_id'])
        return {"total": collection.count_documents({}), "items": acuerdos}, 200

    @api.expect(acuerdoPayload)
    def post(self):
        collection = get_db()['acuerdos']
        body = api.payload
        res = collection.insert_one(body)
        return {"_id": str(res.inserted_id)}, 200


@api.route('/<string:id>')
class Acuerdo(Resource):
    def get(self, id):
        collection = get_db()['acuerdos']
        res = collection.find_one({"_id": ObjectId(id)})
        if res is None:
            return {"id": id}, 404
        res['_id'] = str(res['_id'])
        return res, 200

    @api.expect(acuerdoPayload)
    def put(self, id):
        collection = get_db()['acuerdos']
        course = collection.find_one({"_id": ObjectId(id)})
        if course == None:
            return {"id": id}, 404
        body = api.payload
        collection.update_one({"_id": ObjectId(id)}, {"$set": body})
        course = collection.find_one({"_id": ObjectId(id)})
        course['_id'] = str(course['_id'])
        return course, 200

    def delete(self, id):
        collection = get_db()['acuerdos']
        res = collection.delete_one({"_id": ObjectId(id)})
        if res.deleted_count <= 0:
            return {"_id": id}, 404
        return {}, 200
