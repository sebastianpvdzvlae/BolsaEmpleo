from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db

api = Namespace('provinces', description='provinces related operations')

provincesParser = api.parser()
provincesParser.add_argument(
    'page', type=int, help='page number', location='head')
provincesParser.add_argument('pageSize', type=int,
                            help='page size', location='head')

@api.route('/')
class Provinces(Resource):
    @api.doc(parser=provincesParser)
    def get(self):
        db = get_db()
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        provinces = list(db["provincias"].find({},{"nombre":1}).skip(
                page * pageSize).limit(pageSize))
        for province in provinces:
            province['_id'] = str(province['_id'])
        return {"total": db["provincias"].count_documents({}), "items": provinces}, 200


@api.route('/<string:id>')
class Province(Resource):
    def get(self, id):
        db = get_db()
        res = db["provincias"].find_one({"_id": ObjectId(id)})
        if res is None:
            return {"id": id}, 404
        res['_id'] = str(res['_id'])
        return res, 200
