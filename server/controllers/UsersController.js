// Model Schema
const Users = require('../models/Users')
//validate
const { validation } = require('./ValidateController')


// Get all Users
const Index = async (req, res)=>{
   try {
       const users = await Users.find({})
       console.log(users)
       if (users.length) {
           res.status(200).send({users})
       } else {
           res.status(204).send({message: 'NO CONTENT'})
       }
   } catch (err) {
       res.status(500).send(err)
   }
}

// Show a single User
const Show = async (req, res)=>{
    try {
        const oneUser = await Users.findById(req.params.id)
        res.status(200).send({oneUser})
    } catch (err) {
        res.status(500).send(err)
    }

}

// Create a User
const Create = async (req, res)=>{
    // Validate
    const { error } = validation(req.body)
    if(error) res.status(400).send(error.details)
    // Check email is registerd already or not
    const userEmail = await Users.findOne({email: req.body.email})
    if(userEmail) return res.status(400).send({message:'Email is already registerd'})
    // Check username is teken or not
    const userName = await Users.findOne({username: req.body.username})
    if(userName) return res.status(400).send({message:'Username is already registerd'})
    
     
    try {
        const user = await new Users(req.body)
        const newUser = await user.save()
        res.status(201).send({newUser})
    } catch (err) {
        res.status(500).send(err)
    }
}

// Update User
const Update = async (req, res)=>{
    // Check email is registerd already or not
    const userEmail = await Users.findOne({email: req.body.email})
    if(userEmail) return res.status(400).send({message:'Email is already registerd'})
    // Check username is teken or not
    const userName = await Users.findOne({username: req.body.username})
    if(userName) return res.status(400).send({message:'Username is already registerd'})
    try {  
       // const user = req.params.id
       // const users = await Users.findByIdAndUpdate(req.params.id, user)
       const user = await Users.findById(req.params.id)
       const newUser = Object.assign(user, req.body)
       await newUser.save()
        res.status(200).send({message: 'UPDATE', newUser})
    } catch (err) {
        res.status(500).send(err)
    }
}

// Remove User
const Remove = async (req, res)=>{
    try {
        const deleteUser = await Users.findByIdAndRemove(req.params.id)
        res.status(200).send({message:'deleted', deleteUser})
    } catch (err) {
        res.status(500).send(err)
    }
}


module.exports = { Index, Show, Update, Remove, Create}