import  React, { useState } from 'react';
 import { TextField } from '@mui/material';
import { CardTweet } from '../../components/Cards';
import { Button } from '@mui/material';
import './style/collect.css'
import ButtonMailto from './Email' ;



export const   FetchTweets=()=>{
  
  const [Data,setData]=new useState([])
  const [ShowData,setShowData]=new useState([])
  const [StartIndex,setStartIndex]=new useState(0)
  const [EndIndex,setEndIndex]=new useState(25)
  const [Totaltweets,setTotaltweets]=new useState(0)
  const [TotaltweetsPerHour,setTotaltweetsPerHour]=new useState(0)
  const [TotaltweetsPerMinute,setTotaltweetsPerMinute]=new useState(0)
  const [Seconds,setSeconds]=new useState(0)

  
  const SampleStream=()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://localhost:7076/TwitterAPI/MyStream", requestOptions)
      .then(response => response.json())
      .then(result => setData([...Data,...result.data]))
      .catch(error => console.log('error', error));
    }
   React.useEffect( ()=>{
     setTimeout(()=>{
      SampleStream()
      setSeconds(Seconds+(2*1000))
    }
    , 2*1000);

  setTotaltweets(Data.length);
 if(Seconds<((1000*60)*60)) 
  setTotaltweetsPerHour(Data.length);
 if(Seconds<(1000*60)) 
  setTotaltweetsPerMinute(Data.length);

 // eslint-disable-next-line
},[Data])
  return<>
            <div style={{display:"flex",flexDirection:"column",maxHeight:500,overflow:"auto"}} >
              <div id='Headr-collect' className='Headr-collect'>
                <div className='Card-Collect'>
                  <b>{Totaltweets}</b>
                  <br/>
                  <b>Total number of tweets received</b>
                </div>
                <div className='Card-Collect'>
                <b>{TotaltweetsPerHour}</b>
                <br/>

                  <b>Average tweets per hour</b>
                  </div>
                <div className='Card-Collect'>
                <b>{TotaltweetsPerMinute}</b>
                <br/>

                  <b>Average tweets per minute</b>
                  </div>
              </div>
            <div><h1> Tweets Stream</h1></div>
            <div ><TextField type='text' size='small'  label="Search" helperText={'Search About Any Data Of tweet '} sm={{ m: 1, width: '50%' }}  sx={{ m: 1, width: '90%' }} /></div>
          <div>
             <Button sx={{width:"50%"}} onClick={()=>{
              setShowData([...Data.slice(StartIndex+26,EndIndex+26)])
setStartIndex(StartIndex+26);
setEndIndex(EndIndex+26);
            }}>Next Rows (25)</Button></div>
<Button onClick={()=>{
  const SummryTotaltweets="Total number of tweets received :"+Totaltweets;
  const SummryTotaltweetsPerHour="Total number of tweets Per Hour :"+TotaltweetsPerHour;
  const SummryTotaltweetsPerMinute="Total number of tweets  Per Minute :"+TotaltweetsPerMinute;
  
  ButtonMailto(SummryTotaltweets+",%0A"+SummryTotaltweetsPerHour+" , %0A"+SummryTotaltweetsPerMinute );}}> Send Report's Tweet By Email</Button>  
{ShowData.map((tw,index)=>{
return     <CardTweet  id={index} TweetText={tw.text} time={tw.created_at} TweetID={tw.id} UserID={tw.author_id} btnContect={{view:"Toggel Show"}}/>

})}
 </div>
   {/* {<GData  cols={[...InputShowrooms.InfoShowroom.map((col)=>{return { field: col.col, headerName: col.label, width: 150 }})]}  store={'StorePersonal'} data={JSON.parse(localStorage.getItem('StorePersonal'))}/>} */}
  </>
}
// stop --objects Fetch