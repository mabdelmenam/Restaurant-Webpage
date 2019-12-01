from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/json_test', methods=['POST'])
def json_test():
    req_data = request.get_json()
    return '<h1>POST Data is:   {}</h1>'.format(req_data['user'])


@app.route('/')
def index():
    return "yo"


if __name__ == '__main__':
    app.run(debug=True, port=8000)
