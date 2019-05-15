const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const UserSchema = new Schema({
    name:{ type: String, required: true},
    username:{ type:String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password:{ type: String, required:true},
    sign_up_date: { type: Date, default: Date.now()},
    last_login_date: { type: Date, default:Date.now()}
})

async function enigma(next){
    try {
        const prepare = await bcrypt.genSalt(10)
        const create = await bcrypt.hash(this.password, prepare)
        const load = this.password = create
        return next()
        
    } catch (error) {
        next(error)
    }

}
// Falta cambiar el findByIdAndUpdate por save
UserSchema.pre('save', enigma) 

module.exports = mongoose.model('Users', UserSchema)