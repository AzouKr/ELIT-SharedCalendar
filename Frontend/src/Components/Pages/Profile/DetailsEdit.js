import React from 'react'
import './DetailsEdit.css'
import './DetailsEdit.scss'
import Navbar from './../../Code/Navbar_code/Navbar'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import {UploadClient} from '@uploadcare/upload-client'
import * as env from './../../EnvirementVariables'


function DetailsEdit() {

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

  const [profile_pic, setprofile_pic] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [dateN, setdateN] = useState(new Date());
  const [lieuN, setlieuN] = useState("");
  const [email, setemail] = useState("");
  const [tel, settel] = useState(0);
  const [website, setwebsite] = useState("");
  const [github, setgithub] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [instagram, setinstagram] = useState("");

  //**********************************************************************************************************/

    const [userinfo, setuserinfo] = React.useState([]);
    let history = useHistory();
    useEffect(() => {
        Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
        setuserinfo(response.data);
        setprofile_pic(response.data.profile_pic);
        setnom(response.data.nom);
        setprenom(response.data.prenom);
        setdateN(response.data.dateN);
        setlieuN(response.data.lieuN);
        setemail(response.data.email);
        settel(response.data.tel);
        setwebsite(response.data.website);
        setgithub(response.data.github);
        setfacebook(response.data.facebook);
        settwitter(response.data.twitter);
        setinstagram(response.data.instagram);
        }).catch(error => {
        history.push("/");
        }).catch(error => {
            if(error.response.status === 401){
              localStorage.setItem('token',"");
                localStorage.setItem('email',"");
              history.push("/");
            }
          });   
        
    }, []);


    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const client = new UploadClient({ publicKey: "656b6c9e9a2f2652692c" });
        client.uploadFile(event.target.files[0]).then((response) => {
            setprofile_pic(response.cdnUrl);
        });
    };

    const user ={
        "nom": nom,
        "prenom": prenom,
        "dateN": dateN,
        "lieuN": lieuN,
        "email": email,
        "profile_pic": profile_pic,
        "tel": tel,
        "website": website,
        "twitter": twitter,
        "facebook": facebook,
        "instagram": instagram,
        "github": github
    
    }

    var validator = require("email-validator");
    const [msg_err, setmsg_err] = useState(false);
    const update = (e) => {
        e.preventDefault();
        setmsg_err(false);
        if(validator.validate(email)){
            Axios.post(env.hostUrl+`/api/utilisateur/${userinfo.idUtil}`,user,config).then((response) => {
                window.setTimeout(() => {
                history.push("/profile");
                }, 2000)
            }).catch(error => {
                return error;
            });
        }else{
            setmsg_err(true);
        }
    };
  /*******************************************************************************************************************/


  const DisplayErrMsg = () => (
    <h1 className="details-err-msg">L'adresse e-mail que vous avez entré n'est pas valide</h1>
    )

  return (
    <div>
        <div id='detailsedit-body' data-theme={data}>
            <Navbar setdata={setdata}/>
            <div className='row4'>
                <div className='detailsedit-nav'>
                    <span className='active ms-0'>Profile</span>
                    <Link to='/profile/security-page' style={{ textDecoration: 'none' }}>
                    <span className='nav-link' data-theme={data}>Sécurité</span>
                    </Link>
                </div>
                <div className='row5'>
                    <div className='row5-left'>
                        <div className='card5' data-theme={data}>
                            <div className='card5-header' data-theme={data}>Image de profil</div>
                            <div className='card5-body'>
                                <img className='card5-img' src={profile_pic}/>
                                <div className='card5-desc'>JPG ou PNG ne dépassant pas 5 Mo</div>
                                <label  htmlFor="formId" className="imageuploader-gig1" onClick={handleClick} >
                                Upload
                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={handleChange}
                                    style={{display:'none'}}
                                />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='row5-right'>
                        <div className='colx18' data-theme={data}>
                            <div className="card5-header" data-theme={data}>Détails du compte</div>
                            <div className='colx18-body'>
                                <form className='colx18-form'>
                                    <div className="row6">
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputFirstName" data-theme={data}>Nom</label> 
                                            <input className="form-control5" id="inputFirstName" type="text" placeholder={userinfo.nom} onChange={(e) =>
                                                setnom(e.target.value)}/>
                                        </div>
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputLastName" data-theme={data}>Prenom</label> 
                                            <input className="form-control5" id="inputLastName" type="text" placeholder={userinfo.prenom} 
                                                onChange={(e) =>
                                                    setprenom(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row6">
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputFirstName" data-theme={data}>Date de Naissance</label> 
                                            <input className="form-control5" id="inputFirstName" type="text" placeholder={userinfo.dateN}
                                                onChange={(e) =>
                                                    setdateN(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputLastName" data-theme={data}>Lieu de Naissance</label> 
                                            <input className="form-control5" id="inputLastName" type="text" placeholder={userinfo.lieuN}
                                                onChange={(e) =>
                                                    setlieuN(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row6">
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputFirstName" data-theme={data}>Email</label> 
                                            <input className="form-control5" id="inputFirstName" type="text" placeholder={userinfo.email}
                                                onChange={(e) =>
                                                    setemail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputLastName" data-theme={data}>Téléphone</label> 
                                            <input className="form-control5" id="inputLastName" type="text" placeholder={userinfo.tel}
                                                onChange={(e) =>
                                                    settel(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-31"> 
                                        <label className="small1 mb-11" for="inputUsername" data-theme={data}>Website</label> 
                                        <input className="form-control5" id="inputUsername" type="text" placeholder={userinfo.website}
                                            onChange={(e) =>
                                                    setwebsite(e.target.value)}
                                        />
                                    </div>
                                    <div className="row6">
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputFirstName" data-theme={data}>Github</label> 
                                            <input className="form-control5" id="inputFirstName" type="text" placeholder={userinfo.github}
                                                onChange={(e) =>
                                                    setgithub(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputLastName" data-theme={data}>Twitter</label> 
                                            <input className="form-control5" id="inputLastName" type="text" placeholder={userinfo.twitter}
                                                onChange={(e) =>
                                                    settwitter(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row6">
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputFirstName" data-theme={data}>Facebook</label> 
                                            <input className="form-control5" id="inputFirstName" type="text" placeholder={userinfo.facebook}
                                                onChange={(e) =>
                                                    setfacebook(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-61"> 
                                            <label className="small1 mb-11" for="inputLastName" data-theme={data}>Instagram</label> 
                                            <input className="form-control5" id="inputLastName" type="text" placeholder={userinfo.instagram}
                                                onChange={(e) =>
                                                    setinstagram(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" type="button" onClick={update} >Sauvegarder</button>
                                    { msg_err ? <DisplayErrMsg/> : null }
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

export default DetailsEdit