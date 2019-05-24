const cloudinary = require('cloudinary')
const Product = require('../models/Product')


//  Cloudinary confing
// use your keys of cloudinary and dont show
cloudinary.config({
    cloud_name: process.env.CLOUDINARI_CLOUD_NAME ,
    api_key: process.env.CLOUDINARI_API_KEY,
    api_secret: process.env.CLOUDINARI_API_SECRET
})

 async function index(req, res){
    try{
        const products = await Product.find({})
        console.log(products)
        if(products.length){
            res.status(200).json({products})
        }else{
            return res.status(204).json({message: 'NO CONTENT'})
        }
       
    }catch(err ){
       res.status(500).send({err})
    }
}


const Show = async (req,res)=>{
    if(req.body.err) return res.status(500).json({err})
    if(!req.body.product) return res.status(404)
    let product = req.body.product
     res.status(200).json({product})
}

const Create = async (req, res)=>{
    try{
        const {name, price, category, stock } = req.body
        const cloud = await cloudinary.v2.uploader.upload(req.file.path)
        console.log(cloud)
        const product = new Product({
            name,
            price,
            category,
            stock,
            imageURL: cloud.secure_url,
            public_id: cloud.public_id

        })
        const newproduct = await product.save()
        if(newproduct) res.status(201).json({newproduct})

    }catch(err){
        res.status(500).json({err})
    }
}

const Update = async (req,res)=>{
    try {
     if(req.body.err) res.status(500).json({err})
     if(!req.body.product) res.status(404).json({message: 'not found'})
     let products = req.body.product[0]
     products = Object.assign(products, req.body)
     console.log(products)
     await products.save()
     res.status(200).json({message: ' update', products})
    } catch (err) {
        res.status(500).json({err})
    }

}


const Remove = async (req, res)=>{
    try {
    if(req.body.err) res.status(500).send({err})
    if(!req.body.product) res.status(404).send({message: 'not found'})
     const deleted = await req.body.product[0].deleteOne()
     res.status(200).json({message:'deleted', deleted})
    } catch (err) {
        res.status(500).send({err})
    }

}

// helper for search params
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

