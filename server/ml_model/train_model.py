# ml_model/train_model.py
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Step 1: Load job dataset
df = pd.read_csv("data/jobs_dataset.csv")

# Step 2: Combine relevant text fields for NLP
df['combined_text'] = df[['Job Title', 'skills', 'Job Description']].fillna('').agg(' '.join, axis=1)

# Step 3: Apply TF-IDF vectorization
vectorizer = TfidfVectorizer(stop_words='english')
job_vectors = vectorizer.fit_transform(df['combined_text'])

# Step 4: Save the TF-IDF vectorizer and job embeddings
with open("ml_model/tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

with open("ml_model/job_embeddings.pkl", "wb") as f:
    pickle.dump(job_vectors, f)

print("Model training complete. TF-IDF and job embeddings saved!")
