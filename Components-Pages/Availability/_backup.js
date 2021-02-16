import React, { useState, useEffect } from "react";
import "./Availability.css";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import DatePicker from "react-datepicker";
import AvailabilityCalendar from "./_calender.js";
import axios from "axios";
import { PORT } from "../../config";
import $ from "jquery";
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
// import DatePicker from "../User/DateRange";

const Availability = () => {
  const [from_date, setFDate] = useState(new Date());
  const [to_date, setToDate] = useState(new Date());
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // useEffect(() => {
  //   var dayheader = $(".fc-day-top");
  //   dayheader.innerHTML = "";
  //   var divtag = document.createElement("div");
  //   var icontag = document.createElement("span");
  //   icontag.className = "ml-1 sunrise-icon mdi mdi-weather-sunset-up";
  //   divtag.append(icontag);
  //   Array(dayheader).forEach(m => {
  //     m.append(divtag);
  //     // m.append("<strong>Hello</strong>");
  //   });
  // }, []);

  const saveRule = () => {
    hideCreateRule();
    const checkboxes = document.getElementsByName("balloon-radio-group");
    const selectedCboxes = Array.prototype.slice.call(checkboxes);
    // .filter(ch => ch.checked === true);
    const time_slots = selectedCboxes.map(item => [item.id, item.checked]);
    const range = moment.range(from_date, to_date);

    const selected_afternoons = Array.from(range.by("days")).map(
      m => m.format("dddd") + " - " + m.format("YYYY-MM-DD")
    );

    const userData = JSON.parse(window.localStorage.getItem("user"));

    let updated_rules = [{}];
    if (userData.rules[0]) updated_rules[0] = userData.rules[0]; //old rules
    selected_afternoons.forEach(sd =>
      time_slots.forEach((ts_arr, index) => {
        let [ts, check] = ts_arr;
        if (sd.split(" - ")[0] === ts.split("_")[0]) {
          //sd.split(" - ")[1] is the date we gonna push
          const date = sd.split(" - ")[1];
          const day = ts.split("_")[0];
          const time = ts.split("_")[1];
          let set_time = [];
          if (updated_rules[0][date]) {
            if (updated_rules[0][date].time) {
              if (check) {
                set_time = [...updated_rules[0][date].time, time];
              } else {
                set_time = [...updated_rules[0][date].time];
                set_time = set_time.filter(s => {
                  return s != time;
                });
              }
            } else {
              set_time = [time];
            }
          } else {
            set_time = [time];
          }
          //entries data
          updated_rules[0][date] = {
            time: [...new Set(set_time)],
            day: day,
            // title: time + " - " + day,
            date: date
          };
        }
      })
    );
    userData.rules[0] = updated_rules[0];
    window.localStorage.setItem("user", JSON.stringify(userData));
    console.log("before");
    console.log(user.rules[0]);
    console.log(userData.rules[0]);
    setUser(userData);
    console.log("after");
    console.log(user.rules[0]);
    console.log(userData.rules[0]);
    axios
      .put(`${PORT}/updateUser`, {
        user: userData
      })
      .then(res => {
        console.log("successful");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const showCreateRule = () => {
    document.getElementById("modal-container-TermsAndCo").style.display =
      "block";
  };
  const hideCreateRule = () => {
    document.getElementById("modal-container-TermsAndCo").style.display =
      "none";
  };

  return (
    <div>
      <FixProfileNavbar />
      <div className="auth-right d-lg-flex bg-photoregister ">
        <div className="bg-gradient"></div>
        <div className="profile-container size-adjust">
          <div className="profile-content-card-area">
            <div className="tab-content clearfix">
              <div className="mt-5 d-flex justify-content-between">
                <h1 className="">Calendar</h1>

                {/* next classes */}
                <div className="availability-table my-0 col-12 col-lg-8 p-0">
                  <h4 className="mt-1 text-front text-gradient next-class">
                    NEXT CLASSES
                  </h4>
                  <hr className="qualification-line"></hr>
                  <div className="availability-table-body justify-content-center row m-2 p-1">
                    <ul className="profile-list-qualifications row w-100 mb-0 next-classes-text ">
                      <li className="col-4 text-center mb-2 pt-0">
                        <b>Monday 8/12</b>
                        <br />
                        <small className="ml-3">
                          {" "}
                          8:30 am - 2:00 pm
                          <br />
                          <b className="ml-3">College Name</b>
                        </small>
                      </li>
                      <li className="col-4 text-center mb-2">
                        <b>Wednesday 10/12</b>
                        <br />
                        <small className="ml-3">
                          {" "}
                          8:30 am - 2:00 pm
                          <br />
                          <b className="ml-3">College Name</b>
                        </small>
                      </li>
                      <li className="col-4 text-center mb-2">
                        <b>Thursday 18/12</b>
                        <br />
                        <small className="ml-3">
                          {" "}
                          8:30 am - 2:00 pm
                          <br />
                          <b className="ml-3">College Name</b>
                        </small>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="availability-table-container mb-0">
                <div className="availability-table text-left mb-3">
                  <div className="availability-table-header ">
                    <div className="availability-table-header-card availability-header-behind w-500"></div>
                    <span
                      id="front-header"
                      className="availability-table-header-card w-500"
                    >
                      <h4 className=" av-table-header-first-line">
                        {" "}
                        Bookings{" "}
                      </h4>
                      <h4 className="av-table-header-second-line">
                        Manage your availability and bookings from here, or
                        <label
                          onClick={showCreateRule}
                          className="ml-2 text-white default"
                        >
                          <u>create a rule</u>
                        </label>
                      </h4>
                    </span>
                  </div>

                  <div className="availability-table-body mb-0">
                    <div className="availability-table-body-content">
                      <AvailabilityCalendar
                        user={user}
                        setUser={setUser}
                      ></AvailabilityCalendar>
                    </div>
                  </div>
                </div>
              </div>

              <div className="availability-table-container">
                <div className="availability-table my-0 mb-0 mt-1 d-flex p-0">
                  {/* legenda */}
                  <div className="">
                    <h4 className="font-xlg mt-3 text-front text-gradient">
                      LEGEND
                    </h4>
                    <hr className="qualification-line"></hr>
                    <div className="availability-table-body justify-content-center row m-2 p-3">
                      <ul className="profile-list-qualifications row w-100 d-flex justify-content-between">
                        <div className="col-auto text-center mb-0 py-0 px-2">
                          <label className="availability-rule-checks">
                            <i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i>{" "}
                            Morning{" "}
                          </label>
                        </div>
                        <div className="col-auto text-center mb-0 py-0 px-2">
                          <label className="availability-rule-checks">
                            <i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i>{" "}
                            Afternoon{" "}
                          </label>
                        </div>
                        <div className="col-auto text-center mb-0 py-0 px-2">
                          <label className="availability-rule-checks">
                            <i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i>{" "}
                            Evening{" "}
                          </label>
                        </div>
                        <div className="col-auto text-center mb-0 py-0 px-2">
                          <label className="availability-rule-checks">
                            <i className="availability-rule-icons aviable-icon mdi mdi-checkbox-marked-outline"></i>{" "}
                            Available full day
                          </label>
                        </div>
                        <div className="col-auto text-center mb-0 py-0 px-2">
                          <label className="availability-rule-checks">
                            <i className="availability-rule-icons unaviable-icon mdi mdi-close-box-outline"></i>{" "}
                            Not Available full day
                          </label>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="modal-container-TermsAndCo" className="status-modal">
            <div id="terms-co-box" className="create-a-rule">
              <div onClick={hideCreateRule} className="dot"></div>
              <h1 className="status-alert"> Create a Rule</h1>
              <div className="status-alert-message overflow-hidden">
                <p className="terms-co-box-subtitle">
                  Please, create a rule choosing the shifts you are available
                  and the dates.
                  <br />
                  You can change this information anytime, from here or day by
                  day on the calendar.
                </p>

                <div className="row align-items-center">
                  <div className="col-12 m-auto">
                    <div className="availability-table-container justify-content-center ">
                      <div className="availability-table gray-shadow-box my-1">
                        <div className="compliments-header-bckg"></div>
                        {/* <h4 className="w-max font-xlg mt-5  left-0 ml-4 compliments-card-title text-front">CREATE A RULE</h4> */}
                        <div className="profile-qualification-body">
                          <hr className="qualification-line"></hr>
                          <div className="availability-table-body justify-content-center row p-0 m-0">
                            {/* <p className="text-left px-5 py-2 mb-3">Check the shift you are available to work, and decide from when until what date you want this rule to be effective, so that we can plan your week.</p> */}

                            <div className="calendar-rule-container pb-3">
                              <div className="row">
                                <div className="col-1"></div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">
                                    Monday
                                  </div>
                                  <div className="row weekday-container ">
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Monday_morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Monday_afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Monday_evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">
                                    Tuesday
                                  </div>
                                  <div className="row weekday-container ">
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Tuesday_morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Tuesday_afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Tuesday_evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">
                                    Wednesday
                                  </div>
                                  <div className="row weekday-container ">
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Wednesday_morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Wednesday_afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Wednesday_evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">
                                    Thursday
                                  </div>
                                  <div className="row weekday-container ">
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Thursday_morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Thursday_afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Thursday_evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="row week-days mb-1">
                                    Friday
                                  </div>
                                  <div className="row weekday-container ">
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Friday_morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Friday_afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                      <div id="r8-balloon-radio-group-wrapper-availability">
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float"
                                              type="checkbox"
                                              id="Friday_evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i>
                                      </label>
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
                                      <span className="span-hovered-content">
                                        Choose the starting date of your rule
                                      </span>
                                    </div>
                                  </label>
                                  <div className="input-icon">
                                    <i className="mdi mdi-calendar calendar-ic"></i>
                                    <DatePicker
                                      id="from_date"
                                      className="react-datepicker-wrapper form-control"
                                      placeholderText={new Date()
                                        .toLocaleDateString()
                                        .split(/\//)
                                        .join("-")}
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
                                      <span className="span-hovered-content">
                                        Choose the ending date of your rule
                                      </span>
                                    </div>
                                  </label>
                                  <div className="input-icon">
                                    <i className="mdi mdi-calendar calendar-ic"></i>
                                    <DatePicker
                                      id="to_date"
                                      className="react-datepicker-wrapper form-control"
                                      placeholderText={new Date()
                                        .toLocaleDateString()
                                        .split(/\//)
                                        .join("-")}
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
                          {/* submit button
                        <div className="row pr-0 mr-0 mb-4 justify-content-center">
                          <div className="col-md-6 pr-0 ">
                            
                            <button
                              type="submit"
                              className="btn btn-primary btn-block btn-c primary-button-no-margin-hover gray-shadow-box" 
                            >Save Changes</button>
                           
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* large screen */}
                <div
                  className="row small-screen-disappear"
                  style={{ margin: "0px" }}
                >
                  <div className="col-md-5">
                    <button
                      onClick={hideCreateRule}
                      className="btn btn-block btn-c secondary-button-no-margin-hover"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-md-7 pr-4 register-alert-button">
                    <button
                      id="btn_save_rule"
                      type="submit"
                      onClick={saveRule}
                      // onClick={hideCreateRule}
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      Accept
                    </button>
                  </div>
                </div>

                {/* small screen */}
                <div
                  className="row small-screen-appear d-none"
                  style={{ margin: "0px" }}
                >
                  <div className="col-md-7 pr-4 register-alert-button mb-1">
                    <button
                      id="btn_save_rule"
                      onClick={saveRule}
                      // onClick={ hideCreateRule}
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      Accept
                    </button>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
