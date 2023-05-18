import  { useState } from "react"
export const [Data,setData]=new useState([])

export const fetchTweet=()=>{
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
fetch("https://localhost:7076/TwitterAPI/MyStream", requestOptions)
  .then(response => response.json())
  .then(result => setData([...Data,...result.data]))
  .catch(error => console.log('error', error));
}