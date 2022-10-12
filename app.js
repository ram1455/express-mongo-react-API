// app.js ini adalah main entry sebagai tempat memanggil dan menjalankan middleware
const express = require('express')
const app = express()
const productV2 = require('./app/product-v2/router')
const logger = require('morgan')
const path = require('path')
let port = 3306;

// app.use(path, middleware)
app.use(logger('dev'));
app.use(express.urlencoded({extended: true})); // request body dengan POST
app.use(express.json());

// static files
app.use('/public', express.static(path.join(__dirname, 'uploads')))

app.use('/api/v2',productV2)

app.use((req, res) => { //halaman error
    res.status(404)
    res.send({
      status: 'failed',
      message:`Resource ${req.originalUrl} Not Found` 
    })
    
  })

app.listen(port,()=>{
    console.log(`server listening in http://localhost:${port}/api/v2/product`);
})