 import React from "react";
const sendEmail = ({to, from, subject, body}) => {
 
	Email.send({
    		Host : "smtp.yourisp.com",
    		Username : "username",
    		Password : "password",
    		To : to,
    		From : from,
    		Subject : subject,
    		Body : body
	}).then(
  		message => setSuccessMessage(message)
	);
}