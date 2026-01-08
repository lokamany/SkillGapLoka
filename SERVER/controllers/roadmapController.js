const Roadmap = require('../models/Roadmap');
const model = require('../config/googleAI');

exports.generateRoadmap = async (req, res) => {
    try {
        const { gaps, role } = req.body;
        const prompt = `Create a 5-step learning roadmap for ${role} focusing on these gaps: ${gaps.join(', ')}. Return only a JSON array.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const roadmapData = JSON.parse(response.text().replace(/```json|```/g, ""));

        const newRoadmap = new Roadmap({
            user: req.user.id,
            targetRole: role,
            nodes: roadmapData
        });

        await newRoadmap.save();
        res.status(201).json(newRoadmap);
    } catch (error) {
        res.status(500).json({ message: "Roadmap Error" });
    }
};