from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db

api = Namespace('courses', description='Courses related operations')


CreateCoursePayload = api.model('createCoursePayload', {
    "nombre": fields.String,
    "descripcion": fields.String
})

CoursePayload = api.model('createCoursePayload', {
    "nombre": fields.String,
    "descripcion": fields.String
})

courseParser = api.parser()
courseParser.add_argument(
    'page', type=int, help='page number', location='head')
courseParser.add_argument('pageSize', type=int,
                        help='page size', location='head')


@api.route('/')
class Courses(Resource):
    @api.doc(parser=courseParser)
    def get(self):
        collection = get_db()['courses']
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        courses = list(collection.find().skip(
            page * pageSize).limit(pageSize))
        for course in courses:
            course['_id'] = str(course['_id'])
        return {"count": len(courses), "courses": courses}, 200

    @api.expect(CreateCoursePayload)
    def post(self):
        collection = get_db()['courses']
        body = api.payload
        if collection.find_one({"nombre": body["nombre"]}):
            return {"courseExists": True}, 400
        res = collection.insert_one(body)
        return {"_id": str(res.inserted_id)}, 200


@api.route('/<string:id>')
class Course(Resource):
    def get(self, id):
        collection = get_db()['courses']
        res = collection.find_one({"_id": ObjectId(id)})
        if res is None:
            return {"id": id}, 404
        res['_id'] = str(res['_id'])
        return res, 200

    @api.expect(CoursePayload)
    def put(self, id):
        collection = get_db()['courses']
        course = collection.find_one({"_id": ObjectId(id)})
        if course == None:
            return {"id": id}, 404
        body = api.payload
        collection.find_one_and_replace({"_id": ObjectId(id)}, body)
        course = collection.find_one({"_id": ObjectId(id)})
        course['_id'] = str(course['_id'])
        return course, 200

    def delete(self, id):
        collection = get_db()['courses']
        res = collection.delete_one({"_id": ObjectId(id)})
        if res.deleted_count <= 0:
            return {"_id": id}, 404
        return {}, 200
