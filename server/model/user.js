const mongoose=require('mongoose');




const UserSchema=mongoose.Schema({
	name:String,
    email:String,
    usn:String,
    branch:String,
    password:String,
    isTeacher:Boolean,
    type:String   
});

const User=mongoose.model('User',UserSchema);

module.exports=User;