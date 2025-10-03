import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [showAvatars, setShowAvatars] = useState(false); // Toggle for avatar selection

  const { name, email, password, avatar } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const selectAvatar = (avatar) => {
    setFormData((prevState) => ({ ...prevState, avatar })); // Update selected avatar
    setShowAvatars(false); // Hide the avatar selection
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name,
        email,
        password,
        avatar,
      };

      const response = await API.post("/user/register", userData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("registered successfully", {
          position: "top-center",
          autoClose: 3000,
        });

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("avatar", response.data.avatar);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userId", response.data._id);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Email is already registered", {
          position: "top-center",
          autoClose: 4000,
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 4000,
        });
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center px-4">
      <ToastContainer />

      <section className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Create Account ✨
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name */}
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 text-white placeholder-gray-400 outline-none transition"
          />

          {/* Email */}
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 text-white placeholder-gray-400 outline-none transition"
          />

          {/* Password */}
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-300 text-white placeholder-gray-400 outline-none transition pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Avatar selection */}
          <div>
            <button
              type="button"
              onClick={() => setShowAvatars(!showAvatars)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-lime-400 to-green-500 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-200"
            >
              {avatar ? `Selected Avatar: ${avatar}` : "Choose Avatar"}
            </button>

            {showAvatars && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {[
                  "avatar1.png",
                  "avatar2.png",
                  "avatar3.png",
                  "avatar4.png",
                ].map((img) => (
                  <div
                    key={img}
                    className={`cursor-pointer border-2 rounded-lg p-1 hover:scale-110 transition ${
                      avatar === img ? "border-blue-500" : "border-gray-400"
                    }`}
                    onClick={() => selectAvatar(img)}
                  >
                    <img
                      src={`/${img}`} // ensure in public/ folder
                      alt={img}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Signup button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Login redirect */}
        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-bold text-yellow-300 hover:text-yellow-400 transition"
          >
            Log In
          </button>
        </p>
      </section>
    </div>
  );
}

export default Register;
