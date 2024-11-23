import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeaderBoard from "./pages/LeaderBoard"
import Home from "./pages/Home";

import Profile from './pages/Profile'

import Quiz from "./pages/Quiz";



function App() {

  
 
  return (
    <>
      <Router>
     
          <Navbar />
          <Routes>
          <Route path="/" element={<Home  />} />
            <Route path="/dashboard" element={<Dashboard  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz  />} />
            <Route path="/leaderBoard" element={<LeaderBoard  />} />
            <Route path="/profile" element={<Profile  />} />
          </Routes>
      
      </Router>
    </>
  );
}

export default App;
