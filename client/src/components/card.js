import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minHeight: 200,
  }
});

export default function CARD(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{...props.style}}>
      <CardContent style={{textAlign:"center"}}>
        {props.children}
      </CardContent>
    </Card>
  );
}