import streamlit as st
import joblib
import re
import string
import requests
from bs4 import BeautifulSoup
import os
import pandas as pd
from datetime import datetime
import json
import time

# Set page title and layout
st.set_page_config(page_title="Fake News Detector", layout="wide")

# Session state database setup (replacing SQLite)
if 'articles' not in st.session_state:
    st.session_state.articles = []
    st.session_state.article_id_counter = 1

# Database operations using session state
def store_article(title, content, prediction, source_type, source_value):
    article_id = st.session_state.article_id_counter
    st.session_state.article_id_counter += 1
    
    article = {
        'id': article_id,
        'title': title,
        'content': content,
        'prediction': prediction,
        'analysis_date': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'source_type': source_type,
        'source_value': source_value
    }
    
    st.session_state.articles.append(article)
    return article_id

def get_articles():
    articles = []
    for article in st.session_state.articles:
        # Create a preview of the content
        content_preview = article['content'][:500] + '...' if len(article['content']) > 500 else article['content']
        
        articles.append({
            'id': article['id'],
            'title': article['title'],
            'content': content_preview,
            'prediction': article['prediction'],
            'analysis_date': article['analysis_date'],
            'source_type': article['source_type'],
            'source_value': article['source_value']
        })
    return articles

# Load models from the Back-End directory
@st.cache_resource
def load_models():
    try:
        vectorizer = joblib.load("Back-End/vectorizer.jb")
        model = joblib.load("Back-End/lr_model.jb")
        return vectorizer, model
    except Exception as e:
        st.error(f"Error loading models: {str(e)}")
        return None, None

# Try to load models
vectorizer, model = load_models()
models_loaded = vectorizer is not None and model is not None

# Functions from the original app
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

def extract_text_from_link(url):
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
        
        return {
            'success': True,
            'output': text,
            'title': title
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'output': '',
            'title': url
        }

# Streamlit UI
st.title("Fake News Detector")
st.markdown("### Analyze news articles and detect fake news")

# Create tabs for different functionalities
tab1, tab2, tab3 = st.tabs(["Text Analysis", "URL Analysis", "History"])

with tab1:
    st.header("Text Analysis")
    article_text = st.text_area("Paste article text here:", height=300)
    article_title = st.text_input("Article title (optional):")
    
    if st.button("Analyze Text"):
        if article_text and models_loaded:
            with st.spinner("Analyzing..."):
                prediction = predict_news(article_text)
                
                # Use the first 50 chars as title if not provided
                if not article_title:
                    article_title = article_text[:50] + "..." if len(article_text) > 50 else article_text
                
                # Store in database
                article_id = store_article(
                    title=article_title,
                    content=article_text,
                    prediction=prediction,
                    source_type="text",
                    source_value="user_input"
                )
                
                if prediction == "Real":
                    st.success("This article appears to be REAL news.")
                else:
                    st.error("This article appears to be FAKE news.")
                
                st.subheader("Analysis Details")
                st.write(f"Prediction: {prediction}")
                st.write(f"Text length: {len(article_text)} characters")
                st.write(f"Saved to history (ID: {article_id})")
        elif not models_loaded:
            st.error("Models failed to load. Cannot perform analysis.")
        else:
            st.warning("Please enter some text to analyze.")

with tab2:
    st.header("URL Analysis")
    article_url = st.text_input("Enter article URL:")
    
    if st.button("Analyze URL"):
        if article_url and models_loaded:
            with st.spinner("Fetching article content..."):
                result = extract_text_from_link(article_url)
                
                if result['success']:
                    st.info(f"Title: {result['title']}")
                    
                    extracted_text = result['output']
                    if len(extracted_text) > 300:
                        st.text_area("Extracted content (preview):", extracted_text[:300] + "...", height=100)
                    else:
                        st.text_area("Extracted content:", extracted_text, height=100)
                    
                    prediction = predict_news(extracted_text)
                    
                    # Store in database
                    article_id = store_article(
                        title=result['title'],
                        content=extracted_text,
                        prediction=prediction,
                        source_type="link",
                        source_value=article_url
                    )
                    
                    if prediction == "Real":
                        st.success("This article appears to be REAL news.")
                    else:
                        st.error("This article appears to be FAKE news.")
                    
                    st.subheader("Analysis Details")
                    st.write(f"Prediction: {prediction}")
                    st.write(f"Source: {article_url}")
                    st.write(f"Saved to history (ID: {article_id})")
                else:
                    st.error(f"Failed to extract content: {result.get('error', 'Unknown error')}")
        elif not models_loaded:
            st.error("Models failed to load. Cannot perform analysis.")
        else:
            st.warning("Please enter a URL to analyze.")

with tab3:
    st.header("Analysis History")
    if st.button("Refresh History"):
        pass  # This will trigger a rerun that refreshes the data

    articles = get_articles()
    
    if not articles:
        st.info("No articles have been analyzed yet.")
    else:
        for article in articles:
            with st.expander(f"{article['title']} - {article['prediction']} ({article['analysis_date']})"):
                st.write(f"**Source**: {article['source_type']} - {article['source_value']}")
                st.write(f"**Prediction**: {article['prediction']}")
                st.text_area("Content", article['content'], height=100)

# Footer
st.markdown("---")
st.markdown("Fake News Detector - Analyze articles for potential misinformation")
