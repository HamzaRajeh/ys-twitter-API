import Grid from '@mui/material/Grid'; // Grid version 2
import React, { useState } from "react";
import { Menu } from './components/menu';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SignInOfAdmin } from './components/SignIn';
 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
 export const Cpanel=()=>{
const [View,setView]=useState(<>
<h2>Welcome to<br/>Cpanel Twitter API </h2>
</>);



if(!localStorage.getItem('SinginAdmin'))

{
return(<SignInOfAdmin/>)
}
else
{
return<>
<Box sx={{ flexGrow: 1 }}>
<Grid  container   columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
  <Grid item   xs={12} md={2.2} >
    <Item>
  <Menu onPush={(e)=>{
     
setView(e)
  }} />
  </Item>
  </Grid>
  <Grid  item mt={{xs:4,md:0}} xs={12} md={9}>
  <Item>
 {View} 
 </Item>
  </Grid>
 </Grid>
 </Box>
</>
}


}