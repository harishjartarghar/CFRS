exports.invite_subject='INVITE LINK';

exports.invite_template=(Tname,code,name,invite)=>{
	return `
	<p>Hello,</p>
	<p>${Tname} had invited to join the cousre name :${name} course code :${code}</p>
	<p>CLICK ON THE BELOW LINK TO JOIN.</p>
	<p>http://localhost:3000/join?invite=${invite}</p>
	`
};