import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography,Slide} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import {GetCourseAndVerify} from '../redux/actions/CourseActions';
import {JOIN} from '../redux/actions/CourseActions';

const useStyles = makeStyles((theme) => ({
	root:{
		background:'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("https://i.pinimg.com/originals/30/a6/a5/30a6a53817e8303433f308f9ec852a04.jpg") ',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width:"100%",
		height:"100%",
    padding:"30px"

	},
  appBar: {
    position: 'relative',

  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign:"center"
  },
  paper: {
    marginTop: 'auto',
    marginDown: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"honeydew",


  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),

  },
    container:{
  	border:'2px solid rgb(138,35,135)',
  	padding:"20px",
  	 marginTop: theme.spacing(2),
  	 backgroundColor:'#eee'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  },

  tool:{
  	backgroundColor:'#eee',
  	border:'2px solid rgb(138,35,135)'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide s direction="up" ref={ref} {...props} />;
});

function NEWCOURSE(props) {
  const classes = useStyles();





 useEffect(()=>{

 	 let query =new URLSearchParams(props.location.search);
    props.GetCourseAndVerify(query.get("invite"),props);
  },[]);


if(!localStorage.getItem("jwt"))
    {
        props.history.push("/login");
    }

if(!props.course.join)
	return <div></div>

  return (
    <Container   maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
    
      <Dialog    open={true}   TransitionComponent={Transition}>
        
       
        <div className={classes.root}>
        <Toolbar className={classes.tool}>
        
            <Typography variant="h6" className={classes.title}>
          			Course Details
            </Typography>
            <Button autoFocus variant="contained" color="secondary" onClick={()=>props.JOIN(props.course.detail._id,props)}>
             	join
            </Button>	
          </Toolbar>
         <Container className={classes.container}  maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            
            
            <Grid item xs={12} style={{textAlign:"center"}}>
               <TextField
                autoComplete="name"
                value={props.course.detail.name}
                name="name"
                variant="outlined"
                required
                fullWidth

                diable
                id="name"
                label="Course Name"
               	defaultValue={props.course.detail.name}
                InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
          	  style: { textAlign: 'center' },
            readOnly: true,

          }}
                
            
              
                 
              />
            </Grid>
            <Grid item xs={12}>
               <TextField
                autoComplete="code"
                name="code"
                variant="outlined"
                required
                fullWidth
                id="code"
                label="Course Code"
                defaultValue={props.course.detail.code}
                
                value={props.course.detail.code}
                InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
          	  style: { textAlign: 'center' },
            readOnly: true,

          }}
           
            
                 
              />
            </Grid>



            


            
            
          </Grid>
          
          
        </form>
        </Container>
        </div>
      </Dialog>
    </div>
   
      
    </Container>

  );
}

const mapDispatchToProps=(dispatch)=>{
return{
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
    GetCourseAndVerify:(id,props)=>{dispatch(GetCourseAndVerify(id,props))},
    JOIN:(id,props)=>{dispatch(JOIN(id,props))}
}
}

const mapStatetoProps=(state)=>{
    return{
      course:state.course
    }
}


export default connect(mapStatetoProps,mapDispatchToProps)(NEWCOURSE);