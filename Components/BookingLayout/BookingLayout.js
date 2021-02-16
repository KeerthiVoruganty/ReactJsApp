import React from 'react';
require('./BookingLayout.css')

export const BookingLayout = () => {
  const uniqueURl = window.location.pathname
 return (
   <div className="bLayout">
    <p>Start Date</p>
    <p>End Date</p>
    <p>Institution</p>
    <p>Class Level/Type</p>
    <p>Paid Hours Per Class</p>
    <p>Non-Teaching Hours?</p>
    <p>Total Hours</p>
    {
      uniqueURl === "/pastbookings" ? <p> View Invoice</p> : null
    }
    {
      uniqueURl === "/pastbookings" ? <p> Leave Feedback</p> : null
    }
   </div>
 )
}