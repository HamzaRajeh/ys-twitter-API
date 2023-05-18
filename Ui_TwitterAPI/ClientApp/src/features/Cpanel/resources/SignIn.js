
export const InputSignIn={
    SignInAdmin:[
        {col:"username",type:"TextField",label:"اسم المستخدم",defaultValue:"",value:null,class:"",helperText:"يرحى ادخال اسم المستخدم",ref:null,width:'100%',size:"small"}
        ,{col:"Password",type:"PasswordField",label:"كلمة المرور",defaultValue:null,value:null,class:"success",helperText:"يرجى ادخال كلمة المرور",ref:null,width:'100%',size:"small"}
    ]
    ,SignInReports:[
    {col:"username",type:"TextField",label:"أسم المستخدم",defaultValue:"",value:null,class:"",helperText:"يرجى ادخال اسم المستخدم",ref:null,width:'100%',size:"small"}
     ,{col:"Password",type:"PasswordField",label:" كلمة المرور",defaultValue:null,value:null,class:"success",helperText:"يرجى ادخال كلمة المرور    ",ref:null,width:'100%',size:"small"}
  
]


}
export const SinginAdmin={userName:"admin",Password:"admin",IsAuth:false};
export const SinginReports ={userName:"admin",Password:"admin",IsAuth:false};


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

export const HandelSignReport=()=>{
    let username='';
    let Password = '';
    InputSignIn.SignInReports.map(a => {
if(a.col==="username")
username= a.value
 if(a.col==="Password")
 Password= a.value

return null;
    })
    if (SinginReports.userName === username && SinginReports.Password === Password)
    {
    localStorage.setItem('SinginReport',true)
    setTimeout(()=> window.location.reload(),1000)
}else{
    setTimeout(()=> window.location.reload(),1000)
}
    
    }
    

