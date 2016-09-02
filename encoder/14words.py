import os

wordDirectory = 'words/'

seen = {}


def getWords(filename):
    with open(filename) as f:
        lst = []
        for word in f:
            word = word.strip().lower()
            if word not in seen:
                lst.append(word)
                seen[word] = True
        return lst

verbs, adjs, nouns = [getWords(wordDirectory + f) for f in ['verb', 'adj', 'noun']]
# Fancy pattern
pattern = [adjs, adjs, nouns] + [adjs, adjs, nouns] + [verbs] + [adjs, adjs, nouns] + [adjs, nouns]
pattern_len = [len(l) for l in pattern]

SCOWL_MODE = 'SCOWL'
BIP39_MODE = 'BIP39'
def encode(addr, mode):
    indices = []
    num = int(addr, 16)
    for i in range(len(pattern_len)):
        divisor = reduce(lambda memo, x: memo * x, pattern_len[i + 1:], 1)
        indices.append(num / divisor)
        num = num % divisor
    words = [pattern[i][idx].capitalize() for i, idx in enumerate(indices)]
    words.insert(10, 'with')
    words.insert(3, 'and')
    return ' '.join(words)

def decode(sentence, mode):
    if mode == SCOWL_MODE:
        words = sentence.lower().split(' ')
        del words[3]
        del words[10]
        indices = [pattern[i].index(word) for i, word in enumerate(words)]
        indices = [indices[i] * reduce(lambda memo, x: memo * x, pattern_len[i + 1:], 1) for i in range(len(indices))]

        return checksum(zpad(longToHex(sum(indices)), 40))

    elif mode == BIP39_MODE:
        return 


def longToHex(l):
    return hex(l).replace('L', '')


def zpad(str, l):
    str = str.replace('0x', '')
    return '0x' + '0' * (l - len(str)) + str


import hashlib
import sha3

LOWER_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7'}


def checksum(address):
    normalized_address = address.lower().replace('0x', '')
    address_hash = sha3.keccak_256(normalized_address).hexdigest()
    checksum_address = '0x' + ''.join((
        c.lower() if address_hash[idx] in LOWER_CHARS else c.upper()
        for idx, c in enumerate(normalized_address)
    ))
    return checksum_address


def test(addr):
    encoded = encode(addr)
    decoded = decode(encoded)
    print addr
    print encoded
    print decoded
    print checksum(decoded)


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
        return jsonify(result=decode(data['query'], mode='SCOWL'))

    return 'Bad Request'


if __name__ == '__main__':
    app.run()
