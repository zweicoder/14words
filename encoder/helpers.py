import hashlib
import sha3

def longToHex(l):
    return hex(l).replace('L', '')


def zpad(s, l):
    s = s.replace('0x', '')
    return '0x' + '0' * (l - len(s)) + s


LOWER_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7'}


def checksum(address):
    normalized_address = address.lower().replace('0x', '')
    address_hash = sha3.keccak_256(normalized_address).hexdigest()
    checksum_address = '0x' + ''.join((
        c.lower() if address_hash[idx] in LOWER_CHARS else c.upper()
        for idx, c in enumerate(normalized_address)
    ))
    return checksum_address