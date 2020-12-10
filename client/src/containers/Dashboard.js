import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import routes from '../utils/routes';
import Sidebar from '../components/sidebar';
import { Route, Switch, Redirect } from "react-router-dom";
import {Fab,CssBaseline,Tooltip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { connect } from 'react-redux';
import NewCourse from '../components/newCourse';
import Reviews from '../views/Reviews';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#eee",
    position: 'relative',
    height:"fit-content"
 
  }
,
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
     marginLeft: 0,
  },
}));

function Dashboard(props) {
  const classes = useStyles();
 const [open, setOpen] = React.useState(false);
 const [open2, setOpen2] = React.useState(false);
 const [item, setItem] = React.useState({name:"",code:"",department:""});


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if(!localStorage.getItem("jwt"))
    {
        props.history.push("/login");
    }

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
     <Sidebar {...props} routes={routes} open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
            {routes.map((prop, key) => {
             return   (
                <Route
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                  
                />
              );
            })}
             <Route
                  path="/dashboard/:id"
                  component={Reviews}
                  
                />
            <Redirect to="/dashboard"/>
          </Switch>
      </main>
     {props.auth.isTeacher?
      <Tooltip title="Create New Course" aria-label="add" arrow>
      <Fab onClick={()=>{setOpen2(true)}} color="primary"  className={classes.fab} aria-label="add">
        <AddIcon />
    </Fab>
    </Tooltip>:
    null}
      
    </div>
    <NewCourse open={open2} toggle={()=>{setOpen2(!open2)}} create={true} data={item}/> 
    </>
  );
}


const mapStatetoProps=(state)=>{
    return{
      auth:state.auth
    }
}




export default connect(mapStatetoProps)(Dashboard);