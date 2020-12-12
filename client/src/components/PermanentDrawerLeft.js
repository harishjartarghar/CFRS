import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import "./PermanentDrawerLeft.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  }
}));

export default function PermanentDrawerLeft(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Continuous Faculty Review System (CFRS)
          </Typography>
        
          &nbsp;&nbsp;
          {!localStorage.getItem("jwt")?<Button color="inherit" variant="outlined" onClick={()=>{props.history.push("/login")}}>
                      Login
                    </Button>:null}
          {localStorage.getItem("jwt")?<Button color="inherit" variant="outlined" onClick={()=>{props.history.push("/dashboard")}}>
                      Dashboard
                    </Button>:null}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <img src="https://www.careerindia.com/college-logo/128x128/10/RVCE%20Logo_1519896200.jpg" className="rv" />
        <Divider />
        
        <List>
          {["About Us", "Departments", "UG Programmes"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <ListIcon /> : <ListIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
   
          
            {!localStorage.getItem("jwt")?<><ListItem button onClick={()=>{props.history.push("/teacher/Signup")}} >
                          <ListItemIcon>
                            <ListIcon />
                          </ListItemIcon>
                          <ListItemText primary={"Faculty Signup"} />
                        </ListItem>
                        <ListItem button onClick={()=>{props.history.push("/student/Signup")}}>
                          <ListItemIcon>
                            <ListIcon />
                          </ListItemIcon>
                          <ListItemText  primary={"Student Signup"}/>
                        </ListItem></>:null}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <img
            src="https://gopuc.com/wp-content/uploads/reviewpics/rvce.jpg"
            className="college"
          />
        </Typography>
        <Typography paragraph>
          R.V. College of Engineering (RVCE) established in 1963 is one of the
          earliest self-financing engineering colleges in the country. The
          institution is run by Rashtreeya Sikshana Samithi Trust (RSST) a not
          for profit trust. The trust runs over 25 institutions and RVCE is the
          flagship institute under the trust. RVCE is today recognized as one of
          India’s leading technical institution.
        </Typography>
      </main>
    </div>
  );
}
