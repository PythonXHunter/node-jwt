const router = require('express').Router();
const User = require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
router.post('/register', async(req, res) => {
  try { 
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch(err){
    res.status(500).json({ error: "Registered failed" });
  }
});

// User login
router.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user){
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: "1h",
    });
    // console.log(token);
    res.status(200).json({ token });
  } catch(err){
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;