export const inputTweets={
Msg:[
    {col:"text",type:"TextField",label:"Post Tweet",defaultValue:"",value:null,class:"",helperText:"Please Write your Tweet here...",ref:null,width:'100%',size:"small"}
],
Delete:[
    {col:"TweetId",type:"TextField",label:"Delete Tweet",defaultValue:"",value:null,class:"",helperText:"Please Write your TweetID here...",ref:null,width:'100%',size:"small"}
]
}



export const HandelSendTweet=()=>{

    if(inputTweets.Msg[0].value==null)
    {
    
        alert("Please Enter Text")
        return;
    } 


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      
        "text":inputTweets.Msg[0].value
     
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://localhost:7076/TwitterAPI/CreateTweet", requestOptions)
      .then(response => response.text())
      .then(result => alert(result))
      .catch(error => console.log('error', error));

}
export const HandelDeleteTweet=()=>{

if(inputTweets.Delete[0].value==null)
{

    alert("Please Enter TweetID")
    return;
}  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(
      {
        "Id":inputTweets.Delete[0].value.toString()
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://localhost:7076/TwitterAPI/DeleteTweet", requestOptions)
      .then(response => response.text())
      .then(result => alert(result))
      .catch(error => console.log('error', error));

}