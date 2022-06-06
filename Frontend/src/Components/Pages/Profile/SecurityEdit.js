import React from 'react'
import './SecurityEdit.css'
import './SecurityEdit.scss'
import Navbar from './../../Code/Navbar_code/Navbar'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import * as env from './../../EnvirementVariables'


function SecurityEdit() {

    //************************************** Dark Mode **************************************************************/
    const [data, setdata] = React.useState("");  
    //***************************************************************************************************************/


    //**************************************** DetailsEdit API  ************************************************************

    const config ={
        headers:{
            Authorization: localStorage.getItem('token')
        }
    }
    const emailDto = {
        "email": localStorage.getItem('email')
    }

    //************************************** Data **************************************************************/

  const [oldmdp, setoldmdp] = useState("");
  const [newmdp, setnewmdp] = useState("");
  const [confmdp, setconfmdp] = useState("");

  //**********************************************************************************************************/

    const [userinfo, setuserinfo] = useState(0);
    let history = useHistory();
    useEffect(() => {
        Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
            setuserinfo(response.data.idUtil);
        }).catch(error => {
            if(error.response.status === 401){
                localStorage.setItem('token',"");
                localStorage.setItem('email',"");
                history.push("/");
              }
        });  
    }, []);

    const chamgemdp ={
        "oldMdp":oldmdp,
        "newMdp":newmdp,
        "confirMdp":confmdp
    }

    var passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    schema.is().min(8).is().max(20).has().not().spaces();
    const [msg_err, setmsg_err] = React.useState(false);
    const [msg_err1, setmsg_err1] = React.useState(false);
    const [msg_err2, setmsg_err2] = React.useState(false);
    const [msg_e, setmsg_e] = React.useState("");

    const update = (e) => {
        e.preventDefault();
        setmsg_err(false);
        setmsg_err1(false);
        setmsg_err2(false);
        if(schema.validate(oldmdp) && schema.validate(newmdp)){
            Axios.post(env.hostUrl+`/api/utilisateur/updatemdp/${userinfo}`,chamgemdp,config).then((response) => {
                if(!response.data.valid){
                    setmsg_e(response.data.msg);
                    setmsg_err2(true);
                }else{
                    localStorage.setItem('token',"");
    	            localStorage.setItem('email',"");
                    history.push("/");
                }
            });
        }else{
            if(!schema.validate(oldmdp)){
                setmsg_err(true);
              }else{
                setmsg_err1(true);
              }
        }
    };

  //**********************************************************************************************************/

  const DisplayErrMsg = () => (
    <h1 className="passwordchange-err-msg">Mot de passe actuel que vous avez entré n'est pas valide</h1>
  )
  const DisplayErrMsg1 = () => (
    <h1 className="passwordchange-err-msg">Nouveau mot de passe que vous avez entré n'est pas valide</h1>
  )
  const DisplayErrMsg2 = () => (
    <h1 className="passwordchange-err-msg">{msg_e}</h1>
  )

  return (
    <div>
        <div id='securityedit-body' data-theme={data}>
            <Navbar setdata={setdata}/>
            <div className='row7'>
                <div className='detailsedit-nav'>
                    <Link to='/profile/edit-account-details' style={{ textDecoration: 'none' }}>
                    <span className='nav-link' data-theme={data}>Profile</span>
                    </Link>
                    <span className='active ms-0'>Sécurité</span>
                </div>
                <div className='row8'>
                    <div className='row8-left'>
                        <div className='colx181' data-theme={data}>
                            <div className="card5-header" data-theme={data}>Changer le mot de passe</div>
                            <div className='colx18-body'>
                                <form className='colx181-form'>
                                    <div className="mb-31"> 
                                        <label className="small1 mb-11" for="inputUsername" data-theme={data}>Mot de passe actuel</label> 
                                        <input className="form-control5" id="inputUsername" type="password" placeholder="Saisissez le mot de passe actuel" 
                                            onChange={(e) =>
                                                    setoldmdp(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-31"> 
                                        <label className="small1 mb-11" for="inputUsername" data-theme={data}>Nouveau mot de passe</label> 
                                        <input className="form-control5" id="inputUsername" type="password" placeholder="Entrez un nouveau mot de passe"
                                            onChange={(e) =>
                                                    setnewmdp(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-31"> 
                                        <label className="small1 mb-11" for="inputUsername" data-theme={data}>Confirmez le mot de passe</label> 
                                        <input className="form-control5" id="inputUsername" type="password" placeholder="Confirmer le nouveau mot de passe"
                                            onChange={(e) =>
                                                    setconfmdp(e.target.value)}
                                        />
                                    </div>
                                    <button class="btn btn-primary" type="button" onClick={update} >Sauvegarder</button>
                                    { msg_err ? <DisplayErrMsg/> : null }
                                    { msg_err1 ? <DisplayErrMsg1/> : null }
                                    { msg_err2 ? <DisplayErrMsg2/> : null }
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SecurityEdit