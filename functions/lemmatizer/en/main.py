import functions_framework
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import nltk
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

# Import the necessary NLTK resources
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')

# Initialize the lemmatizer
lemmatizer = WordNetLemmatizer()

# Convert NLTK POS tags to WordNet POS tags
def get_wordnet_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return wordnet.ADJ
    elif treebank_tag.startswith('V'):
        return wordnet.VERB
    elif treebank_tag.startswith('N'):
        return wordnet.NOUN
    elif treebank_tag.startswith('R'):
        return wordnet.ADV
    else:
        # If WordNet isn't found, default to a noun
        return wordnet.NOUN

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        text_data = json.loads(post_data.decode('utf-8'))
        text = text_data.get("text", "")

        # Tokenize and POS tagging
        tokens = word_tokenize(text)
        tagged_tokens = pos_tag(tokens)

        tokens_with_tags = []
        for word, tag in tagged_tokens:
            wn_tag = get_wordnet_pos(tag)
            lemma = lemmatizer.lemmatize(word, wn_tag).lower()
            # NOTE: if Lemma is less than 2 characters, the word seems not necessary to save
            if len(lemma) > 2:
                tokens_with_tags.append({"token": word, "POS": tag, "lemma": lemma, "lemma_POS": wn_tag})

        # Send Response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {
            "original": text,
            "tokens_with_POS": tokens_with_tags
        }
        self.wfile.write(json.dumps(response).encode('utf-8'))

@functions_framework.http
def process_text(request):
    if request.method == 'POST':
        data = request.get_json()
        text = data.get("text", "")
        if text:
            # Tokenize and POS tagging
            tokens = word_tokenize(text)
            tagged_tokens = pos_tag(tokens)

            tokens_with_tags = []
            for word, tag in tagged_tokens:
                wn_tag = get_wordnet_pos(tag)
                lemma = lemmatizer.lemmatize(word, wn_tag).lower()
                if len(lemma) > 2:  # lemmaが2文字より長い場合のみ追加
                    tokens_with_tags.append({"token": word, "POS": tag, "lemma": lemma, "lemma_POS": wn_tag})

            response = {
                "original": text,
                "tokens_with_POS": tokens_with_tags
            }
            return json.dumps(response)
    return 'No text provided'
