const express = require('express')
//const Product = require('../models/Product')

const controller = require('../controllers/ProductController')

const router = express.Router()

// Get all Products
router.get('/', controller.index)
 

// Create
router.post('/', controller.Create)

 //Show Products
router.get('/:key/:value',controller.Helper,controller.Show)

 //Update Products
router.put('/:key/:value',helper,(req,res)=>{
     if(req.body.err) res.status(500).send({err})
     if(!req.body.product) res.status(404).send({message: 'not found'})
    let products = req.body.product[0]
     products = Object.assign(products, req.body)
    products.save()
     .then(products=> res.status(200).send({message: 'Update', products}))
     .catch(err=>res.status(500).send({err}))

 })

 // Delete Products
router.delete('/:key/:value',helper,(req,res)=>{
    if(req.body.err) res.status(500).send({err})
    if(!req.body.product) res.status(404).send({message: 'not found'})
    req.body.product[0].deleteOne()
    .then(response=> res.status(200).send({message:'deleted',response}))
     .catch(err=>res.status(500).render({err}))

 })


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