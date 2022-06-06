import React from 'react'
import './Add.css'
import './Add.scss'
import MultiSelect from 'react-select'
import CostumStyle from './CostumStyle2'
import { useState } from "react";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import * as env from './../../EnvirementVariables'



function DisplayDossier({setdisplayformstate,data,idDossier}) {

    const hidewindow = () => {
        setdisplayformstate({bool5:false,blur:1,disable:"auto"})
      }

     //************************************** Data **************************************************************/

    const [Titre, setTitre] = useState("");
    const [Type, setType] = useState(0);

  //**********************************************************************************************************/


  //**************************************** Add Dossier API  ************************************************************

    const config ={
        headers:{
            Authorization: localStorage.getItem('token')
        }
    }
    const emailDto = {
        "email": localStorage.getItem('email')
    }

    let history = useHistory();
    const [userinfo, setuserinfo] = React.useState(0);
    const [dossierinfo, setdossierinfo] = React.useState([]);
    useEffect(() => {
    Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
        setuserinfo(response.data.idUtil);
        Axios.get(env.hostUrl+`/api/dossier/alluserdoss/${response.data.idUtil}`, config).then((response) => {
            setdossierinfo(response.data);
        });
        Axios.get(env.hostUrl+`/api/utilisateur/getall/${response.data.idUtil}`, config).then((response) => {
            setparticipantslist(response.data);
            }); 
    }).catch(error => {
        localStorage.setItem('token',"");
        localStorage.setItem('email',"");
        history.push("/");
    });  
    
    }, [dossierinfo]);


    //************************************** Participants **************************************************************/

    const [participantslist, setparticipantslist] = React.useState([]);
    const [participants, setparticipants] = React.useState([]);
    const options = participantslist.map(person => ({ value: person.idUtil, label: person.nom +" "+ person.prenom }))
    const Partici = participants.map(person => ({utilisateur:{idUtil:parseInt(person.value, 10)},dossier:{idDossier:0}}))
  //***************************************************************************************************************/

  var valid = true;
  const [msg_err, setmsg_err] = useState(false);

  const Validation = () =>{
  setmsg_err(false);

  if(Titre === ""){
      valid=false;
  }
  if(Type === ""){
      valid=false;
  }
  if(valid === true){
      addDossier();
  }else{
    setmsg_err(true);
  }
  
  }

      
      const DossierAdd ={
        "titre": Titre,
        "type": Type,
        "id_doss_creator": userinfo,
        "partageDossiers": Partici
      }
      const addDossier = () =>{
        Axios.post(env.hostUrl+`/api/dossier/update/${idDossier}`, DossierAdd, config).then((response) => {
          window.setTimeout(() => {
            setdisplayformstate({bool3:false,blur:1,disable:"auto"})
         }, 2000)
          }).catch(error => {
          });
      
      }
    
      const DisplayErrMsg = () => (
        <h1 className="doss-err-msg">Tous les champs nécessaires (*) doivent etre remplis</h1>
        )

    //**********************************************************************************************************/

    setTimeout(() => {
      document.getElementById('participant').style.opacity = (Type === 2 ? 1 : 0.1);
      document.getElementById('participant').style.pointerEvents = (Type === 2 ? "auto" : "none");
  });

  return (
    <div>
    <div id='add-doss-body' data-theme={data}>
        <i class="fa fa-times fa-3x" onClick={hidewindow} aria-hidden="true" data-theme={data}></i>
        <div className='add-form-container'>
            <div class="add-doss-title-box">
                <h1 className="add-doss-title titles" data-theme={data}>Modifier dossier!</h1>
            </div>
            <div className='input-add-doss-container'>
                <div className='input-add-doss-first'>
                    <h1 className='input-add-doss-title titles' data-theme={data}>Titre * :</h1>
                    <input className='input-add-doss' onChange={(e) =>
                setTitre(e.target.value)}/>
                </div>
                <div className='input-add-doss-first'>
                <h1 className='input-add-doss-type titles' data-theme={data}>Type * :</h1>
                    <select className="input-add-doss-select" onChange={(e) => {
                  setType(parseInt(e.target.value, 10));
                }}> 
                        <option value="">Select</option>
                        <option class="option" value="1"> Privé </option>
                        <option class="option" value="0"> Public </option>
                        <option class="option" value="2"> Partagé </option>
                    </select>  
                </div>
                <div className='input-add-doss-first' id='participant'>
                <h1 className='input-add-doss-partage titles' data-theme={data}>Avec :</h1>
                 <MultiSelect 
                    options={options}
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={setparticipants}
                    styles={CostumStyle}
                /> 
            </div>
            </div>
        </div>
        { msg_err ? <DisplayErrMsg/> : null }
        <div className="btn-AjouterDoss">
            <button className="btn-ajouter-doss" onClick={Validation} >Modifier</button>
          </div>
    </div>
    </div>
  )
}

export default DisplayDossier