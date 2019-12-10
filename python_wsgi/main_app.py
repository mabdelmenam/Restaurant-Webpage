from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configure DB
app.config.from_pyfile('config.py')
my_mysql = MySQL(app)

from views import *

CORS(app)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
