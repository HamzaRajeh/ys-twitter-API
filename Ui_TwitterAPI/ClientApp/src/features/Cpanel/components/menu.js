import React from 'react';
import './style/style.css';
import $ from 'jquery'
import * as ObjCardTweet  from './Tweets';
import { Box, Button } from '@mui/material';
const styleParent={ fontWeight:"900",borderRadius:4,borderBottom:"3px black solid",width:"100%"};
const closeMenu=()=>{
  let menVis=document.getElementsByClassName('visible-menu');
  let es=Array.from(menVis);
  es.map((e)=>{
    const parent=$("#"+e.id).parent();
    parent.css( "border-color", "black" );
    parent.children(['button']).css( "border-color", "black" );
  e.classList.remove("visible-menu");
 e.classList.add("hidden-menu");
  return e;
 })
   }
   const openMenu=(e)=>{
      $(e).removeClass('hidden-menu');
     $(e).addClass('visible-menu');
     const parent=$(e).parent();
     parent.css( "border-color", "blue" );
     parent.children(['button']).css( "border-color", "blue" );
      }
 export const Menu=({onPush})=> {


    return(<>
    <Box>

    <nav id='Grid-Menue'  className="navigation">
    <div className='logo' >
 Twitter API
</div>
  <ul>
    <li><Button  sx={styleParent} onClick={()=>{
closeMenu();
 openMenu("#ul-1");
 
    }}>Sampled Stream</Button>
    <div id='ul-1' className="submenu hidden-menu">
         <div><Button onClick={()=>onPush(<ObjCardTweet.FetchTweets/>)} >Get Stream</Button></div>
       </div>
       
       </li>
    <li><Button sx={styleParent} onClick={()=>{
 closeMenu();
 openMenu("#ul-2"); 
    }}> Manage Tweets</Button>
    <div id='ul-2' className="submenu hidden-menu">
        <div><Button onClick={()=>onPush(<></>)}>Post  Tweets </Button></div>
        <div><Button onClick={()=>onPush(<></>)}> Delete  Tweets</Button></div>
       </div>
    </li>
  
    <li><Button  sx={styleParent} onClick={()=>{
 closeMenu();
 openMenu("#ul-4"); 

 
    }}>  Users Lookup</Button>
      <div id='ul-4' className="submenu hidden-menu">
        <div><Button onClick={()=>onPush(<></>)} >GET /2/users/me</Button></div>
      
       </div>
    </li>
   </ul>
</nav>
</Box>

    </>)}


export const MenuReports=({onPush})=> {
  return(<Box>
  
  <nav id='Grid-Menue'  className="navigation">
  <div className='logo' >
<h3>Reports</h3>
</div>
<ul>
<li><Button  sx={styleParent} onClick={()=>{
closeMenu();
 openMenu("#ul-1");
 
    }}>Sampled Stream</Button>
    <div id='ul-1' className="submenu hidden-menu">
         <div><Button onClick={()=>onPush(<ObjCardTweet.FetchTweets/>)} >Get Stream</Button></div>
       </div>
       
       </li>
    <li><Button sx={styleParent} onClick={()=>{
 closeMenu();
 openMenu("#ul-2"); 
    }}> Manage Tweets</Button>
    <div id='ul-2' className="submenu hidden-menu">
        <div><Button onClick={()=>onPush(<></>)}>Post  Tweets </Button></div>
        <div><Button onClick={()=>onPush(<></>)}> Delete  Tweets</Button></div>
       </div>
    </li>
  
    <li><Button  sx={styleParent} onClick={()=>{
 closeMenu();
 openMenu("#ul-4"); 

 
    }}>  Users Lookup</Button>
      <div id='ul-4' className="submenu hidden-menu">
        <div><Button onClick={()=>onPush(<></>)} >GET /2/users/me</Button></div>
      
       </div>
    </li>
 
 </ul>
</nav>

  </Box>)}