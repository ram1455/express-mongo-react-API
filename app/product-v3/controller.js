const { ObjectId } = require('bson');
const db = require('../../config/mongodb');
const path = require('path')
const fs = require('fs');
let port = process.env.PORT || 3000


// db.collection('namanya apa')
const index =  (req, res)=>{
    db.collection('products').find().toArray()
    .then( result => {
        res.send(result)
    })
    .catch( error => {
        res.send(error)
    })
}

const view =  (req, res)=>{
    const {id} = req.params
    db.collection('products').findOne({_id: ObjectId(id)})
    .then( result =>{res.send(result)})
    .catch( error => {res.send(error)})
}

const store =  (req, res)=>{
    const image = req.file
    const { name, price, status, stock} = req.body

    if (image) {
        const fixImage = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, fixImage)

        db.collection('products').insertOne({ name, price, status, stock, image_url:`http://localhost:${port}/public/${image.originalname}`})
        .then( result =>{res.send(result)})
        .catch( error => {res.send(error)})
    } else {
        db.collection('products').insertOne({ name, price, status, stock, image_url:`http://localhost:${port}/public/${image.originalname}`})
        .then( result =>{res.send(result)})
        .catch( error => {res.send(error)})
    }
}

const update = async (req, res)=>{
    const image = req.file
    const { name, price, status, stock} = req.body
    const {id} = req.params

    if (image) {
        const fixImage = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, fixImage)

        await db.collection('products').updateOne({_id : ObjectId(id)}, {$set: {name, price, status, stock,  image_url:`http://localhost:${port}/public/${image.originalname}`}}, { multi: true })
        .then( result =>{res.send(result)})
        .catch( error => {res.send(error)})
    } 
     else {
        await db.collection('products').updateOne({'_id' : ObjectId(id)}, {$set: {name, price, status, stock, image_url:`http://localhost:${port}/public/${image.originalname}`}})
        .then( result =>{res.send(result)})
        .catch( error => {res.send(error)})
    }
}

const destroy = (req, res) => {
    const {id} = req.params

    db.collection('products').deleteOne({_id : ObjectId(id)})
    .then( result =>{res.send([result, {message : `record with _id: ${id} has been deleted`}])})
    .catch( error => {res.send(error)})
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}