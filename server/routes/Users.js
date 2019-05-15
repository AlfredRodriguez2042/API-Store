const express = require('express')


const { Index, Show, Create, Update, Remove} = require('../controllers/UsersController')
const router = express.Router()

// get all Users
router.get('/', Index)

//Show a User
router.get('/:id', Show)

//Create Users
router.post('/', Create)

//Upload Users
router.put('/:id', Update)

//Remove Users
router.delete('/:id', Remove)

module.exports = router