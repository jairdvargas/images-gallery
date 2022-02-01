#antes de todo se tiene que crear la carpeta .venv y usar el comando
#pipenv install flask
#se crea primero la carpeta .venv para que los archivos se copien alla del ambiente virtual.
#luego se tiene que activar el shell virtual con:  pipenv shell
#Cuando se va a recrear el ambiente virtual solo se usa: pipenv install
# #por eso se ignora la carpeta .venv en github porque se puede recrear localmente. 
# Para poder ejecutar flask en linux se tiene q poder en terminal el comnado: export FLASK_APP=main
#luego se tiene que ejecutar flask con: flask run

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__=="__main__":
  app.run("0.0.0.0", port=5050)