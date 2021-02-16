import React, { useState, useEffect } from "react";
import "./Availability.css";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import DatePicker from "react-datepicker";
import AvailabilityCalendar from "./AvailabilityCalendar.js";
import axios from "axios";
import { PORT } from "../../config";
import MobileNavBar from "../../Components/Navbar/MobileNavBar"
import $ from "jquery";
import bookingLogo from './../../../src/assets/img/month.png';
import addPencil from './../../../src/assets/img/writing.png';
import { Link } from "react-router-dom";
import Tabs from "../../Components/Tabs/Tabs";
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);


// import DatePicker from "../User/DateRange";

const Availability = () => {
  const [browser_width, setBrowser_width] = useState();
  const [from_date, setFDate] = useState(new Date());
  const [to_date, setToDate] = useState(new Date());
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  const unifydate = (c) => {
    if (c == "Mon") {
      return "Monday";
    }
    if (c == "Tue") {
      return "Tuesday";
    }
    if (c == "Wed") {
      return "Wednesday";
    }
    if (c == "Thu") {
      return "Thursday";
    }
    if (c == "Fri") {
      return "Friday";
    }
  }

  const saveRule = () => {
    hideCreateRule();
    const checkboxes = document.getElementsByName("balloon-radio-group");
    const selectedCboxes = Array.prototype.slice.call(checkboxes)
      .filter(ch => ch.checked === true);
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
        console.log("first", ts)
        let ts_after = unifydate(ts.substring(0, 3));
        if (sd.split(" - ")[0] === ts_after) {
          //sd.split(" - ")[1] is the date we gonna push
          const date_1 = sd.split(" - ")[1];
          const date = moment(date_1).format("MM-DD-YYYY");
          const day = unifydate(ts.substring(0, 3));
          const time = ts.substring(17);
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
            date: date
          };
        }
        document.getElementById(ts).setAttribute("checked", "false");
      })
    );
    userData.rules[0] = updated_rules[0];
    window.localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    console.log(userData);

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
    const checkboxes = document.getElementsByName("balloon-radio-group");
    Array.prototype.slice.call(checkboxes).forEach(ch => {
      ch.checked = false;
    });
    document.getElementById("modal-container-TermsAndCo").style.display =
      "block";
  };
  const hideCreateRule = () => {
    document.getElementById("modal-container-TermsAndCo").style.display =
      "none";
  };

  useEffect(() => {
    setBrowser_width(document.body.clientWidth);
    if (document.getElementById("rule-Monday") != null) {
      if (browser_width < 660) {
        document.getElementById("rule-Monday").innerHTML = "Mon";
        document.getElementById("rule-Tuesday").innerHTML = "Tue";
        document.getElementById("rule-Wednesday").innerHTML = "Wed";
        document.getElementById("rule-Thursday").innerHTML = "Thu";
        document.getElementById("rule-Friday").innerHTML = "Fri";
      } else {
        document.getElementById("rule-Monday").innerHTML = "Monday";
        document.getElementById("rule-Tuesday").innerHTML = "Tuesday";
        document.getElementById("rule-Wednesday").innerHTML = "Wednesday";
        document.getElementById("rule-Thursday").innerHTML = "Thursday";
        document.getElementById("rule-Friday").innerHTML = "Friday";
      }
    }
    window.onresize = function () {
      setBrowser_width(document.body.clientWidth);
      if (document.getElementById("rule-Monday") != null) {
        if (browser_width < 660) {
          document.getElementById("rule-Monday").innerHTML = "Mon";
        }
        else {
          document.getElementById("rule-Monday").innerHTML = "Monday";
          document.getElementById("rule-Tuesday").innerHTML = "Tuesday";
          document.getElementById("rule-Wednesday").innerHTML = "Wednesday";
          document.getElementById("rule-Thursday").innerHTML = "Thursday";
          document.getElementById("rule-Friday").innerHTML = "Friday";
        }
      }
    }
  }, [browser_width]);



  //For Monday
  const changeMon = () => {
    let select = document.getElementById("Mon-availability-all").checked
    let select_none = document.getElementById("Mon-availability-none").checked
    if (select == true) {
      document.getElementById("Mon-availability-morning").checked = true;
      document.getElementById("Mon-availability-afternoon").checked = true;
      document.getElementById("Mon-availability-evening").checked = true;
      document.getElementById("Mon-availability-none").checked = false;
    }
    else if (select == false) {
      document.getElementById("Mon-availability-morning").checked = false;
      document.getElementById("Mon-availability-afternoon").checked = false;
      document.getElementById("Mon-availability-evening").checked = false;

    }

    if (select_none == true) {
      document.getElementById("Mon-availability-morning").checked = false;
      document.getElementById("Mon-availability-afternoon").checked = false;
      document.getElementById("Mon-availability-evening").checked = false;
      document.getElementById("Mon-availability-morning").setAttribute("disabled", "disabled")
      document.getElementById("Mon-availability-afternoon").setAttribute("disabled", "disabled")
      document.getElementById("Mon-availability-evening").setAttribute("disabled", "disabled")
      document.getElementById("Mon-availability-all").checked = false;
    }
    else if (select_none == false) {
      document.getElementById("Mon-availability-morning").removeAttribute('disabled')
      document.getElementById("Mon-availability-afternoon").removeAttribute('disabled')
      document.getElementById("Mon-availability-evening").removeAttribute('disabled')
    }

  }

  //For Tuesday
  const changeTue = () => {
    let select = document.getElementById("Tue-availability-all").checked
    let select_none = document.getElementById("Tue-availability-none").checked
    if (select == true) {
      document.getElementById("Tue-availability-morning").checked = true;
      document.getElementById("Tue-availability-afternoon").checked = true;
      document.getElementById("Tue-availability-evening").checked = true;
      document.getElementById("Tue-availability-none").checked = false;
    }
    else if (select == false) {
      document.getElementById("Tue-availability-morning").checked = false;
      document.getElementById("Tue-availability-afternoon").checked = false;
      document.getElementById("Tue-availability-evening").checked = false;

    }

    if (select_none == true) {
      document.getElementById("Tue-availability-morning").checked = false;
      document.getElementById("Tue-availability-afternoon").checked = false;
      document.getElementById("Tue-availability-evening").checked = false;
      document.getElementById("Tue-availability-morning").setAttribute("disabled", "disabled")
      document.getElementById("Tue-availability-afternoon").setAttribute("disabled", "disabled")
      document.getElementById("Tue-availability-evening").setAttribute("disabled", "disabled")
      document.getElementById("Tue-availability-all").checked = false;
    }
    else if (select_none == false) {
      document.getElementById("Tue-availability-morning").removeAttribute('disabled')
      document.getElementById("Tue-availability-afternoon").removeAttribute('disabled')
      document.getElementById("Tue-availability-evening").removeAttribute('disabled')
    }

  }

  //For Wednesday
  const changeWed = () => {
    let select = document.getElementById("Wed-availability-all").checked
    let select_none = document.getElementById("Wed-availability-none").checked
    if (select == true) {
      document.getElementById("Wed-availability-morning").checked = true;
      document.getElementById("Wed-availability-afternoon").checked = true;
      document.getElementById("Wed-availability-evening").checked = true;
      document.getElementById("Wed-availability-none").checked = false;
    }
    else if (select == false) {
      document.getElementById("Wed-availability-morning").checked = false;
      document.getElementById("Wed-availability-afternoon").checked = false;
      document.getElementById("Wed-availability-evening").checked = false;

    }

    if (select_none == true) {
      document.getElementById("Wed-availability-morning").checked = false;
      document.getElementById("Wed-availability-afternoon").checked = false;
      document.getElementById("Wed-availability-evening").checked = false;
      document.getElementById("Wed-availability-morning").setAttribute("disabled", "disabled")
      document.getElementById("Wed-availability-afternoon").setAttribute("disabled", "disabled")
      document.getElementById("Wed-availability-evening").setAttribute("disabled", "disabled")
      document.getElementById("Wed-availability-all").checked = false;
    }
    else if (select_none == false) {
      document.getElementById("Wed-availability-morning").removeAttribute('disabled')
      document.getElementById("Wed-availability-afternoon").removeAttribute('disabled')
      document.getElementById("Wed-availability-evening").removeAttribute('disabled')
    }

  }

  //For Thursday
  const selectedAllThu = () => {
    let select = document.getElementById("Thu-availability-all").checked
    if (select == true) {
      document.getElementById("Thu-availability-morning").checked = true;
      document.getElementById("Thu-availability-afternoon").checked = true;
      document.getElementById("Thu-availability-evening").checked = true;
      document.getElementById("Thu-availability-none").checked = false;
    }
    else if (select == false) {
      document.getElementById("Thu-availability-morning").checked = false;
      document.getElementById("Thu-availability-afternoon").checked = false;
      document.getElementById("Thu-availability-evening").checked = false;

    }
  }

  const selectedNoneThu = () => {
    let select_none = document.getElementById("Thu-availability-none").checked
    if (select_none == true) {
      document.getElementById("Thu-availability-morning").setAttribute("disabled", "disabled")
      document.getElementById("Thu-availability-afternoon").setAttribute("disabled", "disabled")
      document.getElementById("Thu-availability-evening").setAttribute("disabled", "disabled")
      document.getElementById("Thu-availability-all").checked = false;
    }
    else if (select_none == false) {
      document.getElementById("Thu-availability-morning").removeAttribute('disabled')
      document.getElementById("Thu-availability-afternoon").removeAttribute('disabled')
      document.getElementById("Thu-availability-evening").removeAttribute('disabled')
    }
  }

  const changeThu = () => {
    let select = document.getElementById("Thu-availability-all").checked
    let select_none = document.getElementById("Thu-availability-none").checked
    if (select == true) {
      document.getElementById("Thu-availability-morning").checked = true;
      document.getElementById("Thu-availability-afternoon").checked = true;
      document.getElementById("Thu-availability-evening").checked = true;
      document.getElementById("Thu-availability-none").checked = false;
    }
    else if (select == false) {
      document.getElementById("Thu-availability-morning").checked = false;
      document.getElementById("Thu-availability-afternoon").checked = false;
      document.getElementById("Thu-availability-evening").checked = false;

    }

    if (select_none == true) {
      document.getElementById("Thu-availability-morning").checked = false;
      document.getElementById("Thu-availability-afternoon").checked = false;
      document.getElementById("Thu-availability-evening").checked = false;
      document.getElementById("Thu-availability-morning").setAttribute("disabled", "disabled")
      document.getElementById("Thu-availability-afternoon").setAttribute("disabled", "disabled")
      document.getElementById("Thu-availability-evening").setAttribute("disabled", "disabled")
      document.getElementById("Thu-availability-all").checked = false;
    }
    else if (select_none == false) {
      document.getElementById("Thu-availability-morning").removeAttribute('disabled')
      document.getElementById("Thu-availability-afternoon").removeAttribute('disabled')
      document.getElementById("Thu-availability-evening").removeAttribute('disabled')
    }

  }

  //For Friday
  const changeFri = () => {
    let select = document.getElementById("Fri-availability-all").checked
    let select_none = document.getElementById("Fri-availability-none").checked
    if (select == true) {
      document.getElementById("Fri-availability-morning").checked = true;
      document.getElementById("Fri-availability-afternoon").checked = true;
      document.getElementById("Fri-availability-evening").checked = true;
      document.getElementById("Fri-availability-none").checked = false;
    }
    else if (select == false) {
      document.getElementById("Fri-availability-morning").checked = false;
      document.getElementById("Fri-availability-afternoon").checked = false;
      document.getElementById("Fri-availability-evening").checked = false;

    }

    if (select_none == true) {
      document.getElementById("Fri-availability-morning").checked = false;
      document.getElementById("Fri-availability-afternoon").checked = false;
      document.getElementById("Fri-availability-evening").checked = false;
      document.getElementById("Fri-availability-morning").setAttribute("disabled", "disabled")
      document.getElementById("Fri-availability-afternoon").setAttribute("disabled", "disabled")
      document.getElementById("Fri-availability-evening").setAttribute("disabled", "disabled")
      document.getElementById("Fri-availability-all").checked = false;
    }
    else if (select_none == false) {
      document.getElementById("Fri-availability-morning").removeAttribute('disabled')
      document.getElementById("Fri-availability-afternoon").removeAttribute('disabled')
      document.getElementById("Fri-availability-evening").removeAttribute('disabled')
    }

  }


  return (
    <div>
      <FixProfileNavbar />
      <div className="auth-right d-lg-flex bg-photoregister ">
        <div className="bg-gradient"></div>
        <div className="profile-container size-adjust profile-container-transparent resume-container-transparent">
          <div className="profile-content-card-area">
            <div className="tab-content clearfix">
              <div className="mt-5 d-flex justify-content-between mobile-availability-margin">
                <h1 className="TitleCalendar">Calendar</h1>

                {/* next classes */}
                {/* <div className="availability-table my-0 col-12 col-lg-8 p-0">
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
                </div> */}
              </div>

              <div className="availability-table-container">
                <div className="availability-table my-0 mb-0 mt-1 d-flex p-0">
                  <Tabs
                    tabs={[
                      {
                        pathname: "/Availability",
                        text: "My Calendar",
                        active: true
                      },
                      {
                        pathname: "/Bookings",
                        text: "Jobs List"
                      },
                      // {
                      //   pathname: "/Timesheets",
                      //   text: "Timesheets",
                      //   disabled: true
                      // },
                      {
                        pathname: "/Payments",
                        text: "Payments",
                        disabled: true
                      }
                    ]}
                  />
                  {/* legenda */}
                  <div className="titleLegend">
                    <h4 className="font-xlg mt-3 text-front text-gradient">
                      LEGEND
                    </h4>
                    <hr className="qualification-line"></hr>
                    <div className="availability-table-body justify-content-center row m-1 p-1 mb-0 pb-0">
                      <ul className="profile-list-qualifications row w-100 d-flex justify-content-between mb-0">
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

                  {/*                  <div className="availability-table-header ">
                    <div className="availability-table-header-card availability-header-behind w-500"></div>
                    <span
                      id="front-header"
                      className="availability-table-header-card w-500"
                    >
                      <h4 className="av-table-header-first-line">
                        {" "}
                        <img src ={bookingLogo}/>{" "}
                      </h4>
                      <h4 className="av-table-header-second-line">
                        Manage your availability and bookings from here
                        <label
                          onClick={showCreateRule}
                          className="ml-2 text-white default"
                        >
                          <span className="addPencil"><img src ={addPencil}/></span>
                        </label>
                      </h4>
                    </span>
                  </div>*/}

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


            </div>
          </div>

          <div id="modal-container-TermsAndCo" className="status-modal">
            <div id="terms-co-box" className="create-a-rule">
              <div onClick={hideCreateRule} className="dot"></div>
              <h1 className="status-alert"> Set Your Availability</h1>
              <div className="status-alert-message overflow-setup">
                <p className="terms-co-box-subtitle">
                  Please, create a rule choosing the shifts you are available
                  and the dates.
                  <br />
                  You can change this information anytime, from here or day by
                  day on the calendar.
                </p>

                <div className="row align-items-center">
                  <div className="col-12 m-auto">
                    <div className="availability-table-container justify-content-center mx-0 w-100">
                      <div className="availability-table gray-shadow-box my-1">
                        <div className="compliments-header-bckg"></div>
                        <div className="profile-qualification-body">
                          <hr className="qualification-line"></hr>
                          <div className="availability-table-body justify-content-center row p-0 m-0">

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
                                    {/* <i className="mdi mdi-calendar calendar-ic"></i>*/}
                                    <DatePicker
                                      id="from_date"
                                      className="react-datepicker-wrapper form-control"
                                      placeholderText={new Date()
                                        .toLocaleDateString()
                                        .split(/\//)
                                        .join("-")}
                                      showYearDropdown
                                      showMonthDropdown
                                      popperClassName="some-custom-class"
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
                                    {/*    <i className="mdi mdi-calendar calendar-ic"></i>*/}
                                    <DatePicker
                                      id="to_date"
                                      className="react-datepicker-wrapper form-control"
                                      placeholderText={new Date()
                                        .toLocaleDateString()
                                        .split(/\//)
                                        .join("-")}
                                      showYearDropdown
                                      showMonthDropdown
                                      popperClassName="some-custom-class"
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

                            <div className="calendar-rule-container w-100 p-3">
                              <div className="row mx-2">
                                <div className="col px-0">
                                  <div className="row week-days mb-1" id="rule-Monday">
                                    Monday
                                  </div>
                                  <div className="row daily-change-rule-box weekday-container mx-auto">
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Mon-availability-all"
                                              name="balloon-radio-group"
                                              //onClick={selectedAllMon}
                                              onChange={changeMon}

                                            //defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 aviable-icon mdi mdi-checkbox-marked-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Mon-availability-none"
                                              name="balloon-radio-group"
                                              //onClick={selectedNoneMon}
                                              onChange={changeMon}
                                            //defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 unaviable-icon mdi mdi-close-box-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Mon-availability-morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Mon-availability-afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Mon-availability-evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>



                                </div>
                                <div className="col px-0">
                                  <div className="row week-days mb-1" id="rule-Tuesday">
                                    Tuesday
                                  </div>
                                  <div className="row daily-change-rule-box weekday-container mx-auto">
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Tue-availability-all"
                                              name="balloon-radio-group"
                                              onChange={changeTue}
                                            //onClick={selectedAllTue}
                                            // defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 aviable-icon mdi mdi-checkbox-marked-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Tue-availability-none"
                                              name="balloon-radio-group"
                                              onChange={changeTue}
                                            //onClick={selectedNoneTue}
                                            // defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 unaviable-icon mdi mdi-close-box-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Tue-availability-morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Tue-availability-afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Tue-availability-evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>



                                </div>
                                <div className="col px-0">
                                  <div className="row week-days mb-1" id="rule-Wednesday">
                                    Wednesday
                                  </div>
                                  <div className="row daily-change-rule-box weekday-container mx-auto">
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Wed-availability-all"
                                              name="balloon-radio-group"
                                              onChange={changeWed}
                                            // defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 aviable-icon mdi mdi-checkbox-marked-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Wed-availability-none"
                                              name="balloon-radio-group"
                                              onChange={changeWed}
                                            // defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 unaviable-icon mdi mdi-close-box-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Wed-availability-morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Wed-availability-afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Wed-availability-evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>


                                </div>
                                <div className="col px-0">
                                  <div className="row week-days mb-1" id="rule-Thursday">
                                    Thursday
                                  </div>
                                  <div className="row daily-change-rule-box weekday-container mx-auto">
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Thu-availability-all"
                                              name="balloon-radio-group"
                                              onChange={changeThu}
                                            //onClick={selectedAllThu}
                                            // defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 aviable-icon mdi mdi-checkbox-marked-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Thu-availability-none"
                                              name="balloon-radio-group"
                                              onChange={changeThu}
                                            //onClick={selectedNoneThu}
                                            // defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 unaviable-icon mdi mdi-close-box-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Thu-availability-morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Thu-availability-afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Thu-availability-evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 evening-icon mdi mdi-weather-night"></i>
                                      </label>
                                    </div>
                                  </div>


                                </div>
                                <div className="col px-0">
                                  <div className="row week-days mb-1" id="rule-Friday">
                                    Friday
                                  </div>
                                  <div className="row daily-change-rule-box weekday-container mx-auto">
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Fri-availability-all"
                                              name="balloon-radio-group"
                                              onChange={changeFri}
                                            //onClick={selectedAllFri}
                                            //defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 aviable-icon mdi mdi-checkbox-marked-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Fri-availability-none"
                                              name="balloon-radio-group"
                                              onChange={changeFri}
                                            //onClick={selectedNoneFri}
                                            //defaultChecked={isSelect("morning", selectDate)}
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 unaviable-icon mdi mdi-close-box-outline"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Fri-availability-morning"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>

                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 sunrise-icon mdi mdi-weather-sunset-up"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Fri-availability-afternoon"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 day-icon mdi mdi-weather-sunny"></i>
                                      </label>
                                    </div>
                                    <div className="col form-check d-block text-center p-0">
                                      <div
                                        id="r8-balloon-radio-group-wrapper-availability"
                                        className="left-0"
                                      >
                                        <ul>
                                          <li>
                                            <input
                                              className="radio r8-radio-float m-0"
                                              type="checkbox"
                                              id="Fri-availability-evening"
                                              name="balloon-radio-group"
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <label className="availability-rule-checks">
                                        <i className="availability-rule-icons left-2 evening-icon mdi mdi-weather-night"></i>
                                      </label>
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

                {/* large screen */}
                <div
                  className="row small-screen-disappear margin-style-rule-button"
                >
                  <div className="col-md-6">
                    <button
                      onClick={hideCreateRule}
                      className="btn btn-block btn-c secondary-button-no-margin-hover"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-md-6 pr-4 register-alert-button">
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
      <div>
        <button
          className="btn btn-primary btn-block btn-c primary-button-no-margin-hover button-print-invoice float-right create-invoice-button"
          onClick={showCreateRule}>
          <div className="mdi mdi-calendar"></div>
          Set Your Availability
        </button>
      </div>
      <div className="mobile-size-menu">
        <MobileNavBar></MobileNavBar>
      </div>
    </div>
  );
};

export default Availability;
