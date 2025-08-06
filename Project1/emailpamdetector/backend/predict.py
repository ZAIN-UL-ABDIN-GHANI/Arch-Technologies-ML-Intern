from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load vectorizer and model once
with open('spam_vectorizer.pkl', 'rb') as vf:
    vectorizer = pickle.load(vf)

with open('spam_classifier.pkl', 'rb') as mf:
    model = pickle.load(mf)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        subject = data.get('subject', '')
        message = data.get('message', '')

        if not subject and not message:
            return jsonify({'error': 'Subject or message required'}), 400

        full_text = subject + ' ' + message
        vector = vectorizer.transform([full_text])
        prediction = model.predict(vector)[0]

        label = 'spam' if prediction == 1 else 'ham'
        return jsonify({'label': label})  # Frontend expects `label`

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
