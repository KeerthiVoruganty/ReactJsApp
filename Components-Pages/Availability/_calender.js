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

const content = () => {
  return (
    <img
      src="https://static.simpsonswiki.com/images/0/0b/Marge_Simpson.png"
      alt="abc"
    />
  );
};

const AvailabilityCalendar = props => {
  // const getEvent = () => {
  //   const user = props.user;
  //   let event = [];
  //   if (user) {
  //     if (user.rules[0]) {
  //       for (let date in user.rules[0]) {
  //         if (user.rules[0][date].time.length > 0) {
  //           let data = [];
  //           user.rules[0][date].time.forEach(time => {
  //             if (
  //               time === "morning" ||
  //               time === "afternoon" ||
  //               time === "evening"
  //             ) {
  //               data = {
  //                 title: time,
  //                 date: user.rules[0][date].date
  //               };
  //               event.push(data);
  //             }
  //           });
  //         }
  //       }
  //     }
  //   }
  //   return event;
  // };

  const [showMyModal, setShowMyModal] = useState(false);
  const [selectDate, setSelectDate] = useState(null);
  const [event, setEvent] = useState([]);

  const saveDate = () => {
    if (selectDate) {
      const userData = props.user;
      const checkboxes = document.getElementsByName("balloon-radio-group");
      const selectedCboxes = Array.prototype.slice
        .call(checkboxes)
        .filter(ch => ch.checked === true);
      const time_slots = selectedCboxes.map(item => item.id); //morning,after,even
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

  const handleDateClick = arg => {
    arg.jsEvent.preventDefault();
    let date = arg.date;
    date = moment(date).format("YYYY-MM-DD");
    setSelectDate(date);
  };

  const handleEventClick = arg => {
    arg.jsEvent.preventDefault();
    let date = arg.event.start;
    date = moment(date).format("YYYY-MM-DD");
    setSelectDate(date);
  };

  const isSelect = (time, date) => {
    const userData = props.user;
    if (userData.rules[0][date] && time && date) {
      return userData.rules[0][date].time.includes(time);
    }
  };
  const generateIcon = rules => {
    if (rules) {
      let dayheader = $(".fc-day-top");
      for (let index = 0; index < dayheader.length; index++) {
        let m = dayheader[index];
        let date = m.getAttribute("data-date");
        let divtag = document.createElement("div");
        if (rules[date]) {
          const date_rule = rules[date].time;
          if (date_rule.length === 0) {
            divtag.append(getIcon("none"));
          } else if (date_rule.length === 3) {
            divtag.append(getIcon("all"));
          } else if (date_rule.length > 0) {
            date_rule.forEach(time => {
              if (getIcon(time)) divtag.append(getIcon(time));
            });
          }
        } else {
          divtag.append(getIcon("none"));
        }
        m.append(divtag);
      }
    }
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

  useEffect(() => {
    selectDate ? setShowMyModal(true) : setShowMyModal(false);
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
              <h1 className="status-alert mt-4 mb-1">Edit Availability</h1>
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
                      <div className="col-4 form-check d-block text-center p-0">
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
                                name="balloon-radio-group"
                                defaultChecked={isSelect("morning", selectDate)}
                              />
                            </li>
                          </ul>
                        </div>

                        <label className="availability-rule-checks">
                          <i className="availability-rule-icons left-2 sunrise-icon mdi mdi-weather-sunset-up"></i>
                        </label>
                      </div>
                      <div className="col-4 form-check d-block text-center p-0">
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
                                name="balloon-radio-group"
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
                      <div className="col-4 form-check d-block text-center p-0">
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
                                name="balloon-radio-group"
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
                    <div className="col-md-5 pl-0">
                      <button
                        onClick={() => {
                          setSelectDate(null);
                        }}
                        className="btn btn-block btn-c secondary-button-no-margin-hover"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-md-7 px-0 register-alert-button">
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
        weekends={false}
        columnHeaderFormat={{ weekday: "long" }}
        header={{
          left: "title",
          center: `${content()}`,
          right: "today prev,next",
          imageUrl:
            "https://vignette.wikia.nocookie.net/simpsons/images/a/a9/Abraham_Simpson.png/revision/latest?cb=20151011181838"
        }}
        datesRender={arg => {
          if(props.user && props.user.rules ) { generateIcon(props.user.rules[0])}  
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
        resources={[content()]}
        resourceRender={content()}
        events={event}
        eventClick={arg => {
          handleEventClick(arg);
        }}
        eventColor={"#378006"}
      />
    </div>
  );
};
export default AvailabilityCalendar;
