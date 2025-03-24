const express = require('express');
const pd = require('../models/product');
const secrets = require('../config/secrets.json');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/plusProduct", async (req, res) => {
    try{
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Not authenticated" });
        const verified = jwt.verify(token, secrets.JWT_SECRET);
        const _id = verified.id;
        const { productName, price} = req.body;
        const newProduct = new pd({productName, price, idUser: _id});
        await newProduct.save();

        res.json({ message: "User registered successfully!" })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;