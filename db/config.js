const mongoose = require('mongoose');
var con=mongoose.connect('mongodb+srv://admin:admin@cluster0.a99sa.mongodb.net/testingdemo?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true})
        .then(()=>console.log('Connected Successfully'))
    .catch((err)=>console.log(err));

// var con = mongoose.connect('mongodb://localhost:27017/demo',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('Connected Successfully'))
//     .catch((err) => console.log(err));

module.exports = con;