const express = require('express')
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
router.post('/', (req, res) => {
    res.json({msg: 'post new send'})
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