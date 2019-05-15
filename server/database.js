import mongoose from 'mongoose'

const URI = 'mongodb://localhost/ecomerse-app'
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(URI, { useNewUrlParser: true })
.then(db=> console.log('DB is Connected'))
.catch(err => console.log(err))

module.exports = mongoose