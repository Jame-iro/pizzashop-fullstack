import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../services/api";
import signinImg from "../assets/signup-img.png";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome to Pizzashop! You're now logged in 🍕");

      navigate("/");
    } catch (err) {
      const message = err.response?.data || "Registration failed. Try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-[#2E0C00] rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden md:block relative">
          <img
            src={signinImg}
            alt="Delicious Pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="p-12 md:p-20 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-6 py-4 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-orange-500 rounded-lg font-bold text-white hover:bg-orange-600 transition disabled:opacity-70"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-8">
            Already have an account?
            <Link
              to="/login"
              className="text-orange-500 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
