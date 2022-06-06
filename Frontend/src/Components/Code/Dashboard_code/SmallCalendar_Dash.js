import React from 'react';
import Calendar from 'react-calendar';
import './SmallCalendar_Dash.css';
import './SmallCalendar_Dash.scss';


function SmallCalendar({data}) {

  return (
   <div className='box-small-calendar-dash' data-theme={data}>
      <Calendar/>
    </div>
  )
}

export default SmallCalendar
