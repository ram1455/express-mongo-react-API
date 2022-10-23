const {MongoClient} = require('mongodb');

// mongodb://usernya:pwusernya@localhost:27017?authSource=sourcedatabasenya
const url = 'mongodb://eduwork:eduwork@localhost:27017?authSource=admin';
const client = new MongoClient(url);

( async ()=>{
    try {
        await client.connect();
    console.log('koneksi ke mongodb berhasil');
    } catch (error) {
        console.log(error);
    }
})();

const db = client.db('eduwork-mongo');

module.exports = db;
