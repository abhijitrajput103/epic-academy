const mongoose=require('mongoose');
// const bcrypt=require('bcrypt')
const contactusSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
});
const contactModel=mongoose.model('contactus',contactusSchema);
module.exports=contactModel