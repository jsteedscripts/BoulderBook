const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sendSchema = new Schema({
    grade: {
        type: Number,
        min: [0, "Grade cannot be below V0"],
        max: [17, "Grade cannot be above V17"],
        required: true
    },
    attempts: {
        type: Number,
        min: [1, 'Number of attempts cannot be less than 1'],
        default: 1,
    },
    angle: {
        type: Number,
        min: [0, "Angle cannot be negative"],
        max: [180, "Angle cannot be greater than 180 degrees"],
        required: true
    },
    flash: {
        type: Boolean,
        required: true
    },
    holds: [{
        type: String,
        required: true,
        lowercase: true,
        enum: ["slopers", "pinches", "crimps", "jugs", "pockets", "underclings", "sidepulls"],
    }],
    moves: [{
        type: String,
        required: true,
        lowercase: true,
        enum: ["smear", "drop knee", "knee bar", "toe hook", "heel hook", "gaston", "dyno", "flag", "back flag", "bicycle", "mantle", "deadpoint"],
    }]
}, { timestamps: true })

module.exports = mongoose.model('Send', sendSchema)