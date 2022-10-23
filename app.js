require('./config/mongoose')
// app.js ini adalah main entry sebagai tempat memanggil dan menjalankan middleware
const express = require('express')
const app = express()

// const productV2 = require('./app/product-v2/router')
const logger = require('morgan')
const path = require('path')

// const productV3 = require('./app/product-v3/routes');
const productV4 = require('./app/product-v4/routes');

const cors = require('cors')

let port = process.env.PORT || 3000;

// app.use(path, middleware)
app.use(logger('dev'));
app.use(cors())
app.use(express.urlencoded({extended: true})); // sesuatu yang mengenable kita menerima data dari urlencoded (sok tau)
app.use(express.json()); // sesuatu yang mengenable kita menerima data menjadi bentuk json

// static files
app.use('/public', express.static(path.join(__dirname, 'uploads')))

// app.use('/api/v2',productV2)
// app.use('/api/v3', productV3)
app.use('/api/v4', productV4)


// halaman error harus selalu di paling bawah/akhir agar jika tidak ada yg cocok dengan middleware lain maka akan muncul ini
app.use((req, res) => { //halaman error
    res.status(404)
    res.send({
      status: 'failed',
      message:`Resource ${req.originalUrl} Not Found` 
    })    
  })

app.listen(port,()=>{
    console.log(`server listening in http://localhost:${port}/api/v4/product`);
})