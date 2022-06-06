import React from 'react'
import './Search.css'
import './Search.scss'
import Navbar from './../../Code/Navbar_code/Navbar'
import avatar from './../../../img/avatar1.png'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import DisplayForm from './../../Code/Events/DisplayForm'
import * as env from './../../EnvirementVariables'



function Search() {


  //************************************** Dark Mode **************************************************************/
  const [data, setdata] = React.useState("");  
  //***************************************************************************************************************/

  const [idRdv, setidRdv] = React.useState(0);
  const showwindow2 = (e,param) => {
    e.preventDefault();
    setidRdv(param)
    setdisplayformstate({bool:true,blur:0.1,disable:"none"})
  }

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

const [search, setsearch] = useState("");
const [searchresult, setsearchresult] = useState([]);
const [idUtil, setidUtil] = useState(0);
const [searchnbr, setsearchnbr] = useState(0);

//**********************************************************************************************************/

let history = useHistory();
useEffect(() => {
    Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
      setidUtil(response.data.idUtil);
    }).catch(error => {
      if(error.response.status === 401){
        localStorage.setItem('token',"");
        localStorage.setItem('email',"");
        history.push("/");
      }
    });  
}, []);

  const searchRdv = (e) => {
      
    Axios.post(env.hostUrl+`/api/rdv/searchrdv/${idUtil}`,search,config).then((response) => {
            setsearchresult(response.data);
            setsearchnbr(response.data.length);
    });
  };

  function displaySearchResult() {
    return searchresult.map((item) => {
      var rdvtype = ""
      if(item.type === 0){
        rdvtype ="Public";
      }
      if(item.type === 1){
        rdvtype ="Privé";
      }
      if(item.type === 3){
        rdvtype ="Privé";
      }
      if(item.type === 2){
        rdvtype ="Partagé";
      }
      return (
        <div className='search-rslt-display'>
                <div className='search-rslt-display-img'>
                  <img className='search-rslt-img' src={item.utilisateur.profile_pic}/>
                </div>
                <div className='search-rslt-display-desc'>
                  <div className='search-rslt-desc-top'>
                    <span className='search-rslt-desc-top-title'>{item.title.substring(0,35)}...</span>
                  </div>
                  <div className='search-rslt-desc-bottom'>
                    <span className='search-rslt-desc-bottom-title'>{item.startTime.substring(0,5)} a {item.endTime.substring(0,5)}</span>
                  </div>
                </div>
                <div className='search-rslt-display-place'>
                <div className='search-rslt-display-top'>
                    <span className='search-rslt-display-top-title'>{item.lieu.substring(0,17)}...</span>
                  </div>
                  <div className='search-rslt-display-bottom'>
                    <span className='search-rslt-display-bottom-title'>{item.start}</span>
                  </div>
                </div>
                <div className='search-rslt-display-type'>
                  <div className='search-rslt-type-cont' style={{"background-color":""+item.color}}>
                    <span className='search-rslt-type-title'>Rendez-Vous {rdvtype}</span>
                  </div>
                </div>
                <div className='search-rslt-display-show'><i class="fa fa-eye fa-2x" aria-hidden="true" onClick={(e) => showwindow2(e, item.id)}></i></div>
              </div>
      );
    });
  }

//**********************************************************************************************************/

const [displayformstate, setdisplayformstate] = useState({ bool: false, blur: 1, disable: "auto" });

const Displayform = () => (
  <DisplayForm setdisplayformstate={setdisplayformstate} data={data} idRdv={idRdv}/>
  )		

setTimeout(() => {
  document.getElementById('search-body').style.opacity = displayformstate.blur;
  document.getElementById('search-body').style.pointerEvents = displayformstate.disable;
});

  return (
    <div>
       { displayformstate.bool ? <Displayform/> : null }
      <div id='search-body' data-theme={data}>
        <Navbar setdata={setdata}/>
        <div className='search-input-container'>
          <div className='search-input'>
            <input id='search-page-input' placeholder='Search...' onChange={(e) => {setsearch(e.target.value);}} />
            <div className='search-icon-container'><i class="fa fa-search fa-2x" id='search-icon-pg' aria-hidden="true" onClick={searchRdv} ></i></div>
          </div>
        </div>
        <div className='search-result-page' data-theme={data}>
          <div className='search-result-container' data-theme={data}>
            <div className='search-result-nav'>
              <span className='search-result-nav-span'>Showing: 1-{searchnbr} of {searchnbr} result</span>
            </div>
            <div className='search-result-container-display'>
              {displaySearchResult()}
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search