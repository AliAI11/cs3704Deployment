# Fake News Detector

A Streamlit application to detect fake news using machine learning.

## Features

- Text analysis for fake news detection
- URL scraping and analysis
- History tracking of analyzed articles
- Simple and user-friendly interface

## Deployment on Streamlit Cloud

1. Push your code to a GitHub repository
2. Go to [Streamlit Cloud](https://streamlit.io/cloud)
3. Sign in with your GitHub account
4. Click "New app"
5. Select your repository and branch
6. Set the main file path to `streamlit_app.py`
7. Click "Deploy"

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run streamlit_app.py
```

## Structure

- `streamlit_app.py`: Main Streamlit application
- `Back-End/`: Contains ML models
- `requirements.txt`: Dependencies for the application

## Note

This application stores data in a local SQLite database (`articles.db`). When deploying to Streamlit Cloud, note that:

1. The database will be recreated if the application restarts
2. Database persistence is limited in the cloud environment
3. For production use, consider switching to a cloud database service

## Models

The application uses two model files:
- `Back-End/vectorizer.jb`: Text vectorization model
- `Back-End/lr_model.jb`: Classification model
