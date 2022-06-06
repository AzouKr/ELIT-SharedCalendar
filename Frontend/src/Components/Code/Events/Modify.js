import React from "react";
import "./Form.css";
import "./Form.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MultiSelect from 'react-select'
import CostumStyle from './CostumStyle'
import { useState } from "react";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import * as env from './../../EnvirementVariables'


function Modify({setdisplayformstate11,data,rdvMod,setdisplayformstate}) {

  const hidewindow = () => {
    setdisplayformstate11({bool:false,blur:1,disable:"auto"})
  }

  
  //************************************** Data **************************************************************/

  const [Titre, setTitre] = useState(rdvMod.title);
  const [Lieu, setLieu] = useState(rdvMod.lieu);
  const [dateD, setdateD] = useState(rdvMod.start);
  const [dateF, setdateF] = useState(rdvMod.end);
  const [HeureD, setHeureD] = useState(rdvMod.startTime.substring(0,5));
  const [HeureF, setHeureF] = useState(rdvMod.endTime.substring(0,5));
  const [Type, setType] = useState(rdvMod.type);
  const [Dossier, setDossier] = useState(rdvMod.dossier.idDossier);
  const [Description, setDescription] = useState(rdvMod.description);

  //**********************************************************************************************************/

//**************************************** Add Rdv API  ************************************************************

const config ={
  headers:{
      Authorization: localStorage.getItem('token')
  }
}
const emailDto = {
  "email": localStorage.getItem('email')
}

const [userinfo, setuserinfo] = React.useState(0);
const [dossierinfo, setdossierinfo] = React.useState([]);
let history = useHistory();
useEffect(() => {
  Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
    setuserinfo(response.data.idUtil);
    Axios.get(env.hostUrl+`/api/dossier/alluserdoss/${response.data.idUtil}`, config).then((response) => {
      setdossierinfo(response.data);
  });
  }).catch(error => {
    localStorage.setItem('token',"");
    localStorage.setItem('email',"");
    history.push("/");
  });  
  
}, [dossierinfo]);

function display() {

  return dossierinfo.map((item) => {
    return (
      <option class="option" value={item.idDossier}> {item.titre} </option>
    );
  });
}

//************************************** Participants **************************************************************/

const [participantslist, setparticipantslist] = React.useState([]);
const [participants, setparticipants] = React.useState([]);
const options = participantslist.map(person => ({ value: person.idUtil, label: person.nom +" "+ person.prenom }))
const selectedOption = rdvMod.participants.map(person => ({ value: person.utilisateur.idUtil, label: person.utilisateur.nom +" "+ person.utilisateur.prenom }))
const Partici = participants.map(person => ({utilisateur:{idUtil:parseInt(person.value, 10)},rendezVous:{idRdv:0}}))
//***************************************************************************************************************/

var valid = true;

const [msg_err, setmsg_err] = useState(false);

const Validation = () =>{
  setmsg_err(false);

  if(Titre === ""){
    valid=false;
  }
  if(Lieu === ""){
    valid=false;
  }
  if(dateD === ""){
    valid=false;
  }
  if(dateF === ""){
    valid=false;
  }
  if(HeureD === ""){
    valid=false;
  }
  if(HeureF === ""){
    valid=false;
  }
  if(Type === ""){
    valid=false;
  }
  if(Description === ""){
    valid=false;
  }
  if(Dossier === ""){
    valid=false;
  }
  if(valid === true){
    addRdv();
  }else{
    setmsg_err(true);
  }
  
}

const doss ={
  "idDossier": Dossier
}
const user ={
  "idUtil": userinfo
}

const rdv ={
  "title": Titre,
  "start": dateD,
  "end": dateF,
  "startTime": HeureD+":00",
  "endTime": HeureF+":00",
  "lieu": Lieu,
  "type": Type,
  "color": "#",
  "description": Description,
  "dossier": doss,
  "utilisateur": user,
  "participants": Partici
}
const addRdv = () =>{
  Axios.post(env.hostUrl+`/api/rdv/update/${rdvMod.id}`, rdv, config).then((response) => {
    window.setTimeout(() => {
      history.push("/calendar");
   }, 2000)
    }).catch(error => {
      console.log(error)
    });

}

const DisplayErrMsg = () => (
  <h1 className="rdv-err-msg">Tous les champs nécessaires (*) <br/> doivent etre remplis</h1>
  )

/*******************************************************************************************************************/

  
const dateDTO = {
  "date": dateD,
  "heureD": HeureD,
  "heureF": HeureF
}

