from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL


from passlib.hash import pbkdf2_sha256

import json
import yaml

app = Flask(__name__)

# Configure DB
db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_database']
CORS(app)

mysql = MySQL(app)


@app.route('/json_test', methods=['GET', 'POST'])
def json_test():
    if request.method == 'POST':
        req_data = request.get_json()
        cur = mysql.connection.cursor()
        valid = {}
        # Text in between brackets is the key from json
        username = req_data['user']

        user_Validate = cur.execute(
            "SELECT * FROM users where username =(%s)", [username])

        if user_Validate > 0:
            valid['valid'] = 0
            return jsonify(valid)

        password = req_data['password']
        hashed_pswd = pbkdf2_sha256.hash(password)
        fname = req_data['fname']
        lname = req_data['lname']
        email = req_data['email']
        phone_num = req_data['phone_num']
        home_address = req_data['home_address']
        zipcode = req_data['zipcode']

        cur.execute("INSERT INTO users(username, pass, firstName, lastName, email, pnumber, home_address, zipcode) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)",
                    (username, hashed_pswd, fname, lname, email, phone_num, home_address, zipcode))
        mysql.connection.commit()
        cur.close()
        valid['valid'] = 1
        return jsonify(valid)
    return '<h1>Success</h1>'


@app.route('/')
def index():
    return "yo"


if __name__ == '__main__':
    app.run(debug=True, port=8000)
