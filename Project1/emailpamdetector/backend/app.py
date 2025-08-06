from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
vectorizer = joblib.load("model/spam_vectorizer.joblib")
model = joblib.load("model/spam_model.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json or {}
    
    # Expecting 'subject' and 'message' from frontend
    subject = data.get('subject', '')
    message = data.get('message', '')
    text = f"{subject} {message}".strip()

    if not text:
        return jsonify({"error": "Empty input"}), 400

    # Vectorize and predict
    X = vectorizer.transform([text])
    prediction = model.predict(X)[0]

    return jsonify({
        "prediction": "SPAM" if prediction == 1 else "HAM"
    })

if __name__ == "__main__":
    app.run(debug=True)
