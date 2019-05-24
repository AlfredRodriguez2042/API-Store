const express = require('express')
//const Product = require('../models/Product')

const controller = require('../controllers/ProductController')

const router = express.Router()

// Get all Products
router.get('/', controller.index)
 

// Create
router.post('/add', controller.Create)

 //Show Products
router.get('/:key/:value',controller.Helper,controller.Show)

 //Update Products
router.put('/:key/:value',controller.Helper,controller.Update)

 // Delete Products
router.delete('/:key/:value',controller.Helper,controller.Remove)


 function helper (req,res,next){
    let query = {}
     query[req.params.key] = req.params.value
     Product.find(query)
    .then(product =>{
        if(!product.length) next()
        req.body.product = product
         return next()
    })
    .catch(err=>{
        req.body.err = err
        next()
    })

 }

module.exports = router