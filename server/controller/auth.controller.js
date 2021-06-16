const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/config");



exports.REGISTER_USER=async (req,res)=>{

	const {name,
    email,
    usn,
    branch,
    password,
    type,
    isTeacher}=req.body;
console.log(req.body);

var newUser;

	if (!email || !name || !branch || !password || !type) 
       return res.status(400).json({message: 'Invalid Request !'});

   const user=await User.findOne({email:email});
   if(user) return res.status(400).json({message: 'Email is Already Registered'});

   if(!isTeacher)
   {
    const user2=await User.findOne({usn:usn});
   if(user2) return res.status(400).json({message: 'USN is Already Registered'});
   }

   //hashing password
     const salt=await bcrypt.genSalt(12);
     const hashedpassword=await bcrypt.hash(password,salt);
      
   try{
   	newUser=new User({name,
							email,
							usn,
							branch,
							password:hashedpassword,
							type,
							isTeacher
						});

   await newUser.save();
 }catch(error)
{
	return res.status(500).json({message: 'Someting went wrong!'});
}

 const token=jwt.sign({_id:newUser._id},config.JWT_SECRET)


   res.status(201).json({token,newUser});
   
       
}


exports.LOGIN_USER=async (req,res)=>{

	const {email,password}=req.body;
	console.log(req.body)

	 // Validate request
  if (!email || !password) {
    res.status(400).json({
      message: "Invalid request!"
    });
  }

  const user=await User.findOne({email:email});
  if(!user) return res.status(400).json({message: 'Email is not Registered!'});

  const passCheck=await bcrypt.compare(password,user.password);

  if(!passCheck) return res.status(400).json({message: 'Password is wrong!'});


  const token=jwt.sign({_id:user._id},config.JWT_SECRET)
  res.status(201).json({token,user});
  
}

