const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// This is a fake token
const SECRET_TOKEN = 'SECRET_TOKEN'


async function login(req, res){
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({username})
    // Check the user
    if (user) {
        // Check it the password is correct
        const match = await bcrypt.compare(password,user.password)
        if(match){
            // Access and generete token
            const payload = {
                username: user.username,
                email: user.email,
                name: user.name
            }
           await jwt.sign(payload,SECRET_TOKEN,function(err, token){
            if (err) {
                res.status(500).send({err})
            } else {
                res.status(200).send({message: 'access', token})
            }
        })
            //return res.status(200).send({message: 'access'})
        }else{
            return res.status(200).send({message: 'password is incorrect'})
        }
        
    } else {
        res.status(404).send({message: "the user donst exist"})
    }

}

module.exports = login