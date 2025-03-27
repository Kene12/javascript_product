const jwt = require("jsonwebtoken");
const express = require('express');
const bcrypt = require('bcryptjs');
const acc = require('../models/Account');
const secrets = require('../config/secrets.json');

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
  
      const token = jwt.sign({ id: user._id }, secrets.JWT_SECRET, { expiresIn: "3h" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: secrets.NODE_ENV === "production",
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

router.get("/my", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const verified = jwt.verify(token, secrets.JWT_SECRET);
    res.json({ userId: verified.id });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;