const express = require('express');
const router = express.Router();
const UserModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// Validation functions
const isValid = (value) => typeof value !== "undefined" && value !== null && (typeof value === "string" ? value.trim().length > 0 : true);
const isValidRequest = (object) => Object.keys(object).length > 0;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: false, message: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ status: false, message: 'Forbidden: Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// UserLogin endpoint
router.post('/login', UserLogin);

// GetUserById endpoint
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!isValid(userId)) {
      return res.status(400).json({ status: false, message: 'Invalid user ID' });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Ensure the user making the request has the right permissions to access this data
    if (user._id.toString() !== req.userId) {
      return res.status(403).json({ status: false, message: 'Forbidden: You do not have permission to access this user data' });
    }

    const userData = {
      userId: user._id,
      email: user.email,
      name: user.name,
      // Add more fields as needed
    };

    res.status(200).json({ status: true, data: userData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
});

module.exports = router;
