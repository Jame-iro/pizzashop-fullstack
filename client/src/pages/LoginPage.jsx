import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import signinImg from "../assets/signup-img.png";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      Optional: toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      const message = err.response?.data || "Invalid email or password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
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
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">
                Username or Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center">
              <a href="#" className="text-orange-500 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-4 bg-orange-500 rounded-lg font-bold text-white hover:bg-orange-600 transition disabled:opacity-70"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 mt-8">
            Don't have an account?
            <Link to="/register" className="text-orange-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
