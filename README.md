# 🧠 Personality Prediction using Machine Learning (OCEAN Model)

A Full-Stack Web Application that predicts human personality traits based on the Big Five (OCEAN) psychological model. 

## 🚀 Features
* **Machine Learning Engine:** Utilizes K-Means Clustering to analyze 50 user inputs and predict distinct personality clusters.
* **Dynamic Scoring:** Calculates precise scores for Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
* **Data Visualization:** Generates real-time interactive Radar Charts using Chart.js.
* **PDF Reports:** Allows users to instantly download professional PDF summaries of their psychological profiles.
* **Secure Authentication:** JWT-based user login and registration system.
* **Admin Dashboard:** A secure master view for administrators to track all student/user test records.

## 🛠️ Tech Stack
* **Frontend:** React.js, React Router, Chart.js, HTML2Canvas, jsPDF
* **Backend:** Django, Django REST Framework (DRF), SimpleJWT
* **Machine Learning:** Scikit-Learn (K-Means), Pandas, NumPy, Joblib

* **Database:** SQLite (Development)

## ⚙️ How to Run Locally
1. **Clone the repository:** `https://github.com/nikhilchatse/Personality-Predictor-ML-Django-React`
2. **Start Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py runserver
