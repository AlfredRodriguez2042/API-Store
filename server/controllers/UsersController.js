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
           res.status(200).json({users})
       } else {
           res.status(204).json({message: 'NO CONTENT'})
       }
   } catch (err) {
       res.status(500).send(err)
   }
}

// Show a single User
const Show = async (req, res)=>{
    try {
        const oneUser = await Users.findById(req.params.id)
        res.status(200).json({oneUser})
    } catch (err) {
        res.status(500).send(err)
    }

}

// Create a User
const Create = async (req, res)=>{
    // Validate
    const { error } = validation(req.body)
    if(error) res.status(400).json({
        status: "error",
        type: error.details[0].path[0],
        message: error.details[0].message  })

    // Check email is registerd already or not
    const userEmail = await Users.findOne({email: req.body.email})
    if(userEmail) return res.status(400).json({
        status:"error",
        type:"email",
        message: "Email is alredy resgister"   })

    // Check username is teken or not
    const userName = await Users.findOne({username: req.body.username})
    if(userName) return res.status(400).json({
        status:"error",
        type:"email",
        message:'Username is alredy taken'})
    
     // create
    try {
        const user = await new Users(req.body)
        const newUser = await user.save()
        res.status(201).json({newUser})
    } catch (err) {
        res.status(500).send(err)
    }
}

// Update User
const Update = async (req, res)=>{
    // Validate
    const { error } = validation(req.body)
    if(error) res.status(400).json({
        status: "error",
        type: error.details[0].path[0],
        message: error.details[0].message  })

    // Check email is registerd already or not
    const userEmail = await Users.findOne({email: req.body.email})
    if(userEmail) return res.status(400).json({
        status:"error",
        type:"email",
        message: "Email is alredy resgister"   })

    // Check username is teken or not
    const userName = await Users.findOne({username: req.body.username})
    if(userName) return res.status(400).json({
        status:"error",
        type:"email",
        message:'Username is alredy taken'})

    // Update    
    try {  
       const user = await Users.findById(req.params.id)
       const newUser = Object.assign(user, req.body)
       await newUser.save()
        res.status(200).json({message: 'UPDATE', newUser})
    } catch (err) {
        res.status(500).send(err)
    }
}

// Remove User
const Remove = async (req, res)=>{
    try {
        const deleteUser = await Users.findByIdAndRemove(req.params.id)
        res.status(200).json({message:'deleted', deleteUser})
    } catch (err) {
        res.status(500).send(err)
    }
}


module.exports = { Index, Show, Update, Remove, Create}