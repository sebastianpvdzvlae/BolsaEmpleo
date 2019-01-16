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
