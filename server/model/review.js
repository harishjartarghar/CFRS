const mongoose=require('mongoose');




const ReviewSchema=mongoose.Schema({
	course: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    date:{type:Date,default:Date.now},
    question:[String],
    submissions:[{
        student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        },
        review:[{level:Number,question:String,rating:Number}]
    }
    ]
});



const Review=mongoose.model('Review',ReviewSchema);

module.exports=Review;