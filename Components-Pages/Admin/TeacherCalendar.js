import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import AvailabilityCalendar from "../Availability/_calender";

export class TeacherCalendar extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: JSON.parse(window.localStorage.getItem("teacher"))
    }
    //console.log("props: "+ JSON.stringify(props))
    // let user = JSON.parse(window.localStorage.getItem("teacher"));
    // console.log("user: "+this.state.user.first_name)
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
                  <h1 className="mb-4">{this.state.user.first_name}'s Details</h1>

                  {/* navigationbar on top */}
                  <div className="userNavigation d-flex justify-content-between">
                    <Link
                      to={{
                        pathname: "/AllTeachers"
                      }}
                      className="user-links text-center d-flex  btn-primary primary-button-no-margin-hover text-white"
                    >
                      <p>BACK</p>
                    </Link>
                    <div className='behind-user-links'>
                      <Link
                          to={{
                             pathname: "/TeacherpersonalDetails"
                          }}
                          className="user-links  d-flex user-links-background-transparent "
                      >
                        <p>1 - Personal</p>
                      </Link>
                    </div>
                    <div className='behind-user-links'>
                      <Link
                          to={{
                            pathname: "/TeacherBanking"
                          }}
                          className="user-links text-center d-flex  "
                      >
                        <p>2 - Banking</p>
                      </Link>
                    </div>
                    <div className='behind-user-links'>
                      <Link
                          to={{
                            pathname: "/validatedocuments"
                          }}
                          className="user-links text-center d-flex "
                      >
                        <p>3 - Documents</p>
                      </Link>
                    </div>
                    <div className='behind-user-links'>
                      <Link
                          to={{
                            pathname: "/TeacherCalendar"
                          }}
                          className="user-links user-links-active text-center d-flex "
                      >
                        <p>4 - Calendar</p>
                      </Link>
                    </div>
                    <div className='behind-user-links'>
                      <Link
                          to={{
                            pathname: "/TeacherBillings"
                          }}
                          className="user-links text-center d-flex "
                      >
                        <p>5 - Billings</p>
                      </Link>
                    </div>
                    
                  </div>
                  
                  
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
export default TeacherCalendar;





