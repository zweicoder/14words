# 14words

Human readable sentence as your Ethereum address.

## Encoding Methods
There are two encoding methods currently implemented. Both use a simple baseX encoding scheme implemented in `encoder/encoders.py`

#### SCOWL
`0x667ABBa73ABfCC9321516b10CBb486F29a855Ae8` => `Able Thyrotoxic Mane and Simple Polysyllabic Catena Import Undeveloped Obsessed Antitrades with Navigable Migraine`

Uses the dictionary list at [SCOWL](http://wordlist.aspell.net/). It attempts to achieve a pattern in the sentence, using `pattern = [adjs, adjs, nouns] +['and'] [adjs, adjs, nouns] + [verbs] + [adjs, adjs, nouns] + ['with'] + [adjs, nouns]`, taking up 14 words in total.

Admittedly the sentence generated doesn't make sense most of the time and the words appearing are quite uncommon English words.

#### BIP39
`0x667ABBa73ABfCC9321516b10CBb486F29a855Ae8` => `add pact jar inhale garment crane goddess fabric flat cream harbor hundred essence betray fringe`

This uses the [BIP39 English wordlist](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) which has 2047 words. 

The vocabulary used is much more commonly seen, and 11 bits for each word means using 15 (oh noes have to rename this repo) words to encode the address space. 