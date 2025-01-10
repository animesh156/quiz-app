import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";


import { IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";

function Header() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  

  const { user } = useSelector((state) => state.auth);

  const avatar = user?.avatar || "/default-avatar.png"; // Use a default avatar if none is provided


  const handleClick = () => setClick(!click);

  // Conditionally render navbar content based on user authentication
  if (!user) return <></>;  // Don't render navbar if user is not logged in

  return (
    <nav className="navbar bg-zinc-200  dark:bg-neutral-800">
      <div className="nav-container">
        <div className="nav-logo">
          <button
           onClick={() => navigate('/profile')}
           
          >
             <img src={avatar}  alt="avatar_img" className="w-11" />
          </button>

         
        </div>

        <ul
          className={`${
            click ? "nav-menu active" : "nav-menu "
          } dark:bg-neutral-800 dark:text-yellow-300 bg-zinc-200 font-bold text-red-500`}
        >
          <li className="nav-item">
            <NavLink
              exact
              to="/dashboard"
              activeClassName="active"
              className="nav-links dark:text-white"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/leaderboard"
              activeClassName="active"
              className="nav-links dark:text-white"
              onClick={handleClick}
            >
              LeaderBoard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/profile"
              activeClassName="active"
              className="nav-links dark:text-white"
              onClick={handleClick}
            >
             Profile
            </NavLink>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <IoClose size={28} />
            </span>
          ) : (
            <span className="icon">
              <BsList size={28} />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;