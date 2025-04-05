const express = require('express');
const Product = require('../models/product');
const secrets = require('../config/secrets.json');
const acc = require('../models/Account');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/plusProduct", async (req, res) => {
    try{
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Not authenticated" });
        const verified = jwt.verify(token, secrets.JWT_SECRET);
        const _id = verified.id;
        const { productName, description, price, stock, category} = req.body;
        if (!productName || !price) {
            return res.status(400).json({ error: "Product name and price are required" });
        }
        const newProduct = new Product({
            productName,
            description: description || "",
            price,
            stock: stock || 0,
            category: category || "non-category",
            craetedAt: Date.now(),
            createdBy: _id
        });
        
        await newProduct.save();

        res.json({ message: "Add product successfully!" })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.get('/showProduct', async (req, res) =>{
    try{
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error:"Not authenticated" });
        const verified = jwt.verify(token, secrets.JWT_SECRET);
        // const verified = jwt.verify(token, env.JWT_SECRET);
        // const user = await acc.findOne(verified.id);
        const user = await acc.findById(verified.id);
        if(!user) return res.status(404).json({ error: "User not found" })
        if (user.role !== "Admin"){
            const product = await Product.find({ createdBy: user._id });
            return res.json(product);
        }

        // const product = await Product.findOne();
        const product = await Product.find();
        return res.json(product);

    }catch(err){
        res.status(500).json({ error: err.message })
    }
});

router.patch('/editProduct', async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Not authenticated" });
  
      const verified = jwt.verify(token, secrets.JWT_SECRET);
      const user = await acc.findById(verified.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const { productId, productName, description, price, stock, category } = req.body; // ส่ง http
  
      if (!productId) return res.status(400).json({ error: "Product ID is required" });
  
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      if (user.role !== "Admin" && String(product.createdBy) !== String(user._id)) { //ต้องเป็นเจ้าของ product หรือต้องเป็น admin
        return res.status(403).json({ error: "Permission denied" });
      }
  
      if (productName !== undefined) product.productName = productName;
      if (description !== undefined) product.description = description;
      if (price !== undefined) product.price = price;
      if (stock !== undefined) product.stock = stock;
      if (category !== undefined) product.category = category;
  
      await product.save();
  
      res.json({ message: "Product updated successfully", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
