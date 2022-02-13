import os
from pymongo import MongoClient
from dotenv import load_dotenv

# cargar el archivo de variable donde esta la llave del api
load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USUARIO = os.environ.get("MONGO_USUARIO", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PUERTO = int(os.environ.get("MONGO_PUERTO", "27017"))
cliente_mongo = MongoClient(
    host=MONGO_URL, username=MONGO_USUARIO, password=MONGO_PASSWORD, port=MONGO_PUERTO
)


def insertar_documento_test():
    db = cliente_mongo.test
    coleccion_test = db.test_collection
    res = coleccion_test.insert_one({"nombre": "Daniel", "instructor": True})
    print(res)
