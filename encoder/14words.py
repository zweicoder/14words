import os
import sys, traceback
from encoders import ScowlEncoder, Bip39Encoder


SCOWL_MODE = 'SCOWL'
BIP39_MODE = 'BIP39'


from flask import Flask, jsonify, request, Response, make_response

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
        try:
            if data['mode'] == SCOWL_MODE:
                encoder = scowl_encoder
            elif data['mode'] == BIP39_MODE:
                encoder = bip39_encoder
            else:
                return make_response(jsonify(error='Bad Request: No such mode') , 400)

            return jsonify(result=encoder.encode(data['query']))
        except:
            e = sys.exc_info()
            traceback.print_exc()
            return make_response(jsonify(error='Server Error'), 400)

    return make_response(jsonify(error='Bad Request'), 400)


@app.route('/decode', methods=['POST'])
def route_decode():
    data = request.get_json(force=True)
    if data['query']:
        try:
            if data['mode'] == SCOWL_MODE:
                encoder = scowl_encoder
            elif data['mode'] == BIP39_MODE:
                encoder = bip39_encoder
            else:
                return make_response(jsonify(error='Bad Request: No such mode') , 400)

            return jsonify(result=encoder.decode(data['query']))
        except:
            e = sys.exc_info()
            traceback.print_exc()
            return make_response(jsonify(error='Server Error'), 400)

    return make_response(jsonify(error='Bad Request'), 400)


if __name__ == '__main__':
    app.run()
