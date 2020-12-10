import React,{useState,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography,Slide} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import {NewCourse} from '../redux/actions/CourseActions';
import {INVITE} from '../redux/actions/CourseActions';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    marginLeft: theme.spacing(10),
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
  	 backgroundColor:'#eee',
  	 
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

function NEWCOURSE({open,toggle,item,...props}) {
  const classes = useStyles();
  const [email,setEmail]=useState([]);
  
  function send()
  {
  		if(email.length<=0)
  			{
  				props.Alert("no email is provided","error");

    			return;
  			}

  			props.SendInvite(email,item._id);

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
              Send Invite Link
            </Typography>
            <Button autoFocus variant="contained" color="secondary" onClick={send} >
              send
            </Button>
          </Toolbar>
         <Container className={classes.container}>
         	 <Autocomplete
        multiple
        id="tags-filled"
        style={{ width: 500 }}
        options={[]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
           <>{setEmail(value)} <Chip variant="outlined" label={option} {...getTagProps({ index })} /></>
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Enter Email IDs"  />
        )}
      />
     		
           
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
    SendInvite:(email,id)=>{dispatch(INVITE(email,id))}
}
}


export default connect(null,mapDispatchToProps)(NEWCOURSE);