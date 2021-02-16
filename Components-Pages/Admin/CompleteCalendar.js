import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import AvailabilityCalendar from "../Availability/_calender";

export class CompleteCalendar extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: JSON.parse(window.localStorage.getItem("teacher"))
    }
    
    if (this.state.user === null) {
      window.location = "/login";
    }
    
  }

  render() {
    return (
                
      <div>
        <FixProfileNavbar />

        <div className="auth-right d-lg-flex bg-photoregister ">
          <div className='bg-gradient'></div>
          <div className="profile-container">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">Complete Calendar</h1>
                  
                  <div className="availability-table-container">
                    <div className="availability-table">
                      

                      <div className="availability-table-body mb-5">
                        <div className="availability-table-body-content">
                          <AvailabilityCalendar
                            user={this.state.user}
                          ></AvailabilityCalendar>
                        </div>
                      </div>    
                    </div>
                  </div>
                
                  {/* navigationbar on bottom */}
                  <div className="adminBottomNavigation ">
                    <Link
                      to={{
                        pathname: "/AllTeachers"
                      }}
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      <p>BACK - All Teachers</p>
                    </Link>
                    
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
export default CompleteCalendar;





