const mongoose=require('mongoose');




const UserSchema=mongoose.Schema({
	name:String,
    email:String,
    usn:String,
    branch:String,
    password:String,
    isTeacher:Boolean,
    type:String,
    course:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
    ],
    submission:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    }   
    ]   
});

const User=mongoose.model('User',UserSchema);

module.exports=User;