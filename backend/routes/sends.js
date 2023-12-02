const express = require('express')
const Send = require('../models/sendModel')
const router = express.Router()

// get all sends
router.get('/', (req, res) => {
    res.json({msg: 'get all sends'})
})

// get single send
router.get('/:id', (req, res) => {
    res.json({msg: 'get single send'})
})

// post new send
router.post('/', async (req, res) => {
    const { grade, attempts, angle, flash, holds, moves } = req.body

    try {
        const send = await Send.create({grade, attempts, angle, flash, holds, moves})
        res.status(200).json(send)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete single send
router.delete('/:id', (req, res) => {
    res.json({msg: 'delete single send'})
})

// update single send
router.patch('/:id', (req, res) => {
    res.json({msg: 'update single send'})
})

module.exports = router