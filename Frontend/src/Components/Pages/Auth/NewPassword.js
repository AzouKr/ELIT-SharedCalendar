import React from 'react'
import './NewPassword.css'
import './NewPassword.scss'
import DarkModeToggle from "react-dark-mode-toggle";
import useLocalStorage from 'use-local-storage'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import * as env from './../../EnvirementVariables'


function NewPassword() {

  let history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('rest') !== true){
        history.push("/");
    }
}, []);


    //************************************** Dark Mode **************************************************************/
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    

    if(theme === true){
        setTheme('dark');
    }
    //***************************************************************************************************************/

    var passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    schema.is().min(8).is().max(20).has().not().spaces();
    const [msg_err1, setmsg_err1] = React.useState(false);
    const [msg_err2, setmsg_err2] = React.useState(false);
    const [msg_e, setmsg_e] = React.useState("");
    const [newmdp, setnewmdp] = useState("");
    const [confmdp, setconfmdp] = useState("");

    const chamgemdp ={
      "newMdp":newmdp,
      "confirMdp":confmdp
  }

    const send = (e) => {
      e.preventDefault();
      setmsg_err1(false);
      setmsg_err2(false);
      
        Axios.post(env.hostUrl+`/api/utilisateur/setnewpass/${localStorage.getItem('email')}`,chamgemdp).then((response) => {
                if(!response.data.valid){
                    setmsg_e(response.data.msg);
                    setmsg_err2(true);
                }else{
                  localStorage.setItem('token',"");
                  localStorage.setItem('email',"");
                  localStorage.setItem('rest',false);
                  history.push("/");
                }

              });
            }

    const DisplayErrMsg1 = () => (
      <h1 className="setnewpass-err-msg">Nouveau mot de passe que vous avez entré n'est pas valide</h1>
    )
    const DisplayErrMsg2 = () => (
      <h1 className="setnewpass-err-msg">{msg_e}</h1>
    )

  return (
    <div>
        <div id='toggle'>
            <DarkModeToggle onChange={setTheme} checked={theme} size={70} speed={3}/>
        </div>
        <div id='NewPassword-body' data-theme={theme} >
        <div class="mainDiv">
        <div class="cardStyle" data-theme={theme} >
        <form action="" method="post" name="signupForm" id="signupForm">      
      <h2 class="formTitle" data-theme={theme} >
        Entrer le nouveau mot de passe
      </h2>
      
    <div class="inputDiv">
      <label class="inputLabel" for="password" data-theme={theme} >Nouveau mot de passe</label>
      <input type="password" id="password" name="password" onChange={(e) => {setnewmdp(e.target.value);}} required/>
    </div>
      
    <div class="inputDiv">
      <label class="inputLabel" for="confirmPassword" data-theme={theme} >Confirmez le mot de passe</label>
      <input type="password" id="confirmPassword" onChange={(e) => {setconfmdp(e.target.value);}} name="confirmPassword"/>
    </div>
    
    <div class="buttonWrapper">
    <button type="button" onClick={send} className="submitButton pure-button pure-button-primary">Change</button>
    </div>
    { msg_err1 ? <DisplayErrMsg1/> : null }
    { msg_err2 ? <DisplayErrMsg2/> : null }
      
  </form>
  </div>
</div>
        </div>
    </div>
  )
}

export default NewPassword