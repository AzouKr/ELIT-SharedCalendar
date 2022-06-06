import React from "react";
import FullCalendar from "@fullcalendar/react";
import './Fullcalendar.css'
import './Fullcalendar.scss'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick



export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();
  
  state = {
    calendarWeekends: true,
    calendarEvents : this.props.Events,
  };
  

  render() {    
    this.state.calendarEvents=this.props.Events;
    setTimeout(() => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate(this.props.date); // call a method on the Calendar object
  });

    return (
      <div>
      <div className="demo-app">
        <div className="demo-app-calendar" data-theme={this.props.data}>
            <FullCalendar
           id="fullCalendar"
           firstDay={1}
            initialView = "dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin,timeGridPlugin]}
            ref={this.calendarComponentRef}
            events={this.state.calendarEvents}
            headerToolbar= {{
              left: 'title',
              right: 'dayGridMonth,dayGridWeek,timeGridDay today prev,next'
            }}
            eventClick={(info)=> {
              var title = info.event.id;
              this.props.setinfo({
                bool: true,
                Title: title,
                blur: 0.1,
                disable: "none"
            });
            }}
          />
        </div>
      </div>
      </div>
    );
  }
}
