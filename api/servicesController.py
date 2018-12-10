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
servicesParser.add_argument('service', type=str,
                             help='serviceName', location='head')

queryServices = {"tipoUser": 1,
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
class Services(Resource):
    @api.doc(parser=servicesParser)
    def get(self):
        db = get_db()
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        if args['service']:
            people = list(db["users"].find({"tipoUser": "artesano", "servicios": args['service']}, queryServices).skip(
            page * pageSize).limit(pageSize))
        else:
            people = list(db["users"].find({"tipoUser": "artesano"}, queryServices).skip(
                page * pageSize).limit(pageSize))
        for person in people:
            person['_id'] = str(person['_id'])
        return {"total": db["users"].count_documents({"tipoUser": "artesano", "servicios": args['service']}), "items": people}, 200
