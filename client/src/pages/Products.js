// client/src/pages/Products.js
import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/product/showProduct", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">รายการสินค้า</h2>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p._id} className="border p-4 rounded shadow">
            <p className="font-semibold">{p.productName}</p>
            <p>{p.description}</p>
            <p>ราคา: {p.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
