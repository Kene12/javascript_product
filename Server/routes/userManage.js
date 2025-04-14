const jwt = require("jsonwebtoken");
const express = require('express');
const acc = require('../models/Account');
require('dotenv').config();

const router = express.Router();

router.patch('/edit', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const { username, email} = req.body;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const _id = verified.id;
    if (!_id) return res.status(400).json({ error: "Id not found" });

    const user = await acc.findById(_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) {
      const existingUser = await acc.findOne({ username, _id: { $ne: _id } });
      if (existingUser) return res.status(400).json({ error: "Username is already taken" });
    }
    if (email) {
      const existingUser = await acc.findOne({ email, _id: { $ne: _id } });
      if (existingUser) return res.status(400).json({ error: "Username is already taken" });
    }
    
    const updatedUser = await acc.findByIdAndUpdate( _id, { username, email }, { new: true, runValidators: true });

    if(!updatedUser) return res.status(404).json({ error: "Can't UpdateUser" });
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;