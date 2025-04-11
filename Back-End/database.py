from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    prediction = db.Column(db.String(50), nullable=False)
    analysis_date = db.Column(db.DateTime, default=datetime.utcnow)
    source_type = db.Column(db.String(20), nullable=False)  # 'file', 'link', or 'text'
    source_value = db.Column(db.String(500))  # file path, URL, or 'user_input'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content[:500] + '...' if len(self.content) > 500 else self.content,  # Preview only
            'prediction': self.prediction,
            'analysis_date': self.analysis_date.strftime('%Y-%m-%d %H:%M:%S'),
            'source_type': self.source_type,
            'source_value': self.source_value
        } 