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
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CancelIcon from '@material-ui/icons/Cancel';
import {NEW_REVIEW} from '../redux/actions/CourseActions';


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



function NEWCOURSE({open,toggle,code,...props}) {
  const classes = useStyles();
  const [questions,setQuestions]=useState(["Rate overall performance of faculty today.","Quality of content delivered.","Coverage of Syllabus (from exam P.O.V.)"," Innovative approaches shared."]);


  // handle click event of the Remove button
function handleRemoveClick(index) {
    var list = [...questions];
    list=questions.filter((name,i)=>i!=index)
    setQuestions(list);
  
  };
 
  // handle click event of the Add button
function handleAddClick(){
    setQuestions([...questions,""]);

  };


  function handleChange(value,index){
    var list=questions;
    list[index]=value;
    setQuestions(list);

  };

function onSubmit()
{
 
 if(questions.length<4)
 {
  props.Alert("Add Atleast 4 questions!","error");
  return;
 }

 props.NewReview(code,questions);
 toggle();

}



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
            <Button autoFocus variant="contained" color="secondary" onClick={onSubmit}>
              Create
            </Button>
          </Toolbar>
         
          
         <Container className={classes.container}  maxWidth="xs" >
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            
          {
            questions.map((item,index)=>(
              <>
            <Grid item xs={11}>
               <TextField
               multiline
                autoComplete="name"
               
                defaultValue={item}
                name="name"
                variant="outlined"
                required={(index+1===1)}
                fullWidth
                id="name"
                onChange={(e)=>{handleChange(e.target.value,index)}}
                label={"Question "+(index+1)}
                
                InputLabelProps={{
            shrink: true,
          }}
              />
            </Grid>
            <Grid item xs={1} style={{margin:"auto"}} onClick={()=>handleRemoveClick(index)}>
               <CancelIcon/>
            </Grid>
            </>
              ))
          }
            
 
            
            
          </Grid>
           <Grid item xs={12} style={{marginTop:"20px",textAlign:"center"}}>
                  <Button autoFocus variant="contained" color="secondary" onClick={handleAddClick}>
              Add
            </Button>
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
    NewReview:(code,questions)=>{dispatch(NEW_REVIEW(code,questions))}
}
}


export default connect(null,mapDispatchToProps)(NEWCOURSE);