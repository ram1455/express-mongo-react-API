const Product = require('./model')
const path = require('path')
const fs = require('fs')
const {Op, where} = require('sequelize')
let port = process.env.PORT || 3306; 

const index = async (req,res)=>{
    const search = req.query.keyword
    if (search) {
        try {
            let result = await Product.findAll({
                attributes:['id','users_id','name','price','stock','status','image_url'],
                where : {
                   [Op.or]: {
                        id :{
                                [Op.substring]: search
                        },
                        name : {
                                [Op.substring]: search
                        }
                   }
                }
            })
            res.json(result)
        } catch (error) {
            res.send(error)
        }
    } else {
        try {
            let result = await Product.findAll({
                attributes:['id','users_id','name','price','stock','status','image_url']})
            res.json(result)
        } catch (error) {
            res.send(error)
        }
    }
}

const view = async (req,res)=>{
    try {
        let result = await Product.findAll({
            attributes:['id','users_id','name','price','stock','status','image_url'],
            where : {
                id : {
                    [Op.eq] : req.params.id
                }
            }
        })
        res.json(result)
    } catch (error) {
        res.status(204)
        res.send('tidak ada')
    }
}

// fixImage ini untuk memodifikasi nama dan path baru dari image yang secara default namanya diubah, path.join(dirname sekarang, path dir wadah inputan, nama original)
// lalu kita rename dengan fs.rename(oldpath, new path) //oldpath = image.path //new path = target
const store = async (req,res)=> {
    const { users_id, name, price, stock, status } = req.body;
    const image = req.file
    
    if (image) {
        const fixImage = path.join(__dirname, '../../uploads',image.originalname)
        fs.renameSync(image.path, fixImage)
        try {
            await Product.sync();
            
            const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:${port}/public/${image.originalname}`})
            res.status(201) 
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    } else {
        try {
            await Product.sync();
            await Product.create({users_id, name, price, stock, status})
            const result = await Product.findAll()
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    }
}

const update = async (req,res)=>{
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file
    if (image) {
        const fixImage = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, fixImage)
        
        await Product.update({users_id, name, price, stock, status, image_url: `http://localhost:${port}/public/${image.originalname}`},{where : {
            id : req.params.id
        }})

        const result = await Product.findAll({
            attributes:['id','users_id','name','price','stock','status','image_url'],
            where:{id : req.params.id}
        })
        res.send(result)
    } else{
        await Product.update({users_id, name, price, stock, status},{where : {
            id : req.params.id
        }})
        const result = await Product.findAll()
        res.send(result)
    }
}

const destroy = async (req,res)=>{
    try {
        await Product.destroy({where: {
            id: req.params.id
        }})
        await Product.findAll({where: {
            id: req.params.id
        }}) 
        
        let result = [{
            data : ` data with ID:${req.params.id} has been deleted`
        }]
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}
