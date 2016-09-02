word_directory = 'words/'

def get_words(filename, seen={}):
    with open(filename) as f:
        lst = []
        for word in f:
            word = word.strip().lower()
            if word not in seen:
                lst.append(word)
                seen[word] = True
        return lst


def scowl_vocab():
    seen = {} # pass in dictionary with outside scope to check for duplicates across these 3 files
    return [get_words(word_directory + f, seen) for f in ['verb', 'adj', 'noun']]


def bip39_vocab():
    return get_words(word_directory + 'bip39')