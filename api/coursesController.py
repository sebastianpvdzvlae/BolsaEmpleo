from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db

api = Namespace('courses', description='Courses related operations')


createCoursePayload = api.model('createCoursePayload', {
    "nombre": fields.String,
    "descripcion": fields.String,
	"instructores": fields.List(fields.String)
})

coursePayload = api.model('coursePayload', {
    "nombre": fields.String,
    "descripcion": fields.String,
    "fechaInicio" : fields.Date,
    "fechaFin" : fields.Date,
    "numParticipantes" : fields.Integer,
    "lugar" : fields.String,
    "horario" : fields.String,
    "participantes" : fields.List(fields.String),
    "instructores": fields.List(fields.String)
})

inscripcionPayload = api.model('inscripcionPayload', {
    "id": fields.String
})
instructorPayload = api.model('instructorsPayload', {
    "instructor": fields.String
})
queryCourses = {"nombre": 1,
              "descripcion": 1,
              "fechaInicio": 1,
              "fechaFin": 1,
              "numParticipantes": 1,
              "lugar": 1,
              "horario": 1,
              "participantes": 1,
              "instructores": 1
              }

courseParser = api.parser()
courseParser.add_argument(
    'page', type=int, help='page number', location='head')
courseParser.add_argument('pageSize', type=int,
                        help='page size', location='head')

findByNameParser = api.parser()
findByNameParser.add_argument(
    'page', type=int, help='page number', location='head')
findByNameParser.add_argument('pageSize', type=int,
                          help='page size', location='head')
findByNameParser.add_argument('course', type=str,
                          help='course Name', location='head')

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

    @api.expect(createCoursePayload)
    def post(self):
        collection = get_db()['courses']
        body = api.payload
        if collection.find_one({"nombre": body["nombre"]}):
            return {"courseExists": True}, 400
        res = collection.insert_one(body)
        return {"_id": str(res.inserted_id)}, 200

@api.route('/find-by-name')
class CourseByName(Resource):
    @api.doc(parser=findByNameParser)
    def get(self):
        collection = get_db()['courses']
        args = request.args
        page = int(args['page'])
        pageSize = int(args['pageSize'])
        if args['course']:
            courses = list(collection.find({"nombre": args['course']}, queryCourses).skip(page * pageSize).limit(pageSize))
        for course in courses:
            course['_id'] = str(course['_id'])
        return {"total":collection["courses"].count_documents({"nombre":args['course']}), "courses": courses},200		

@api.route('/<string:idCourse>/curso')
class CourseInstructor(Resource):
    @api.expect(instructorPayload)
    def put(self, idCourse):
        collection = get_db()['courses']
        course = collection.find_one({"_id": ObjectId(idCourse)})
        body = api.payload
        if course == None:
            return {"id": idCourse}, 404
        collection.update_one({"_id": ObjectId(idCourse)}, {"$push": {'instructores':body["instructor"]}})
        course = collection.find_one({"_id": ObjectId(idCourse)})
        course['_id'] = str(course['_id'])
        return course, 200
    def get(self, idCourse):
        collection = get_db()['courses']
        res = collection.find_one({"_id": ObjectId(idCourse)}, {"instructores": 1})
        instructoresDB = get_db()['instructores']
        if res is None:
            return {"id": id}, 404
        instructores = []
        try:
            for instructor in res['instructores']:
                instructores.append(instructoresDB.find_one({"_id": ObjectId(instructor)}))
            for instructor in instructores:
                instructor['_id'] = str(instructor['_id'])
        except Exception:
            return {"id": id}, 404
        return {"count": len(instructores), "instructores": instructores}, 200

@api.route('/<string:id>')
class Course(Resource):
    def get(self, id):
        collection = get_db()['courses']
        res = collection.find_one({"_id": ObjectId(id)})
        if res is None:
            return {"id": id}, 404
        res['_id'] = str(res['_id'])
        return res, 200

    @api.expect(coursePayload)
    def put(self, id):
        collection = get_db()['courses']
        course = collection.find_one({"_id": ObjectId(id)})
        if course == None:
            return {"id": id}, 404
        body = api.payload
        collection.update_one({"_id": ObjectId(id)}, {"$set": body})
        course = collection.find_one({"_id": ObjectId(id)})
        course['_id'] = str(course['_id'])
        return course, 200

    def delete(self, id):
        collection = get_db()['courses']
        res = collection.delete_one({"_id": ObjectId(id)})
        if res.deleted_count <= 0:
            return {"_id": id}, 404
        return {}, 200


@api.route('/<string:id>/inscripcion')
class Participantes(Resource):
    @api.expect(inscripcionPayload)
    def post(self, id):
        collection = get_db()['courses']
        course = collection.find_one({"_id": ObjectId(id)})
        if course == None:
            return {"id": id}, 404
        body = api.payload
        if len(course['participantes']) < int(course['numParticipantes']):
            course['participantes'].append(body["id"])
            collection.update_one({"_id": ObjectId(id)}, {"$set": {"participantes": course['participantes']}})
            course = collection.find_one({"_id": ObjectId(id)})
            course['_id'] = str(course['_id'])
            return course, 200
        return {"courseIsFull" : True}, 400

    @api.expect(inscripcionPayload)
    def put(self, id):
        collection = get_db()['courses']
        course = collection.find_one({"_id": ObjectId(id)})
        if course == None:
            return {"id": id}, 404
        body = api.payload
        try:
            course['participantes'].remove(body["id"])
        except Exception:
            return {"idParticipante" : body["id"]}, 404           
        collection.update_one({"_id": ObjectId(id)}, {"$set": {"participantes": course['participantes']}})
        course = collection.find_one({"_id": ObjectId(id)})
        course['_id'] = str(course['_id'])
        return course, 200       
 
    

