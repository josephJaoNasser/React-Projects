import { useState, useRef } from 'react'

const SetEvent = () => {

  const eventStartDate = new Date()
  const eventEndDate = useRef()

  const [eventDuration, setEventDuration] = useState({
    startDate: eventStartDate.toISOString().split('T')[0],
    startTime: null,
    endDate: eventStartDate.toISOString().split('T')[0],
    endTime: null
  })

  const handleEventStartDateChange = (e) => {
    //set event start date
    setEventDuration(date => ({
      ...date,
      startDate: e.target.value
    }))
    let newStartDate = new Date(e.target.value)
    let currentEndDate = new Date(eventEndDate.current.value)

    //if end date is somehow before start date, set end date to the start date 
    if(newStartDate > currentEndDate){
      setEventDuration(date => ({
        ...date,
        endDate: e.target.value
      }))
    }
  }

  const handleEventEndDataChange = (e) => {
    setEventDuration(date => ({
      ...date,
      endDate: e.target.value
    }))
  }

  const handleStartTimeChange = (e) => {

  }

  const handleEndTimeChange = (e) => {

  }

  return (
    <div>
      <label for="eventstartdate">Event start date:</label>
      &nbsp;&nbsp;
      <input        
        type="date" 
        id="eventstartdate" 
        name="eventstartdate"
        style ={dateTimeStyle}
        onChange = { (e) => handleEventStartDateChange(e) }   
        value={eventDuration.startDate}
        min={new Date().toISOString().split('T')[0]}
      />
      &nbsp;&nbsp;&nbsp;
      <label for="eventstarttime">Start Time:</label>
      &nbsp;&nbsp;
      <input 
        type="time" 
        id="birthdaytime" 
        name="birthdaytime"
        style ={dateTimeStyle}
        onChange = { (e) => handleStartTimeChange(e) }  
      />

      <hr/>

      <label for="eventenddate">Event end date:</label>
      &nbsp;&nbsp;
      <input 
        type="date" 
        id="eventenddate" 
        name="eventenddate"
        style ={dateTimeStyle}
        onChange = { (e) => handleEventEndDataChange(e) }   
        min={eventDuration.startDate}
        value={eventDuration.endDate}
        ref={eventEndDate}
      />
      &nbsp;&nbsp;&nbsp;
      <label for="eventendtime">End Time:</label>
      &nbsp;&nbsp;
      <input 
        type="time" 
        id="eventendtime" 
        name="eventendtime"
        style ={dateTimeStyle}
        onChange = { (e) => handleEndTimeChange(e) }  
      />
    </div>
  )
}

const dateTimeStyle = {
  padding: '8px',
  marginTop: '1em',
  fontFamily: 'Arial',
  fontSize: '20px'
}

export default SetEvent
