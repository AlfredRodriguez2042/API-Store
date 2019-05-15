const express = require('express')
import morgan from 'morgan'
import multer from 'multer'


const app = express()
const db = require('./database')

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Routes
app.use('/product',require('./routes/Product') )
app.use('/user',require('./routes/Users') )
app.use('/auth',require('./routes/auth') )

   
 app.listen(app.get('port'),()=>
 console.log('>>>  🌎   Server on Port ', app.get('port')))
        
    