const Course = require("../model/course");
const User = require("../model/user");
const {invite_subject,invite_template}=require("../config/email_template");
const {MAIL}=require("../config/nodemailer");

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
  console.log(course);
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
  console.log(user);
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



