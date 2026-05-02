# Smart Election Assistant

A modern, full-stack application built with **Python Django** (Backend) and **Next.js React** (Frontend). 

## 🚀 How to Run the Project

You will need to open **two separate terminal windows** to run the frontend and backend simultaneously.

### 1. Start the Django Backend (Terminal 1)
Open your first terminal and navigate to the project root, then run:

```powershell
cd backend-django
.\venv\Scripts\activate
python manage.py runserver 8080
```
*(The backend runs on Port 8080 and handles all database queries and Chatbot AI logic).*

### 2. Start the Next.js Frontend (Terminal 2)
Open your second terminal and navigate to the project root, then run:

```powershell
cd frontend-v2
npm install    # (Only needed the first time)
npm run dev
```
*(The frontend runs on Port 3000 and provides the interactive map and UI).*

### 3. View the Application
Once both servers are running, open your browser and go to:
👉 **http://localhost:3000**

---

### 🛠️ Developer Notes
* **Database Reset:** If you ever need to reset the data or add new states, run `python seeder.py` inside the `backend-django` folder.
* **API Endpoints:** The Django API is available at `http://localhost:8080/api/` (e.g. `/states`, `/events`, `/chat`).
