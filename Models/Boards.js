const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    tags: {
        type: [String],
        default: []
    },
    bgColor: {
        type: String,
        default: "#ffffff"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Board", boardSchema);