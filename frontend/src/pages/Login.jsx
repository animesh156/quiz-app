import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API from "../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-4">
      <ToastContainer />

      <section className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Welcome Back 👋
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 text-white placeholder-gray-400 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 text-white placeholder-gray-400 outline-none transition"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-200"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-white mt-6">
          New User?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-bold text-yellow-300 hover:text-yellow-400 transition"
          >
            Sign Up
          </button>
        </p>
      </section>
    </div>
  );
}

export default Login;
