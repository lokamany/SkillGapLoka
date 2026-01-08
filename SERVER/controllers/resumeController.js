const pdf = require('pdf-parse');
const model = require('../config/googleAI');
const Analysis = require('../models/Analysis');

exports.analyzeResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Upload a PDF" });

        const data = await pdf(req.file.buffer);
        const prompt = `Analyze this resume and return JSON: { "readinessScore": 0-100, "skillMatrix": [], "identifiedGaps": [] }. Text: ${data.text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const cleanJson = response.text().replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(cleanJson);

        const savedAnalysis = await Analysis.create({
            user: req.user._id,
            ...parsedData,
            fileName: req.file.originalname
        });

        res.status(200).json(savedAnalysis);
    } catch (error) {
        res.status(500).json({ message: "AI Error", error: error.message });
    }
};