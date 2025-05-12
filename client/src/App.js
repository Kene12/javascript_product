import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Register from "./pages/SelectRolePage";
import Customer from "./pages/customer.js";
import Merchant from "./pages/merchant.js";
import LoginPage from "./pages/loginpage";
import MainPage from "./pages/ProductPage.js";
import AddProducts from "./pages/AddProducts.js";
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
        <Route path="/Customer" element={<Customer />} />
        <Route path="/Merchant" element={<Merchant />} />
        <Route path="/AddProducts" element={<AddProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
