import os


SCOWL_MODE = 'SCOWL'
BIP39_MODE = 'BIP39'


from flask import Flask, jsonify, request, Response

app = Flask(__name__)

from flask_cors import CORS, cross_origin

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/encode', methods=['POST'])
def route_encode():
    data = request.get_json(force=True)
    if data['query']:
        return jsonify(result=encode(data['query']))
    return 'Bad Request'


@app.route('/decode', methods=['POST'])
def route_decode():
    data = request.get_json(force=True)
    if data['query']:
        return jsonify(result=decode(data['query']))

    return 'Bad Request'


if __name__ == '__main__':
    app.run()
