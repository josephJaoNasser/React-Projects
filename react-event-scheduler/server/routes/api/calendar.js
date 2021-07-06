require('dotenv/config')
const express = require('express')
const router = express.Router()
const { google } = require('googleapis')


//insert the event
function insertCalendarEvent(event = {}, client){

  const calendar = google.calendar({version: 'v3', auth: client})
  
  const freeBusyQuery = {
    resource: {
      timeMin: event.start.dateTime,
      timeMax: event.end.dateTime,
      timeZone: 'Asia/Manila',
      items: [{ id: 'primary' }]
    }
  }
  
  calendar.freebusy.query(freeBusyQuery, (err, res)=> {
    if(err) return console.error('ERROR: ', err.response.data.error_description)
    
    const eventsArray = res.data.calendars.primary.busy  
  
    if(!eventsArray?.length) {
  
      return calendar.events.insert({
        calendarId: 'primary', 
        resource: event
      }, (err)=>{
        if (err) return console.error('Calendar event creation error: ', err)
  
        return console.log('Calendar event created.')
      })
    }
  })
}

// @POST /schedule
// @desc add schedule to g-calendar
// @access private
router.post('/schedule',(req, res) => {
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

  const event = {
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

  insertCalendarEvent(event, req.client)
  
})

module.exports = router