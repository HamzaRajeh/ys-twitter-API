
export const InputSignIn={
    SignInAdmin:[
        {col:"username",type:"TextField",label:"Username",defaultValue:"",value:null,class:"",helperText:"Username by defulte is admin",ref:null,width:'100%',size:"small"}
        ,{col:"Password",type:"PasswordField",label:"Password",defaultValue:null,value:null,class:"success",helperText:"Password by defulte is admin",ref:null,width:'100%',size:"small"}
    ]
}
export const SinginAdmin={userName:"admin",Password:"admin",IsAuth:false};
export const HandelSignAdmin=()=>{

    let userName='';
    let Password='';
    InputSignIn.SignInAdmin.map(a=>{
if(a.col==="username")
 userName= a.value
 if(a.col==="Password")
 Password= a.value
        
return null;

    })


if(SinginAdmin.userName===userName&& SinginAdmin.Password===Password)
{
    localStorage.setItem('SinginAdmin',true)
   setTimeout(()=> window.location.reload(),1000)
}else{
    setTimeout(()=> window.location.reload(),1000)

}
}


