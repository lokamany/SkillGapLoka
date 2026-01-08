const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Import functions from the controller
const { generateRoadmap, getRoadmaps } = require('../controllers/roadmapController');

// Define Routes
// POST to generate a new roadmap
router.post('/generate', protect, generateRoadmap);

// GET to fetch history of roadmaps
router.get('/', protect, getRoadmaps);

module.exports = router;