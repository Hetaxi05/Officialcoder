const ModelRole = require('../model/role')
const express = require('express')
const RouterAdmin=express.Router();

RouterAdmin.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await ModelRole.findOne({ email, password });
  
    //   console.log(Admin);
      
      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      res.json({ message: "Login successful", admin });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  


module.exports=RouterAdmin;