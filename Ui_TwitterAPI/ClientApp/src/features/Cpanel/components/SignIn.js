import {  Button, Container } from "@mui/material";
import React from "react";
import { HandelSignAdmin, InputSignIn } from "../resources/SignIn";
import { FieldsBox } from "../../components/FieldInput";

import './style/login.css'

export const SignInOfAdmin=()=>{



return(
    <Container sx={{mt:10}} component="main" maxWidth="xs" >
        <h3> Login </h3>
<FieldsBox  FieldsArray={InputSignIn.SignInAdmin}>

<Button sx={{marginTop:5,width:"80%"}}  variant="contained"  onClick={HandelSignAdmin}> دخول</Button>
</FieldsBox>


</Container>
);
}