useEffect(() => {
  Axios.post(env.hostUrl+`/api/utilisateur/getall/${userinfo}`,dateDTO ,config).then((response) => {
    setparticipantslist(response.data);
  }); 
}, [dossierinfo]);



  return (
    <div>
      <div id="formInput" data-theme={data}>
      <i class="fa fa-times fa-2x" onClick={hidewindow} aria-hidden="true" data-theme={data}></i>
        <form className="form">
          <div class="title">
            <h1 id="title" data-theme={data}>Modifer votre rendez-vous!</h1>
          </div>
           <div id="input-container"> 
          <div class="input-holder">
            <label class="label-form" data-theme={data} for="descr">
              {" "}
              Titre *
            </label>
            <input
            onChange={(e) =>
                setTitre(e.target.value)}
              className="input-form-rdv"
              id="descr"
              type="text"
              name="descr"
              placeholder={rdvMod.title}
            ></input>
          </div>
          <div class="input-holder">
            <label class="label-form" data-theme={data} for="lieu">
              {" "}
              Lieu *
            </label>
            <input
            onChange={(e) =>
                setLieu(e.target.value)}
              className="input-form-rdv"
              id="lieu"
              type="text"
              name="lieu"
              placeholder={rdvMod.lieu}
            ></input>
          </div>
          <div class="input-holder">
            <label class="label-form" data-theme={data} for="date">
              {" "}
              Date début *
            </label>
            <input
            onChange={(e) =>
                setdateD(new Date(e.target.value).toISOString().toString().substring(0,10))}
              className="input-form-rdv"
              id="date"
              type="date"
              name="date"
              placeholder={rdvMod.start}
            ></input>
          </div>
          
          <div class="input-holder">
            <label class="label-form" data-theme={data} for="heure-d">
              {" "}
              Heure début *{" "}
            </label>
            <input
              onChange={(e) =>
                setHeureD(e.target.value)}
              className="input-form-rdv"
              id="heure-d"
              type="time"
              name="heure-d"
              placeholder={rdvMod.startTime}
            ></input>
          </div>
          <div class="input-holder">
            <label class="label-form" data-theme={data} for="date">
              {" "}
              Date fin *
            </label>
            <input
             onChange={(e) =>
                setdateF(new Date(e.target.value).toISOString().toString().substring(0,10))}
              className="input-form-rdv"
              id="date"
              type="date"
              name="date"
              placeholder={rdvMod.end}
            ></input>
          </div>
          <div class="input-holder">
            <label class="label-form" data-theme={data} for="heure-f">
              {" "}
              Heure fin *
            </label>
            <input
            onChange={(e) =>
                setHeureF(e.target.value)}
              className="input-form-rdv"
              id="heure-f"
              type="time"
              name="heure-f"
              placeholder={rdvMod.endTime}
            ></input>
          </div>
        
           <div class="input-holder">
           <label class="label-form" data-theme={data} for="heure-f">
              {" "}
              Participants
            </label>
            <div className="Multiselect">
            <MultiSelect 
            className="multis"
            defaultValue={selectedOption}
            options={options}
            closeMenuOnSelect={false}
            isMulti
            onChange={setparticipants}
            styles={CostumStyle}
            />
            </div>
           </div>

           <div className="type-holder-cont">
           <div class="input-holder">
           <label class="label-form" data-theme={data} for="heure-f">
              Type
            </label>
             <select className="input-form-rdv-select"
             onChange={(e) => {
                  setType(parseInt(e.target.value, 10));
                }}>
               <option value="">Select</option>
               <option class="option" value="1"> Privé </option>
               <option class="option" value="0"> Public </option>
               <option class="option" value="2"> Partagé </option>
             </select>
           </div>
           <div class="input-holder dossier-holder">
           <label class="label-form" data-theme={data} for="heure-f">
              Dossier
            </label>
             <select className="inpt-form-dossier"
             onChange={(e) => {
                  setDossier(parseInt(e.target.value, 10));
                }}>
               <option value="">Select</option>
               {display()}
             </select>
           </div>
           </div>

           <div class="input-holder-desc">
            <label class="label-form desc" data-theme={data} for="descr">
              Description
            </label>
            <div className="CKEditor">
            <CKEditor
                editor={ClassicEditor}
                onChange={(e, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                  data=rdvMod.description;
                }}

              />
            </div>
          </div>
          </div>
          
        </form>
        { msg_err ? <DisplayErrMsg/> : null }
        <div className="btn-AjouterForm">
            <button className="btn-ajouter" onClick={Validation}>Modifier</button>
        </div>
      </div>
    </div>
  );
}

export default Modify;
