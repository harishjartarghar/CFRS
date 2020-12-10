const jwt=require('jsonwebtoken');
const config = require("../config/config");
const User = require("../model/user");

exports.TeacherVerify=(req,res,next)=>{
    const token=req.header('token');
    if(!token) return res.status(401).json({message:"Acess Denied"});

    try {
        
        const verified=jwt.verify(token,config.JWT_SECRET);
        User.findById(verified._id).then(userdata=>{
            req.user = userdata;
            req.user.password=undefined;

            if(req.user.isTeacher)
            	next()
            else
            	return res.status(401).json({message:"Acess Denied"});
        });

    } catch (error) {
        return res.status(400).json({ message: 'Token is not valid' ,error:error});
    }
}




exports.StudentVerify=(req,res,next)=>{
    const token=req.header('token');
    if(!token) return res.status(401).json({message:"Login to Access the Webpage!",status:0});

    try {
        
        const verified=jwt.verify(token,config.JWT_SECRET);
        User.findById(verified._id).then(userdata=>{
            req.user = userdata;
            req.user.password=undefined;
            if(!req.user.isTeacher)
                next()
            else
                return res.status(401).json({message:"Acess Denied",status:1});
            
        });

    } catch (error) {
        return res.status(400).json({ message: 'Login to Access the Webpage!' ,error:error,status:1});
    }
}