const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = new Schema({
    
    name: { type: String, required: true, unique: true},
    price: { type: Number, required: true},
    category: { type: String, required: true, enum:['chicos', 'hombres', 'mujeres']},
    stock: { type: Number, default: 10},
    imageURL: String,
    public_id: String,
    date: { type: Date, default: Date.now()}
})
module.exports = mongoose.model('Product', ProductSchema)

