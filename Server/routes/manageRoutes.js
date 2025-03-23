const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const acc = require('../models/Account');
const secrets = require('../config/secrets.json');

const router = express.Router();

const isAdmin = async (req, res, next) => {
  try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Not authenticated" });

      const verified = jwt.verify(token, secrets.JWT_SECRET);
      const adminUser = await acc.findById(verified.id);
      
      if (!adminUser || adminUser.role !== "Admin") {
          return res.status(403).json({ error: "Access denied. Admins only." });
      }
      
      req.adminUser = adminUser;
      next(); 
  } catch (err) {
      res.status(401).json({ error: "Invalid token" });
  }
};

router.get('/Search', async (req, res) => {
  try {
    const { _id, username, email } = req.query;
    let query = {};
    if (_id) query._id = _id;
    if (username) query.username = username;
    if (email) query.email = email;

    const user = await acc.findOne(query);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/showUser', async (req, res) =>{
  try {
    const users = await acc.find({ role: {$ne: "Admin"} });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/editUser', isAdmin, async (req, res) =>{
  try{
    const { _id, username, email, password} = req.body;

    if (!_id) return res.status(400).json({ error: "Id not found" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = hashedPassword;

    const updateUser = await acc.findByIdAndUpdate(_id, updateData, { new: true});

    if(!updateUser) return res.status(404).json({ error: "Can't UpdateUser" });

    res.json({ massage: "User updated successfully", user: updateUser });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

router.delete('/deleteUser', isAdmin, async( req, res) =>{
  try{
    const {_id} = req.body;
    if (!_id) return res.status(400).json({ error: "Id not found" });

    const userToDelete = await acc.findOne({ _id });
    if (!userToDelete) return res.status(404).json({ error: "User not found" });

    if (userToDelete.role === "Admin") return res.status(403).json({ error: "Cannot delete Admin users" });

    const deleteUser = await acc.deleteOne({ _id });
    if(!deleteUser) return res.status(404).json({ error: "Can not delete" });

    res.json({ massage: "User delete successfully", user: deleteUser });
  }catch(err){
    res.status(500).json({ error:err.massage });
  }
})

module.exports = router;