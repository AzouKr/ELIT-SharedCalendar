import React from 'react'
import './FaSecurity.css'
import './FaSecurity.scss'
import DarkModeToggle from "react-dark-mode-toggle";
import useLocalStorage from 'use-local-storage'
import VerificationInput from "react-verification-input";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';



function FaSecurity() {

    const location = useLocation();

    //************************************** Dark Mode **************************************************************/
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    

    if(theme === true){
        setTheme('dark');
    }
    //***************************************************************************************************************/

    //************************************** Auth Code **************************************************************/

    const [authcode, setauthcode] = React.useState("");

    //***************************************************************************************************************/

    let history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('rest') !== true){
            history.push("/");
        }
    }, []);
      
   
      const [msg, setmsg] = useState(false);
      const verify = (e) => {
		e.preventDefault();
        setmsg(false);
        if((location.state.code).toString() === authcode){
            window.setTimeout(() => {
				history.push(`/newpassword`);
			}, 2000)
        }else{
            setmsg(true);
        }
      }

      const DisplayErrMsg = () => (
		<h1 className="security-err-msg">Le code que vous avez entré est incorrect</h1>
	  )

    const try_again = () =>{
        window.setTimeout(() => {
            history.push(`/resetmdp`);
        }, 2000)
    }

  return (
    <div>
        <div id='toggle'>
            <DarkModeToggle onChange={setTheme} checked={theme} size={70} speed={3}/>
        </div>
        <div id='fasecurity-body' data-theme={theme}>
        <div className="row2" data-theme={theme}>
        <div className="col-lg-5 col-md-7 mx-auto my-auto">
            <div className="card2" data-theme={theme}>
                <div className="card2-body px-lg-5 py-lg-5 text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded-circle avatar-lg img-thumbnail mb-4" alt="profile-image"/>
                    <h2 className="text-info-2fa">2FA Security</h2>
                    <p className="mb-4">Un message avec un code de vérification a été envoyé à votre adresse e-mail. 
                            Entrez le code pour continuer.</p>
                    <form className='form-reset' data-theme={theme}>
                        <div className="row3">
                        <VerificationInput 
                        onChange={setauthcode}  
                        validChars="[0-9]*"
                        autoFocus    
                        />
                        </div>
                        <div className="text-center3">
                            <button type="button" onClick={verify} className="btn-2fa bg-info-2fa btn-lg-2fa my-4">Continue</button>
                        </div>
                        { msg ? <DisplayErrMsg/> : null }
                        <div className='msg-sent-again-holder'>
                        <p className='msg-sent-again'>Vous n'avez pas reçu le code ?</p><p className='msg-sent-again-try' onClick={try_again} >Réessayer</p> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </div>

    </div>
  )
}

export default FaSecurity