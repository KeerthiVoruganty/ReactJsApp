import React, { useState, useEffect, Component } from 'react';
import FixProfileNavbar from '../../Components/Navbar/FixProfileNavbar';
import { Link } from "react-router-dom"
import AddCollegeProfileClass from "../../Components/PopUpForm/AddClass-CollegeProfile"


const CollegeProfile = props => {
  const [isAddClassPopup, toggleAddClassPopup] = useState(false);

  const toggleAddClass = (e) => {
    toggleAddClassPopup(true)
  }


  return (
    <div>
      {isAddClassPopup && <AddCollegeProfileClass showPopup={toggleAddClassPopup}/>}
      <div>

        <FixProfileNavbar />

        <div className='auth-right d-lg-flex bg-photoregister '>
          <div className='bg-gradient'></div>

          <div className='resume-container-transparent  profile-container-transparent'>

            <div className="profile-name-and-location ">
              <h1>Greenwich English College</h1>
              <h4><i className="mdi mdi-map-marker">Melbourne</i> </h4>
            </div>

            <div className='profile-content-card-area w-100 resume-overflow'>
              <div className='profile-area profile-margin-top-negative'>

                <div className=" w-fill w-100 ">

                  <div className="row">

                    <div className="w-100">
                      <div className="teacher-picture-container">
                        {/* user picture */}
                        <div className='profile-img front-1'>
                          <div className='project__card'>
                            <div className=''>
                              <div className='img-avatar-ellipse-c'>
                                <div className="college-profile-picture"></div>
                              </div>
                            </div>
                          </div>
                          <span className='mdi mdi-camera camera-icon-position-style'></span>
                        </div>
                      </div>

                      <div className='profile-info-container-header'>
                        <div className='profile-info '>
                          <div className='profile-name'>
                            <div className="profile-page-card ">
                              
                              <div className="row badges-profile-margin-row justify-content-center">
                                <div className="col-12 col-lg-6 col-xl-4">
                                  <div className="availability-table  top-floor-row-table-1 profile-qualification-container gray-shadow-box" id="profile-qualification-height">

                                    <div className="compliments-header-bckg"></div>
                                    <h4 className="font-xlg mt-4 text-left ml-3 pl-4 left-0 qualifications-card-title text-front">CAMPUS</h4>
                                    <hr className="qualification-line"></hr>
                                    <div className="availability-table-body row justify-content-between px-0 m-2">
                                      <div className="d-flex justify-content-between w-100"> 
                                        <div className="ml-3 p-1 font-xlg"><i className="mdi mdi-bank mr-2"></i>Spencer St</div>
                                        <div className="profile-qualification-title mb-1 d-flex">
                                          <div className="profile-qualification-title mb-1 ml-4 lh-30"><Link>Edit</Link></div>
                                          <div className=" pr-0 ">
                                            <div className='delete-box'>
                                              <button name='delete' className='box'>
                                                <div className='row'>
                                                  <div className='box-left'>
                                                    <i className='but-icon fa fa-lg fa-times'></i>
                                                    <div className='bar'>
                                                      <i className='but-icon fa fa-lg fa-check'></i>
                                                    </div>
                                                  </div>
                                                  <div className='box-right'></div>
                                                </div>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="pt-4 pb-1 px-5 w-100">
                                        <i className="float-left mdi mdi-map-marker"></i><label className="float-left">- 8th Floor -</label>
                                        <p className="pl-2 mt-0 mb-2 profile-qualification-title ">120 Spencer Street, Melbourne, 3000 Victoria</p>
                                        <div className="">
                                          <div className="font-large profile-qualification-title mb-1">Departments: </div>
                                          <div className="ml-2 text-left">ELICOS</div>
                                          <div className="ml-2 text-left">VET </div>
                                        </div>
                                        <p className=" mt-0 mb-0 profile-qualification-title text-right"><Link to=""> <u>Induction Module</u></Link></p>
                                      </div>


                                      {/* <hr className="qualification-line my-2"></hr> */}
                                    </div>
                                    <div  className="div-pop-name-btn div-pop-name d-contents btn btn-primary btn-block btn-c primary-button-no-margin-hover"  > 
                                      <a href="#" className="no-top-radius ml-0 mr-0 btn-block btn-c btn-primary">
                                        <i className="mdi mdi-plus"><p>ADD CAMPUS</p></i>
                                      </a>
                                    </div>
                                  </div>
                                  
                                </div>

                                <div className="col-12 col-lg-6 col-xl-8" >
                                  <div className="availability-table top-floor-row-table" id="badges">
                                    <h4 className="font-xlg mt-5 text-right mr-5 pr-4 text-front text-gradient">CLASSES</h4>
                                    <hr className="qualification-line"></hr>
                                    <div className="availability-table-body row justify-content-between px-0 m-0">
                                      <div className="col mx-auto">
                                        <div className="row mb-3 justify-content-between">
                                          <div className="gray-shadow-box mx-auto mb-2 p-0 br-4 col-auto ">
                                            <div className="p-4  class-header-drawer">ELICOS - Exam Preparation</div>
                                            <hr className="qualification-line mb-0"></hr>
                                            <div className="row px-4 pb-2 mt-4 class-content-drawer">
                                              <div className=" col-auto">
                                                <div className="profile-qualification-title">Level / Class Type: </div>
                                                <div className="ml-2 text-left lh-14 mb-2">IELTS</div>
                                              </div>
                                              <div className=" col-auto">
                                                <div className="profile-qualification-title">Paid Hours: </div>
                                                <div className="ml-2 text-left">7 Hours</div>
                                                <div className="mt-2 m-0 row small d-flex">
                                                  <div className="ml-2">Arrival: </div>
                                                  <div className="ml-2 text-left">7:30 </div>
                                                </div>
                                                <div className="m-0 row small d-flex">
                                                  <div className="ml-2">Start: </div>
                                                  <div className="ml-2 text-left">8:00 </div>
                                                </div>
                                                <div className="m-0 row small d-flex">
                                                  <div className="ml-2">End: </div>
                                                  <div className="ml-2 text-left">15:00 </div>
                                                </div>
                                              </div>
                                              <div className=" col-auto">
                                                <div className="m-0 mb-2 row">
                                                  <div className="profile-qualification-title mb-1">Session:</div>
                                                  <div className="ml-2 text-left lh-18">Morning  <i className="ml-2 availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></div>
                                                </div>
                                                <div className="m-0 ">
                                                  <div className="profile-qualification-title mb-1">Days:</div>
                                                  <div className="ml-2 text-left lh-18">Monday</div>
                                                  <div className="ml-2 text-left lh-18">Wednesday</div>
                                                  <div className="ml-2 text-left lh-18">Thursday</div>
                                                  <div className="ml-2 text-left lh-18">Friday</div>
                                                </div>
                                              </div>
                                              <hr className="qualification-line my-2"></hr>
                                              <div className=" col-auto">
                                                <div className="m-0 row justify-content-between d-flex">
                                                  <div className="profile-qualification-title mb-1 lh-30"><Link>Edit</Link></div>
                                                  <div className="profile-qualification-title mb-1">
                                                      <div className=" pr-0 ">
                                                        <div className='delete-box'>
                                                          <button name='delete' className='box'>
                                                            <div className='row'>
                                                              <div className='box-left'>
                                                                <i className='but-icon fa fa-lg fa-times'></i>
                                                                <div className='bar'>
                                                                  <i className='but-icon fa fa-lg fa-check'></i>
                                                                </div>
                                                              </div>
                                                              <div className='box-right'></div>
                                                            </div>
                                                          </button>
                                                        </div>
                                                      </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="gray-shadow-box mx-auto mb-2 p-0 br-4 col-auto ">
                                            <div className="p-4  class-header-drawer">ELICOS - General English</div>
                                            <hr className="qualification-line mb-0"></hr>
                                            <div className="row px-4 pb-2 mt-4 class-content-drawer">
                                              <div className=" col-auto">
                                                <div className="profile-qualification-title mb-1">Level / Class Type: </div>
                                                <div className="ml-2 text-left lh-14 mb-2">Elementary GE</div>
                                              </div>
                                              <div className=" col-auto">
                                                <div className="profile-qualification-title mb-1">Paid Hours: </div>
                                                <div className="ml-2 text-left">4 Hours</div>
                                                <div className="mt-2 m-0 row small d-flex">
                                                  <div className="ml-2">Arrival: </div>
                                                  <div className="ml-2 text-left">13:00 </div>
                                                </div>
                                                <div className="m-0 row small d-flex">
                                                  <div className="ml-2">Start: </div>
                                                  <div className="ml-2 text-left">13:30 </div>
                                                </div>
                                                <div className="m-0 row small d-flex">
                                                  <div className="ml-2">End: </div>
                                                  <div className="ml-2 text-left">17:45 </div>
                                                </div>
                                              </div>
                                              <div className=" col-auto">
                                                <div className="m-0 mb-2 row">
                                                  <div className="profile-qualification-title mb-1">Session:</div>
                                                  <div className="ml-2 text-left lh-18">Afternoon  <i className="ml-2 availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></div>
                                                </div>
                                                <div className="m-0 ">
                                                  <div className="profile-qualification-title mb-1">Days:</div>
                                                  <div className="ml-2 text-left lh-18">Monday</div>
                                                  <div className="ml-2 text-left lh-18">Wednesday</div>
                                                </div>
                                              </div>
                                              <hr className="qualification-line my-3"></hr>
                                              <div className=" col-auto">
                                                <div className="m-0 row justify-content-between d-flex">
                                                  <div className="profile-qualification-title mb-1 lh-30"><Link>Edit</Link></div>
                                                  <div className="profile-qualification-title mb-1">
                                                      <div className=" pr-0 ">
                                                        <div className='delete-box'>
                                                          <button name='delete' className='box'>
                                                            <div className='row'>
                                                              <div className='box-left'>
                                                                <i className='but-icon fa fa-lg fa-times'></i>
                                                                <div className='bar'>
                                                                  <i className='but-icon fa fa-lg fa-check'></i>
                                                                </div>
                                                              </div>
                                                              <div className='box-right'></div>
                                                            </div>
                                                          </button>
                                                        </div>
                                                      </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="gray-shadow-box mx-auto mb-2 p-0 br-4 col-auto ">
                                            <div className="p-4  class-header-drawer">ELICOS - General English</div>
                                            <hr className="qualification-line mb-0"></hr>
                                            <div className="row px-4 pb-2 mt-4 class-content-drawer">
                                              <div className="class-content col-auto">
                                                <div className="profile-qualification-title mb-1">Level / Class Type: </div>
                                                <div className="ml-2 text-left lh-14 mb-2">Elementary GE</div>
                                                <div className="ml-2 text-left  lh-14  mb-2">Pre-Intermidiate GE </div>
                                                <div className="ml-2 text-left  lh-14  mb-2">Intermidiate GE</div>
                                              </div>
                                              <div className="class-content col-auto">
                                                <div className="profile-qualification-title mb-1">Paid Hours: </div>
                                                <div className="ml-2 text-left">7 Hours</div>
                                                <div className="mt-2 m-0 row small d-flex">
                                                  <div className="ml-2">Arrival: </div>
                                                  <div className="ml-2 text-left">7:30 </div>
                                                </div>
                                                <div className="m-0 row small d-flex">
                                                  <div className="ml-2">Start: </div>
                                                  <div className="ml-2 text-left">8:00 </div>
                                                </div>
                                                <div className="m-0 row small d-flex">
                                                  <div className="ml-2">End: </div>
                                                  <div className="ml-2 text-left">15:00 </div>
                                                </div>
                                              </div>
                                              <div className="class-content col-auto">
                                                <div className="m-0 mb-2 row">
                                                  <div className="profile-qualification-title mb-1">Session:</div>
                                                  <div className="ml-2 text-left lh-18">Morning  <i className="ml-2 availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></div>
                                                </div>
                                                <div className="m-0 ">
                                                  <div className="profile-qualification-title mb-1">Days:</div>
                                                  <div className="ml-2 text-left lh-18">Monday</div>
                                                  <div className="ml-2 text-left lh-18">Wednesday</div>
                                                </div>
                                              </div>
                                              <hr className="class-content qualification-line my-3"></hr>
                                              <div className="class-content col-auto">
                                                <div className="m-0 row justify-content-between d-flex">
                                                  <div className="profile-qualification-title mb-1 lh-30"><Link>Edit</Link></div>
                                                  <div className="profile-qualification-title mb-1">
                                                      <div className=" pr-0 ">
                                                        <div className='delete-box'>
                                                          <button name='delete' className='box'>
                                                            <div className='row'>
                                                              <div className='box-left'>
                                                                <i className='but-icon fa fa-lg fa-times'></i>
                                                                <div className='bar'>
                                                                  <i className='but-icon fa fa-lg fa-check'></i>
                                                                </div>
                                                              </div>
                                                              <div className='box-right'></div>
                                                            </div>
                                                          </button>
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
                                    <div  className="div-pop-name-btn div-pop-name d-contents btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                          onClick={toggleAddClass}>
                                      <a href="#" className="no-top-radius ml-0 mr-0 btn-block btn-c btn-primary">
                                          <i className="mdi mdi-plus"><p>ADD CLASS</p></i>
                                      </a>
                                    </div>
                                  </div>
                                
                                </div>
                              </div>


                              <div className="profile-can-deliv-container mt-0">
                                <div className="availability-table-container candeliver-profile-container row mt-0">
                                  <div className="availability-table">
                                    <div className="availability-table-header d-flex justify-content-end">
                                      <div className="availability-table-header-card w-auto availability-header-behind"></div>
                                      <div className="availability-table-header-card w-auto text-center">
                                        <div className="similar-to-h4-style margin-can-deliver font-xlg text-front">
                                          PEOPLE
                                        </div>
                                      </div>
                                      
                                    </div>
                                    <div className="people-background-picture mb-5">
                                      <div className="profile-subject-delivered-row">
                                        
                                        <div className="row px-3">
                                          <div className="col-lg-2 col-4 mb-2 m-2 flex-column br-4">
                                          <button  type="submit" className="btn btn-primary btn-block btn-c primary-button-no-margin-hover btn-can-deliever"> + ADD MORE</button>
                                          </div>
                                        </div>
                                        <div className="row justify-content-between px-3 pt-1 cover-margin-for-deliver">
                                          
                                          <div className="col-3 col-xl-auto gray-shadow-box mx-auto p-1 m-2 flex-column br-4 large-box profile-badge">
                                            <div className="d-flex py-1">
                                              <div className="round-avatar-college-people-container green-bkg mr-4 "><div className="round-avatar-college-people "></div></div>
                                              <div className="m-auto"><h5>David Gray</h5></div>
                                            </div>
                                            <hr className="qualification-line "></hr>
                                            <div className="p-3 ">
                                              <div className="d-flex justify-content-between">
                                                <div className="font-large profile-qualification-title mb-3">Role: </div>
                                                <div className="font-large profile-qualification-title">Senior Teacher</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-1">Department: </div>
                                                <div className="profile-qualification-title">ELICOS</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Main Place of Work: </div>
                                                <div className="profile-qualification-title">Spencer St</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className="profile-qualification-title mb-1">Email: </div>
                                                <div className="profile-qualification-title">bla@test.com.au</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Phone Number: </div>
                                                <div className="profile-qualification-title">+61 413567890</div>
                                              </div>
                                              <div className="">
                                                <div className="profile-qualification-title mb-1">Authorizations: </div>
                                                <div className="profile-qualification-title text-right">Can Manage Bookings</div>
                                              </div>
                                            </div>
                                            <hr className="mt-auto qualification-line mb-2"></hr>
                                            <div className=" col-auto">
                                              <div className="m-0 row justify-content-between">
                                                <div className="profile-qualification-title mb-1 ml-4 lh-30"><Link>Edit</Link></div>
                                                <div className="profile-qualification-title mb-1">
                                                    <div className=" pr-0 ">
                                                      <div className='delete-box'>
                                                        <button name='delete' className='box'>
                                                          <div className='row'>
                                                            <div className='box-left'>
                                                              <i className='but-icon fa fa-lg fa-times'></i>
                                                              <div className='bar'>
                                                                <i className='but-icon fa fa-lg fa-check'></i>
                                                              </div>
                                                            </div>
                                                            <div className='box-right'></div>
                                                          </div>
                                                        </button>
                                                      </div>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>


                                          <div className="col-3 col-xl-auto gray-shadow-box mx-auto p-1 m-2 flex-column br-4 large-box profile-badge">
                                            <div className="d-flex p-1">
                                              <div className=" round-avatar-college-people-container green-bkg mr-4 "><div className="round-avatar-college-people "></div></div>
                                              <div className="m-auto"><h5>David Gray</h5></div>
                                            </div>
                                            <hr className="qualification-line "></hr>
                                            <div className="p-3 ">
                                              <div className="d-flex justify-content-between">
                                                <div className="font-large profile-qualification-title mb-3">Role: </div>
                                                <div className="font-large profile-qualification-title">Senior Teacher</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className="profile-qualification-title mb-1">Department: </div>
                                                <div className="profile-qualification-title">ELICOS</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Main Place of Work: </div>
                                                <div className="profile-qualification-title">Spencer St</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className="profile-qualification-title mb-1">Email: </div>
                                                <div className="profile-qualification-title">bla@test.com.au</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Phone Number: </div>
                                                <div className="profile-qualification-title">+61 413567890</div>
                                              </div>
                                              <div className="">
                                                <div className="profile-qualification-title mb-1">Authorizations: </div>
                                                <div className="profile-qualification-title text-right">Can Manage Bookings</div>
                                              </div>
                                            </div>
                                            <hr className="mt-auto qualification-line mb-2"></hr>
                                            <div className=" col-auto">
                                              <div className="m-0 row justify-content-between">
                                                <div className="profile-qualification-title mb-1 ml-4 lh-30"><Link>Edit</Link></div>
                                                <div className="profile-qualification-title mb-1">
                                                    <div className=" pr-0 ">
                                                      <div className='delete-box'>
                                                        <button name='delete' className='box'>
                                                          <div className='row'>
                                                            <div className='box-left'>
                                                              <i className='but-icon fa fa-lg fa-times'></i>
                                                              <div className='bar'>
                                                                <i className='but-icon fa fa-lg fa-check'></i>
                                                              </div>
                                                            </div>
                                                            <div className='box-right'></div>
                                                          </div>
                                                        </button>
                                                      </div>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>


                                          <div className="col-3 col-xl-auto gray-shadow-box mx-auto p-1 m-2 flex-column br-4 large-box profile-badge">
                                            <div className="d-flex p-1">
                                              <div className=" round-avatar-college-people-container green-bkg mr-4 "><div className="round-avatar-college-people "></div></div>
                                              <div className="m-auto"><h5>David Gray</h5></div>
                                            </div>
                                            <hr className="qualification-line "></hr>
                                            <div className="p-3 ">
                                              <div className="d-flex justify-content-between">
                                                <div className="font-large profile-qualification-title mb-3">Role: </div>
                                                <div className="font-large profile-qualification-title">Senior Teacher</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-1">Department: </div>
                                                <div className="profile-qualification-title">ELICOS</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Main Place of Work: </div>
                                                <div className="profile-qualification-title">Spencer St</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className="profile-qualification-title mb-1">Email: </div>
                                                <div className="profile-qualification-title">bla@test.com.au</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Phone Number: </div>
                                                <div className="profile-qualification-title">+61 413567890</div>
                                              </div>
                                              <div className="">
                                                <div className="profile-qualification-title mb-1">Authorizations: </div>
                                                <div className="profile-qualification-title text-right">Can Manage Bookings</div>
                                              </div>
                                            </div>
                                            <hr className="mt-auto qualification-line mb-2"></hr>
                                            <div className=" col-auto">
                                              <div className="m-0 row justify-content-between">
                                                <div className="profile-qualification-title mb-1 ml-4 lh-30"><Link>Edit</Link></div>
                                                <div className="profile-qualification-title mb-1">
                                                    <div className=" pr-0 ">
                                                      <div className='delete-box'>
                                                        <button name='delete' className='box'>
                                                          <div className='row'>
                                                            <div className='box-left'>
                                                              <i className='but-icon fa fa-lg fa-times'></i>
                                                              <div className='bar'>
                                                                <i className='but-icon fa fa-lg fa-check'></i>
                                                              </div>
                                                            </div>
                                                            <div className='box-right'></div>
                                                          </div>
                                                        </button>
                                                      </div>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>


                                          <div className="col-3 col-xl-auto gray-shadow-box mx-auto p-1 m-2 flex-column br-4 large-box profile-badge">
                                            <div className="d-flex p-1">
                                              <div className=" round-avatar-college-people-container green-bkg mr-4 "><div className="round-avatar-college-people "></div></div>
                                              <div className="m-auto"><h5>David Gray</h5></div>
                                            </div>
                                            <hr className="qualification-line "></hr>
                                            <div className="p-3 ">
                                              <div className="d-flex justify-content-between">
                                                <div className="font-large profile-qualification-title mb-3">Role: </div>
                                                <div className="font-large profile-qualification-title">Senior Teacher</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-1">Department: </div>
                                                <div className="profile-qualification-title">ELICOS</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Main Place of Work: </div>
                                                <div className="profile-qualification-title">Spencer St</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className="profile-qualification-title mb-1">Email: </div>
                                                <div className="profile-qualification-title">bla@test.com.au</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Phone Number: </div>
                                                <div className="profile-qualification-title">+61 413567890</div>
                                              </div>
                                              <div className="">
                                                <div className="profile-qualification-title mb-1">Authorizations: </div>
                                                <div className="profile-qualification-title text-right">Can Manage Bookings</div>
                                              </div>
                                            </div>
                                            <hr className="mt-auto qualification-line mb-2"></hr>
                                            <div className=" col-auto">
                                              <div className="m-0 row justify-content-between">
                                                <div className="profile-qualification-title mb-1 ml-4 lh-30"><Link>Edit</Link></div>
                                                <div className="profile-qualification-title mb-1">
                                                    <div className=" pr-0 ">
                                                      <div className='delete-box'>
                                                        <button name='delete' className='box'>
                                                          <div className='row'>
                                                            <div className='box-left'>
                                                              <i className='but-icon fa fa-lg fa-times'></i>
                                                              <div className='bar'>
                                                                <i className='but-icon fa fa-lg fa-check'></i>
                                                              </div>
                                                            </div>
                                                            <div className='box-right'></div>
                                                          </div>
                                                        </button>
                                                      </div>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>



                                          <div className="col-3 col-xl-auto gray-shadow-box mx-auto p-1 m-2 flex-column br-4 large-box profile-badge">
                                            <div className="d-flex p-1">
                                              <div className=" round-avatar-college-people-container green-bkg mr-4 "><div className="round-avatar-college-people "></div></div>
                                              <div className="m-auto"><h5>David Gray</h5></div>
                                            </div>
                                            <hr className="qualification-line "></hr>
                                            <div className="p-3 ">
                                              <div className="d-flex justify-content-between">
                                                <div className="font-large profile-qualification-title mb-3">Role: </div>
                                                <div className="font-large profile-qualification-title">Senior Teacher</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-1">Department: </div>
                                                <div className="profile-qualification-title">ELICOS</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Main Place of Work: </div>
                                                <div className="profile-qualification-title">Spencer St</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className="profile-qualification-title mb-1">Email: </div>
                                                <div className="profile-qualification-title">bla@test.com.au</div>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <div className=" profile-qualification-title mb-3">Phone Number: </div>
                                                <div className="profile-qualification-title">+61 413567890</div>
                                              </div>
                                              <div className="">
                                                <div className="profile-qualification-title mb-1">Authorizations: </div>
                                                <div className="profile-qualification-title text-right">Can Manage Bookings</div>
                                              </div>
                                            </div>
                                            <hr className="mt-auto qualification-line mb-2"></hr>
                                            <div className=" col-auto">
                                              <div className="m-0 row justify-content-between">
                                                <div className="profile-qualification-title mb-1 ml-4 lh-30"><Link>Edit</Link></div>
                                                <div className="profile-qualification-title mb-1">
                                                    <div className=" pr-0 ">
                                                      <div className='delete-box'>
                                                        <button name='delete' className='box'>
                                                          <div className='row'>
                                                            <div className='box-left'>
                                                              <i className='but-icon fa fa-lg fa-times'></i>
                                                              <div className='bar'>
                                                                <i className='but-icon fa fa-lg fa-check'></i>
                                                              </div>
                                                            </div>
                                                            <div className='box-right'></div>
                                                          </div>
                                                        </button>
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
        </div>
      </div>
    </div>
  )
}

export default CollegeProfile;
