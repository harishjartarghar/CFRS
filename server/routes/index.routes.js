const express=require('express');
const app = express();
const {
		NEW_COURSE,
		GET_COURSE,
		INVITE,
		JOIN_VERIFY,
		GET_STUDENT_COURSE,
		JOIN,
		NEW_REVIEW,
		GET_REVIEW,
		NEW_STUDENT_REVIEW,
		GET_STUDENT_REVIEW,
		GET_DATA
	  }=
require('../controller/index.controller');

const {TeacherVerify,StudentVerify}=require('../middleware/auth');

//teacher
app.route("/new_course")
   .post(TeacherVerify,NEW_COURSE)
   .get(TeacherVerify,GET_COURSE)

app.route("/invite")
   .post(TeacherVerify,INVITE)

 app.route("/review")
   .post(TeacherVerify,NEW_REVIEW)
   .get(TeacherVerify,GET_REVIEW)

app.route("/data")
   .get(TeacherVerify,GET_DATA)


app.route('/join_verify')
   .get(StudentVerify,JOIN_VERIFY)


app.route('/student_course')
   .get(StudentVerify,GET_STUDENT_COURSE)
   .post(StudentVerify,JOIN)

 app.route("/student_review")
   .post(StudentVerify,NEW_STUDENT_REVIEW)
   .get(StudentVerify,GET_STUDENT_REVIEW)


module.exports =app;