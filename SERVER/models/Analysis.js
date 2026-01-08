const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    readinessScore: { type: Number, default: 0 },
    skillMatrix: [
        { subject: String, A: Number, B: Number }
    ],
    identifiedGaps: [String],
    fileName: String
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);