import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
});

export default function CARD(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent style={{textAlign:"center"}}>
        {props.children}
      </CardContent>
    </Card>
  );
}