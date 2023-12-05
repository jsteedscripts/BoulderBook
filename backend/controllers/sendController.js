const Send = require('../models/sendModel')
const mongoose = require('mongoose')

const getSends = async (req, res) => {
    const user_id = req.user._id
    const sends = await Send.find({user_id}).sort({createdAt: -1})
    res.status(200).json(sends)
}

const getSend = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No send corresponding to id'})
    }

    const send = await Send.findById(id)

    if (!send) {
        return res.status(404).json({error: 'No send corresponding to id'})
    }
    
    res.status(200).json(send)
}

const createSend = async (req, res) => {
    const { grade, attempts, angle, flash, holds, moves, gym } = req.body

    let emptyFields = []

    if (!grade) {
        emptyFields.push('grade')
    }
    if (!angle) {
        emptyFields.push('angle')
    }
    if (!flash) {
        emptyFields.push('flash')
    }
    if (!holds) {
        emptyFields.push('holds')
    }
    if (!moves) {
        emptyFields.push('moves')
    }
    if (!gym) {
        emptyFields.push('gym')
    }
    
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all required fields', emptyFields })
    }

    // add to database
    try {
        const user_id = req.user._id
        const send = await Send.create({ grade, attempts, angle, flash, holds, moves, gym, user_id })
        res.status(200).json(send)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteSend = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No send corresponding to id'})
    }

    const send = await Send.findOneAndDelete({_id: id})

    if (!send) {
        return res.status(404).json({error: 'No send corresponding to id'})
    }
    
    res.status(200).json(send)
}

const updateSend = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No send corresponding to id'})
    }

    const send = await Send.findOneAndUpdate({_id: id},
        {...req.body},
        { new: true }
    )

    if (!send) {
        return res.status(404).json({error: 'No send corresponding to id'})
    }
    
    res.status(200).json(send)
}

module.exports = {
    getSends,
    getSend,
    createSend,
    deleteSend,
    updateSend
}