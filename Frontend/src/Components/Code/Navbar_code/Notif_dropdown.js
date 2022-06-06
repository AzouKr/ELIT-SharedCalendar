import React from 'react'
import './Notif_dropdown.css'
import Axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as env from './../../EnvirementVariables'


function Notif_dropdown({theme}) {

  const [isActive, setActive] = React.useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };


   //**************************************** Notif API  ************************************************************

   const config ={
    headers:{
        Authorization: localStorage.getItem('token')
    }
  }
  const emailDto = {
    "email": localStorage.getItem('email')
  }

  const [notifinfo, setnotifinfo] = React.useState([]);
  let history = useHistory();
  useEffect(() => {
    Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
      Axios.get(env.hostUrl+`/api/notification/${response.data.idUtil}`, config).then((response) => {
        setnotifinfo(response.data);
    });
    }).catch(error => {
      localStorage.setItem('token',"");
      localStorage.setItem('email',"");
      history.push("/");
    });  
    
  }, []);


  function display() {

    return notifinfo.map((item) => {
      return (
        <div class="notif-one">
                  <i class="fa fa-inbox fa-2x" aria-hidden="true"></i>
                  <div class="notif-one-info">
                        <h1 class="notif-one-info-type">{(item.titre).substr(0,29)}</h1>
                        <h1 class="notif-one-info-title">{(item.titre).substr(29)}</h1>
                  </div>
                </div>
      );
    });
  }

  /*******************************************************************************************************************/


  return (
    <div>
        <div className='notif_drop'>
        <li>
        <i className="fa fa-bell fa-lg" onClick={toggleClass} aria-hidden="true" data-theme={theme}></i>
        <div className='notif-nbr-show' onClick={toggleClass} >{notifinfo.length}</div>
      <ul>
        <div class={isActive ? 'all-cont': 'all-cont-hide'}>
          <div class="arrow-up" data-theme={theme}></div>
          <div class="Notif-container" data-theme={theme}>
              <div class="Notif-header"><h1 class="Notif-header-title">Notification</h1></div>
              <div class="list-notif">
              {display()}  
              </div>
    </div>
  </div>
      </ul>
    </li>
        </div>
    </div>
  )
}

export default Notif_dropdown