import React from "react";
import './style/Card.css'
 import $ from 'jquery';
import { Button } from "@mui/material";
 
export const  CardTweet=({time="2023-05-10",TweetID="",TweetText="",id,UserID='',infoTweet=[],btnContect={recive:'',cancel:'',view:''}})=>{



    return(
        <>
        <div className="Card" style={{zIndex:id+2}}>
           <div className="Card-Header">

 <span className="Card-Time">{time}</span>
<span className="Card-UserID">User ID: {UserID}</span>
 
           </div>
           <div id={"Tweet"+id} className="Card-body">
{TweetText}
 </div>
         <div className="Card-footer">
<Button >{btnContect.recive}</Button>
<Button >{btnContect.cancel}</Button>
 <Button  onClick={()=>{
$('#Tweet'+id).toggle()
 
}}>{btnContect.view}</Button>
 </div>  
  
</div>
        
        </>
    )
}
 

 