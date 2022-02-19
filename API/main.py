# antes de todo se tiene que crear la carpeta .venv y usar el comando
# pipenv install flask
# se crea primero la carpeta .venv para que los archivos se copien alla del ambiente virtual.
# luego se tiene que activar el shell virtual con:  pipenv shell
# Cuando se va a recrear el ambiente virtual solo se usa: pipenv install
# #por eso se ignora la carpeta .venv en github porque se puede recrear localmente.
# Para poder ejecutar flask en linux se tiene q poder en terminal el comnado: export FLASK_APP=main
# luego se tiene que ejecutar flask con: flask run
# se instala igual : pipenv install flask-cors
# para formatear el codigo se instalo lo siguiente
# pipenv install --dev black
# pipenv install --dev pylint
# pipenv install --dev pycodestyle
# se usa pipenv sync para poder sincronizaar si se instalo algo nuevo en el ambiente virtual python


# from wsgiref import headers
from asyncio import format_helpers
from crypt import methods
from unittest import result
import requests
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import insertar_documento_test
from mongo_client import cliente_mongo


# cargar el archivo de variable donde esta la llave del api
load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUGA = bool(os.environ.get("DEBUGA", True))

# Mongo
galeriadb = cliente_mongo.galeria
coleccion_de_imagenes = galeriadb.imagenes


# revisar si existe la llave api
if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Por favor crear el archivo .env.local y agregar UNSPLASH_KEY"
    )

app = Flask(__name__)
# aqui se habilita cors
CORS(app)

# Habilitacion de debug on en Flask
app.config["DEBUG"] = DEBUGA

insertar_documento_test()


@app.route("/nueva-imagen")
def nueva_imagen():
    palabra = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    params = {"query": palabra}
    respuesta = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = respuesta.json()
    return data


@app.route("/imagenes", methods=["GET", "POST"])
def imagenes():
    if request.method == "GET":
        # leer imagenes de la base de datos
        imagenes = coleccion_de_imagenes.find({})
        # la funcion find retorna "cursor" y se tiene que convertir a json con jsonify
        return jsonify([img for img in imagenes])
    if request.method == "POST":
        # guardar imagen en la base de datos
        imagen = request.get_json()
        imagen["_id"] = imagen.get("id")
        # json.loads(request.data)
        resultado = coleccion_de_imagenes.insert_one(imagen)
        id_insertada = resultado.inserted_id
        return {"id_insertado": id_insertada}


@app.route("/imagenes/<id_imagen>", methods=["DELETE"])
def imagen(id_imagen):
    if request.method == "DELETE":
        # eliminar la imagen de la base de datos
        resultado = coleccion_de_imagenes.delete_one({"_id": id_imagen})
        print(resultado.deleted_count)
        if not resultado:
            return {"error": "Imagen no fue eliminada, intente de nuevo"}, 500
        if resultado and not resultado.deleted_count:
            return {"error": "Imagen no encontrada"}, 404
        else:
            return {"id_eliminada": id_imagen}


if __name__ == "__main__":
    app.run("0.0.0.0", port=5050)
