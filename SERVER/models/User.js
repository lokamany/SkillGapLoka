const userSchema = new mongoose.Schema({
    // ... previous fields ...
    resumeUrl: String,
    certificateUrls: [String], // Array for multiple PDFs/Docs
    linkedInUrl: { type: String, default: "" },
    // 🔥 NEW: Scoring & Analysis Data
    atsScore: { type: Number, default: 0 },
    linkedInScore: { type: Number, default: 0 },
    missingSkills: [String],
    improvementTips: [String],
    suggestedChannels: [String]
});