from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db


api = Namespace('artesanos', description='artesanos related operations')

artesanosParser = api.parser()
artesanosParser.add_argument(
    'page', type=int, help='page number', location='head')
artesanosParser.add_argument('pageSize', type=int,
                        help='page size', location='head')

queryArtesanos = {"tipoUser": 1,
              "tipoId": 1,
              "identificacion": 1,
              "email": 1,
              "apellidos": 1,
              "nombres": 1,
              "direccion": 1,
              "ubicacion": 1,
              "telefonos": 1,
              "estado": 1,
              "intentos": 1,
              "servicios": 1
              }


@api.route('/')
class Artesanos(Resource):
    @api.doc(parser=artesanosParser)
    def get(self):
        db = get_db()
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        people = list(db["users"].find({"tipoUser": "artesano"}, queryArtesanos).skip(
            page * pageSize).limit(pageSize))
        for person in people:
            person['_id'] = str(person['_id'])
        return {"total": db["users"].count_documents({"tipoUser": "artesano"}), "items": people}, 200
