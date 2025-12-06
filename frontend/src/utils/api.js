import axios from "axios";

const API = axios.create({
  baseURL: "https://quiz-app-gkz4.onrender.com/api",

  withCredentials: true,
});

export default API;
