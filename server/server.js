const express = require('express')
import morgan from 'morgan'
import multer from 'multer'

const { storage } = require('./helper/middlewares')
const app = express()
const db = require('./database')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(multer({storage}).single('image'))

// Routes
app.use('/product',require('./routes/Product') )
app.use('/user',require('./routes/Users') )
app.use('/auth',require('./routes/auth') )

   
 app.listen(app.get('port'),()=>{
    console.log('>>> Enviroment: ', process.env.NODE_ENV ),
    console.log('>>>  🌎   Server on Port ', app.get('port'))
 })
        
    