const Product = require('./model');
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');

const index = (req,res) => {
    Product.find()
    .then( result => res.send(result))
    .catch( error => res.send(error))
}
 
const view = (req,res) => {
    const {id} = req.params
    Product.findById({_id: ObjectId(id)})
    .then( result => res.send(result))
    .catch( error => res.send(error))
}

const store = (req,res)=> {
    const {name, price, stock, status} = req.body;
    const image = req.file;

    if (image) {
        const fixImage = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, fixImage);
        
        Product.create({name, price, stock, status, image_url : `http://localhost:${port}/public/${image.originalname}`})
        .then( result => res.send(result))
        .catch( error => res.send(error))
    
    } else {
        Product.create({name, price, stock, status})
        .then( result => res.send(result))
        .catch( error => res.send(error))
    }
}

const update = (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    const {id} = req.params;

    if (image) {
        const fixImage = path.join(__dirname,'../../uploads', image.originalname);
        fs.renameSync(image.path, fixImage)

        Product.updateOne({_id: ObjectId(id)}, {name, price, stock, status, image_url: `http://localhost:${port}/public/${image.originalname}`})
        .then( result => res.send(result))
        .catch( error => res.send(error))
    } else {
        Product.updateOne({_id: ObjectId(id)}, {name, price, stock, status})
        .then( result => res.send(result))
        .catch( error => res.send(error))   
    }

}

const destroy = (req,res) => {
    const {id} = req.params
    Product.deleteOne({_id: ObjectId(id)})
    .then( result => res.send([result, {message: `Documents with _id: ${id} have been deleted`}]))
    .catch( error => res.send(error))
} 

module.exports = {
    index,
    store,
    view,
    update,
    destroy
}