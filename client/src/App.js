// client/src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Products from "./pages/Products";
import Register from "./pages/register";

function LoginPage() {
  const [iden, setIden] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iden, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Login Success: ");
        setLoggedIn(true);
        navigate("/products");
      } else {
        setMessage("❌ " + data.error);
        setLoggedIn(false);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          placeholder="Username or Email"
          value={iden}
          onChange={(e) => {
            setIden(e.target.value)
            setMessage("");
          }}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setMessage("");
          }}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}

        {loggedIn && (
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            ไปยังหน้าสินค้า
          </button>
        )}
        
      </form>
      <button
          type="button"
          onClick={() => navigate("/Register")}
        >
          Register
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
