const mongoose = require('mongoose');

const studentdetailSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
    
});
const studentModel = mongoose.model('studentdetails', studentdetailSchema);
module.exports = studentModel;