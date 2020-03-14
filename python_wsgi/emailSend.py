import smtplib, ssl
from main_app import app, my_mysql
from flask import Flask, session, render_template

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import jinja2
from jinja2 import Environment, FileSystemLoader

import sys, os

def test():
    port = 465 # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "mabdelmenam511@gmail.com"
    password = 'V%>h8$U4?4B{.cB9PzR"tDA8Zs<#V+E9~:{jS[[C'

    message = MIMEMultipart('alternative')
    message["From"] = sender_email
    message["Subject"] = "McGrub Delivery" 

    env = Environment(
    loader=FileSystemLoader('%s/templates/' % os.path.dirname(__file__)))

    cur = my_mysql.connection.cursor()
    cur.execute("SELECT firstName,lastName,home_address,zipcode,pnumber,email  FROM users WHERE username=%s", [session.get('username')])
    data = cur.fetchall()

    for row in data: #User Data
        firstName = row[0]
        lastName = row[1]
        home_address = row[2]
        zipcode = row[3]
        pnumber = row[4]
        receiver_email = row[5]

    message["To"] = receiver_email

    cur.execute("SELECT * FROM foodorder WHERE username=%s", [session.get('username')])
    food = cur.fetchall()

    quantity = []
    foodName = []
    price = []
    foodInstructions = []
    for index, row in enumerate(food): #Food Data
        quantity.append(food[index][2])
        foodName.append(food[index][3])
        price.append(food[index][4])
        foodInstructions.append(food[index][5])

    print(food, file=sys.stderr)
    cur.execute("SELECT subtotal,tax,tip,total,instructions FROM paymentorderinfo ORDER BY id DESC LIMIT 1")
    order = cur.fetchall()

    for row in order: #Money Data
        subtotal = row[0]
        tax = row[1]
        tip = row[2]
        total = row[3]
        deliveryInstructions = row[4]
    my_mysql.connection.commit()
    cur.close()


    text = '''
    This is a message.
    '''

    html = render_template('email.html', firstName=firstName, lastName=lastName, home_address=home_address, zipcode=zipcode,
    pnumber=pnumber, quantity=quantity, foodName=foodName, price=price, foodIns=foodInstructions, subtotal=subtotal, tax=tax,
    tip=tip, total=total, deliveryIns=deliveryInstructions)

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    print(session.get('username'), file=sys.stderr)
    #---------------------------------#

    #Create a secure SSL context
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())