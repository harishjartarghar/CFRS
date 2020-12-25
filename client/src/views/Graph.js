import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Line from '../components/lineChart';
import {GET_DATA} from '../redux/actions/CourseActions';
import { connect } from 'react-redux';



class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
 
    };
   
  }

 
  
  componentDidMount=()=>{

this.props.Get_Data(this.props.match.params.code);

 }

  render() {
   

   

    return (
      <div style={{maxWidth:"75%",maxHeight:"75%",margin:"auto"}}>
       <Line d={this.props.course.data}/>
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
    Get_Data:(id)=>{dispatch(GET_DATA(id))},
}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Graph);