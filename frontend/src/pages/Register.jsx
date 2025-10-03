import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

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
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center log"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <ToastContainer />
      <section className="mx-auto border border-gray-300  backdrop-blur-sm shadow-md w-80 md:w-96 px-4 py-4 text-center  rounded-3xl">
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className="py-2.5 px-3 border-2 border-gray-400  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="email"
              className="py-2.5 px-3 border-2 border-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="py-2.5 px-3 border-2 border-gray-400  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-xl md:w-80   caret-yellow-500 text-rose-500 mb-8"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          {/* Avatar selection */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowAvatars(!showAvatars)}
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {avatar ? `Selected Avatar: ${avatar}` : "Select Avatar"}
            </button>

            {showAvatars && (
              <div className="grid grid-cols-4 gap-4 mt-2">
                {[
                  "avatar1.png",
                  "avatar2.png",
                  "avatar3.png",
                  "avatar4.png",
                ].map((img) => (
                  <div
                    key={img}
                    className={`cursor-pointer border-2 rounded-lg p-1 ${
                      avatar === img ? "border-blue-500" : "border-gray-400"
                    }`}
                    onClick={() => selectAvatar(img)}
                  >
                    <img
                      src={`/${img}`} // Ensure these avatars are stored in the public folder or accessible via your backend
                      alt={img}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600  md:w-40 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign Up
            </button>
          </div>

          <div>
            <p className="font-medium text-1xl  mt-3">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-red-500 hover:text-red-600 font-extrabold"
              >
                Log In
              </button>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
