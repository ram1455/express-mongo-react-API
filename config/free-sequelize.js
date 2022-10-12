const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    host        :'remotemysql.com',
    database    :'zhrVVYFUXx',
    username    :'zhrVVYFUXx',
    password    :'wz4odVLaL8',
    dialect     :'mysql',
    port        :3306
});

(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

module.exports = sequelize;