# 🎯 Quiz App — MERN Stack

A fully-featured Quiz Application built using the **MERN stack** (MongoDB, Express.js, React.js & Node.js).  
Users can register/login, select quiz categories, attempt quizzes, and get their final score — with a clean and responsive UI.

---



## ✨ Features

- 🔐 Secure User Authentication (Login & Signup)
- 📚 Choose Quiz Category
- 🧠 Real Questions from Trivia API
- ⏱️ Timer-based Quiz
- 🏆 Leaderboard
- 🎯 Difficulty Selection
- 📱 Fully Responsive Design

---

## 🧩 Tech Stack

**Frontend:** React, React Router, Axios, TailwindCSS  , Zustand
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt

---

## 📌 Folder Structure

quiz-app/
 ├── backend/        # API + Auth + DB
 ├── frontend/       # React UI
 ├── README.md
 └── package.json

---

## 🛠️ Setup & Installation

### Clone Project
git clone https://github.com/animesh156/quiz-app.git
cd quiz-app

### Backend Setup
cd backend
npm install
Create .env file:
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret_key
PORT=5000
npm start

### Frontend Setup
cd ../frontend
npm install
npm start

---

## 🔗 API Routes

| Method | Route            | Description |
|--------|----------------|-------------|
| POST | /api/user/signup | Register user |
| POST | /api/user/login | Login + JWT |
| GET  | /api/quiz        | Fetch questions |
| GET  | /api/score       | Fetch User's Score |
| POST  | /api/score       | Add User's Score |
| GET  | /api/leaderboard        | Fetch top 10 scorers |

---

## 🧪 Future Enhancements

- Save quiz history
- Sound effects

---

⭐ If you like the project, please give it a star!
EOF





