import axios from 'axios';

const getToken = () => {
  const user = localStorage.getItem('user');  // Retrieve the user object from localStorage
  if (user) {
    const parsedUser = JSON.parse(user);      // Parse the JSON string back into an object
    return parsedUser.token;                  // Access the token from the parsed object
  }
  return null;  // Return null if there's no user data
};



const token = getToken()
       
export const fetchQuizQuestions = async () => {
 
const type = localStorage.getItem('type')
const amount = localStorage.getItem('total')
const diff = localStorage.getItem('diff')
const catg = localStorage.getItem('catg')
  try {
    const response = await axios.get(`https://quiz-app-backend-black.vercel.app/quiz?amount=${JSON.parse(amount)}&category=${JSON.parse(catg)}&difficulty=${diff}&type=${type}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
   
    return response.data.results;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
};
