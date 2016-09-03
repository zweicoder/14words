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


def handle_data(data, mode):
    if data['query']:
        try:
            if data['mode'] == SCOWL_MODE:
                encoder = scowl_encoder
            elif data['mode'] == BIP39_MODE:
                encoder = bip39_encoder
            else:
                return {error: 'Bad Request: No such mode'}

            result = encoder.encode(data['query']) if mode == 'encode' else encoder.decode(data['query'])
            return {'result': result}
        except:
            traceback.print_exc()
            return {'error': 'Server Error'}

    return {'error': 'Bad Request'}


@app.route('/encode', methods=['POST'])
def route_encode():
    data = request.get_json(force=True)
    response = handle_data(data, 'encode')
    if 'error' in response:
        return make_response(jsonify(error=response['error']), 400)

    return make_response(jsonify(result=response['result']), 200)


@app.route('/decode', methods=['POST'])
def route_decode():
    data = request.get_json(force=True)
    response = handle_data(data, 'decode')
    if 'error' in response:
        return make_response(jsonify(error=response['error']), 400)

    return make_response(jsonify(result=response['result']), 200)


if __name__ == '__main__':
    app.run()
