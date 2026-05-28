const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
        lowercase:true,

    },
    description:{
        type:String,
        required:true,

    },
    date:{
        required:true,
        type:Date,

    },
    location:{
        required:true,
        type:String,

    },
    maxCapacity:{
        required:true,
        type:Number,

    },
    registeredUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }],

},{timestamp:true});

const Event=mongoose.model('event',eventSchema)
module.exports=Event;