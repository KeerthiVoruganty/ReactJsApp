import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import ProfileStatus from "../../Components/StatusAlerts/ProfileStatus";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import { PORT } from '../../config'
require("./Bookings.css");

export class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    }
  }


  render() {
    const {
      bookings
    } = this.state
    console.log(bookings)
    return (
      <div>
        <div>
          <FixProfileNavbar />
          <div className="auth-right d-lg-flex bg-photoregister ">
            <div className="bg-gradient">
            </div>
            <div className="profile-container">
              <div className="profile-content-card-area">
                <div className="tab-content clearfix">
                  <div className="mt-5">
                    <div className="bookingsNavigation">
                      <Link to={{ pathname: '/allbookings', state: { data: bookings } }} className="booking-links">
                        <p>All Bookings</p>
                      </Link>
                      <Link to={{ pathname: '/pastbookings', state: { data: bookings } }} className="booking-links">
                        <p>Past Bookings</p>
                      </Link>
                      <Link to={{ pathname: '/futurebookings', state: { data: bookings } }} className="booking-links">
                        <p>Future Bookings</p>
                      </Link>
                      <Link to='/employeetrailperiod' className="booking-links">
                        <p>Employee Trail Period</p>
                      </Link>
                    </div>
                    <div className="availability-table-container">
                      <div className="availability-table">
                        <div className="availability-table-header">
                          <div className="availability-table-header-card">
                            <div className="similar-to-h4-style av-table-header-first-line">All Bookings</div>
                            <div className="similar-to-h4-style-1 av-table-header-second-line">See all your bookings from here</div>
                          </div>
                        </div>
                        <div className="availability-table-body mb-0">
                          <div className="availability-table-body-content">
                            <table className="av-tab-root">
                              <thead className="availability-table-head">
                                <tr className="availability-table-head-row">
                                  <th className="availability-table-head-cell">Start Date</th>
                                  <th className="availability-table-head-cell">End Date</th>
                                  <th className="availability-table-head-cell">Institution</th>
                                  <th className="availability-table-head-cell">Class Level / Type</th>
                                  <th className="availability-table-head-cell">Paid Hours Per Class</th>
                                  <th className="availability-table-head-cell">Non-Teaching Hours</th>
                                  <th className="availability-table-head-cell">Total Hours</th>
                                </tr>
                              </thead>
                              <tbody className="availability-table-body-bodytable">
                                {bookings.map((booking, index) => (
                                  <tr
                                    key={index}
                                    className="availability-table-body-row"
                                  >
                                    <td className="availability-table-cell">
                                      <Moment format="DD/MM/YYYY">
                                        {booking.booking_date}
                                      </Moment>
                                    </td>
                                    <td className="availability-table-cell">
                                      {booking.end_time}
                                    </td>
                                    <td className="availability-table-cell">
                                      {booking.institution_id}
                                    </td>
                                    <td className="availability-table-cell">
                                      {booking.class_type}
                                    </td>
                                    <td className="availability-table-cell">
                                      {booking.paid_hours}
                                    </td>
                                    <td className="availability-table-cell">
                                      2-6
                                    </td>
                                    <td className="availability-table-cell">
                                      2-7
                                      </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Bookings;
