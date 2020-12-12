const Course = require("../model/course");
const User = require("../model/user");
const Review = require("../model/review");
const {invite_subject,invite_template}=require("../config/email_template");
const {MAIL}=require("../config/nodemailer");
var mongoose = require('mongoose');


exports.NEW_COURSE=async (req,res)=>{

	const {department,name,code}=req.body;
	

  if (!name || !code || !name) {
    res.status(400).json({
      message: "Invalid request!"
    });
  }

  const course=await Course.findOne({teacher:req.user._id,code:code});
  if(course) return res.status(400).json({message:"Course Code is Already Created!"});

const NewCourse=new Course({code,name,department,teacher:req.user._id,invite:Date.now()});
await NewCourse.save();

await User.findByIdAndUpdate(req.user._id,{$push:{course:NewCourse._id}});

  res.status(201).json(NewCourse);
  
}




exports.GET_COURSE=async (req,res)=>{
 const course=await Course.find({teacher:req.user._id}).sort("_id:1");
  res.status(200).json(course);
  
}


exports.INVITE=async (req,res)=>{
 
  const {email,id}=req.body;
  console.log(email);
  const result=await Course.findById(id).populate("teacher");
  console.log(result);
  MAIL(email,invite_template(result.teacher.name,result.code,result.name,result.invite),invite_subject);
  res.status(200).json("done");
  
}

exports.JOIN_VERIFY=async (req,res)=>{
 
  const {id}=req.query;
  if(id==="null" || id===null || id===undefined) {
    return res.status(401).json({message:"Invite Link is not Valid!",status:1});
  };

  const course=await Course.findOne({invite:id});
  if(!course) {return res.status(401).json({message:"Invite Link is not Valid!",status:1});}

  const user=await Course.findOne({invite:id,students: { $in: [req.user._id] }});
  if(user) return res.status(401).json({message:"Already Joined The Course",status:1});

  res.status(200).json({success:"done",course});
  
}


exports.GET_STUDENT_COURSE=async (req,res)=>{
 const course=await User.findById(req.user._id).populate("course");
  console.log(course);
  res.status(200).json(course);
  
}


exports.JOIN=async (req,res)=>{
await Course.findByIdAndUpdate(req.body.id,{"$push":{students:req.user._id}});
await User.findByIdAndUpdate(req.user._id,{"$push":{course:req.body.id}});

  res.status(200).json(1);
  
}

exports.NEW_REVIEW=async (req,res)=>{
  const {code,question}=req.body;
  console.log(req.body)

  const course=await Course.findOne({teacher:req.user._id,code:code});
  const newReview=new Review({question,course:course._id});
  await newReview.save();
  console.log(newReview);
  return res.json(newReview);
  
  
}


exports.NEW_STUDENT_REVIEW=async (req,res)=>{
    const {review,code}= req.body;
    const course=await Course.findOne({code:code,students: { $in: [req.user._id] }});
    const r=await Review.findOneAndUpdate({course:course._id},{$push:{submissions:{student:req.user._id,review:review}}});
     await User.findByIdAndUpdate(req.user._id,{$push:{submission:r._id}})
     res.status(201).json("success");
  
}

exports.GET_STUDENT_REVIEW=async (req,res)=>{
  const course=await Course.findOne({code:req.query.code,students: { $in: [req.user._id] }});
  const review=await Review.find({course:course._id}).populate("course");
  const user=await User.findById(req.user._id);
  console.log(user)
  res.status(200).json({review,submission:user.submission});
  
}

exports.GET_REVIEW=async (req,res)=>{
 const review=await Review.find().populate({path: 'course',
          match: {teacher: req.user._id,
           code:req.query.code
        }});



  res.status(200).json(review);
  
}


exports.GET_DATA=async (req,res)=>{
   const result=await Review.aggregate([{$match:{_id:mongoose.Types.ObjectId(req.query.id)}},{$unwind:"$submissions"},{$unwind:"$submissions.review"},
  {
    $group:{
      _id:"$submissions.review.question",
      average:{$avg:"$submissions.review.rating"}

    }
  }

    ]);
   
   var label=[],value=[];
   for(var i=0;i<result.length;i++)
      label.push(result[i]._id);
   for(var i=0;i<result.length;i++)
      value.push(result[i].average);

  return res.json({label,value});
}