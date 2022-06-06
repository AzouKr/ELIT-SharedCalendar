import React from 'react'
import './DisplayForm.css'
import './DisplayForm.scss'
import user_img1 from './../../../img/avatar2.png'
import user_img2 from './../../../img/avatar1.png'
import Axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Modify from './Modify'
import * as env from './../../EnvirementVariables'


function DisplayForm({setdisplayformstate,data,idRdv}) {

  const exit_click = () =>{
    setdisplayformstate({bool: false,Title: "",blur: 1, disable: "auto"});
  }

  //**************************************** DisplayRdv API  ************************************************************

  const config ={
    headers:{
        Authorization: localStorage.getItem('token')
    }
  }
  const emailDto = {
    "email": localStorage.getItem('email')
  }

  const [rdvinfo, setrdvinfo] = React.useState([]);
  const [user, setuser] = React.useState([]);
  const [bool, setbool] = React.useState(false);
  const [part, setpart] = React.useState([]);
  const [guests, setguests] = React.useState(0);
  
  useEffect(() => {
    Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
    Axios.get(env.hostUrl+`/api/rdv/${idRdv}`, config).then((responses) => {
      setrdvinfo(responses.data);
      setuser(responses.data.utilisateur);
      setpart(responses.data.participants);
      setguests(responses.data.participants.length+1);
      if(response.data.idUtil !== responses.data.utilisateur.idUtil){
        setbool(true);
      }
    });
      });
  }, []);

  setTimeout(() => {
    if(bool){
      document.getElementById('btn-box').style.opacity = 0.1;
      document.getElementById('btn-box').style.pointerEvents = "none";
    }
  });
 
  function display() {

    return part.map((item) => {
      const user1 = item.utilisateur;
      return (
        <div className='participant second'>
                   <div className='image_participant'><img className='image_participant' src={user1.profile_pic}/></div>
                   <div className='information'>
                       <h3 className='inf part_nom'>{user1.nom} {user1.prenom}</h3>
                       <h3 className='inf part_role'>participant </h3>
                   </div>
                 </div>
      );
    });
  }

  const deleteRdv = () =>{
    Axios.get(env.hostUrl+`/api/rdv/delete/${idRdv}`, config).then((responses) => {
      window.setTimeout(() => {
        setdisplayformstate({bool: false,Title: "",blur: 1, disable: "auto"});
     }, 1000)
    });
  }

  var HtmlToReactParser = require("html-to-react").Parser;
        var htmlToReactParser = new HtmlToReactParser();
        var reactElement = htmlToReactParser.parse(rdvinfo.description);
  //*********************************************************************************************************************

    
  const showwindow = () => {
    setdisplayformstate11({bool:true,blur:0,disable:"none"})
  }
    
  
  const [displayformstate11, setdisplayformstate11] = React.useState({ bool: false, blur: 1, disable: "auto" });
  const Displayform = () => (
      <Modify setdisplayformstate11={setdisplayformstate11} data={data} rdvMod={rdvinfo} setdisplayformstate={setdisplayformstate}/>
      )
  
      setTimeout(() => {
          document.getElementById('displayform').style.opacity = displayformstate11.blur;
          document.getElementById('displayform').style.pointerEvents = displayformstate11.disable;
        });
        const dateRdv = new Date(rdvinfo.start);
  return (
    <div>
      { displayformstate11.bool ? <Displayform/> : null }
        <div id="displayform" data-theme={data}>
        <i onClick={exit_click} class="fa fa-times fa-3x" aria-hidden="true" data-theme={data}></i>
        <div className='displayform-box' data-theme={data}>
            <div className='rdv-title-box'>
              <i class="fa fa-calendar fa-2x" aria-hidden="true"></i>
              <div>
                <em><h1 className='rdv-title'>{rdvinfo.title}</h1></em>
                <h2 className='rdv-date' data-theme={data}>{dateRdv.toString().substring(0,16)}</h2>
              </div>
            </div>
            <div className='rdv_lieu_box'>
              <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
              <h2 className='rdv_lieu'> {rdvinfo.lieu}</h2>
            </div>
            <div className='participant_box'>
            <i class="fa fa-user fa-2x" aria-hidden="true"></i>
            <div className='participant_container'>
             <h2 className='nbr_participant'>{guests} Guests</h2>
             <div className='participant_info'>
                 <div className='participant first'>
                   <div className='image_participant'><img className='image_participant' src={user_img1}/></div>
                   <div className='information'>
                       <h3 className='inf part_nom'>{user.nom} {user.prenom}</h3>
                       <h3 className='inf part_role'>organisateur </h3>
                   </div>
                 </div>
                 {display()}
             </div>
           
            </div>
            </div>
           
           <div className='description-box'> 
           <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>
           <div className="description-rdv">
              <h2 > {reactElement}</h2>
           </div>
           </div>
            
        </div>
       
        <div className='btn-box' id='btn-box' >
            <button className='btn-modifier' onClick={showwindow}>Modifier</button>
            <button className='btn-supprimer' onClick={deleteRdv} >Supprimer</button>
        </div>

        </div>
    </div>
  )
}

export default DisplayForm