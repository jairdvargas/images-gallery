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


# from wsgiref import headers
from asyncio import format_helpers
import requests
import os
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS

# cargar el archivo de variable donde esta la llave del api
load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUGA = bool(os.environ.get("DEBUGA", True))


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


@app.route("/nueva-imagen")
def nueva_imagen():
    palabra = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    params = {"query": palabra}
    respuesta = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = respuesta.json()
    return data


if __name__ == "__main__":
    app.run("0.0.0.0", port=5050)
