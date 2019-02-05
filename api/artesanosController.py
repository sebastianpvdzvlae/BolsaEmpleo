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

servicesParser = api.parser()
servicesParser.add_argument(
    'page', type=int, help='page number', location='head')
servicesParser.add_argument('pageSize', type=int,
                            help='page size', location='head')
servicesParser.add_argument('service', type=str,
                            help='serviceName', location='head')

allParser = api.parser()
allParser.add_argument(
    'page', type=int, help='page number', location='head')
allParser.add_argument('pageSize', type=int,
                            help='page size', location='head')
allParser.add_argument('service', type=str,
                            help='serviceName', location='head')
allParser.add_argument('canton', type=str,
                       help='canton', location='head')
allParser.add_argument('parroquia', type=str,
                       help='parroquia', location='head')

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


@api.route('/artesanos-by-service')
class ArtesanosService(Resource):
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


@api.route('/artesanos-by-all')
class ArtesanosService2(Resource):
    @api.doc(parser=allParser)
    def get(self):
        db = get_db()
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        if args['service'] and args['canton'] and args['parroquia']:
            people = list(db["users"].find({"tipoUser": "artesano", "servicios": args['service'], "ubicacion.parroquia": args['parroquia']}, queryServices).skip(
                page * pageSize).limit(pageSize))
        else:
            people = list(db["users"].find({"tipoUser": "artesano"}, queryServices).skip(
                page * pageSize).limit(pageSize))
        for person in people:
            person['_id'] = str(person['_id'])
        return {"total": len(people), "items": people}, 200
