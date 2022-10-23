const mongoose = require('mongoose')
mongoose.connect('mongodb://eduwork:eduwork@localhost:27017/eduwork-mongoose?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('server database terhubung'));

