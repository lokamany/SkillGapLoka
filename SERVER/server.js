const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const cors = require('cors');

const app = express();

// --- 🌐 MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: uploadDir });

// --- 🛠️ HELPER: EXTRACT TEXT FROM PDF/IMAGE ---
async function extractText(file) {
    try {
        if (file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(file.path);
            const data = await pdf(dataBuffer);
            return data.text;
        } else {
            const { data: { text } } = await Tesseract.recognize(file.path, 'eng');
            return text;
        }
    } catch (err) {
        console.error("Extraction Error:", err);
        return "";
    }
}

// --- 🚀 DYNAMIC ROADMAP API (LOCAL LOGIC - NO GROQ) ---
app.post('/api/generate-skill-roadmap', upload.single('pdf'), async (req, res) => {
    try {
        const { interests, dreamRole, techToExplore } = req.body;
        
        // Dynamic Logic: Processes the user's specific tech interest
        const targetTech = techToExplore || "Advanced Tech Stack";
        const role = dreamRole || "Senior Specialist";

        const roadmap = [
            {
                step: "Phase 1: Foundations & Core Logic",
                topic: `Mastering ${targetTech} Essentials`,
                resources: ["freeCodeCamp", "Programming with Mosh"],
                tip: `Start by building 3 mini-projects using ${targetTech} to understand the syntax. Do not skip the documentation.`
            },
            {
                step: "Phase 2: Architecture & Integration",
                topic: `Implementing ${targetTech} for ${role} Roles`,
                resources: ["TechWorld with Nana", "Fireship"],
                tip: `Focus on how ${targetTech} interacts with ${interests || 'other systems'}. Learn state management and data flow.`
            },
            {
                step: "Phase 3: Optimization & Deployment",
                topic: `Production-Ready ${targetTech} Engineering`,
                resources: ["ByteByteGo", "Hussein Nasser"],
                tip: `Learn to scale your ${targetTech} apps. Focus on performance, security, and cloud deployment (AWS/Vercel).`
            }
        ];

        const feedback = {
            overall: `Your interest in ${interests} is a great match for a ${role} path. Focusing on ${targetTech} will close your current skill gaps.`,
            strength: "Technical ambition and targeted learning focus.",
            improvement: "Bridge the gap between local coding and production deployment."
        };

        // Artificial delay to simulate "Thinking" (makes the UI feel better)
        setTimeout(() => {
            res.json({ success: true, roadmap, feedback });
        }, 800);

    } catch (error) {
        console.error("Roadmap Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// --- 🚀 SYSTEM ROUTES (For Profile & Dashboard) ---
app.get('/api/user/get-profile/:email', (req, res) => {
    const { email } = req.params;
    res.json({
        success: true,
        user: {
            email: email,
            bio: "Ready to architect your career.",
            level: 12,
            xp: 4200,
            rank: "Pro Analyst",
            skills: ['React', 'Node.js'],
            missingSkills: ['Docker', 'AWS'],
            atsScore: 85,
            commHistory: []
        }
    });
});

app.post('/api/user/save-comm-session', (req, res) => {
    const { email, score } = req.body;
    res.json({ success: true, xpGained: 150 });
});

// --- 🚀 START SERVER ---
const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ====================================
    ✅ LOCAL ENGINE ONLINE (PORT ${PORT})
    🔒 SECURITY: GROQ/AI KEYS REMOVED
    🚀 MODE: DYNAMIC LOCAL GENERATION
    ====================================
    `);
});