import React, { Component } from 'react';
import axios from 'axios';
import { calendarUrl, apiKey } from '../../config.js';
import { Link } from 'react-router-dom';
require('./GoogleCalendar.css')

export class GoogleCalendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      events : []
    }
  }

  componentDidMount = async () => {
      try {
        const response = await axios.get(`https://content.googleapis.com/calendar/v3/calendars/${calendarUrl}/events?key=${apiKey}`)
        // console.log(response)
        this.setState({
          events: response.data.items,
        })
      } catch(err) {
        this.setState({ error: {
          message: 'Could not contact the server',
          status: 500
        }
      })
    }
    // checking if we are able to get data from google api
    // console.log(this.state.events)
  }
  render() {
    const { events } = this.state

    return (
      <div className='googleCalendarNavbar'>
        {/* Passsing Data Through Links */}
        {/* Passsing events to allbookings */}
        <Link to={{
          pathname: '/allbookings',
          state: {
            data: events
          }
        }}>All Bookings</Link>
        {/* Passsing events to pastbookings */}
        <Link to={{
          pathname: '/pastbookings',
          state: {
            data: events
          }
        }}>Past Bookings</Link>
        {/* Passsing events to pastbookings */}
        <Link to={{
          pathname: '/futurebookings',
          state: {
            data: events
          }
        }}>Future Bookings</Link>
        {/* Employee Trial Period */}
        <Link to='/employeetrialperiod'>Employee Trial Period</Link>
      </div>
    )
  }

}

export default GoogleCalendar;