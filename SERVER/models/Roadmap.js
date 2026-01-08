const mongoose = require('mongoose');

const roadmapSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    targetRole: {
        type: String,
        required: true
    },
    nodes: [
        {
            id: Number,
            title: String,
            description: String,
            status: { type: String, default: 'pending' }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);