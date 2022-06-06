import React from 'react';
import './Folders.css';
import './Folders.scss';
import { useEffect } from 'react';
import Axios from 'axios';
import * as env from './../../EnvirementVariables'


function Folders({setdisplayformstate,data,setidDossier}) {

    const showwindow = () => {
        setdisplayformstate({bool3:true,blur:0.1,disable:"none"})
      }
      const showwindow2 = (e,param) => {
        e.preventDefault();
        setidDossier(param)
        setdisplayformstate({bool4:true,blur:0.1,disable:"none"})
      }
      const showwindow3 = (e,param) => {
        e.preventDefault();
        setidDossier(param)
        setdisplayformstate({bool5:true,blur:0.1,disable:"none"})
      }


   //************************************** Open/Close Folder **************************************************************/
    const [isActive, setActive] = React.useState(false);
    const [isActive1, setActive1] = React.useState(false);
    const [isActive2, setActive2] = React.useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };
    const toggleClass1 = () => {
        setActive1(!isActive1);
    };
    const toggleClass2 = () => {
      setActive2(!isActive2);
  };
    //***************************************************************************************************************/


    //************************************** Dossier APIs **************************************************************/


    const config ={
        headers:{
            Authorization: localStorage.getItem('token')
        }
      }
      const emailDto = {
        "email": localStorage.getItem('email')
      }
    
    const [PublicDossier, setPublicDossier] = React.useState([]);

    useEffect(() => {
        Axios.get(env.hostUrl+"/api/dossier/getpublic", config).then((response) => {
            setPublicDossier(response.data);
            console.log(response.data);
          });
      }, []);

      function display() {

        return PublicDossier.map((item) => {
          var classvar = " ";
          if(userinfo !== item.id_doss_creator){
            classvar="folder-edit";
          }
          return (
            <div className='private-folder-box'>
              <details>
                <summary className='private-folder-title'>
                    <i className="fa fa-folder-o fa-lg" aria-hidden="true"></i>
                    <h1 className='private-folder-name'>{item.titre}</h1>
                    <i className={"fa fa-wrench fa-lg "+classvar} aria-hidden="true" onClick={(e) => showwindow3(e, item.idDossier)}></i>
                    <i className={"fa fa-minus-circle fa-lg "+classvar} aria-hidden="true" onClick={(e) => showwindow2(e, item.idDossier)}></i>
                </summary>
                <div className='private-agenda' onClick={(e) => selectDossier(e, item.idDossier)}>
                    <i className="fa fa-address-book-o fa-lg" aria-hidden="true"></i>
                    <h1 className='private-agenda-name'>Agenda</h1>
                </div>
            </details>
        </div>
          );
        });
      }

      
    const [PrivateDossier, setPrivateDossier] = React.useState([]);
    const [userinfo, setuserinfo] = React.useState(0);
    useEffect(() => {
        Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
          setuserinfo(response.data.idUtil);
        Axios.get(env.hostUrl+`/api/dossier/getprivate/${response.data.idUtil}`,config).then((response) => {
            setPrivateDossier(response.data);
          });
    });

      }, []);

      function display1() {
        return PrivateDossier.map((item) => {
          var classvar = " ";
          if((userinfo !== item.id_doss_creator) || item.type === 3){
            classvar="folder-edit ";
          }
          return (
            <div className='private-folder-box'>
              <details>
                <summary className='private-folder-title'>
                    <i className="fa fa-folder-o fa-lg" aria-hidden="true"></i>
                    <h1 className='private-folder-name'>{item.titre}</h1>
                    <i className={"fa fa-wrench fa-lg "+classvar} aria-hidden="true" onClick={(e) => showwindow3(e, item.idDossier)}></i>
                    <i className={"fa fa-minus-circle fa-lg "+classvar} aria-hidden="true" onClick={(e) => showwindow2(e, item.idDossier)}></i>
                </summary>
                <div className='private-agenda' onClick={(e) => selectDossier(e, item.idDossier)}>
                    <i className="fa fa-address-book-o fa-lg" aria-hidden="true"></i>
                    <h1 className='private-agenda-name'>Agenda</h1>
                </div>
            </details>
        </div>
          );
        });
      }


      const [PartageDossier, setPartageDossier] = React.useState([]);
      useEffect(() => {
        Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
        Axios.get(env.hostUrl+`/api/dossier/getshared/${response.data.idUtil}`,config).then((response) => {
          setPartageDossier(response.data);
          });
    });

      }, []);

      function display2() {

        return PartageDossier.map((item) => {
          var classvar = "";
          if(userinfo !== item.id_doss_creator){
            classvar="folder-edit";
          }
          return (
            <div className='private-folder-box'>
              <details>
                <summary className='private-folder-title'>
                    <i className="fa fa-folder-o fa-lg" aria-hidden="true"></i>
                    <h1 className='private-folder-name'>{item.titre}</h1>
                    <i className={"fa fa-wrench fa-lg "+classvar} aria-hidden="true" onClick={(e) => showwindow3(e, item.idDossier)}></i>
                    <i className={"fa fa-minus-circle fa-lg "+classvar} aria-hidden="true" onClick={(e) => showwindow2(e, item.idDossier)}></i>
                </summary>
                <div className='private-agenda' onClick={(e) => selectDossier(e, item.idDossier)}>
                    <i className="fa fa-address-book-o fa-lg" aria-hidden="true"></i>
                    <h1 className='private-agenda-name'>Agenda</h1>
                </div>
            </details>
        </div>
          );
        });
      }


      const selectDossier = (e,param) => {
        e.preventDefault();
        setidDossier(param)
      }

    //***************************************************************************************************************/


  return (
    <div>
        <div id='Folder-body' data-theme={data}>
            <div className='add-folder'>
                <i class="fa fa-plus-circle fa-2x" data-theme={data} onClick={showwindow} aria-hidden="true"></i>
            </div>
            <div className='folder-private-box'>
                    <details>
                        <summary onClick={toggleClass} className='folder-private-title'>
                            <i className={isActive ? 'fa fa-folder-open-o fa-lg': 'fa fa-folder-o fa-lg'} aria-hidden="true"></i>
                            <h1 className='folder-private-name'>Agendas privées</h1>
                        </summary>
                        <div className='folder-private-agendas'>
                            <div className='private-folder'>
                                {display1()}
                            </div>
                        </div>
                    </details>
            </div>
            <div className='folder-shared-box'>
                    <details>
                        <summary onClick={toggleClass2} className='folder-private-title'>
                            <i className={isActive2 ? 'fa fa-folder-open-o fa-lg': 'fa fa-folder-o fa-lg'} aria-hidden="true"></i>
                            <h1 className='folder-private-name'>Agendas partagés</h1>
                        </summary>
                        <div className='folder-private-agendas'>
                            <div className='private-folder'>
                                {display2()}
                            </div>
                        </div>
                    </details>
            </div>
            <div className='folder-shared-box'>
                    <details>
                        <summary onClick={toggleClass1} className='folder-private-title'>
                            <i className={isActive1 ? 'fa fa-folder-open-o fa-lg': 'fa fa-folder-o fa-lg'} aria-hidden="true"></i>
                            <h1 className='folder-private-name'>Agendas publics</h1>
                        </summary>
                        <div className='folder-private-agendas'>
                            {display()}
                        </div>
                    </details>
            </div>
        </div>
    </div>
  )
}




export default Folders
