
# 🎯 Quizzy

A fully-featured Quiz Application built using the MERN stack (MongoDB, Express.js, React.js & Node.js).
Users can register/login, select quiz categories, attempt quizzes, and get their final score — with a clean and responsive UI.


## 🚀 Features

- 🔐 Secure User Authentication (Login & Signup)
- 📚 Choose Quiz Category
- 🧠 Real Questions from Trivia API
- ⏱️ Timer-based Quiz
- 🏆 Leaderboard
- 🎯 Difficulty Selection
- 📱 Fully Responsive Design


<img width="1366" height="641" alt="Screenshot (231)" src="https://github.com/user-attachments/assets/0e179c08-203d-4cbb-94ed-08b00d012643" />
<img width="1366" height="678" alt="Screenshot (285)" src="https://github.com/user-attachments/assets/7a30ff1d-8c9e-40a1-8f0f-e87eb25a3649" />
<img width="1366" height="670" alt="Screenshot (286)" src="https://github.com/user-attachments/assets/4c5bc130-e87f-408a-a48b-6b90d7e141f5" />
<img width="1366" height="628" alt="Screenshot (232)" src="https://github.com/user-attachments/assets/ea229f69-b75d-40f6-b5d6-94d16ddba7c8" />






## Tech Stack

**Frontend:** React, React Router, Axios, TailwindCSS , Zustand 

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt





## 📦 Installation & Setup

1. Clone the Repository

```bash
 git clone https://github.com/animesh156/quiz-app.git
 cd quiz-app
```

2. Backend Setup

```bash
 cd backend
 npm install
 Create .env file: 
    MONGO_URI=your_mongo_url
    JWT_SECRET=your_secret_key
    PORT=5000
 npm start
```

3. Frontend  Setup

```bash
 cd backend
 npm install
 npm start
```
    
## API Reference


#### Register user

```http
  POST /api/user/signup	
```

#### Login + JWT

```http
  POST /api/user/login
```

#### Fetch questions

```http
  GET /api/quiz
```

#### Fetch User's Score

```http
  GET /api/score
```

#### Add User's Score

```http
  POST /api/score
```

#### Fetch top 10 scorers

```http
  GET /api/leaderboard
```

## 🧪 Future Enhancements

- Save quiz history
- Sound effects

---



