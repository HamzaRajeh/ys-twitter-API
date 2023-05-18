import React from "react";
import {  Button, Container } from "@mui/material";
 import {  inputTweets } from "../resources/ManageTweets";
import { FieldsBox } from "../../components/FieldInput";

 
export const PostTweet=()=>{
return(
    <Container sx={{mt:10}} component="main" maxWidth="xm" >
        <h3> Post Tweet </h3>
<FieldsBox  FieldsArray={inputTweets.Msg}>
<Button sx={{marginTop:5,width:"20%"}}  variant="contained"  onClick={()=>{}}> Send</Button>
</FieldsBox>
</Container>
);
}


export const DeleteTweet=()=>{
    return(
        <Container sx={{mt:10}} component="main" maxWidth="xs" >
            <h3> Delete Tweet </h3>
    <FieldsBox  FieldsArray={inputTweets.Delete}>
    <Button sx={{marginTop:5,width:"80%"}}  variant="contained"  onClick={()=>{}}> Delete</Button>
    </FieldsBox>
    </Container>
    );
    }