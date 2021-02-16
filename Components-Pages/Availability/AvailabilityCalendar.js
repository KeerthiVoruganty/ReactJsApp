import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./main.scss"; // webpack must be configured to do this
import Simpson, { SimpsonPortal } from "./simpson";
import $ from "jquery";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { PORT } from "../../config";

const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

// const content = () => {
//   return (
//     <img
//       src="https://static.simpsonswiki.com/images/0/0b/Marge_Simpson.png"
//       alt="abc"
//     />
//   );
// };

const AvailabilityCalendar = props => {
  const [showMyModal, setShowMyModal] = useState(false);
  const [selectDate, setSelectDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const user = props.user;
  const [event, setEvent] = useState([]);
  const [selectAllStatus, setSelectAllStatus] = useState(false);
  const [selectNoneStatus, setSelectNoneStatus] = useState(false);

  useEffect(() => {
    axios
      .get(`${PORT}/teacherBooking`, {
        params: {
          email: user.email
        }
      })
      .then(res => {
        setBookings(res.data.data);
        setTeacherBookingEvents(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const setTeacherBookingEvents = (bookings) => {
    let abc = [];
    console.log(bookings)
    const creatEvents = booking => {
      const a = booking.summary.split(" ");
      const title = new Date(booking.start["dateTime"]).toTimeString().substring(0,5) +" " +a[2] +" "+ a[3]
      return {
        id: booking.id,
        title: title,
        start: booking.start["dateTime"].split("T")[0]
      };
    };
    bookings.forEach(booking => {
      abc.push(creatEvents(booking));
    });
    setEvent(abc);
  };

  const saveDate = async () => {
    if (selectDate) {
      const userData = props.user;

      const checkboxes = document.getElementsByName("balloon-radio-group2");
      const selectedCboxes = Array.prototype.slice
        .call(checkboxes)
        .filter(ch => ch.checked === true);
      const time_slots = selectedCboxes.map(item => item.id); //morning,after,even

      if (!userData.rules[0]) userData.rules = [{}]; //initiate
      if (!userData.rules[0][selectDate]) {
        userData.rules[0][selectDate] = {
          time: time_slots,
          day: moment(selectDate).format("dddd"),
          date: selectDate
        };
      } else {
        userData.rules[0][selectDate].time = time_slots;
      }
      window.localStorage.setItem("user", JSON.stringify(userData));
      props.setUser(userData);
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
    }
  };

  const getDefault = divtag => {
    let icontag = document.createElement("span");
    icontag.innerText = "Not set";
    icontag.style.color = "Grey";
    divtag.append(icontag);
    return divtag;
    // append(<h4>Not Set</h4>)
  };

  const handleDateClick = arg => {
    arg.jsEvent.preventDefault();
    let date = arg.date;
    // date = moment(date).format("YYYY-MM-DD");
    date = moment(date).format("MM-DD-YYYY");
    setSelectDate(date);
  };

  const handleEventClick = arg => {
  alert('Event: ' + arg.event.title);
  };

  const isSelect = (time, date) => {
    const userData = props.user;
    if (userData.rules[0]) {
      if (userData.rules[0][date] && time && date) {
        return userData.rules[0][date].time.includes(time);
      }
    }
    return false;
  };
  const generateIcon = rules => {
    if (rules) {
      let dayheader = $(".fc-day-top");
      for (let index = 0; index < dayheader.length; index++) {
        let m = dayheader[index];
        let date = moment(m.getAttribute("data-date")).format("MM-DD-YYYY");
        let divtag = document.createElement("div");
        if (rules[date]) {
          const date_rule = rules[date].time;
          if (date_rule.length === 0) {
            divtag.append(getIcon("none"));
          } else if (date_rule.length === 3) {
            divtag.append(getIcon("all"));
          }else if (date_rule.length === 4) {
            divtag.append(getIcon("all"));
          }
          else if (date_rule.length > 0) {
            date_rule.forEach(time => {
              if (getIcon(time)) divtag.append(getIcon(time));
            });
          }
        } else {
          //  divtag.append(getIcon("none"));
          getDefault(divtag);
        }
        m.append(divtag);
      }
    } else {
      let dayheader = $(".fc-day-top");
      for (let index = 0; index < dayheader.length; index++) {
        let m = dayheader[index];
        let divtag = document.createElement("div");
        divtag.append(getIcon("none"));
        m.append(divtag);
      }
    }
  };

  const handleEventHover = c => {
    alert("xxxx");
  };

  const getIcon = type => {
    let icontag = document.createElement("span");
    switch (type) {
      case "morning":
        icontag.className = "ml-1 sunrise-icon mdi mdi-weather-sunset-up";
        return icontag;
      case "afternoon":
        icontag.className = "ml-1 day-icon mdi mdi-weather-sunny";
        return icontag;
      case "evening":
        icontag.className = "ml-1 evening-icon mdi mdi-weather-night";
        return icontag;
      case "all":
        icontag.className = "ml-1 aviable-icon mdi mdi-checkbox-marked-outline";
        return icontag;
      case "none":
        icontag.className = "ml-1 unaviable-icon mdi mdi-close-box-outline";
        return icontag;
      default:
        return null;
    }
  };

  const selectedAll = () => {
    let select = document.getElementById("all").checked;
    if (select == true) {
      document.getElementById("morning").checked = true;
      document.getElementById("afternoon").checked = true;
      document.getElementById("evening").checked = true;
    } else if (select == false) {
      document.getElementById("morning").checked = false;
      document.getElementById("afternoon").checked = false;
      document.getElementById("evening").checked = false;
    }
  };

  const selectedNone = () => {
    let select_none = document.getElementById("none").checked;
    if (select_none == true) {
      document.getElementById("morning").setAttribute("disabled", "disabled");
      document.getElementById("afternoon").setAttribute("disabled", "disabled");
      document.getElementById("evening").setAttribute("disabled", "disabled");
    } else if (select_none == false) {
      document.getElementById("morning").removeAttribute("disabled");
      document.getElementById("afternoon").removeAttribute("disabled");
      document.getElementById("evening").removeAttribute("disabled");
    }
  };


  const changeSelect = () =>{
    let select = document.getElementById("all").checked
    let select_none = document.getElementById("none").checked
    if(select == true){
      document.getElementById("morning").checked = true;
      document.getElementById("afternoon").checked = true;
      document.getElementById("evening").checked = true;
      document.getElementById("none").checked = false;
    }
    else if(select == false){
      document.getElementById("morning").checked = false;
      document.getElementById("afternoon").checked = false;
      document.getElementById("evening").checked = false;

    }

    if(select_none == true){
      document.getElementById("morning").checked = false;
      document.getElementById("afternoon").checked = false;
      document.getElementById("evening").checked = false;
      document.getElementById("morning").setAttribute("disabled","disabled")
      document.getElementById("afternoon").setAttribute("disabled","disabled")
      document.getElementById("evening").setAttribute("disabled","disabled")
      document.getElementById("all").checked = false;
    }
    else if (select_none == false){
      document.getElementById("morning").removeAttribute('disabled')
      document.getElementById("afternoon").removeAttribute('disabled')
      document.getElementById("evening").removeAttribute('disabled')
    }

  }

  useEffect(() => {
    selectDate ? setShowMyModal(true) : setShowMyModal(false);
    /*   window.addEventListener("load", e=> {
     let divtag = document.createElement("div");
     divtag.append("Add availability");
     divtag.setAttribute("className","content-for-calendar")
     $(".fc-day").append(divtag);
  })*/

    /*      $(".fc-day").hover(function(){
        this.append("Click to Add Availability")
        this.style.paddingTop = "30px"
        this.style.paddingLeft = "30px"
        this.style.color = "black"
          },function(){
        $(this).empty()
          }
      )
    })*/
  }, [selectDate]);

  return (
    <div>
      {showMyModal ? (
        <>
          <div id="modal-container-TermsAndCo" className="daily-rule-edit">
            <div id="terms-co-box" className="daily-change-rule">
              <div
                onClick={() => {
                  setSelectDate(null);
                }}
                className="dot"
              ></div>
              <h1 className="status-alert mt-4 mb-1">Set Your Availability</h1>
              <small className="d-flex text-warning w-100 justify-content-center mt-0 mb-0">
                ({selectDate})
              </small>
              <div className=" overflow-hidden">
                <p className="terms-co-box-subtitle px-5 ">
                  From here, you can edit your availability for this date only.
                </p>

                <div className=" ">
                  <div className="mx-auto gray-shadow-box w-max my-1">
                    <div className="row daily-change-rule-box weekday-container mx-auto">
                      <div className="col form-check d-block text-center p-0">
                        <div
                          id="r8-balloon-radio-group-wrapper-availability"
                          className="left-0"
                        >
                          <ul>
                            <li>
                              <input
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="all"
                                name="balloon-radio-group2"
                                defaultChecked={isSelect("all", selectDate)}
                                onChange={changeSelect}
                                //onClick={selectedAll}
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
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="none"
                                name="balloon-radio-group2"
                                 defaultChecked={isSelect("none", selectDate)}
                                onChange={changeSelect}
                                //onClick={selectedNone}
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
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="morning"
                                name="balloon-radio-group2"
                                defaultChecked={isSelect("morning", selectDate)}
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
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="afternoon"
                                name="balloon-radio-group2"
                                defaultChecked={isSelect(
                                  "afternoon",
                                  selectDate
                                )}
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
                                className="radio r8-radio-float"
                                type="checkbox"
                                id="evening"
                                name="balloon-radio-group2"
                                defaultChecked={isSelect("evening", selectDate)}
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

                  {/* large screen */}
                  <div className="mx-5 row small-screen-disappear">
                    <div className="col-md-6 pl-0">
                      <button
                        onClick={() => {
                          setSelectDate(null);
                        }}
                        className="btn btn-block btn-c secondary-button-no-margin-hover"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-md-6 px-0 register-alert-button">
                      <button
                        id="btn_save_rule"
                        type="submit"
                        onClick={() => {
                          saveDate();
                          setSelectDate(null);
                        }}
                        className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                      >
                        Accept
                      </button>
                    </div>
                  </div>

                  {/* small screen */}
                  <div className="mx-5 row small-screen-appear d-none">
                    <div className="col-md-7 px-0 mb-1">
                      <button
                        id="btn_save_rule"
                        onClick={() => {
                          saveDate();
                          setSelectDate(null);
                        }}
                        className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* {content()} */}

      <FullCalendar
        id="availability_calendar"
        defaultView="dayGridMonth"
        select={arg => {
          start: moment();
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        weekends={true}
        columnHeaderFormat={{ weekday: "short" }}
        header={{
          left: "title",
          // center: `${content()}`,
          right: "today prev,next",
          imageUrl:
            "https://vignette.wikia.nocookie.net/simpsons/images/a/a9/Abraham_Simpson.png/revision/latest?cb=20151011181838"
        }}
        datesRender={arg => {
          if (props.user && props.user.rules) {
            generateIcon(props.user.rules[0]);
          } else {
            generateIcon([]);
          }
        }}
        dateClick={arg => {
          if (
            moment()
              .subtract(1, "days")
              .isBefore(arg.date)
          ) {
            handleDateClick(arg);
          } else {
          }
        }}
        aspectRatio={2}
        // resources={[content()]}
        // resourceRender={content()}
        events={event}
        eventClick={arg => {
          handleEventClick(arg);
       //  alert();
        }}
        dateMouseEnter={arg => {
          handleEventHover(arg);
        }}
        eventColor={"#378006"}
        showNonCurrentDates={false}
        height={600}
      />
    </div>
  );
};
export default AvailabilityCalendar;
