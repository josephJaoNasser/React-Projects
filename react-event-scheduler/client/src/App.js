//import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import SetEvent from './components/SetEvent' 
//const google = window.gapi

function getSampleCalendarEvent(){
  //event time
  const eventStartTime = new Date()
  const eventEndTime = new Date()
  const timeZone = 'Asia/Manila'
  eventStartTime.setDate(eventStartTime.getDate() + 2)
  eventEndTime.setDate(eventEndTime.getDate() + 8)
  eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

  //event details
  const eventSummary = 'Kaon2 ta sa with shat'
  const eventLocation = 'Brick Lane, Davao City'
  const eventDescription = 'Red horse' 
  const eventColor = 3

  return{
    summary: eventSummary,
    location: eventLocation,
    description: eventDescription,
    start: {
      dateTime: eventStartTime,
      timeZone: timeZone
    },
    end: {
      dateTime: eventEndTime,
      timeZone: timeZone
    },
    colorId: eventColor
  }
}


const insertCalendarEvent = async (event, client) => {

  
  //axios.post('https://oauth2.googleapis.com/token',serviceAcct).then(res => console.log(res.data))

  // const calendar = google.calendar({version: 'v3', auth: client})
  
  // const freeBusyQuery = {
  //   resource: {
  //     timeMin: event.start.dateTime,
  //     timeMax: event.end.dateTime,
  //     timeZone: 'Asia/Manila',
  //     items: [{ id: 'primary' }]
  //   }
  // }
  
  // calendar.freebusy.query(freeBusyQuery, (err, res)=> {
  //   if(err) return console.error('ERROR: ', err.response.data.error_description)
    
  //   const eventsArray = res.data.calendars.primary.busy  
  
  //   if(!eventsArray?.length) {
  
  //     return calendar.events.insert({
  //       calendarId: 'primary', 
  //       resource: event
  //     }, (err)=>{
  //       if (err) return console.error('Calendar event creation error: ', err)
  
  //       return console.log('Calendar event created.')
  //     })
  //   }
  // })
}


/************************* 
//         APP MAIN
**************************/
function App() {     

  const handleEventSubmit = () => {
    console.log('submittt!!!')
    window.open('http://localhost:5002/api/auth/google') 
  }

  const handleLogout = () => {
    axios.get('/logout').then(res => console.log(res)).catch(err =>  console.error(err.response.data))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <SetEvent/>
        <button onClick={handleEventSubmit} style = {submitButtonStyle} >Submit</button>
        <button onClick={handleLogout} style = {submitButtonStyle} >Logout</button>
      </header>
    </div>
  );
}


const submitButtonStyle = {
  padding: '12px',
  marginTop: '1em',
  fontFamily: 'Arial',
  fontSize: '20px',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: '#50b562',
  color: 'white',
  cursor: 'pointer'
}

export default App;
