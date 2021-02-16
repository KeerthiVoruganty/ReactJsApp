import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import AvailabilityCalendar from "../Availability/_calender";
import Select from "react-select";

export class CollegePersonalCalendar extends Component {
  

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
                  <h1 className="mb-4">Campu's Calendar</h1>

                   {/* navigationbar on top */}
                   <div className="userNavigation d-flex justify-content-between">
                    <Link
                      to={{
                        pathname: "/AllColleges"
                      }}
                      className="user-links text-center d-flex  btn-primary primary-button-no-margin-hover text-white"
                    >
                      <p>BACK</p>
                    </Link>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/CollegeCampuses"
                      }}
                      className="user-links d-flex user-links-background-transparent "
                    >
                      <p>1 - Campuses</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/CollegePeople"
                      }}
                      className="user-links text-center d-flex  "
                    >
                      <p>2 - People</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        // pathname: "/CollegePersonalCalendar"
                      }}
                      className="user-links user-links-active text-center d-flex "
                    >
                      <p>3 - Calendar</p>
                    </Link>
                    </div>
                    
                  </div>
                  <div className="availability-table-container">
                    <div className="availability-table p-5 ">

                        <div className="form-group text-left">
                          <label className="w-100">
                            <p className="float-left mb-0">Campus</p>
                          </label>
                          <div className=" dropdown-box input-icon br-4 mt-1">
                            <i className="mdi  mdi-city"></i>
                            <Select
                              isSearchable
                              isMulti
                              required={true}
                              placeholder="Choose the campus"
                            ></Select>
                          </div>
                        </div>
                       <AvailabilityCalendar></AvailabilityCalendar>
                    </div>
                  </div>
                
                  
                  {/* navigationbar on bottom */}
                  <div className="adminBottomNavigation ">
                    <Link
                      to={{
                        pathname: "/AllColleges"
                      }}
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      <p>BACK - All Colleges</p>
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
export default CollegePersonalCalendar;





