import React from 'react';
import logo from './twitter_logo.png';
 import { CpanelReport} from './features/CpanelReports/CpanelAdmin';
 import   {Cpanel}   from './features/Cpanel/Cpanel';
import {  Routes,Route,   NavLink } from 'react-router-dom';
import './App.css';
import {Box, Switch } from '@mui/material';

 

function App() {
   return (
    <div  className="App">
      <div>
<Switch  checked={localStorage.getItem('modeTheme')==="dark"?true:false}  color="default"  onChange={(e)=>{
if(e.currentTarget.checked)
localStorage.setItem('modeTheme','dark');
else{
  localStorage.setItem('modeTheme','light');
}
window.location.reload();
          }} />
</div>
<Box   className="App-header"      >

     
        <div className='App-logo-div '> 
        <img src={logo} className="App-logo" alt="logo" /> 
        <p>twitter API</p>
          </div>
          <nav className="sidebar">

          <NavLink  className='App-link' to={'/Cpanel'}>Twitter API</NavLink>
          <NavLink  className='App-link' to={'/CpanelReport'}>Report</NavLink>
          
          </nav>

    
        
       </Box>
<Routes>
<Route path="/" element={<></>} />
<Route path="/Cpanel" element={<Cpanel/>} />
<Route path="/CpanelReport" element={<CpanelReport  />} />
</Routes>
 
 
    </div>
  );
}

export default App;
