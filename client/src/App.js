import React, { Component } from 'react';
import './App.css';
// import NavBar from './components/layouts/NavBar';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Student from './containers/Student';
import Teacher from './containers/Teacher';
import Dashboard from './containers/Dashboard';
import JOIN from './views/join';
import { connect } from 'react-redux';
import { CHECK_AUTH } from './redux/actions/authActions';
import SnackBar from './components/snackbar';




class App extends Component {
 




  render(){
  this.props.Check_Auth();
    
  return (
      <div className="App">
        <SnackBar/>
        <Switch>
           <Route exact path="/" component={Home} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/student/signup" component={Student} />
           <Route exact path="/teacher/signup" component={Teacher} />
           <Route path="/dashboard" component={Dashboard} />
           <Route path="/join" component={JOIN} />
           <Redirect to="/"/>
        </Switch>
       
       
      </div>
  );
  }
}



const mapDispatchToProps=(dispatch)=>{
  return {
    Check_Auth:()=>{dispatch(CHECK_AUTH())}
  }
}



export default connect(null,mapDispatchToProps)(App);