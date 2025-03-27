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
        const user = await acc.findById(verified.id);
        if(!user) return res.status(404).json({ error: "User not found" })
        if (user.role !== "Admin"){
            const product = await Product.find({ createdBy: user._id });
            return res.json(product);
        }

        const product = await Product.find();
        return res.json(product);

    }catch(err){
        res.status(500).json({ error: err.message })
    }
});

module.exports = router;