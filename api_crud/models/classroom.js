const mongoose = require('mongoose');



//Classroom Schema

const Classroom = mongoose.model('Classroom', {
    campus: {
        type:String,
        required:true
    },
    building: {
        type:String,
        required:true
    },
    room: {
        type:String,
        required:true
    },
    projectorCount: {
        type:String,
        required:true
    },
    projectorModel: {
        type:String,
        required:true
    },   
    projectorIP: {
        type:String,
        required:true
    }
});


module.exports = { Classroom }
