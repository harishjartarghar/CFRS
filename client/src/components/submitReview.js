import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography,Slide} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import {NewCourse} from '../redux/actions/CourseActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CancelIcon from '@material-ui/icons/Cancel';
import {NEW_REVIEW} from '../redux/actions/CourseActions';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

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

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide s direction="up" ref={ref} {...props} />;
});

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function NEWCOURSE({open,toggle,code,questions,review,handleChange,submit,...props}) {
  const classes = useStyles();
  const [Review,setReview]=useState(review);
  const [loading,setLoading]=useState(true);


  // handle click event of the Remove button
function handleRemoveClick(index) {
    var list = [...questions];
    list=questions.filter((name,i)=>i!=index)
    //setQuestions(list);
  
  };


 





  return (
    <Container   maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
    
      <Dialog scroll="paper"  open={open} onClose={toggle}  TransitionComponent={Transition}>
        
       
        <div className={classes.root}>
        <Toolbar className={classes.tool}>
            <IconButton edge="start" color="inherit" onClick={toggle} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              New Review
            </Typography>
            <Button autoFocus variant="contained" color="secondary" onClick={submit}>
              Create
            </Button>
          </Toolbar>
         
          
         <Container className={classes.container}  maxWidth="xs" >
        <form className={classes.form} noValidate>

        <Grid container spacing={2}>
            
            
          {
            questions.map((item,index)=>(
              <>
            <Grid item xs={12}>
               <Typography>{index+1}. {item}</Typography> 
            </Grid>

            <Grid item xs={6} style={{textAlign:"center"}}>
               <Typography>Rating: </Typography>
            </Grid>
            <Grid item xs={6} style={{margin:"auto"}}>
                 <Rating
          name={"customized-icons"+index}
          value={review[index]?review[index].rating:0}
          onChange={(e,newvalue)=>{handleChange(index,newvalue)}}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
        />
            </Grid>
            </>
           
              ))
          }
            
 
            
            
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
    NewReview:(code)=>{dispatch(NEW_REVIEW(code))}
}
}


export default connect(null,mapDispatchToProps)(NEWCOURSE);