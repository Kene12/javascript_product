import { Link } from 'react-router-dom';
import { React, useEffect } from 'react';

export default function MainPage() {
  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      localStorage.setItem("auth", "false");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">My App</div>
        <div className="flex space-x-6 text-gray-700">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/login" className="hover:text-indigo-600">Login</Link>
          <Link to="/register" className="hover:text-indigo-600">Register</Link>
        </div>
      </nav>

      <main className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-indigo-600">My App</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your products efficiently with a simple and intuitive interface.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            View Products
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow"
          >
            Get Started
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full text-center py-4 text-sm text-gray-500">
        © 2025 My App. All rights reserved.
      </footer>
    </div>
  );
}