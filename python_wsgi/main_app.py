from flask import Flask, request, jsonify, session

from flask_cors import CORS
from flask_mysqldb import MySQL
import os, json, sys
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Configure DB
app.config.from_pyfile('config.py')
my_mysql = MySQL(app)

from views import *

CORS(app)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
