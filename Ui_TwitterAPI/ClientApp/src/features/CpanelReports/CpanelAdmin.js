import Grid from '@mui/material/Grid'; // Grid version 2
import React, { useState } from "react";
import {  MenuReports } from '../Cpanel/components/menu'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SignInOfReport} from '../Cpanel/components/SignIn';
 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
 export const CpanelReport=()=>{
const [View,setView]=useState(<>
<h2>Welcome to<br/>Cpanel Report</h2>
</>);

if(!localStorage.getItem('SinginReport'))
{
return(<SignInOfReport/>)
}
else
{
return<>
<Box sx={{ flexGrow: 1 }}>
<Grid  container   columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
  <Grid item   xs={12} md={2.2} >
    <Item>
  <MenuReports onPush={(e)=>{
     
setView(e)
  }}   />
  </Item>
  </Grid>
  <Grid  item  xs={12} md={9} sx={{height:900}}>
  <Item>
 {View} 
 </Item>
  </Grid>
 </Grid>
 </Box>
</>
}

}