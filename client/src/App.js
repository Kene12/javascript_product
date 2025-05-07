import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Register from "./pages/register";
import LoginPage from "./pages/loginpage";
import MainPage from "./pages/pagemine";
import ProtectedRoute from "./components/ProtectedLoginRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
