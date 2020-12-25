const mongoose=require('mongoose');




const CourseSchema=mongoose.Schema({
	name:String,
    code:String,
    department:String,
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },
    students:[ {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    date:{
        type:Date,
        default:Date.now
    },
    invite:String,
    reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    }
    ]
});

const Course=mongoose.model('Course',CourseSchema);

module.exports=Course;