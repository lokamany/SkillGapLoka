const express = require('express');
const router = express.Router();
// Import the controller functions
const { registerUser, loginUser } = require('../controllers/authController');

// Ensure registerUser and loginUser are NOT undefined here
router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;