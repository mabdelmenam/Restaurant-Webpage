import smtplib, ssl
from main_app import app, my_mysql
from flask import Flask, session

import sys

def test():
    port = 465 # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "mabdelmenam511@gmail.com"
    password = 'V%>h8$U4?4B{.cB9PzR"tDA8Zs<#V+E9~:{jS[[C'
    message = '''
    This is a message.
    '''
    

    cur = my_mysql.connection.cursor()
    cur.execute("SELECT firstName,lastName,home_address,zipcode,pnumber,email  FROM users WHERE username=%s", [session.get('username')])
    data = cur.fetchall()

    for row in data:
        firstName = row[0]
        lastName = row[1]
        home_address = row[2]
        zipcode = row[3]
        pnumber = row[4]
        email = row[5]

    cur.execute("SELECT * FROM foodorder WHERE username=%s", [session.get('username')])
    food = cur.fetchall()
    for row in food:
        print(row[0], file=sys.stderr)

    #Step 1: Get everything excpet password cur.execute("SELECT firstName,lastName,home_address,zipcode,pnumber  FROM users WHERE username=%s", [session.get('username')])
    #Step 2: Get foodorder cur.execute("SELECT * FROM foodorder WHERE username=%s", [session.get('username')])
    #Step 3: Get subtotal, tax, tip, total, instructions     from  paymentorderinfo
    my_mysql.connection.commit()
    cur.close()
    #---------------------------------#

    #Create a secure SSL context

    # context = ssl.create_default_context()
    # with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
    #     server.login(sender_email, password)
    #     server.sendmail(sender_email, user_email, message)
    #     #TO: Send email here