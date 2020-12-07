const express=require('express');
const app = express();
const {
		REGISTER_USER,
		LOGIN_USER
	  }=
require('../controller/auth.controller');

//Donor
app.route("/signup")
   .post(REGISTER_USER)

//Save Donor
app.route("/signin")
   .post(LOGIN_USER)
 



module.exports =app;