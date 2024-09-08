const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const port = process.env.PORT
const {protect} = require('./middleware/authMiddleware')
var cors = require('cors')

const connectDB = require('./config/db') 
const userRoutes = require('./routes/userRoutes')
const quizRoute = require('./routes/quizRoute')
const scoreRoute = require('./routes/scoreRoute')
connectDB()
app.use(cors({
       origin: 'https://quiz-app-frontend-blush.vercel.app' // Allow requests from this specific origin
   }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/quiz',protect,quizRoute)
app.use('/user', userRoutes)
app.use('/score',protect,scoreRoute)
app.listen(port, () => { 
    console.log(`server started at ${port}`)
})
