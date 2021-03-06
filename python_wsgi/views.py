from main_app import app, my_mysql
from emailSend import test

from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from passlib.hash import pbkdf2_sha256
import json

import sys

@app.route('/') #MAIN PAGE
def index():
    return render_template('index.html')

@app.route('/about')#About Page
def about():
    return render_template('about.html')

@app.route('/menu')#Menu Page
def menu():
    return render_template('menu.html')

@app.route('/lunch')#Lunch Page
def lunch():
    return render_template('lunch.html')

@app.route('/swich-pasta')#Sandwich and Pasta Page
def swich_pasta():
    return render_template('swich-pasta.html')

@app.route('/desserts')#Desserts Page
def desserts():
    return render_template('desserts.html')

@app.route('/entrees')#Entrees Page
def entrees():
    return render_template('entrees.html')

@app.route('/checkout')#Checkout Page
def checkout():
    if session.get("checkout_period"):
        return render_template('checkout.html')#if checkout session tru go to checkout page, else go back to menu.html
    return render_template('menu.html')

@app.route('/order_complete') #ORDER COMPLETE
def order_complete():
    return render_template('order_complete.html')

@app.route('/loginPage')#Login Page
def loginPage():
    if session.get("logged_in"):
        return render_template('index.html')
    return render_template('loginPage.html')

@app.route('/signup') #Signup Page
def signup():
    return render_template('sign-up.html') 

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

    elif request.method == 'GET':
        cur = my_mysql.connection.cursor()
        #print("Username: ", session.get('username'), file=sys.stderr)
        cur.execute("SELECT firstName,lastName,home_address,zipcode,pnumber  FROM users WHERE username=%s", [session.get('username')])
        info = cur.fetchall()
        
        my_mysql.connection.commit()
        cur.close()

        return render_template('checkout.html', info = info)
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

            if password_validate != True:#Correct username, wrong password
                isvalid['valid'] = 0
                return jsonify(isvalid)

            isvalid['valid'] = 1 #Both are correct
            session['logged_in'] = True
            session['username'] = username

            
            return jsonify(isvalid)
    
    except Exception as e: #Username doesn't exist
        isvalid['valid'] = 0
        return jsonify(isvalid)
    return '<h1>Hello</h1>'

@app.route('/food_database', methods=['GET','POST']) #Storing food item data into database
def food_database():
    if request.method == 'POST':
        req_data = request.get_json()
        cur = my_mysql.connection.cursor()

        foodName = req_data['food']
        price = req_data['price']
        quantity = req_data['quantity']
        instructions = req_data['food_instructions']

        cur.execute("INSERT INTO foodorder(username, quantity, foodName, price, instructions) VALUES(%s, %s, %s, %s, %s)",
                    ([session.get('username')], quantity, foodName, price, instructions))
        
        my_mysql.connection.commit()
        cur.close()


        print(req_data, file=sys.stderr)

        return 'Working...'
    elif request.method == 'GET': #DISPLAY IN SHOPPING BAG
        cur = my_mysql.connection.cursor()
        cur.execute("SELECT * FROM foodorder WHERE username=%s", [session.get('username')])
        data = cur.fetchall()

        cur.execute("SELECT sum(price) from foodorder WHERE username=%s", [session.get('username')]) 
        subtotal = cur.fetchall()
        subtotal2 = float(subtotal[0][0])
        subtotalFinal = format(subtotal2, '.2f')

        session['checkout_period'] = True #Session to give access to checkout page, active when clicking on the shopping icon

        my_mysql.connection.commit()
        cur.close()

        return render_template('menu.html', data = data, subtotal = subtotalFinal)

@app.route('/final_details', methods=['GET','POST']) #Checkout Page
def final_details():
    if request.method == 'POST':
        req_data = request.get_json()
        cur = my_mysql.connection.cursor()

        cardnum = req_data['cardnum']
        hashed_cardnum = pbkdf2_sha256.hash(cardnum)

        expiration = req_data['expiration']
        code = req_data['code']
        subtotal = req_data['subtotal']
        tax = req_data['tax']
        tip = req_data['tip']
        total = req_data['total']
        instructions = req_data['ins']
        
        cur.execute("INSERT INTO paymentorderinfo(username,cardnum, expiration, cvv, subtotal, tax,  tip, total, instructions) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                    ([session.get('username')], hashed_cardnum, expiration, code, subtotal, tax, tip, total, instructions))#***ALIGN WITH USER, CREATE USER COLUMN***

        session['checkout_period'] = False
        my_mysql.connection.commit()
        cur.close()

        print(req_data, file=sys.stderr)
        test()
        return redirect(url_for('order_complete'))

    elif request.method == 'GET':
        cur = my_mysql.connection.cursor()
        cur.execute("SELECT * FROM foodorder WHERE username=%s", [session.get('username')])
        data = cur.fetchall()

        cur.execute("SELECT sum(price) from foodorder WHERE username=%s", [session.get('username')])
        subtotal = cur.fetchall()
        subtotal2 = float(subtotal[0][0]) # float
        subtotalFinal = format(subtotal2, '.2f') #string   ****STORE INTO paymentorderinfo*****

        tax = subtotal2 * 0.06625 #tax float
        taxString = format(tax,'.2f') # tax string              ****STORE INTO paymentorderinfo*****
        subwithTax = (tax) + subtotal2 #sum of subtotal and  tax
        #if user picks a 15% tip, the tip = 0.15 % subwithTax 

        #print(subtotalInt, file=sys.stderr)
        my_mysql.connection.commit()
        cur.close()

        return render_template('checkout.html', data = data, subtotal = subtotalFinal, tax = taxString)

@app.route('/check_session', methods=['GET'])
def check_session():
    isvalid = {}
    if session.get('username') is None:
        isvalid['active'] = 0
        return jsonify(isvalid)

    print(session.get('username'), file=sys.stderr)
    isvalid['active'] = 1
    username = session['username']

    return jsonify(isvalid)

@app.route('/drop_session', methods=['POST'])
def drop_session():
    session.clear()
    session['logged_in'] = False
    return redirect(url_for('loginPage'))

@app.route('/visual_change', methods=['POST', 'GET'])
def visual_change():
    if request.method == 'GET':
        return 'nothing'
    elif request.method == 'POST':
        req_data = request.get_json()
        #print(type(req_data), file=sys.stderr)

        #id= req_data['rowID']
        #print("ROW ID: " , id, file=sys.stderr)
        cur = my_mysql.connection.cursor()

        cur.execute("DELETE FROM foodorder WHERE id=%s", [req_data])
        my_mysql.connection.commit()
        cur.close()
        return "THE ROW"