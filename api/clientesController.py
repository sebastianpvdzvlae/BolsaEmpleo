from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db


api = Namespace('clientes', description='clientes related operations')

clientesParser = api.parser()
clientesParser.add_argument(
    'page', type=int, help='page number', location='head')
clientesParser.add_argument('pageSize', type=int,
                             help='page size', location='head')

queryClientes = {"tipoUser": 1,
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
    @api.doc(parser=clientesParser)
    def get(self):
        db = get_db()
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        people = list(db["users"].find({"tipoUser": "cliente"}, queryClientes).skip(
            page * pageSize).limit(pageSize))
        for person in people:
            person['_id'] = str(person['_id'])
        return {"count": len(people), "users": people}, 200
