import React from 'react'
import "./Meeting.css"
import "./Meeting.scss"
import Axios from 'axios';
import * as env from './../../EnvirementVariables'

function Meeting({data,setdisplayformstate,setno_meeting_todays}) {
    

    //**************************************** Meeting API  ************************************************************

    const config ={
        headers:{
            Authorization: localStorage.getItem('token')
        }
      }

      const emailDto = {
        "email": localStorage.getItem('email')
      }
      const [todaysMeeting, settodaysMeeting] = React.useState([]);

      React.useEffect(() => {
        Axios.post(env.hostUrl+"/api/utilisateur/getuserbyemail",emailDto,config).then((response) => {
          Axios.get(env.hostUrl+`/api/rdv/gettodayrdv/${response.data.idUtil}`,config).then((response) => {
            settodaysMeeting(response.data);
            if((response.data).length === 0){
              setno_meeting_todays(true)
            }else{
              setno_meeting_todays(false)
            }
        }).catch(error => {
          return error;
        }); 
            }).catch(error => {
              return error;
            });      
      }, []);

      function displayTodaysMeeting() {
        return todaysMeeting.map((item) => {
          return (
            <div className='Meeting-display' data-theme={data}>
                    <div className='Meeting-left-box' style={{"border-right":"7px solid "+item.color}}>
                        <h1 className='Meeting-time-start'>{(item.startTime).substr(0,5)}</h1>
                        <h1 className='Meeting-time-end'>{(item.endTime).substr(0,5)}</h1>
                    </div>
                    <div className='Meeting-info'>
                        <h3 className='Meeting-place'>{item.lieu}</h3>
                        <h3 className='Meeting-title'>{item.title}</h3>
                    </div>
                </div>
          );
        });
      }

    /*******************************************************************************************************************/


  return (
    <div>
        <div className='Meeting-box'>
            <h1 className='Meetings-headline' data-theme={data}>Meetings</h1>
            <div className='Meeting-container'>
                {displayTodaysMeeting()}  
            </div>
        </div>
    </div>
  )
}

export default Meeting