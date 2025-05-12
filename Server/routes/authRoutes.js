const jwt = require("jsonwebtoken");
const express = require('express');
const bcrypt = require('bcryptjs');
const acc = require('../models/Account');
require('dotenv').config();

const router = express.Router();

router.post('/registerUser', async (req, res) =>{
    try{
        const { username, email, password } =req.body;
        const typeUser = "User";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new acc({username, email, password: hashedPassword, role: typeUser});
        await newUser.save();

        res.json({ message: "User registered successfully!"});
    } catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.post('/registerMerchant', async (req, res) =>{
  try{
      const { username, email, password } =req.body;
      const typeUser = "Merchant";
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new acc({username, email, password: hashedPassword, role: typeUser});
      await newUser.save();

      res.json({ message: "User registered successfully!"});
  } catch(err){
      res.status(500).json({ error: err.message });
  }
});

router.post('/registerAdmin', async (req, res) =>{
  try{
      const { username, email, password } =req.body;
      const typeUser = "Admin";
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new acc({username, email, password: hashedPassword, role: typeUser});
      await newUser.save();

      res.json({ message: "Admin registered successfully!"});
  } catch(err){
      res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { iden, password } = req.body;
      const user = await acc.findOne({ 
        $or: [{email: iden }, {username: iden }]
      });
  
      if (!user) return res.status(400).json({ error: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      });
      res.json({ message: "Login successful!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/my", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await acc.findById(decoded.id).select("username role");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      userId: decoded.id,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;