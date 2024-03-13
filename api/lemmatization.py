from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import nltk
from nltk.tokenize import word_tokenize
from nltk import pos_tag

# Import the necessary NLTK resources *Note: You only need to do this once
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        text_data = json.loads(post_data.decode('utf-8'))
        text = text_data.get("text", "")

        # Tokenize and POS tagging
        tokens = word_tokenize(text)
        tagged_tokens = pos_tag(tokens)

        # Create a list of dictionaries for each token with its corresponding POS tag
        tokens_with_tags = [{"token": word, "POS": tag} for word, tag in tagged_tokens]

        # Send Response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {
            "original": text,
            "tokens_with_POS": tokens_with_tags
        }
        self.wfile.write(json.dumps(response).encode('utf-8'))
