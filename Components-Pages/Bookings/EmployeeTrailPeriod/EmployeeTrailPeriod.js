import React from 'react';
import { GoogleCalendar } from '../GoogleCalendar';
import { BookingLayout } from '../../../Components/BookingLayout/BookingLayout'
require('./EmployeeTrailPeriod.css')


const EmployeeTrailPeriod = () => {

  return (
    <div>
      <h1> Employee Trail Period Page </h1>
      <GoogleCalendar />
      <br/>
      <BookingLayout />
      <br />
    </div>
  )
};

export default EmployeeTrailPeriod;