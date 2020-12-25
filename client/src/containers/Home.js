import React, { Component } from 'react';
import Footer from "../components/Footer";

import PermanentDrawerLeft from "../components/PermanentDrawerLeft"



class Home extends Component {
 
  render(){
  
  return (
      <div >
        <PermanentDrawerLeft {...this.props}/>
      
      <Footer />
      </div>
  );
  }
}







export default Home;