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


function Form({setdisplayformstate,data}) {

  const hidewindow = () => {
    setdisplayformstate({bool2:false,blur:1,disable:"auto"})
  }

  
  //************************************** Data **************************************************************/

  const [Titre, setTitre] = useState("");
  const [Lieu, setLieu] = useState("");
  const [dateD, setdateD] = useState(new Date());
  const [dateF, setdateF] = useState(new Date());
  const [HeureD, setHeureD] = useState("");
  const [HeureF, setHeureF] = useState("");
  const [Type, setType] = useState(0);
  const [Dossier, setDossier] = useState(0);
  const [Description, setDescription] = useState("");

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
    if(item.type === 1 || item.type === 3){
      return (
        <option class="option" value={item.idDossier}> {item.titre + " (Prv)"} </option>
      );
    }
  });
}

function displayPublic() {

  return dossierinfo.map((item) => {
    var tyype = "Pb";
    if(item.type === 0 || item.type === 2){
      if(item.type === 2){tyype = "Part"}
      return (
        <option class="option" value={item.idDossier}> {item.titre + " ("+tyype+")"} </option>
      );
    }
  });
}

//************************************** Participants **************************************************************/

const [participantslist, setparticipantslist] = React.useState([]);
const [participants, setparticipants] = React.useState([]);
const options = participantslist.map(person => ({ value: person.idUtil, label: person.nom +" "+ person.prenom }))
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
  Axios.post(env.hostUrl+"/api/rdv/add", rdv, config).then((response) => {
    window.setTimeout(() => {
      setdisplayformstate({bool2:false,blur:1,disable:"auto"})
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

setTimeout(() => {
  document.getElementById('participant').style.opacity = ((dateD !== "" && HeureD !== "" && HeureF !== "") ? 1 : 0.1);
  document.getElementById('participant').style.pointerEvents = ((dateD !== "" && HeureD !== "" && HeureF !== "") ? "auto" : "none");
});

  return (
    <div>
      <div id="formInput" data-theme={data}>
      <i class="fa fa-times fa-2x" onClick={hidewindow} aria-hidden="true" data-theme={data}></i>
        <form className="form">
          <div class="title">
            <h1 id="title" data-theme={data}>Créer votre rendez-vous!</h1>
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
            ></input>
          </div>
      

           <div className="type-holder-cont">
           <div class="input-holder">
           <label class="label-form" data-theme={data} for="heure-f">
              Type*
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
              Dossier*
            </label>
             <select className="inpt-form-dossier"
             onChange={(e) => {
                  setDossier(parseInt(e.target.value, 10));
                }}>
               <option value="">Select</option>
               {(Type === 1||Type === 3) ? display() : displayPublic()}
             </select>
           </div>
           </div>
           <div class="input-holder" id='participant'>
           <label class="label-form" data-theme={data} for="heure-f">
              {" "}
              Participants
            </label>
            <div className="Multiselect">
            <MultiSelect 
            className="multis"
            options={options}
            closeMenuOnSelect={false}
            isMulti
            onChange={setparticipants}
            styles={CostumStyle}
            />
            </div>
           </div>

           <div class="input-holder-desc">
            <label class="label-form desc" data-theme={data} for="descr">
              Description*
            </label>
            <div className="CKEditor">
            <CKEditor
                editor={ClassicEditor}
                onChange={(e, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </div>
          </div>
          </div>
          
        </form>
        { msg_err ? <DisplayErrMsg/> : null }
        <div className="btn-AjouterForm">
            <button className="btn-ajouter" onClick={Validation}>Créer</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
