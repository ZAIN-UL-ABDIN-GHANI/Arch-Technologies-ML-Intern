# model/train_model.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import joblib
import os

# 1. Load data
df = pd.read_csv('../data/emails_dataset.csv')

# 2. Prepare features & labels
X = df['Subject'].fillna('') + ' ' + df['Message'].fillna('')
y = (df['Spam/Ham'] == 'spam').astype(int)

# 3. Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. Vectorize
vectorizer = TfidfVectorizer(stop_words='english', max_features=5_000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec  = vectorizer.transform(X_test)

# 5. Train model
clf = LogisticRegression(max_iter=1_000)
clf.fit(X_train_vec, y_train)

# 6. Evaluate
print("Train accuracy:", clf.score(X_train_vec, y_train))
print("Test  accuracy:", clf.score(X_test_vec, y_test))

# 7. Ensure output directory exists
os.makedirs('model', exist_ok=True)

# 8. Save artifacts
joblib.dump(vectorizer, 'model/spam_vectorizer.joblib')
joblib.dump(clf,       'model/spam_model.joblib')
print("Saved vectorizer → model/spam_vectorizer.joblib")
print("Saved model       → model/spam_model.joblib")
