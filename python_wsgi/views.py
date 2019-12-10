from main_app import app, my_mysql

from flask import Flask, request, jsonify
from passlib.hash import pbkdf2_sha256
import json

import sys

@app.route('/') #MAIN PAGE
def index():
    return "yo"

@app.route('/json_test', methods=['GET', 'POST']) #DATABASE STORAGE ROUTE
def json_test():
    if request.method == 'POST':
        req_data = request.get_json()
        cur = my_mysql.connection.cursor()
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
        my_mysql.connection.commit()
        cur.close()
        valid['valid'] = 1
        return jsonify(valid)
    return '<h1>Success</h1>'

@app.route('/login_validate', methods=['GET', 'POST'])
def login_validate():
    isvalid = {}
    try:
        if request.method == 'POST':
            req_data = request.get_json()
            cur = my_mysql.connection.cursor()

            username = req_data['user']
            password = req_data['password']

            user_validate = cur.execute(
                "SELECT * FROM users WHERE username =(%s)", [username])#Checking if username inputted is correct

            hashed_pswd = cur.fetchone()[1]
            password_validate = pbkdf2_sha256.verify(password, hashed_pswd)

            if password_validate != True:
                isvalid['valid'] = 0
                json_edits(isvalid)
                return jsonify(isvalid)

            #gc.collect()

            isvalid['valid'] = 1
            json_edits(isvalid)

            return jsonify(isvalid)
    
    except Exception as e:
        isvalid['valid'] = 0

        json_edits(isvalid)

        return jsonify(isvalid)


def json_edits(isvalid): #write isvalid to json file to use as a signal for plus button menu
        with open('data.json', 'w') as f:
            f.write(json.dumps({"valid": 3}))
        with open('data.json', 'r') as f:
            json_data = json.load(f)
            json_data = isvalid
        with open('data.json', 'w') as f:
            f.write(json.dumps(json_data))
        
