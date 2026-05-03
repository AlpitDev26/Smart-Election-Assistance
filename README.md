# 🗳️ Smart Election Assistant (India)

A premium, AI-powered election intelligence platform designed to provide real-time data, political insights, and interactive visualization for Indian elections. This project migrated from a legacy Java Spring Boot architecture to a high-performance **Django REST API** backend and a modern **Next.js 14** frontend.

---

## 🌟 Key Features

### 1. 🗺️ National Interactive Explorer
- **State-Level Intelligence:** A high-fidelity interactive map of India built with Leaflet and GeoJSON.
- **Dynamic Stats:** Click any state to reveal deep-dive statistics including Lok Sabha/Vidhan Sabha seats, current Chief Ministers, and party influence.
- **Visual Feedback:** Glassmorphism-inspired UI with smooth state transitions and highlighting.

### 2. 🤖 AI Election Assistant (Gemini 1.5 Flash)
- **Specialized LLM:** Integrated with Google Gemini AI, strictly constrained to Indian politics and election domain.
- **Knowledge Fusion:** Combines real-time LLM inference with local database intelligence (SQL) for highly accurate state data.
- **Scoped Intelligence:** Automatically filters out non-political queries to maintain professional focus.

### 3. 📰 Live Election News Feed
- **Real-time Integration:** Powered by NewsAPI.org with custom boolean search logic for maximum relevance.
- **Smart Filtering:** Automatically targets "India Election", "Lok Sabha", and "Election Commission" updates.
- **Rich Media:** Features live article images, headlines, and one-click access to original sources.

---

## 🛠️ Technology Stack

### **Backend (Django REST Framework)**
- **Language:** Python 3.11+
- **Database:** SQLite (Development) / PostgreSQL compatible
- **AI Integration:** Google Generative AI (Gemini SDK)
- **API Security:** Environment-based secret management (`python-dotenv`)
- **Intelligence:** Custom `seeder.py` for comprehensive Indian state data.

### **Frontend (Next.js)**
- **Framework:** Next.js 14 (App Router)
- **Styling:** Vanilla CSS with modern Design Tokens (Rich Aesthetics)
- **Map:** React-Leaflet with custom GeoJSON layers.
- **Animations:** Framer Motion for premium micro-interactions.
- **Icons:** Lucide-React.

---

## 🚀 Installation & Setup

### **1. Prerequisites**
- Python installed
- Node.js installed

### **2. Backend Setup (Terminal 1)**
```powershell
cd backend-django
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python seeder.py           # Populates all Indian state data
python manage.py runserver 8080
```

### **3. Frontend Setup (Terminal 2)**
```powershell
cd frontend-v2
npm install
npm run dev
```

### **4. Environment Variables**
Create a `.env` file in `backend-django/`:
```text
GEMINI_API_KEY=your_google_ai_studio_key
NEWS_API_KEY=your_newsapi_org_key
```

---

## 📂 Project Structure

```text
SmartElectionAssistant/
├── backend-django/          # Django REST API Hub
│   ├── api/                 # Core logic, Views, and News Service
│   ├── election_backend/    # Settings and Routing
│   ├── seeder.py            # Indian State Intelligence Seeder
│   └── .env                 # Secrets (AI & News Keys)
├── frontend-v2/             # Next.js UI layer
│   ├── src/
│   │   ├── components/      # Map, EventFeed, StatePanel
│   │   └── lib/             # API Client logic
│   └── public/data/         # Local GeoJSON & Assets
└── README.md                # Project Documentation
```

---

## 🔐 Security & Best Practices
- **.gitignore:** Configured to exclude `venv/`, `node_modules/`, `.env`, and `db.sqlite3`.
- **API Scope:** Gemini prompt engineering includes a "Critical Rule" layer to prevent off-topic AI responses.
- **Caching:** News results are filtered at the service level to optimize API quota usage.

---

## 👨‍💻 Developed By
**Alpit Dev** | *Crafting Intelligent Solutions for India's Democracy*
