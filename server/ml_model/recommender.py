import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import os
import pandas as pd
import sys
import json

# Setup base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load TF-IDF vectorizer
with open(os.path.join(BASE_DIR, "tfidf_vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)

# Load saved job embeddings
with open(os.path.join(BASE_DIR, "job_embeddings.pkl"), "rb") as f:
    job_embeddings = pickle.load(f)

# Load job dataset
job_df = pd.read_csv("C:\\Users\\Keethika P\\job-recommendation-system\\data\\jobs_dataset.csv")

def recommend_jobs(resume_text, top_n=5):
    resume_vector = vectorizer.transform([resume_text])
    similarities = cosine_similarity(resume_vector, job_embeddings).flatten()
    top_indices = np.argsort(similarities)[::-1][:top_n]
    recommendations = job_df.iloc[top_indices].copy()
    recommendations["similarity_score"] = similarities[top_indices]
    return recommendations

if __name__ == "__main__":
    resume_text = sys.stdin.read()  # 🔄 Read from stdin instead of argv

    if resume_text.strip():
        recommendations = recommend_jobs(resume_text)
        print(json.dumps(recommendations[["Job Title", "Company", "similarity_score"]].to_dict(orient="records")))
    else:
        print(json.dumps({"error": "No resume text provided."}))
