import React from 'react'
import Navbar from '../../Code/Navbar_code/Navbar'
import './Dashboard.css'
import './Dashboard.scss'
import SmallCalendar from './../../Code/Dashboard_code/SmallCalendar_Dash'
import Meeting from '../../Code/Dashboard_code/Meeting';
import back_img from './../../../img/ux_background.png'
import { Link } from 'react-router-dom';
import Weather from './../../Code/WeatherWidget/Weather'
import DisplayForm from './../../Code/Events/DisplayForm'
import Members from '../../Code/Dashboard_code/Members'
import Axios from 'axios';
import { useEffect } from 'react';
import weatherOffilne from './../../../img/weatherOffline.png'
import weatherOffilne_dark from './../../../img/weatherOffline_dark.png'
import no_meetings from './../../../img/no_meetings.png'
import no_meetings_dark from './../../../img/no_meetings_dark.png'
import { Offline } from "react-detect-offline";
import { useHistory } from "react-router-dom";
import * as env from './../../EnvirementVariables'






function Dashboard() {

  //************************************** Dark Mode **************************************************************/
  const [data, setdata] = React.useState("");  
  //***************************************************************************************************************/


  //************************************** weather Logo **************************************************************/
  const LightLogo = () => (
    <img className='weatherOffline' src={weatherOffilne}/>
  )
  const DarkLogo = () => (
    <img className='weatherOffline' src={weatherOffilne_dark}/>
  )
  //***************************************************************************************************************/

  //************************************** no_meeting Logo **************************************************************/

  const [no_meeting_todays, setno_meeting_todays] = React.useState(false);
  const No_meeting = () => (
    <div >
      { data ? <img className='no_meeting' src={no_meetings_dark}/> : <img className='no_meeting' src={no_meetings}/> }
    </div>
  )
  //***************************************************************************************************************/


    //**************************************** Dashboard API  ************************************************************

    const config ={
      headers:{
          Authorization: localStorage.getItem('token')
      }
    }
    const emailDto = {
      "email": localStorage.getItem('email')
    }

    const [userinfo, setuserinfo] = React.useState([]);
    const [rdvstats, setrdvstats] = React.useState([]);
    let history = useHistory();
    useEffect(() => {
      Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
        setuserinfo(response.data);
        Axios.get(env.hostUrl+`/api/rdv/getrdvstats/${response.data.idUtil}`, config).then((response) => {
        setrdvstats(response.data);
      });
      }).catch(error => {
        if(error.response.status === 401){
          localStorage.setItem('token',"");
    	    localStorage.setItem('email',"");
          history.push("/");
        }
      });  
      
    }, []);

    /*******************************************************************************************************************/


  return (
    <div>
      <div id='Dashboard-body' data-theme={data}>
        <Navbar setdata={setdata}/>
          <div className='Dashboard-container'>
          <div className='Dashboard-left-container'>
              <div className='welcome-container' data-theme={data}>
                <img src={back_img} id='dash-welcome-img' data-theme={data}/>
                <h1 className='welcome-text'>Bienvenu {userinfo.nom}</h1>
                <p className='welcome-para'>Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin</p>
                <Link to='/calendar'>
                <button className='btn-dash-calendar'>Voir le Caledrier</button>
                </Link>
              </div>
              <div className='Dashboard-left-container-bottom'  data-theme={data}>
                <div className='profile-box'  data-theme={data}>
                  <div className='profile-top-container'>
                    <div className='profile-img-dash'><img className='profile-img-dash' src={userinfo.profile_pic}/></div>
                    <h1 className='profile-username-dash' data-theme={data}>{userinfo.nom} {userinfo.prenom}</h1>
                    <h2 className='profile-desc-dash'>Rejoindre {userinfo.dateR}</h2>
                  </div>
                  <div className='profile-bottom-container'>
                    <div className='profile-bottom-div right-div'>
                      <h1 className='nbr-stat' data-theme={data}>{rdvstats.total}</h1>
                      <h3 className='title-stat'>Tout</h3>
                    </div>
                    <div className='profile-bottom-div middle-div'>
                      <h1 className='nbr-stat' data-theme={data}>{rdvstats.participate}</h1>
                      <h3 className='title-stat'>Participer</h3>
                    </div>
                    <div className='profile-bottom-div left-div'>
                      <h1 className='nbr-stat' data-theme={data}>{rdvstats.create}</h1>
                      <h3 className='title-stat'>Créé</h3>
                    </div>
                  </div>
                </div>
                <div className='dashboard-bottom-side'>
                    <div className='weather-widget'>
                    <Offline>{ data ? <DarkLogo/> : <LightLogo/> }</Offline>
                      <Weather/>
                    </div>
                      <Members data={data}/>
                </div>
              </div>
          </div>
          <div className='Dashboard-sidebar' data-theme={data}>
              <div className='mini-calendar-dash'>
                  <SmallCalendar data={data}/>
              </div>
              <div className='today-meeting'>
                  { no_meeting_todays ? <No_meeting/> : null }
                  <Meeting data={data} setno_meeting_todays={setno_meeting_todays}/>
              </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard