word_directory = 'words/'


def get_words(filename):
    with open(filename) as f:
        seen = {}
        lst = []
        for word in f:
            word = word.strip().lower()
            if word not in seen:
                lst.append(word)
                seen[word] = True
        return lst


def scowl_vocab():
    return [get_words(word_directory + f) for f in ['verb', 'adj', 'noun']]


def bip39_vocab():
    return get_words(word_directory + 'bip39')