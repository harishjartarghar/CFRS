/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({list,label,onInput,error}) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={list}
      onChange={(e,newValue)=>{onInput("branch",newValue)}}
      getOptionLabel={(option) => option}
      style={{ marginTop:"10px",marginBottom:"5px" }}
      renderInput={(params) => <TextField {...params} error={error} label={label} variant="outlined"  InputLabelProps={{
            shrink: true,
          }}/>}
    />
  );
}


