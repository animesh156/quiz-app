import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";

function Header() {
  const [click, setClick] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const avatar = localStorage.getItem("avatar") || "/default-avatar.png"; // Use a default avatar if none is provided

  const handleClick = () => setClick(!click);

  // Conditionally render navbar content based on user authentication
  if (!isAuthenticated) return <></>; // Don't render navbar if user is not logged in

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <button onClick={() => navigate("/profile")}>
            <img src={avatar} alt="avatar_img" className="w-11" />
          </button>
        </div>

        <ul
          className={`${
            click ? "nav-menu active" : "nav-menu "
          }  dark:text-yellow-300  font-bold text-red-500`}
        >
          <li className="nav-item">
            <NavLink
              exact
              to="/dashboard"
              activeClassName="active"
              className="nav-links text-base text-white"
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
              className="nav-links text-base text-white"
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
              className="nav-links text-base text-white"
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
