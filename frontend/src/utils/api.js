import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // for development

  withCredentials: true,
});

export default API;
