import React, { useState, useEffect } from 'react'
import './Availability.css';
import FixProfileNavbar from '../../Components/Navbar/FixProfileNavbar'
import DatePicker from "react-datepicker";
import  AvailabilityCalendar  from './AvailabilityCalendar.js'
import $ from "jquery";
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
// import DatePicker from "../User/DateRange";



const Availability = () => {

  const [from_date, setFDate] = useState(new Date());
  const [to_date, setToDate] = useState(new Date());

  const saveRule= () =>{
    // var time_slots = document.querySelectorAll("input[name=balloon-radio-group]:checked");
    // alert(time_slots);

  const checkboxes = document.getElementsByName("balloon-radio-group");
  const selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked===true);
  // console.log(selectedCboxes);
  const time_slots = selectedCboxes.map(item => item.id.split("_"));
  const range = moment.range(from_date, to_date);
  const selected_calendar_dates = Array.from(range.by('days')).map(m => m.format('DD-MM-YYYY'));
  const selected_days = Array.from(range.by('days')).map(m => m.format('dddd'));
  let a = [];
  selected_days.forEach((sd)=>time_slots.forEach((ts,index)=>{
    if(sd===ts[0]){
      a.push(ts);
    };
  }))
  console.log(a);
   console.log(selected_days,time_slots);
  }



  useEffect(()=>{
    // var data = "<table><tr><td>123</td></tr><tr><td>345</td></tr><tr><td>567</td></tr></table>";
    // $(".fc-content-skeleton tbody tr td").append(data);
  })
  return (
    <div>
      <FixProfileNavbar />

      <div className="auth-right d-lg-flex bg-photoregister ">
        <div className="bg-gradient"></div>
        <div className="profile-container ">
          <div className="profile-content-card-area">
            <div className="tab-content clearfix">
              <div className="mt-5">

                <div className="row">
                  <h1 className="mb-4 col-4">Availability</h1>
                  {/* next classes */}
                  <div className="availability-table my-0 col-12 col-lg-8 p-0">
                    <h4 className="mt-1 text-front text-gradient next-class">NEXT CLASSES</h4>
                    <hr className="qualification-line"></hr>
                    <div className="availability-table-body justify-content-center row m-2 p-1">
                      <ul className="profile-list-qualifications row w-100 mb-0 next-classes-text ">
                        <li className="col-4 text-center mb-2 pt-0"><b>Monday 8/12</b><br/><small className="ml-3"> 8:30 am - 2:00 pm<br/><b className="ml-3">College Name</b></small></li>
                        <li className="col-4 text-center mb-2"><b>Wednesday 10/12</b><br/><small className="ml-3"> 8:30 am - 2:00 pm<br/><b className="ml-3">College Name</b></small></li>
                        <li className="col-4 text-center mb-2"><b>Thursday 18/12</b><br/><small className="ml-3"> 8:30 am - 2:00 pm<br/><b className="ml-3">College Name</b></small></li>
                      </ul>
                    </div>
                  </div>
                </div>


                <div className="row align-items-center">
                  
                  <div className="col-xl-9 col-lg-12">

                   <div className="availability-table-container justify-content-center ">
                    <div className="availability-table gray-shadow-box mt-1">
                    <div className="compliments-header-bckg"></div>
                      <h4 className="w-max font-xlg mt-5  left-0 ml-4 compliments-card-title text-front">CREATE A RULE</h4>
                      <div className="profile-qualification-body">
                        <hr className="qualification-line"></hr>
                        <div className="availability-table-body justify-content-center row pt-0 m-0">

                          <p className="text-left px-5 py-2 mb-3">Check the shift you are available to work, and decide from when until what date you want this rule to be effective, so that we can plan your week.</p>
                         
                         
                          <div className="calendar-rule-container pb-3">
                            <div className="row">
                              <div className="col-1"></div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Monday</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Monday_sunrise"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>

                                    <label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Monday_day"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Monday_evening"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Tuesday</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Tuesday_sunrise"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Tuesday_day"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Tuesday_evening"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Wednesday</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Wednesday_sunrise"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>

                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Wednesday_day"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Wednesday_evening"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Thursday</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Thursday_sunrise"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Thursday_day"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Thursday_evening"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Friday</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Friday_sunrise"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Friday_day"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <div id="r8-balloon-radio-group-wrapper-availability">
                                      <ul>
                                        <li>
                                          <input className="radio r8-radio-float"
                                                 type="checkbox"
                                                 id="Friday_evening"
                                                 name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-1"></div>
                            </div>
                          </div>
                          <div className="row w-100 availability-rule-dates-section">
                            <div className="col-6 pr-2 pl-5">
                              <div className="form-group">
                                <label className="w-100">
                                  <p className="float-left mb-0">From</p>
                                  <div className="span-hovered">
                                    <i className="mdi mdi-information-outline float-right"></i>
                                    <span className="span-hovered-content">Choose the starting date of your rule</span>
                                  </div>
                                </label>
                                <div className="input-icon">
                                  <i className="mdi mdi-calendar calendar-ic"></i>
                                  <DatePicker id="from_date" 
                                  className="react-datepicker-wrapper form-control"
                                          placeholderText={new Date().toLocaleDateString().split(/\//).join("-")}
                                          showYearDropdown
                                          showMonthDropdown
                                          isClearable                                          
                                          showPopperArrow={false}
                                          dropdownMode="select"
                                          dateFormatCalendar="MMMM"
                                          dateFormat="dd-MM-yyyy"
                                          yearDropdownItemNumber={5}
                                          scrollableYearDropdown    
                                          onChange={date => setFDate(date)}
                                          selected={from_date}
                                            ></DatePicker>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 pl-2 pr-5">
                              <div className="form-group">
                                <label className="w-100">
                                  <p className="float-left mb-0">To</p>
                                  <div className="span-hovered">
                                    <i className="mdi mdi-information-outline float-right"></i>
                                    <span className="span-hovered-content">Choose the ending date of your rule</span>
                                  </div>
                                </label>
                                <div className="input-icon">
                                  <i className="mdi mdi-calendar calendar-ic"></i>
                                  <DatePicker id="to_date" 
                                  className="react-datepicker-wrapper form-control"
                                          placeholderText={new Date().toLocaleDateString().split(/\//).join("-")}
                                          showYearDropdown
                                          showMonthDropdown
                                          isClearable                                          
                                          showPopperArrow={false}
                                          dropdownMode="select"
                                          dateFormatCalendar="MMMM"
                                          dateFormat="dd-MM-yyyy"
                                          yearDropdownItemNumber={10}
                                          onChange={date => setToDate(date)}
                                          scrollableYearDropdown     
                                          selected={to_date}
                                  ></DatePicker>
                                </div>
                              </div>
                            </div>
                            
                          </div>

                        </div>
                        {/* submit button */}
                        <div className="row pr-0 mr-0 mb-4 justify-content-center">
                          <div className="col-md-6 pr-0 ">
                            
                            <button
                              id="btn_save_rule"
                              type="submit"
                              onClick={saveRule}
                              className="btn btn-primary btn-block btn-c primary-button-no-margin-hover gray-shadow-box" 
                            >Save Changes</button>
                           
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  </div>
                  <div className="col-xl-3 col-lg-12">

                  
                    {/* legenda */}
                    <div className="availability-table mb-0 mt-1">
                      <h4 className="font-xlg mt-5 text-front text-gradient">LEGENDA</h4>
                      <hr className="qualification-line"></hr>
                      <div className="availability-table-body justify-content-center row m-2 p-3">
                        <ul className="profile-list-qualifications row w-100">
                          <div className="col-4 col-xl-12 text-center mb-0 p-0"><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i> Morning: 8 am - 12 am</label></div>
                          <div className="col-4 col-xl-12 text-center mb-0 p-0"><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i> Afternoon: 12 am - 6 pm</label></div>
                          <div className="col-4 col-xl-12 text-center mb-0 p-0"><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i> Evening: 6 pm - 11 pm</label></div>
                          <div className="col-6 col-xl-12 text-center mb-0 p-0"><label className="availability-rule-checks"><i className="availability-rule-icons aviable-icon mdi mdi-checkbox-marked-outline"></i> Available full day</label></div>
                          <div className="col-6 col-xl-12 text-center mb-0 p-0"><label className="availability-rule-checks"><i className="availability-rule-icons unaviable-icon mdi mdi-close-box-outline"></i> Unavailable full day</label></div>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
                

                <div className="availability-table-container">
                  <div className="availability-table text-left">

                    <div className="availability-table-header ">
                      <div className="availability-table-header-card availability-header-behind w-500"></div>
                      <span id="front-header" className="availability-table-header-card w-500" >
                        <h4 className=" av-table-header-first-line">
                          Your Availability
                            </h4>
                        <h4 className="av-table-header-second-line">
                          Here is your availability. Please create a rule or choose day by day
                            </h4>
                      </span>
                    </div>

                    <div className="availability-table-body mb-0">
                      <div className="availability-table-body-content">


                        <AvailabilityCalendar></AvailabilityCalendar>

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

export default Availability





