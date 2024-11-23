import  { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);


  if(!user) return <></>

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
           <img src="/default.png"  alt="avatar_img" className="w-11" />
          </div>
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Full Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to='/' className="hover:bg-blue-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link to='/leaderboard' className="hover:bg-blue-700 px-3 py-2 rounded">
             LeaderBoard
            </Link>
            <Link to='/profile' className="hover:bg-blue-700 px-3 py-2 rounded">
             Profile
            </Link>
           
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600">
          <Link to='/' className="block px-4 py-2 hover:bg-blue-700">
            Home
          </Link>
          <Link to='/leaderboard' className="block px-4 py-2 hover:bg-blue-700">
            Leaderboard
          </Link>
          <Link to='/profile' className="block px-4 py-2 hover:bg-blue-700">
            Profile
          </Link>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;