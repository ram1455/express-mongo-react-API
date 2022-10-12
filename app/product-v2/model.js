// model.js ini sebagai tempat untuk merancang tabel database
const { DataTypes } = require('sequelize')
const sequelize = require('../../config/free-sequelize')

// variabel Product ini merancang tabel database, menggunakan define('nama database',{ format : {format isi tabel databasenya} } )
const Product = sequelize.define('product',{
    users_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    price : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    image_url : {
        type: DataTypes.TEXT
    },
},{
    // Other model options go here
  });

module.exports = Product;