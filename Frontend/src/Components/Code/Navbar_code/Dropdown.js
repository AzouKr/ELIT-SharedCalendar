import React from 'react'
import logo from './../../../img/avatar1.png'
import './Dropdown.css'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useEffect } from 'react';
import * as env from './../../EnvirementVariables'


function Dropdown() {
	const history = useHistory()

	const logout = () =>{

		localStorage.setItem('token',"");
    	localStorage.setItem('email',"");
		window.setTimeout(() => {
			history.push("/")
		 }, 2000)
	}

	//**************************************** Notif API  ************************************************************

	const config ={
		headers:{
			Authorization: localStorage.getItem('token')
		}
	  }
	  const emailDto = {
		"email": localStorage.getItem('email')
	  }
	
	  const [userinfo, setuserinfo] = React.useState([]);
	  useEffect(() => {
		Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
			setuserinfo(response.data);
		});  
		
	  }, []);

	
	  /*******************************************************************************************************************/

  return (
    <div className='dropdown-body'>
  	<div className="sec-center"> 	
	  	<input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
	  	<label className="for-dropdown" for="dropdown"><img id='img-profile' src={userinfo.profile_pic}/> <i className="uil uil-arrow-down"></i></label>
  		<div className="section-dropdown"> 
		  	<Link to='/profile'>
  			<div className='dropdown-cont'>
			  <i class="fa fa-user-circle fa-lg" aria-hidden="true"></i>
			  <a href="#" className='title-toggle'>Profile <i class="uil uil-arrow-right"></i></a>
			</div>
			</Link>
		  	<input className="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub"/>
			  <div className='dropdown-cont'>
			  	<i class="fa fa-cog fa-lg" aria-hidden="true"></i>
			  	<label className="title-toggle" for="dropdown-sub">Paramètres de confidentialité<i className="uil uil-plus"></i></label>
			</div>
	  		<div className="section-dropdown-sub"> 
			  	<Link to='/profile/edit-account-details'>
			  	<div className='dropdown-cont'>
			  		<i class="fa fa-cog fa-lg" id='sub-icon' aria-hidden="true"></i>
			  		<label className="title-toggle" for="dropdown-sub">Paramètres<i className="uil uil-plus"></i></label>
			  	</div>
				</Link>
				<Link to='/profile/security-page' style={{ textDecoration: 'none' }}>
	  			<div className='dropdown-cont'>
				  	<i class="fa fa-shield fa-lg" aria-hidden="true"></i>
			  		<label className="title-toggle" for="dropdown-sub">Sécurité et connexion<i className="uil uil-plus"></i></label>
			  	</div>
				</Link>
	  		</div>
  			<div className='dropdown-cont' onClick={logout}>
			  <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i>
			  <a href="" className='title-toggle' >Se déconnecter <i class="uil uil-arrow-right"></i></a>
			</div>
  		</div>
  	</div>
    </div>
  )
}

export default Dropdown