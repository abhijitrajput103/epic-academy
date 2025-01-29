const mongoose=require('mongoose');
// const bcrypt=require('bcrypt')
const addcourseSchema=mongoose.Schema({
    coursename:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    courseimage:{
        type:String,
    },
    courseoverview:{
        type:String,
    },
    subjects:{
        type:Array,
    },
});
const addcourseModel=mongoose.model('addcourse',addcourseSchema);
module.exports=addcourseModel