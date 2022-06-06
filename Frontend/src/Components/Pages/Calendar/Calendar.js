import React from 'react'
import './Calendar.css'
import './Calendar.scss'
import Navbar from './../../Code/Navbar_code/Navbar'
import Fullcalendar from '../../Code/Calendar_code/Fullcalendar'
import SmallCalendar from './../../Code/Calendar_code/SmallCalendar'
import DisplayForm from './../../Code/Events/DisplayForm'
import { useState } from 'react';
import Folders from '../../Code/Calendar_code/Folders'
import Form from './../../Code/Events/Form'
import NewRdv from '../../Code/Calendar_code/NewRdv'
import Add from '../../Code/Dossier/Add'
import Delete from '../../Code/Dossier/Delete'
import Axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as env from './../../EnvirementVariables'
import DisplayDoss from './../../Code/Dossier/DispalyDossier'


function Calendar() {

   //************************************** Dark Mode **************************************************************/
   const [data, setdata] = useState("");  
   //***************************************************************************************************************/

   
  const [date, setdate] = useState("");

      //**************************************** Calendar API  ************************************************************

      let history = useHistory();

      const config ={
        headers:{
            Authorization: localStorage.getItem('token')
        }
      }
      const emailDto = {
        "email": localStorage.getItem('email')
      }


      const [calendarEvents, setcalendarEvents] = useState([]);
      const [idDossier, setidDossier] = useState(0);
    useEffect(() => {
      Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((responses) => {
          Axios.get(env.hostUrl+`/api/dossier/getrdv/${idDossier}/${responses.data.idUtil}`, config).then((response) => {
        setcalendarEvents(response.data);
      });
    }).catch(error => {
        if(error.response.status === 401){
          localStorage.setItem('token',"");
    	    localStorage.setItem('email',"");
          history.push("/");
        }
      });  
      
    }, [idDossier]);

  /***************************** Blur the background when window pop out *********************************************/
  const [displayformstate, setdisplayformstate] = useState({ bool: false,bool2: false,bool3: false,bool4: false,bool5: false ,Title: 0, blur: 1, disable: "auto" });
  const Displayform = () => (
    <DisplayForm setdisplayformstate={setdisplayformstate} data={data} idRdv={displayformstate.Title}/>
    )	  
    const DisplayformInput = () => (
      <Form setdisplayformstate={setdisplayformstate} data={data}/>
    )	
    const DisplayDossier = () => (
      <Add setdisplayformstate={setdisplayformstate} data={data}/>
      )	
      const DisplayDossierD = () => (
        <DisplayDoss setdisplayformstate={setdisplayformstate} data={data} idDossier={idDossier}/>
        )	
    const DeleteDossier = () => (
      <Delete setdisplayformstate={setdisplayformstate} data={data} idDossier={idDossier}/>
      )

    setTimeout(() => {
    document.getElementById('Calendar-body').style.opacity = displayformstate.blur;
    document.getElementById('Calendar-body').style.pointerEvents = displayformstate.disable;
  });

  /*******************************************************************************************************************/
  return (
    <div>
       { displayformstate.bool ? <Displayform/> : null }
       { displayformstate.bool2 ? <DisplayformInput/> : null }
       { displayformstate.bool3 ? <DisplayDossier/> : null }
       { displayformstate.bool4 ? <DeleteDossier/> : null }
       { displayformstate.bool5 ? <DisplayDossierD/> : null }
      <div id='Calendar-body' data-theme={data}>
        <Navbar setdata={setdata}/>
        <div className='calendar-box'>
          <div className='Sidebar-box'>
          <div className="rendez-vous-box">
            <NewRdv setdisplayformstate={setdisplayformstate} />
          </div>
          <div className='SmallCalendar-box'>
              <SmallCalendar setdate={setdate} data={data}/>
          </div>
          <div className='type-box' data-theme={data}>
              <div className='type-public'>
                <i class="fa fa-users" aria-hidden="true"></i>
                <h1 className='type-public-title'>Public</h1>
              </div>
              <div className='type-partager'>
                <i class="fa fa-share-alt" aria-hidden="true"></i>
                <h1 className='type-public-title'>Partagé</h1>
              </div>
              <div className='type-private'>
                <i class="fa fa-user-secret" aria-hidden="true"></i>
                <h1 className='type-public-title'>Privé</h1>
              </div>
          </div>
          <div className='Folders-box'>
              <Folders setdisplayformstate={setdisplayformstate} data={data} setidDossier={setidDossier}/>
          </div>
          </div>
          <div className='FullCalendar-box'>
              <Fullcalendar date={date} Events={calendarEvents} setinfo={setdisplayformstate} data={data}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar