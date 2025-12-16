import React from "react";
import { Link } from "react-router";
import pizza404 from "../assets/pizza404.png";
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-8">
      <div className="text-center max-w-2xl">
        <div className="mb-12">
          <img
            src={pizza404}
            alt="404 Pizza"
            className="mx-auto w-80 h-80 object-contain"
          />
        </div>

        <h1 className="text-8xl font-bold text-orange-500 mb-6">404</h1>
        <h2 className="text-5xl font-bold text-white mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Looks like this page took a wrong turn in the oven... <br />
          But don't worry — we've got plenty of delicious pages back home!
        </p>

        <Link to="/">
          <button className="px-10 py-5 bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-600 transition transform hover:scale-105 shadow-2xl">
            Back to Home 🍕
          </button>
        </Link>

        <p className="text-gray-500 mt-12 text-sm">
          Error 404 — The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
