const router = require('express').Router()
const productV2 = require('./controller')
const multer = require('multer')
const upload = multer({dest : 'uploads'})
// jangan lupa multer


router.get('/product', productV2.index)// index = memunculkan semua data
router.get('/product/:id', productV2.view)// view = memunculkan semua data sesuai id   
router.post('/product',upload.single('image'), productV2.store) //store = mengirimkan data
router.put('/product/:id', upload.single('image'), productV2.update) //update = mengubah dan mengedit data, memerlukan id
router.delete('/product/:id',productV2.destroy) //hapus data sesuai id
module.exports = router;