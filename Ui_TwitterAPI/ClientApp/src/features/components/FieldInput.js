import * as React from 'react';
import {   FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import Box from '@mui/material/Box';
import BasicDatePicker from './BasicDatePicker';
 export const   FieldsBox=({FieldsArray=[],...props})=>{
 
    return<>
       <Box
      component="form"
      sx={{
        boxShadow: 4 ,padding:2,borderRadius:5,borderLeft:5,borderColor:'black',borderRight:5
      }}
      noValidate
      autoComplete="off"
     > 
    <div>
    {FieldsArray.map((input)=>{
switch (input.type) {
    case "TextField":
      return   <TextField       key={input.col}  size={input.size??"small"} required ref={input.ref} id={input.col}  sx={{ m: 1, width: input.width??"100%"}} type={"text"} label={input.label}   variant="outlined"  defaultValue={input.defaultValue}  onChange={(e)=>input.defaultValue=input.value=e.target.value}     helperText={input.helperText} />
      case "TelField":
        return   <TextField      key={input.col}  size={input.size??"small"}  required ref={input.ref} id={input.col}  sx={{ m: 1, width: input.width??"100%"}} type={"tel"} label={input.label}  variant="outlined" defaultValue={input.defaultValue} onChange={(e)=>input.defaultValue=input.value=e.target.value}   helperText={input.helperText} />
        
      case "CheckBox":
        return   <CheckBox key={input.col} size={input.size??"small"} ref={input.ref} id={input.col} label={input.label} sx={{ m: 1, width: input.width??"100%"}}   color={input.class}    onChange={(e)=>input.value=e.target.value}  helperText={input.helperText} />
   
        case "number":
      return   <TextField key={input.col} size={input.size??"small"} sx={{ m: 1, width: input.width??"100%"}}  ref={input.ref} id={input.col} type={"number"}  label={input.label} variant="outlined" defaultValue={input.defaultValue}   onChange={(e)=>input.defaultValue=input.value=e.target.value}  helperText={input.helperText} />
      case "ُEmailField":
        return   <TextField key={input.col} size={input.size??"small"} sx={{ m: 1, width: input.width??"100%"}}  ref={input.ref} id={input.col} type={"email"}  label={input.label} variant="outlined" defaultValue={input.defaultValue}   onChange={(e)=>input.defaultValue=input.value=e.target.value}  helperText={input.helperText} />
        case "FileField":
          return   <TextField key={input.col} size={input.size??"small"} sx={{ m: 1, width: input.width??"100%"}}  ref={input.ref} id={input.col} type={"file"}  label={input.label} variant="outlined"    onChange={(e)=>input.defaultValue=input.value=e.target.value}  helperText={input.helperText} />
         
      case "DateField":
        return <FormControl sx={{ m: 1, width: input.width??"100%"}} >
         <BasicDatePicker input={input}/>

        </FormControl>
          
      case "PasswordField":
            return  <TextField
            sx={{ m: 1, width: input.width??"100%"}} 
            size={input.size??"small"}
            key={input.col}
            ref={input.ref}
             label={input.label}
            type="password"
            onChange={(e)=>{
              input.defaultValue=input.value=e.target.value;
            // console.log(input.value);
            
            }}
            autoComplete="current-password"
            required
          />
          case "SelectField":
          return   (
          <FormControl           size={input.size??"small"}
          sx={{ m: 1, width: input.width??"100%"}} >
             <InputLabel id={input.col+"label"}>{input.label}</InputLabel>
          <Select
                    labelId={input.col+"label"}
                    id={input.col}
          value={input.Value}
           label={input.label}
           onChange={(e)=>{  
             input.Value=e.target.value;
          
          }}
         >
{         
input.option.map((op)=><MenuItem value={op.id}>{op.value}</MenuItem>) 
}           
        </Select>
        </FormControl>
          )
           default:
     return   <TextField key={input.col} size={input.size??"small"} label={input.label}  sx={{ m: 1, width: input.width??"100%"}}  variant="outlined" defaultValue={input.defaultValue} onChange={(e)=>input.value=e.target.value}  helperText={input.helperText} />
 }
    })}

    
    </div>
    {props.children}
 </Box>   
    </>
}