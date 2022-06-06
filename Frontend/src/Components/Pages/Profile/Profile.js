import React from 'react'
import './Profile.css'
import './Profile.scss'
import Navbar from './../../Code/Navbar_code/Navbar'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import * as env from './../../EnvirementVariables'


function Profile() {

  //************************************** Dark Mode **************************************************************/
  const [data, setdata] = React.useState("");  
  //***************************************************************************************************************/



  //**************************************** Profile API  ************************************************************

  const config ={
    headers:{
        Authorization: localStorage.getItem('token')
    }
  }
  const emailDto = {
    "email": localStorage.getItem('email')
  }

  const [userinfo, setuserinfo] = React.useState([]);
  let history = useHistory();
  useEffect(() => {
    Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
      setuserinfo(response.data);
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
      <div id="profile-body" data-theme={data}>   
        <Navbar setdata={setdata}/>
        <div className='prf-nav' data-theme={data}>
          <h3 className='prf-nav-link slash-0'>Home</h3>
          <h3 className='prf-nav-link slash-1'>/</h3>
          <h3 className='prf-nav-link slash-2'>User</h3>
          <h3 className='prf-nav-link slash-3'>/ User Profile</h3>
        </div>
        <div className='profile-info-box'>
          <div className='prf-inf-left-side'>
            <div className='left-side-top' data-theme={data}>
              <img  className='prf-inf-img' src={userinfo.profile_pic}/>
              <h1 className='prf-inf-name'>{userinfo.nom} {userinfo.prenom}</h1>
              <p className="text-secondary">{userinfo.speciality}</p>
              <p className="text-muted">{userinfo.lieuN}</p>
            </div>
            <div className='left-side-bottom'>
              <li className='list-group-item-prf' data-theme={data}>
                <i class="fa fa-globe fa-lg" aria-hidden="true"></i>
                <span className='item-name'>Website</span>
                <span className='item-link'>{userinfo.website}</span>
              </li>
              <li className='list-group-item-prf' data-theme={data}>
                <i class="fa fa-github fa-lg" aria-hidden="true"></i>
                <span className='item-name'>GitHub</span>
                <a href={userinfo.github} className="a-tag-social"> 
                <span className='item-link'>{userinfo.nom}</span>
                </a>
              </li>
              <li className='list-group-item-prf' data-theme={data}>
                <i class="fa fa-twitter fa-lg" aria-hidden="true"></i>
                <span className='item-name'>Twitter</span>
                <a href={userinfo.twitter} className="a-tag-social">
                <span className='item-link'>@{userinfo.nom}</span>
                </a>
              </li>
              <li className='list-group-item-prf' data-theme={data}>
                <i class="fa fa-instagram fa-lg" aria-hidden="true"></i>
                <span className='item-name'>Instagram</span>
                <a href={userinfo.instagram} className="a-tag-social"> 
                <span className='item-link'>{userinfo.nom}</span>
                </a>
              </li>
              <li className='list-group-item-prf' data-theme={data}>
                <i class="fa fa-facebook-square fa-lg" aria-hidden="true"></i>
                <span className='item-name'>Facebook</span>
                <a href={userinfo.facebook} className="a-tag-social">
                <span className='item-link'>{userinfo.nom}</span>
                </a>
              </li>
            </div>
          </div>
          <div className='prf-inf-right-side'>
          <div className='right-side-top' data-theme={data}>
            <li className='list-info-prf' data-theme={data}>
              <span className='item-info-name'>Nom</span>
              <span className='item-info-desc'>{userinfo.nom}</span>
            </li>
            <li className='list-info-prf' data-theme={data}>
              <span className='item-info-name'>Prenom</span>
              <span className='item-info-desc'>{userinfo.prenom}</span>
            </li>
            <li className='list-info-prf' data-theme={data}>
              <span className='item-info-name'>Phone</span>
              <span className='item-info-desc'>{userinfo.tel}</span>
            </li>
            <li className='list-info-prf' data-theme={data}>
              <span className='item-info-name'>Email</span>
              <span className='item-info-desc'>{userinfo.email}</span>
            </li>
            <li className='list-info-prf' data-theme={data}>
              <span className='item-info-name'>Date de Naissance</span>
              <span className='item-info-desc'>{userinfo.dateN}</span>
            </li>
            <li className='list-info-prf' data-theme={data}>
              <span className='item-info-name'>Lieu de Naissance</span>
              <span className='item-info-desc'>{userinfo.lieuN}</span>
            </li>
            <Link to='/profile/edit-account-details'>
            <button className='btn-info-edit'>Modifier</button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile