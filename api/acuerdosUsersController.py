from flask import Flask, request
from flask_restplus import Namespace, Resource, Api, fields
import pymongo
from bson import ObjectId
from database import get_db

api = Namespace('acuerdosUser', description='acuerdos users related operations')

queryAcuerdosUser = {
                    "$project":{"artesanoID":{"$toObjectId":"$artesano"},
                    "cliente" : 1,
                    "artesano" : 1,
                    "acuerdo" : 1,
                    "descripcion" : 1,
                    "valor" : 1,
                    "fechaInicio" : 1,
                    "fechaFin" : 1,
                    "comentario" : 1
                    }}
queryMatch = {"$match": {"cliente": id}}

queryLookup = {
                "$lookup": {
                            "from":"users",
                            "localField": "artesanoID",
                            "foreignField": "_id",
                            "as":"acuerdoUsuario"
                            }
                }

queryUnwind = {"$unwind" : "$acuerdoUsuario"}

@api.route('/<string:id>')
class UserAcuerdo(Resource):
    def get(self, id):
        db = get_db()
        collection = db.acuerdos
        pipe = [{"$match": {"cliente": id}},queryAcuerdosUser,queryLookup,queryUnwind]
        TestOutput  = collection.aggregate(pipeline = pipe)
        acuerdosUser = list(TestOutput)
        if acuerdosUser is None:
            return {"cliente": id}, 404

        for acuerdosU in acuerdosUser:
                acuerdosU['_id'] = str(acuerdosU['_id'])
                acuerdosU['artesanoID'] = str(acuerdosU['artesanoID'])
                acuerdosU['acuerdoUsuario']['_id'] = str (acuerdosU['acuerdoUsuario']['_id'])

        return {"total": len(acuerdosUser), "items": acuerdosUser}, 200

