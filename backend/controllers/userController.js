const User = require('../models/userModel')
const Send = require('../models/sendModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const userDashboard = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No user corresponding to id'})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No user corresponding to id'})
    }
    
    try {
        const sendData = await req.app.locals.db.collection('sends').aggregate([
            {
                $match: {
                    user_id: id
                },
            },
            {
                $group: {
                    _id: null, // group all sends together
                    totalSends: { $sum: 1 },
                    avgAttempts: { $avg: '$attempts' },
                },
            },
            {
                // fields to output (totalSends and avgAttempts)
                $project: {
                    _id: 0, // exclude default _id field
                    totalSends: 1,
                    avgAttempts: 1,
                },
            },
        ]).toArray()

        if (sendData.length > 0) {
            res.json(sendData[0])
        } else {
            res.json({msg: "no send data found for dashboard"})
        }
    } catch (error) {
        console.error('Error fetching send data for dashboard', error)
        res.status(400).json({error: 'internal server error fetching dashboard data'})
    }
}

module.exports = { signupUser, loginUser, userDashboard }