from helpers import longToHex, zpad, checksum
from vocabulary import scowl_vocab, bip39_vocab

# Encoder that uses the SCOWL wordlist
class ScowlEncoder:
    def __init__(self):
        verbs, adjs, nouns = scowl_vocab()
        # Fancy pattern
        self.pattern = [adjs, adjs, nouns] + [adjs, adjs, nouns] + [verbs] + [adjs, adjs, nouns] + [adjs, nouns]
        self.pattern_len = [len(l) for l in self.pattern]

    def encode(self, addr):
        indices = []
        num = int(addr, 16)
        for i in range(len(self.pattern_len)):
            divisor = reduce(lambda memo, x: memo * x, self.pattern_len[i + 1:], 1)
            indices.append(num / divisor)
            num = num % divisor
        words = [self.pattern[i][idx].capitalize() for i, idx in enumerate(indices)]
        words.insert(10, 'with')
        words.insert(3, 'and')
        return ' '.join(words)

    def decode(self, sentence):
        words = sentence.lower().split(' ')
        del words[3]
        del words[10]
        indices = [self.pattern[i].index(word) for i, word in enumerate(words)]
        indices = [indices[i] * reduce(lambda memo, x: memo * x, self.pattern_len[i + 1:], 1) for i in range(len(indices))]

        return checksum(zpad(longToHex(sum(indices)), 40))


class Bip39Encoder:
    def __init__(self):
        self.vocab = bip39_vocab()
        self.NUM_WORDS = 15 # ln(16^40) / ln(2048) = 14.5

    def encode(self, addr):
        num = int(addr, 16)
        words = []
        for i in reversed(range(self.NUM_WORDS)):
            divisor = len(self.vocab)**i
            words.append(self.vocab[num / divisor])
            num = num % divisor

        # TODO checksums via capitalization approach?
        return ' '.join(words)

    def decode(self, words):
        words = words.lower().split(' ')
        indices = [self.vocab.index(word) for word in words]
        value = sum((indices[i] * len(self.vocab)**(self.NUM_WORDS - 1 - i) for i in range(self.NUM_WORDS)))
        return checksum(zpad(longToHex(value) ,40))


def encoder_test(encoder, addr):
    encoded =  encoder.encode(addr)
    decoded = encoder.decode(encoded)
    print encoded
    print decoded
    assert decoded == addr

# encoder = Bip39Encoder()
# encoder_test(encoder, '0x667ABBa73ABfCC9321516b10CBb486F29a855Ae8')

encoder = ScowlEncoder()
# encoder_test(encoder, '0x667ABBa73ABfCC9321516b10CBb486F29a855Ae8')
print encoder.decode('Able Thyrotoxic Mane and Simple Polysyllabic Catena Import Undeveloped Obsessed Antitrades with Navigable Migraine')
print encoder.decode('Aberdonian Marred Weston and Baggy Apicultural Average Camp Interactional Orange Gender with Intercollegiate Asparagus')
