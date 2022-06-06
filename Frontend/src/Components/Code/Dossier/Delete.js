import React from 'react'
import './Delete.css'
import './Delete.scss'
import sur from './../../../img/sur.png'
import Axios from 'axios';
import * as env from './../../EnvirementVariables'


function Delete({setdisplayformstate,data,idDossier}) {

    const hidewindow = () => {
        setdisplayformstate({bool4:false,blur:1,disable:"auto"})
      }

      const config ={
        headers:{
            Authorization: localStorage.getItem('token')
        }
      }

      const deleteRdv = () =>{
        Axios.get(env.hostUrl+`/api/dossier/delete/${idDossier}`, config).then((responses) => {
          window.setTimeout(() => {
            setdisplayformstate({bool4:false,blur:1,disable:"auto"});
         }, 1000)
        });
      }

  return (
    <div>
        <div id='delete-doss-body' data-theme={data}>
            <div className='add-form-container'>
                <img className='sur' src={sur}/>
                <h1 className='delete-title'>Vous êtes sur ?</h1>
                <p className='delete-para'>Vous ne pourrez pas revenir en arrière</p>
                <div className='btn-box1'>
                    <button className='btn-cancle' onClick={hidewindow}>Annuler</button>
                    <button className='btn-supprimer1' onClick={deleteRdv}>Supprimer</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Delete