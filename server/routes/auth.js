const express = require('express')

const router = express.Router()
const authCtrl = require('../controllers/authController')

router.post('/login', authCtrl)

module.exports = router