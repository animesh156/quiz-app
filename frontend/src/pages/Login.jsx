import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import API from "../utils/api";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const loginResponse = await API.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (loginResponse.status === 200) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("avatar", loginResponse.data.avatar);
        localStorage.setItem("userName", loginResponse.data.name); 
        localStorage.setItem("userId", loginResponse.data._id); 

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Login failed. Please try again.", {
          position: "top-center",
          autoClose: 4000,
        });
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 4000,
      });
      console.error("Login error:", err);
    }
  };

  return (
    <div
      className="h-screen  bg-cover bg-center flex items-center justify-center log"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <ToastContainer />

      <section className=" mx-auto  border border-gray-300 shadow-md backdrop-blur-sm  md:w-96  w-64 px-4 py-4 text-center  rounded-3xl">
        <form onSubmit={onSubmit} className="py-5 mt-6">
          <div>
            <input
              type="email"
              className="py-2.5 px-3 border-2 border-gray-400  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-xl md:w-80    caret-yellow-500 text-rose-500 mb-8"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="password"
              className="py-2.5 px-3 border-2 border-gray-400 rounded-xl focus:outline-none focus:ring-2 md:w-80 focus:ring-gray-500  caret-rose-500 text-rose-500 mb-8"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600  md:w-40 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          </div>

          <div className="mt-4">
            <p className="font-medium  text-1xl">
              New User ?{" "}
              <button
               onClick={() => navigate('/register')}
                className="text-red-500 font-extrabold hover:text-red-700 "
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
