import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";

export class TeacherBanking extends Component {
  constructor(props) {
    super(props);
    //console.log("props: "+ JSON.stringify(props))
    let user = JSON.parse(window.localStorage.getItem("teacher"));
    console.log("user: "+user)
    if (user === null) {
      window.location = "/login";
    }
    
    this.state = {
      first_name: user.first_name,
      last_name: user.last_name,
      preferred_name: user.preferred_name,
      prefered_work_location: user.prefered_work_location,
      
    };
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
                  <h1 className="mb-4">{this.state.first_name}'s Details</h1>

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
                          className="user-links user-links-active  text-center d-flex  "
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
                          className="user-links text-center d-flex "
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
                  
                  {/* cpntent of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      
                      {/* container of the form */}
                      <div className="availability-table-body  mb-5 mt-5">
                        <div className="availability-table-body-content h-100">
                          
                            <div className="container mt-3">
                              <div className="">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                                <div className="">

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Banking Details</h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  <div className="auth-text-top mb-3 row">

                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Account Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                        {/* {this.state.contact_number} */}
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Bank Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">BSB:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Account Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">ABN</h5> <div className="light-blue-border ml-3"></div>
                                  </div>

                                  <div className="auth-text-top mb-3 row">
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">ABN Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6  my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0 line-height-24">Address:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17  text-capitalize line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Registered per GST:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Tax Declaration:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Super Annuation</h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  <div className="auth-text-top mb-3 row">
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Fund Type:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Employee Identification Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Tax file number (TFN):</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Fund ABN:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Fund Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Fund phone:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-lg-12 col-xl-4 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Fund Address:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>

                                    <div className="form-group col-12 col-lg-4 col-xl-3 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Suburb:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-2 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Postal Code:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-2 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">State:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
{/* if fund type = APRA */}
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">USI:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Account name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Member number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
{/*  end if fund type == APRA */}
{/* else => if fund type == SMSF */}
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">ESA:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">BSB:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Account Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24"></p>
                                      </div>
                                    </div>
{/*  end if fund type == SMSF */}
                                  </div>
                                    
                                </div>
                              </div> 
                            </div>
                         
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
export default TeacherBanking;





