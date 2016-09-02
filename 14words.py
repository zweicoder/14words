import os
from encoders import ScowlEncoder, Bip39Encoder


SCOWL_MODE = 'SCOWL'
BIP39_MODE = 'BIP39'


from flask import Flask, jsonify, request, Response

app = Flask(__name__)

from flask_cors import CORS, cross_origin

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

scowl_encoder = ScowlEncoder()
bip39_encoder = Bip39Encoder()
@app.route('/encode', methods=['POST'])
def route_encode():
    data = request.get_json(force=True)
    if data['query']:
        if data['mode'] == SCOWL_MODE:
            return jsonify(result=scowl_encoder.encode(data['query']))
        elif data['mode'] == BIP39_MODE:
            return jsonify(result=bip39_encoder.encode(data['query']))
    return 'Bad Request'


@app.route('/decode', methods=['POST'])
def route_decode():
    data = request.get_json(force=True)
    if data['query']:
        if data['mode'] == SCOWL_MODE:
            return jsonify(result=scowl_encoder.decode(data['query']))
        elif data['mode'] == BIP39_MODE:
            return jsonify(result=bip39_encoder.decode(data['query']))
    return 'Bad Request'


if __name__ == '__main__':
    app.run()
