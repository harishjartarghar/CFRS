var nodemailer=require("nodemailer");

//configure the parameters
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.email,
	pass: process.env.password
	},
	tls: {
		rejectUnauthorized: false
	}
};
var smtpTransport = nodemailer.createTransport(smtpConfig);

exports.MAIL=(email,template,subject)=>{
	mailOptions={
		from:'"CFRS" <noreply@cfrs.com>',
		to : email,
		subject:subject ,
        html: template
	}
   
	//sending the mail
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
			return;
	 }else{
console.log("mail sent to",email);
        
		return;
    	 }
});
}
