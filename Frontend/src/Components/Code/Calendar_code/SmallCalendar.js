import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './SmallCalendar.css';


function SmallCalendar({setdate, data}) {

  /************************************************ Date Picker *****************************************************/
    const [value, onChange] = useState(new Date());
    let year = value.toLocaleDateString().substring(6,10)
    let month = value.toLocaleDateString().substring(3,5)
    let day = value.toLocaleDateString().substring(0,2)
    setdate(year+"-"+month+"-"+day);
  /*******************************************************************************************************************/

  return (
   <div className='box-small-calendar' data-theme={data}>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default SmallCalendar
