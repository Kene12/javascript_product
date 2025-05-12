import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Manage Products";
    fetch("http://localhost:5000/product/showProduct", {
      credentials: "include"
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleDelete = async (productId) => {
    if (!window.confirm("คุณแน่ใจหรือว่าต้องการลบสินค้านี้?")) return;

    try {
      const res = await fetch("http://localhost:5000/product/deleteProduct", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== productId));
      } else {
        const data = await res.json();
        console.error("ไม่สามารถลบสินค้าได้:", data.error);
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการลบสินค้า:", err);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        localStorage.setItem("auth", "false");
        navigate("/");
      } else {
        console.error("Logout ล้มเหลว");
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการ logout:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600">My App</div>
        <div className="flex space-x-6 text-gray-700">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/AddProducts" className="hover:text-indigo-600">Add Product</Link>
          <Link to="/users/manage" className="hover:text-indigo-600">User</Link>
          <button onClick={handleLogout} className="hover:text-red-600">Logout</button>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product list</h2>

        {loading ? (
          <p className="text-gray-500">Loading product information...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products available to display</p>
        ) : (
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p._id} className="border p-4 rounded shadow">
                <p className="font-semibold">{p.productName}</p>
                <p>{p.description}</p>
                <p>ราคา: {p.price}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Products;