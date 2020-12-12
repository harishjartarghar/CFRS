import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {Typography,Button} from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Card from '../components/card';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Review from '../components/submitReview';
import NewReview from '../components/newReview';
import {Grid,Menu,MenuItem,Chip,TextField,Tooltip} from '@material-ui/core';
import NewCourse from '../components/newCourse';
import { connect } from 'react-redux';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import {GET_REVIEW,REVIEW_SUBMIT} from '../redux/actions/CourseActions';
import moment from 'moment';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form:false,
      item:{question:[""]},
      review:{level:0,question:"",rating:0},
      hide:false,
      list:{}

    };
   
  }

 componentDidMount=()=>{

  this.props.Get_Review(this.props.match.params.id,JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")).isTeacher:false);
  
  var list={};
  this.props.course.submission.map(item=>{
      list[item]=1;
  });
   this.setState({list:list})

 }
 
 handle=(index,value)=>{
   var list=this.state.review;
   list[index]["rating"]=value;
   this.setState({review:list})
    

  };

 handleChange=(item)=>{
  var list=[];

   item.question.map((x,index)=>{
    list.push({level:index,question:x,rating:0})
   });
  this.setState({item:item,form:true,review:list})
 }

onSubmit=()=>
{


this.props.Review_Submit(this.state.review,this.props.match.params.id);
 this.setState({form:false,hide:true});

}

  render() {
   

   

    return (
      <div>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" onClick={()=>{this.props.history.push("/dashboard");}}>
				Course
				</Link>
				<Typography color="textPrimary">{this.props.match.params.id}</Typography>	
			</Breadcrumbs>

			<Grid item container xs={12} spacing={5} style={{marginLeft:"4px",marginTop:"4px"}}>
      
               {this.props.course.review.map(item=>(

                                 <Grid item xs={12} sm={12} md={3} >
                                 <Card  style={{background:'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("https://i.pinimg.com/originals/30/a6/a5/30a6a53817e8303433f308f9ec852a04.jpg") '}}>
                                 <div style={{marginTop:"1px"}}>
                                   <Typography style={{marginTop:"5px",fontFamily:"monospace",fontSize:"20px"}} onClick={()=>{this.props.history.push("/dashboard/"+this.props.match.params.id+"/"+item._id);}}>Date: {moment(item.date).format("DD-MM-YYYY")}</Typography>
                                   <Typography style={{marginTop:"5px",fontFamily:"monospace",fontSize:"20px"}}>Submission:{item.submissions?item.submissions.length:null}</Typography>
                                   <Typography style={{marginTop:"5px",fontFamily:"monospace",fontSize:"20px"}}>Total Students: {item.course.students?item.course.students.length:null}</Typography>

                                    { this.props.auth.isTeacher || this.state.hide || this.state.list[item._id] ?null:<Button autoFocus variant="contained" color="secondary" style={{marginTop:"30px"}} onClick={()=>this.handleChange(item)}>
                                                                          Submit Review
                                                                        </Button>}
                            {  this.props.auth.isTeacher?     <FormGroup row >
                                                 <FormControlLabel
                                                   control={<Checkbox checked   name="checkedA"  style={{fontFamily:"monospace"}}/>}
                                                   label="Accept Submission"
                                                   style={{margin:"auto",paddingTop:"20px",}}
                                                 />
                                                 </FormGroup>:null}
                                 </div>
                                 </Card>
                             </Grid>
                              ))}
              
              
             
             
             {JSON.parse(localStorage.getItem("user")).isTeacher? <Grid item xs={12} sm={12} md={3} >
                               <Card  >
                               <div onClick={()=>{this.setState({form2:true})}}>
                                 <img style={{maxheight:"60%",maxWidth:"50%"}} src="https://icons.iconarchive.com/icons/graphicloads/long-shadow-documents/256/document-add-icon.png"/>
                                 <Typography style={{marginTop:"5px"}}>Create Review</Typography>
                               </div>
                               </Card>
                           </Grid>:null}
            


	</Grid>

	
 <Review open={this.state.form} toggle={()=>{this.setState({form:false})}} questions={this.state.item.question} review={this.state.review} handleChange={this.handle} submit={this.onSubmit}/>
 <NewReview open={this.state.form2} toggle={()=>{this.setState({form2:false})}} code={this.props.match.params.id}/>

			

      </div>
    );
  }
}


const mapStatetoProps=(state)=>{
    return{
      auth:state.auth,
      course:state.course
    }
}



const mapDispatchToProps=(dispatch)=>{
return{
    Get_Review:(code,isTeacher)=>{dispatch(GET_REVIEW(code,isTeacher))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
    Review_Submit:(review,code)=>{dispatch(REVIEW_SUBMIT(review,code))}
}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Reviews);
