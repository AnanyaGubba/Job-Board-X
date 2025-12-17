from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    data = request.get_json()
    user_skills = data["user_skills"]
    jobs = data["jobs"]

    docs = [user_skills] + [job["skills_required"] for job in jobs]
    tfidf = TfidfVectorizer().fit_transform(docs)

    similarities = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()
    job_ids = [job["id"] for job in jobs]

    ranked = sorted(zip(job_ids, similarities), key=lambda x: x[1], reverse=True)[:3]
    return jsonify([j for j, _ in ranked])

if __name__ == "__main__":
    app.run(port=5004)
