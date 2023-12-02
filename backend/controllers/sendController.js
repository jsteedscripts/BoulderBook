const Send = require('../models/sendModel')
const mongoose = require('mongoose')

const getSends = async (req, res) => {
    const sends = await Send.find({}).sort({createdAt: -1})
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
    const { grade, attempts, angle, flash, holds, moves } = req.body

    // add to database
    try {
        const send = await Send.create({ grade, attempts, angle, flash, holds, moves })
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

    const send = await Send.findOneAndDelete(id)

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

    const send = await Send.findOneAndUpdate({_id: id}, {
        ...req.body
    })

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