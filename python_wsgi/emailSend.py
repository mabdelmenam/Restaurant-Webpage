import smtplib, ssl
from main_app import app, my_mysql
from flask import Flask, session

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import sys

def test():
    port = 465 # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "mabdelmenam511@gmail.com"
    password = 'V%>h8$U4?4B{.cB9PzR"tDA8Zs<#V+E9~:{jS[[C'
    message = MIMEMultipart('alternative')
    
    message["From"] = sender_email
    message["Subject"] = "McGrub Delivery"

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
        quantity.append(food[index][1])
        foodName.append(food[index][2])
        price.append(food[index][3])
        foodInstructions.append(food[index][4])

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
    html = '''
    <html>
    <body>
    <h3>Thank You, your order is on the way!</h3>
    <div style="float:right;">
        <table>
            <tr>
                <td>{} {}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td><!--LINE SEPERATION--></td>
                <td>{}</td>
            </tr>
        </table>
    </div>

    <div id="food-details">
        <table>
            <!--
            for index, i in enumerate(quantity):
        print(quantity[index], "\n", foodName[index], "\n", price[index], "\n", foodInstructions[index], file=sys.stderr)
        -->
        </table>
        <h5>Subtotal: {}</h5>
        <h5>Tax: {}</h5>
        <h5>Tip: {}</h5>
        <h5>Total: {}</h5>
    </div>
    </body>
    </html>
    '''.format(firstName,lastName, home_address, zipcode, pnumber, deliveryInstructions, subtotal, tax, tip, total)

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    print("TOLO", file=sys.stderr)
    #---------------------------------#

    #Create a secure SSL context
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())