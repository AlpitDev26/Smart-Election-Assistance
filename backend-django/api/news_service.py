import os
import requests
from datetime import datetime, timedelta

def fetch_election_news():
    api_key = os.getenv("NEWS_API_KEY")
    if not api_key or api_key == "your_newsapi_key_here":
        return None

    # Targeted query for Indian elections and politics from the last 7 days
    from_date = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
    query = '("India Election" OR "Lok Sabha" OR "Election Commission of India" OR "Indian Politics") AND (election OR voting OR candidate)'
    url = f"https://newsapi.org/v2/everything?q={query}&from={from_date}&sortBy=publishedAt&language=en&apiKey={api_key}"

    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            articles = response.json().get('articles', [])
            news_items = []
            for art in articles[:10]: # Limit to top 10
                news_items.append({
                    "title": art.get('title'),
                    "description": art.get('description'),
                    "eventType": "Live",
                    "date": art.get('publishedAt')[:10], # YYYY-MM-DD
                    "url": art.get('url'),
                    "image": art.get('urlToImage')
                })
            return news_items
    except Exception as e:
        print(f"News API Error: {e}")
    
    return None
