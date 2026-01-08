const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');

// UPDATED: Path matches your filename 'authmiddleware.js'
const auth = require('../middleware/authMiddleware'); 

// Multer Setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// AI Analyze Route
router.post('/analyze', auth, upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'certificate', maxCount: 1 }
]), analyzeResume);

module.exports = router;