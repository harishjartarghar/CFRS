import React,{useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Button,TextField,Link,Grid,Typography,Container} from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './style.css';
import {Login} from '../redux/actions/authActions';
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
    marginTop: theme.spacing(5),

    
  },
  submit: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),

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



const LogiN=(props)=>{
const classes = useStyles();

  const [formData,setFormData] = useState({
    email:"",
    password:"",
    Eemail:false,
    Epassword:false
});


const {email,password,Eemail,Epassword} = formData;

const onChange = (name,value)=>{
    setFormData({...formData , [name]:value})
}

const onSubmit = async (e)=>{

    e.preventDefault();
    if(email==="") {onChange("Eemail",true);props.Alert("Email is required!","error"); return}
    if(password==="") {onChange("Epassword",true); props.Alert("Password is required!","error"); return}
  	props.LOGIN(formData,props);
}

  if(localStorage.getItem("jwt"))
    {
        props.history.push("/dashboard");
    }


  return (
  	<div className="login">
    <Container className="Container" component="main" maxWidth="xs" style={{paddingTop:"50px",textAlign:"center",display:"flex"}} > 
      <Container component="main" maxWidth="xs" style={{backgroundColor:"rgba(255,255,255, 0.5)",borderRadius:"10px"}}>
      <div className={classes.paper}>
        <Typography style={{paddingTop:"10px",marginTop:"50px"}} component="h1" variant="h3">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={Eemail}
            helperText={Eemail?"Email is required!":null}
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
            error={Epassword}
            helperText={Epassword?"Password is required!":null}
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
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
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
    LOGIN:(UserCredentials,props)=>{dispatch(Login(UserCredentials,props))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(mapStatetoProps,mapDispatchToProps)(LogiN);




           