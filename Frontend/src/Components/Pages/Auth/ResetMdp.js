import React from 'react'
import './ResetMdp.css'
import './ResetMdp.scss'
import DarkModeToggle from "react-dark-mode-toggle";
import useLocalStorage from 'use-local-storage'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as env from './../../EnvirementVariables'


function ResetMdp() {

    //************************************** Dark Mode **************************************************************/
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    

    if(theme === true){
        setTheme('dark');
    }
    //***************************************************************************************************************/

	let history = useHistory();
	const [email, setemail] = useState("");
	const [msg, setmsg] = useState(false);
	const emailDto = {
        "email": email
      }
	const send = (e) => {
		setmsg(false);
		e.preventDefault();
		  Axios.get(env.hostUrl+`/api/utilisateur/findemail/${email}`).then((response) => {
			if(response.data === true){
				localStorage.setItem('rest',true);
				localStorage.setItem('email',email);
				Axios.post(env.hostUrl+"/api/utilisateur/verificationcode",emailDto).then((response) => {
					window.setTimeout(() => {
						history.push(`/fasecurity`,{ code: response.data.code });
					}, 2000)
        		})
			}else{
				setmsg(true);
			}
		  });
	};

	const DisplayErrMsg = () => (
		<h1 className="verifyemail-err-msg">L'adresse e-mail que vous avez entré n'existe pas</h1>
	  )

  return (
    <div>
    <div id='toggle'>
    <DarkModeToggle onChange={setTheme} checked={theme} size={70} speed={3}/>
    </div>
        <div id='restemdp-body' data-theme={theme}>
        <div className="row h-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Réinitialiser le mot de passe</h1>
							<p className="lead">
							Entrez votre e-mail pour réinitialiser votre mot de passe
							</p>
						</div>

						<div className="card" data-theme={theme}>
							<div className="card-body">
								<div className="m-sm-4">
									<form className='form-reset'>
										<div className="form-group">
											<label className='label-email-reset'>Email</label>
											<input className="form-control form-control-lg" onChange={(e) => {setemail(e.target.value);}} type="email" name="email" placeholder="Entrez votre e-mail"/>
										</div>
										<div className="text-center mt-3">
											<button type="submit" className="btn-reset btn-lg-reset btn-primary-reset" onClick={send}>Envoyer</button>
											{ msg ? <DisplayErrMsg/> : null }
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
        </div>
    </div>
  )
}

export default ResetMdp