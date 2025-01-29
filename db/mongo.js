const mongoose = require('mongoose');
// var con=mongoose.connect('mongodb+srv://admin:admin@cluster0.a99sa.mongodb.net/testingdemo?retryWrites=true&w=majority&appName=Cluster0',
//     {
//         useNewUrlParser:true,
//         useUnifiedTopology:true})
//         .then(()=>console.log('Connected Successfully'))
//     .catch((err)=>console.log(err));

var con = mongoose.connect('mongodb://localhost:27017/demo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected Successfully'))
    .catch((err) => console.log(err));

const listSchema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    //
    date:
    {
        type:Date,
        default:Date.now
    }

})    
const Playlist=new mongoose.model("Playlist",listSchema);

//Create Document or Insert
const createDocument = async()=>{
    try{
        const productList2=new Playlist({
            name:'Sita',
            email:'sita@gmai.com'
        })
        //first method to save data
        //productList2.save()
        const productList3=new Playlist({
            name:'Abhijit',
            email:'abhi@gmai.com'
        })
        const productList4=new Playlist({
            name:'Geeta',
            email:'geet@gmai.com'
        })
        const result=await Playlist.insertMany([productList2,productList3,productList4]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
createDocument();