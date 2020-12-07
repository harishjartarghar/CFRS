import React,{useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Button,TextField,Link,Grid,Typography,Container} from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './style.css';
import {BRANCH} from '../utils/constants';
import AutoComplete from '../components/autocomplete';
import {signUp} from '../redux/actions/authActions';
import {showSnackbarAction} from '../redux/actions/snackbarAction';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:"10px",
  },
  avatar: {
    margin: "50px auto",
    backgroundColor: theme.palette.secondary.main,
    textAlign:"center"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),

    
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

  },
   card: {
   
    height:"50%",
    textAlign:"center",
    background:"rgb(f,f,f,f.4)",

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

}));



const Student=(props)=>{
const classes = useStyles();

  const [formData,setFormData] = useState({
  	name:"",
    email:"",
    usn:"",
    branch:"",
    password:"",
    rpassword:"",
    Eemail:false,
    Ename:false,
    Eusn:false,
    Ebranch:false,
    Epassword:false,
    Erpassword:false,
    type:"student",
    isTeacher:false
});


const {email,password,Eemail,Epassword,
		name,usn,branch,Ename,Eusn,Ebranch,Erpassword,rpassword} = formData;

const onChange = (name,value)=>{
    setFormData({...formData , [name]:value})
}

const onSubmit = async (e)=>{

    e.preventDefault();
    if(name==="") {onChange("Ename",true);props.Alert("Name is required!","error");  return}
    if(email==="") {onChange("Eemail",true);props.Alert("Email is required!","error"); return}
    if(usn==="") {onChange("Eusn",true);props.Alert("USN is required!","error"); return}
    if(branch==="") {onChange("Ebranch",true);props.Alert("Branch is required!","error"); return}
    if(password==="") {onChange("Epassword",true);props.Alert("Password is required!","error"); return}
    if(rpassword==="") {onChange("Erpassword",true); props.Alert("Re-Password is required!","error"); return}
    if(password!==rpassword){props.Alert("Passwords do not match! ","error"); return}
  	props.SignUp(formData,props);
}

if(props.auth.isAuthenticated)
    {
        props.history.push("/dashboard");
    }

  return (
  	<div className="login">
    <Container className="Container" component="main" maxWidth="xs" style={{textAlign:"center",display:"flex"}} > 
      <Container component="main" maxWidth="xs" style={{backgroundColor:"rgba(255,255,255, 0.5)",borderRadius:"10px"}}>
      <div className={classes.paper}>
        <Typography style={{paddingTop:"10px",marginTop:"20px"}} component="h1" variant="h4">
          Student Registration
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
        	<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
            label="Name"
            name="name"
            autoFocus
            error={Ename}
           	size="small"
            InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
            label="Email Address"
            name="email"
            error={Eemail}

            size="small"
            InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
            error={Eusn}
   
            name="usn"
            label="USN"
            id="usn"
           
            size="small"
            InputLabelProps={{
            shrink: true,
          }}
          />
          <AutoComplete list={BRANCH} label="Branch" onInput={onChange} error={Ebranch}/>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
            error={Epassword}

            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
            InputLabelProps={{
            shrink: true,
          }}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
            error={Erpassword}
          
            name="rpassword"
            label="Re-Password"
            type="password"
            id="rpassword"
            size="small"
            InputLabelProps={{
            shrink: true,
          }}
          />
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            sign up
          </Button>
        </form>
      </div>
      </Container>
    </Container>
    </div>
  );
}


const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}


const mapDispatchToProps=(dispatch)=>{
return{
    SignUp:(NewUser,props)=>{dispatch(signUp(NewUser,props))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}


export default connect(mapStatetoProps,mapDispatchToProps)(Student);




           