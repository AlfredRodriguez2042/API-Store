if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

require('@babel/polyfill')

require('./server')

