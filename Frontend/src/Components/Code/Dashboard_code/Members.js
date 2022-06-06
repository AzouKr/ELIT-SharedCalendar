import React from 'react'
import './Members.css'
import './Members.scss'
import profile_pic1 from './../../../img/avatar1.png';
import profile_pic2 from './../../../img/avatar2.png';
import profile_pic3 from './../../../img/avatar3.png';
import Axios from 'axios';
import * as env from './../../EnvirementVariables'



function Members({data}) {
    

      //**************************************** Membres API  ************************************************************

    const config ={
        headers:{
            Authorization: localStorage.getItem('token')
        }
      }
      const emailDto = {
        "email": localStorage.getItem('email')
      }
  
      const [percentage, setpercentage] = React.useState(0); 
      React.useEffect(() => {
        Axios.get(env.hostUrl+"/api/rdv/gettauxachv", config).then((response) => {
            setpercentage(response.data);
        });}, []);


        const [userProfilePic, setuserProfilePic] = React.useState([]); 

        React.useEffect(() => {
            Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
              Axios.get(env.hostUrl+`/api/utilisateur/profilepic/${response.data.idUtil}`, config).then((response) => {
                setuserProfilePic(response.data);
            });
            }).catch(error => {
              return error;
            });}, []);
        
        function displayProfilePic() {
            return userProfilePic.slice(0, 3).map((item) => {
              return (
                <div className='profile-img-member'><img className='profile-img-member first-img' src={item.profile_pic}/></div>
              );
            });
          }

  
      /*******************************************************************************************************************/

  return (
    <div>
        <div id='dashboard-members-body' data-theme={data}>
            <div className='members-header'>
                <i className="fa fa-users fa-2x" id='members' aria-hidden="true"></i>
                <h1 className='team-title'>L'équipe</h1>
            </div>
            <h2 className='team-sec-title'>Membres de l'équipe</h2>
            <div className='members-profile-images'>
                {displayProfilePic()}
                <div className='profile-img-member-nbr'><h1 className='team-nbr'>+{userProfilePic.length-3}</h1></div>
            </div>
            <div className='members-profile-info'>
                <h1 className='members-profile-info-title' data-theme={data}>Taux d'achèvement :</h1>
                <div className='circle-border' style={{"--p":percentage}}>
                    <h1 className='percentage'>{percentage}%</h1>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Members