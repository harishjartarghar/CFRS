import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography,Slide} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import {NewCourse} from '../redux/actions/CourseActions';

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

function NEWCOURSE({open,toggle,create,...props}) {
  const classes = useStyles();
  const [name,setName]=useState("");
  const [Ename,setEName]=useState(false);
  const [code,setCode]=useState("");
  const [Ecode,setECode]=useState(false);
  const [department,setDepartment]=useState("");
  const [Edepartment,setEDepartment]=useState(false);

  

function onSubmit()
{
  if(name==="" || name===null)
  {
    setEName(true);
    setEDepartment(false);
    setECode(false);

    props.Alert("Course Name is required!","error");

    return;
  }

  if(code==="" || code===null)
  {
    setEName(false);
    setEDepartment(false);
    setECode(true);
    props.Alert("Course Code is required!","error");
    return;
  }

  if(department==="" || department===null)
  {
    setEName(false);
    setEDepartment(true);
    setECode(false);
    props.Alert("Department is required!","error");
    return;
  }

  props.NewCourse({name,code,department});
  setName("");
  setDepartment("");
  setCode("");
  toggle();



}


  return (
    <Container   maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
    
      <Dialog    open={open} onClose={toggle}  TransitionComponent={Transition}>
        
       
        <div className={classes.root}>
        <Toolbar className={classes.tool}>
            <IconButton edge="start" color="inherit" onClick={toggle} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {create?"New Course":"Update Course"}
            </Typography>
            <Button autoFocus variant="contained" color="secondary" onClick={onSubmit}>
              {create?"Create":"update"}
            </Button>
          </Toolbar>
         <Container className={classes.container}  maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            
            
            <Grid item xs={12}>
               <TextField
                autoComplete="name"
                value={name}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Course Name"
                onChange={(e)=>setName(e.target.value)}
                InputLabelProps={{
            shrink: true,
          }}
                
               value={name}
              
                 error={Ename}
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
                onChange={(e)=>setCode(e.target.value)}
                value={code}
                InputLabelProps={{
            shrink: true,
          }}
           
            
                 error={Ecode}
              />
            </Grid>

            <Grid item xs={12}>
               <TextField
                autoComplete="department"
                name="department"
                variant="outlined"
                required
                fullWidth
                id="department"
                label="Department"
                onChange={(e)=>setDepartment(e.target.value)}
                value={department}
                InputLabelProps={{
            shrink: true,
          }}
           
            
                 error={Edepartment}
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
    NewCourse:(cousre)=>{dispatch(NewCourse(cousre))}
}
}


export default connect(null,mapDispatchToProps)(NEWCOURSE);