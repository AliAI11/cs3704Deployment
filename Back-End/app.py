import streamlit as st
import joblib
import re
import string
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db, Article
import os

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///articles.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

vectorizer = joblib.load("vectorizer.jb")
model = joblib.load("lr_model.jb")

def clean_text(text):
    text = text.lower()
    text = re.sub(r'\[.*?]', "", text)
    text = re.sub(r"\W", " ", text)
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"<.*?>+", "", text)
    text = re.sub(r"[%s]" % re.escape(string.punctuation), "", text)
    text = re.sub(r"\n", "", text)
    text = re.sub(r"\w*\d\w*", "", text)
    return text

def predict_news(text):
    cleaned_text = clean_text(text)
    vectorized_text = vectorizer.transform([cleaned_text])
    prediction = model.predict(vectorized_text)[0]
    return "Real" if prediction == 0 else "Fake"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    article_text = data.get('articleText', '')
    prediction = predict_news(article_text)
    return jsonify({'result': prediction})

@app.route('/link', methods=['POST'])
def extract_text_from_link():
    data = request.get_json()
    url = data.get('link', '')
    
    try:
        # Get the webpage content
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract title
        title = soup.title.string if soup.title else url
        
        # Extract main content - this is a basic implementation
        # You might want to customize this based on the websites you're targeting
        main_content = soup.find('article') or soup.find('main') or soup.find('div', class_='content')
        if main_content:
            text = main_content.get_text(separator=' ', strip=True)
        else:
            # Fallback to body text if no specific content area is found
            text = soup.body.get_text(separator=' ', strip=True) if soup.body else ''
        
        # Clean up the text
        text = clean_text(text)
        
        return jsonify({
            'output': text,
            'title': title
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'output': '',
            'title': url
        })

@app.route('/store_article', methods=['POST'])
def store_article():
    data = request.get_json()
    
    new_article = Article(
        title=data.get('title', 'Untitled'),
        content=data.get('content', ''),
        prediction=data.get('prediction', 'Unknown'),
        source_type=data.get('source_type', 'text'),
        source_value=data.get('source_value', '')
    )
    
    db.session.add(new_article)
    db.session.commit()
    
    return jsonify({'message': 'Article stored successfully', 'id': new_article.id})

@app.route('/get_articles', methods=['GET'])
def get_articles():
    articles = Article.query.order_by(Article.analysis_date.desc()).all()
    return jsonify([article.to_dict() for article in articles])

@app.route('/scrape_and_store', methods=['POST'])
def scrape_and_store():
    data = request.get_json()
    url = data.get('link', '')
    
    try:
        # Get the webpage content
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract title
        title = soup.title.string if soup.title else url
        
        # Extract main content
        main_content = soup.find('article') or soup.find('main') or soup.find('div', class_='content')
        if main_content:
            text = main_content.get_text(separator=' ', strip=True)
        else:
            # Fallback to body text if no specific content area is found
            text = soup.body.get_text(separator=' ', strip=True) if soup.body else ''
        
        # Clean up the text
        cleaned_text = clean_text(text)
        
        # Make prediction
        prediction = predict_news(cleaned_text)
        
        # Store in database
        new_article = Article(
            title=title,
            content=text,  # Store the original text, not the cleaned version
            prediction=prediction,
            source_type='link',
            source_value=url
        )
        
        db.session.add(new_article)
        db.session.commit()
        
        return jsonify({
            'message': 'Article scraped and stored successfully',
            'id': new_article.id,
            'title': title,
            'content': text,
            'prediction': prediction
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Failed to scrape and store article'
        })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)