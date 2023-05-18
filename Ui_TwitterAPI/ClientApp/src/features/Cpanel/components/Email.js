 

const ButtonMailto = (mailBody) => {
   //var mailBody=document.getElementById('Headr-collect').innerHTML;
   window.location="mailto:yourmail@domain.com?subject=Compute Tweets from Twitter API&body="+mailBody;
};

export default ButtonMailto;