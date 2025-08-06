#  ZYN Email Spam Detector

A **powerful**, **real-time** email spam detection system built with **React frontend** and **Flask backend**, utilizing **machine learning algorithms** for accurate spam classification. This project provides an intuitive web interface for analyzing email content and identifying potential spam messages.


## 🚀 Features

### ✅ Frontend (React)
* **Interactive UI** with real-time email content analysis
* **Input validation** ensuring minimum content requirements (100+ characters, 15+ words)
* **Beautiful animations** with loading states and smooth transitions
* **Result visualization** with color-coded spam/legitimate indicators
* **Responsive design** optimized for all device sizes
* **Error handling** with user-friendly messages

### ✅ Backend (Flask)
* **RESTful API** for spam detection predictions
* **Machine Learning integration** using trained Naive Bayes model
* **Text preprocessing** with TF-IDF vectorization
* **CORS support** for cross-origin requests
* **JSON response format** for seamless frontend integration

### ✅ ML Model
* **Multinomial Naive Bayes** classifier for text classification
* **TF-IDF vectorization** for feature extraction
* **Text preprocessing** including stopword removal and stemming
* **Model persistence** using joblib for deployment


## 🧠 Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React.js + Tailwind CSS | User Interface & Styling |
| **Backend** | Flask + Flask-CORS | API Server & Cross-origin Support |
| **ML Framework** | scikit-learn | Machine Learning Models |
| **Text Processing** | NLTK | Natural Language Processing |
| **Model Storage** | joblib | Model Serialization |
| **Vectorization** | TF-IDF | Text Feature Extraction |
| **Icons** | Lucide React | UI Icons & Indicators |



## 📁 Project Structure


spam-detector/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── SpamDetector.jsx    # Main React component
│   │   ├── App.jsx                 # App wrapper
│   │   └── main.jsx               # Entry point
│   └── package.json
│
├── backend/
│   ├── app.py                     # Flask API server
│   ├── train_model.py             # Model training script
│   ├── predict.py                 # Standalone prediction script
│   ├── spam_model.joblib          # Trained ML model
│   ├── tfidf_vectorizer.joblib    # TF-IDF vectorizer
│   └── requirements.txt
│
└── data/
    └── spam.csv                   # Training dataset


## 🎯 How to Run the Project

### 1. **Backend Setup**

cd backend
pip install -r requirements.txt
python train_model.py  # Train the model (if not already trained)
python app.py          # Start Flask server on localhost:5000


### 2. **Frontend Setup**

cd frontend
npm install
npm run dev           # Start React development server


### 3. **Access the Application**
Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).


## 🔧 API Endpoints

### POST `/predict`
**Description**: Analyzes email content for spam detection

**Request Body**:
json
{
  "text": "Your email content here..."
}


**Response**:
  json
{
  "label": "spam" | "not_spam"
}


## 🎨 Key Components

### **SpamDetector.jsx**
- Main React component handling user interface
- Form validation and input management
- API communication with Flask backend
- Result display with visual indicators

### **app.py**
- Flask server with CORS configuration
- ML model loading and prediction endpoint
- JSON request/response handling

### **train_model.py**
- Data preprocessing and cleaning
- TF-IDF vectorization setup
- Naive Bayes model training
- Model evaluation and persistence



## 📊 Model Performance

The spam detection model uses:
- **Multinomial Naive Bayes** classifier
- **TF-IDF vectorization** for text features
- **Text preprocessing** including:
  - URL removal
  - Non-alphabetic character filtering
  - Lowercase conversion
  - Stopword removal
  - Stemming with Porter Stemmer


## 🛠️ Input Requirements

- **Minimum 100 characters** of email content
- **At least 15 words** for accurate analysis
- **Complete email text** including headers (optional) and body
- **Plain text format** recommended



## 🔒 Security Features

- **Client-side validation** prevents malformed requests
- **Server-side error handling** with appropriate HTTP status codes
- **Input sanitization** through text preprocessing
- **No data persistence** - content is not stored after analysis


## 📱 Responsive Design

- **Mobile-optimized** interface with touch-friendly buttons
- **Tablet-responsive** layout with proper spacing
- **Desktop-enhanced** experience with hover effects
- **Cross-browser compatibility** tested on major browsers



## 🚦 Error Handling

- **Connection errors** with backend service guidance
- **Validation errors** with specific user feedback
- **API errors** with graceful fallback messages
- **Loading states** with progress indicators



## 👤 Author

**Zain ul Abdin Ghani**
- Machine Learning Engineer & Full-Stack Developer


---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

