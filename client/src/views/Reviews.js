import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Card from '../components/card';
import AddBoxIcon from '@material-ui/icons/AddBox';

import {Grid,Menu,MenuItem,Chip,TextField,Tooltip} from '@material-ui/core';


class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      

        
    };
   
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
      
             
               <Grid item xs={12} sm={12} md={3} >
               		<Card>
               		<>
               			<img style={{maxheight:"60%",maxWidth:"50%"}} src="https://icons.iconarchive.com/icons/graphicloads/long-shadow-documents/256/document-add-icon.png"/>
               			<Typography style={{marginTop:"5px"}}>Create Review</Typography>
               		</>
               		</Card>
              </Grid>

	</Grid>

	
 

			

      </div>
    );
  }
}

export default Reviews;