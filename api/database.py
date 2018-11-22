import pymongo

def get_db():
    mongoClient = pymongo.MongoClient("mongodb://localhost:27017")
    db = mongoClient["bde"]
    return db
