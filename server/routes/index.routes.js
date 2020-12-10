const express=require('express');
const app = express();
const {
		NEW_COURSE,
		GET_COURSE,
		INVITE,
		JOIN_VERIFY,
		GET_STUDENT_COURSE,
		JOIN
	  }=
require('../controller/index.controller');

const {TeacherVerify,StudentVerify}=require('../middleware/auth');

//teacher
app.route("/new_course")
   .post(TeacherVerify,NEW_COURSE)
   .get(TeacherVerify,GET_COURSE)

app.route("/invite")
   .post(TeacherVerify,INVITE)


app.route('/join_verify')
   .get(StudentVerify,JOIN_VERIFY)


app.route('/student_course')
   .get(StudentVerify,GET_STUDENT_COURSE)
   .post(StudentVerify,JOIN)



module.exports =app;