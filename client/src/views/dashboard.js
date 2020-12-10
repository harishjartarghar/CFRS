import React,{ useEffect,useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {Grid,Menu,MenuItem,Chip,TextField,Tooltip} from '@material-ui/core';
import Card from "../components/Card/Card.js";
import CArdHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/views/dashboardStyle.js";
import {GetCourse} from '../redux/actions/CourseActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Update from '@material-ui/icons/Update';
import Delete from '@material-ui/icons/Delete';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NewCourse from '../components/newCourse';
import Invite from '../components/invite';

const useStyles = makeStyles(styles);

function Dashboard(props) {
 
const classes = useStyles();
const [name,setName]=useState("");
const [code,setCode]=useState();
const [department,setDepartment]=useState();
const [item,setItem]=useState(null);
const [open2,setOpen2]=useState(false);
const [open3,setOpen3]=useState(false);
 
   useEffect(()=>{
    props.GET_COURSES(JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")).isTeacher:false);
  },[]);
 


    return (
      <div style={{height:"fit-content",marginLeft:"50px"}}>
      <Grid item container xs={12} spacing={5}>
      	{
          props.course.course.map(item=>{
            return (
              <Grid item xs={12} sm={12} md={3} key={item.code}>
                <Card  className={classes.background} onClick={()=>{props.history.push("/dashboard/"+item.code)}}>
                  <CArdHeader  color="danger">
                    <img  style={{maxheight:"100%",maxWidth:"100%"}} src="https://img.freepik.com/free-vector/empty-school-class-conference-background_23-2148701192.jpg?size=626&ext=jpg"/>
                  </CArdHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Course Name : {item.name}</h4>
                    <p className={classes.cardCategory}>Course Code : {item.code}</p>
                  </CardBody>
                  {props.auth.isTeacher?<CardFooter chart >
                                      <div className={classes.stats}>
                                        Created : {moment(item.date).format("DD-MM-YYYY")} 
                                      </div>
                  
                                     <Tooltip title="Invite/Add Student" aria-label="add" arrow>
                                      <PersonAdd onClick={()=>{setItem(item);setOpen3(true)}}/>
                                    </Tooltip>
                                    <Tooltip title="Update" aria-label="add" arrow>
                                      <Update style={{color:"orange"}} onClick={()=>{setName(item.name);setOpen2(true)}}/>
                                      </Tooltip>
                                      <Tooltip title="Delete Course" aria-label="add" arrow>
                                      <Delete style={{color:"red"}}/>
                                      </Tooltip>
                                      
                                    </CardFooter>:null}
                </Card>
              </Grid>
              );
          })
        }

	</Grid>
 

    <NewCourse open={open2} toggle={()=>{setOpen2(!open2)}} create={false} uname={name}/> 
    <Invite open={open3} toggle={()=>{setOpen3(!open3)}} item={item}/> 

       
      </div>
    );
}


const mapStatetoProps=(state)=>{
    return{
      course:state.course,
      auth:state.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
return{
    GET_COURSES:(isTeacher)=>{dispatch(GetCourse(isTeacher))},
}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Dashboard);
