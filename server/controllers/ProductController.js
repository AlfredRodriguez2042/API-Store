
const Product = require('../models/Product')

 async function index(req, res){
    try{
        const products = await Product.find({})
        console.log(products)
        if(products.length){
            res.status(200).send({products})
        }else{
            return res.status(204).send({message: 'NO CONTENT'})
        }
       
    }catch(err ){
       res.status(500).send({err})
    }
}


const Show = async (req,res)=>{
    if(req.body.err) return res.status(500).send({err})
    if(!req.body.product) return res.status(404)
    let product = req.body.product
     res.status(200).send({product})
}

const Create = async (req, res)=>{
    try{
        const product = new Product(req.body)
        const newproduct = await product.save()
        if(newproduct) res.status(201).send({newproduct})

    }catch(err){
        res.status(500).send({err})
    }
}

const Update = (req,res)=>{

}


const Remove = (req, res)=>{

}


function Helper (req, res, next){
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


module.exports = { index, Show, Create, Update, Remove, Helper}

