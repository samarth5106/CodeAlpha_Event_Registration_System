const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
        name:{
            type: String,
            required:true,
            trim:true,
        },

        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        
        myRegistrations:[{
            type: mongoose.Schema.Types.ObjectsId,
            ref:'events',

        }]

},
{timestamps: true});

const User=mongoose.model('user',userSchema);
module.exports=User;