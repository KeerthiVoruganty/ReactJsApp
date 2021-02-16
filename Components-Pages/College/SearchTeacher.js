import React, { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../config";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import './SearchTeacher.css'
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import {
  Search,
  Pagination,
  Responsive,
  Menu,
  Dropdown
} from "semantic-ui-react";
import { notify } from "react-notify-toast";
import PopUp from "../../Components/PopUpForm/ShareProfile-PopUp";
import HireMePopUp from '../../Components/PopUpForm/HireMe-PopUp';

require("../ValidateDocuments/ValidateDocuments.css");
require("../Bookings/AllBookings/AllBookings.css");

const SearchTeacher = props => {
  let [pageNum, setPageNum] = useState(1);
  let [showCurrentUsers, setShowCurrentUsers] = useState([]);
  let [allUsers, setAllUsers] = useState([]);
  let [user, setUser] = useState();
  const [isHireMePopup, toggleHireMePopup] = useState(false)
  const [formType, setFormType] = useState("")
  useEffect(() => {
    axios
      .get(`${PORT}/AllTeachers`)
      .then(res => {
        window.localStorage.setItem("allusers", JSON.stringify(res.data));
        setAllUsers(res.data);
        searchByInstitution();
        //console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);



  // Calculate pages -----
  const pages = () => {
    let arr = [];
    if (allUsers.length != 0 && allUsers.length % 10 == 0) {
      for (let i = 1; i <= allUsers.length / 10; i++) {
        arr.push(i);
      }
    } else if (allUsers.length == 0) {
    } else if (allUsers.length != 0 && allUsers.length % 10 != 0) {
      for (let i = 1; i <= allUsers.length / 10 + 1; i++) {
        arr.push(i);
      }
    }
    return arr;
  };

  // Show 10 users per page ------
  let handlePage = (pageNumber, allTeachers) => {
    let currentUser = [];
    if (allTeachers.length > 0) {
      if (allTeachers.length % 10 == 0) {
        for (
          let i = (pageNumber - 1) * 10;
          i < (pageNumber - 1) * 10 + 10;
          i++
        ) {
          currentUser.push(allTeachers[i]);
        }
      } else {
        for (
          let i = (pageNumber - 1) * 10;
          i < (pageNumber - 1) * 10 + 10;
          i++
        ) {
          if (i < allTeachers.length) {
            currentUser.push(allTeachers[i]);
          }
        }
      }
      setShowCurrentUsers(currentUser);
      setPageNum(pageNumber);
    } else {
      console.log("No Teachers");
      setShowCurrentUsers([]);
    }
  };

  const goToDetail = user => {
    const path = {
      user: "user",
      pathname: "/TeacherpersonalDetails"
    };
    console.log("user: " + user);
    props.history.push(path);
  };

  const showShareProfile = (user) => {
    setUser(user);
    document.getElementById("modal-container-ShareProfile").style.display =
      "block";
  };
  const hideShareProfile = () => {
    document.getElementById('modal-container-ShareProfile').style.display =
        'none';
  };

  const toggleHireMe = (e) => {
    console.log(isHireMePopup);
    toggleHireMePopup(true)
  }

  const shareProfile = () => {
    axios
      .put(`${PORT}/shareUserProfile`, {
        id: user._id,
        to: document.querySelector("#email").value,
        msg:document.querySelector("#message").value 
      })
      .then(res => {
        notify.show("Profile shared successfully");
      })
      .catch(err => {
        console.log(err);
      });
    hideShareProfile();
  };


    const searchByInstitution = () => {
    let searchItem = document.getElementById("institution-name-to-search")
      .value;
    if (searchItem.length > 0) {
      const allUsers = JSON.parse(window.localStorage.getItem("allusers"));
      if (allUsers.length > 0) {
        //let search =searchItem
        let filter_users = allUsers.filter(b =>
          b.first_name == undefined ||
          b.last_name == undefined ||
          b.can_deliver == undefined
            ? (null, console.log("No teacher"))
            : (b.first_name + b.last_name + b.can_deliver.map(a=> a.can_deliver))
                .toLowerCase()
                .includes(searchItem.toLowerCase())
        );

        handlePage(pageNum, filter_users);
        setAllUsers(filter_users);
        pages();
      }
    } else {
      setAllUsers(JSON.parse(window.localStorage.getItem("allusers")));
      handlePage(pageNum, JSON.parse(window.localStorage.getItem("allusers")));
      pages();
    }
  };

  const onPageNumChange = e => {
    console.log(e.target.getAttribute("value"));
    handlePage(e.target.getAttribute("value"), allUsers);
  };

  return (
    <div>
      {isHireMePopup && <HireMePopUp user={user} showPopup={toggleHireMePopup}/>}
    <FixProfileNavbar />

    <div className="auth-right d-lg-flex bg-photoregister ">
      <div className="bg-gradient"></div>
      <div className="profile-container mt-4">
        <div className="profile-content-card-area">
          <div className="tab-content clearfix">
            <div className="mt-5">

              <h1 className="col-12 ">Search Teacher</h1>
              <div className="row justify-content-between">
                <div className="d-flex mt-4 mb-0">
                  <div className="search-label my-auto">Search by Name or Skill</div>
                  <div className="searchbar" id="all-teachers-search">
                    <input id="institution-name-to-search" className="search_input" type="text" name="" placeholder="Search..." onChange = {(e) => { searchByInstitution(); setPageNum(1)} } /> 
                    <a onClick={() => { searchByInstitution();}} pointer className="search_icon font-25"><i className="mdi mdi-account-search"></i></a>
                  </div>
                </div>
                <div className="d-flex mt-4 mb-0">
                  <div className="search-label my-auto">Or Filter by Availability</div>
                  <div className="">
                    <div className="filter-by-date ">
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="mdi mdi-calendar calendar-ic"></i>
                          <DatePicker
                            className="react-datepicker-wrapper form-control br-20"
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
                            scrollableYearDropdown
                          ></DatePicker>
                        </div>
                      </div>
                    </div>
                    <div>

                <div className="col-11 ">
                  <div className="">
                    <div className="d-flex mx-auto justify-content-between">
                      <div className="form-check d-flex d-block text-center p-0">
                        <div
                          id="r8-balloon-radio-group-wrapper-availability"
                          className="left-0"
                        >
                          <ul>
                            <li>
                              <input
                                className="radio r8-radio-float mx-1"
                                type="checkbox"
                                id="morning"
                                name="balloon-radio-group2"
                              />
                            </li>
                          </ul>
                        </div>

                        <label className="availability-rule-checks">
                          <i className="availability-rule-icons left-2 top-10 sunrise-icon mdi mdi-weather-sunset-up"></i>
                        </label>
                      </div>
                      <div className="form-check d-flex d-block text-center p-0">
                        <div
                          id="r8-balloon-radio-group-wrapper-availability"
                          className="left-0"
                        >
                          <ul>
                            <li>
                              <input
                                className="radio r8-radio-float mx-1"
                                type="checkbox"
                                id="afternoon"
                                name="balloon-radio-group2"
                              />
                            </li>
                          </ul>
                        </div>
                        <label className="availability-rule-checks">
                          <i className="availability-rule-icons left-2 top-10 day-icon mdi mdi-weather-sunny"></i>
                        </label>
                      </div>
                      <div className="form-check d-flex d-block text-center p-0">
                        <div
                          id="r8-balloon-radio-group-wrapper-availability"
                          className="left-0"
                        >
                          <ul>
                            <li>
                              <input
                                className="radio r8-radio-float mx-1"
                                type="checkbox"
                                id="evening"
                                name="balloon-radio-group2"
                              />
                            </li>
                          </ul>
                        </div>
                        <label className="availability-rule-checks">
                          <i className="availability-rule-icons left-2 top-10 evening-icon mdi mdi-weather-night"></i>
                        </label>
                      </div>
                    </div>
                  </div>


                </div>

                    </div>
                  </div>
                  
                </div>
              </div>
              

                <div className="availability-table-container mt-0">
                  <div className="availability-table">
                    <div className="availability-table-header">
                      <div className="availability-table-header-card availability-header-behind"></div>
                      <span
                        id="front-header"
                        className="availability-table-header-card"
                      >
                        <div className="similar-to-h4-style av-table-header-first-line">
                          Teachers
                        </div>
                        <div className=" av-table-header-second-line similar-to-h4-style-1">
                          Find a teacher
                        </div>
                      </span>
                    </div>
                    <div className="availability-table-body mb-0">
                      <div className="availability-table-body-content overflow-auto">
                        <table className="av-tab-root">
                          <thead className="availability-table-head">
                            <tr className="availability-table-head-row">
                              <th className="availability-table-head-cell">
                                Teacher Name
                              </th>
                              <th className="availability-table-head-cell">
                                Can Deliver
                              </th>
                              <th className="availability-table-head-cell">
                                Profile / Share / Hire
                              </th>
                            </tr>
                          </thead>
                          <tbody className="availability-table-body-bodytable">
                            {showCurrentUsers.map((user, index) => (
                              <tr
                                key={index}
                                className="availability-table-body-row"
                              >
                                <td
                                  value={user._id}
                                  id={user._id}
                                  className="availability-table-cell"
                                >
                                  {user.first_name} {user.last_name}
                                </td>
                                <td className="availability-table-cell">
                                {user.can_deliver.map(c => {
                                  return(
                                    <div>{c.can_deliver}</div>
                                )})}
                                </td>
                                <td className="availability-table-cell">
                                  <Link
                                    className="mdi mdi-account-circle-outline profile-link"
                                    to={{
                                      pathname: `/NavigateToShareProfile?id=${user._id}`
                                    }}
                                    target="blank"
                                  ></Link>
                                  <Link
                                    className="mdi mdi-share ml-3 profile-link"
                                    onClick={event => {
                                      showShareProfile(user);
                                    }}
                                  ></Link>
                                  <Link
                                    className="mdi mdi-account-star-outline ml-3 profile-link"
                                    onClick={event => {
                                      toggleHireMe(event)
                                    }}
                                  ></Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="row bookings-bottom pb-0">
                        <div className="col-lg-3 col-md-0 "></div>
                        <div className="col-lg-6  col-md-12 bookings-bottom-pagination">
                          <Responsive minWidth={1500}>
                            <Pagination
                              totalPages={
                                pages().length > 0 ? pages().length : 1
                              }
                              siblingRange={1}
                              ellipsisItem={false}
                              firstItem={false}
                              lastItem={false}
                              onPageChange={e => onPageNumChange(e)}
                              activePage={pageNum}
                            />
                          </Responsive>
                          <Responsive minWidth={1200} maxWidth={1499}>
                            <Pagination
                              totalPages={
                                pages().length > 0 ? pages().length : 1
                              }
                              ellipsisItem={false}
                              firstItem={false}
                              lastItem={false}
                              boundaryRange={0}
                              siblingRange={1}
                              onPageChange={e => onPageNumChange(e)}
                              activePage={pageNum}
                            />
                          </Responsive>
                          <Responsive maxWidth={1199}>
                            <Pagination
                              totalPages={
                                pages().length > 0 ? pages().length : 1
                              }
                              ellipsisItem={false}
                              firstItem={false}
                              lastItem={false}
                              boundaryRange={0}
                              siblingRange={0}
                              onPageChange={e => onPageNumChange(e)}
                              activePage={pageNum}
                            />
                          </Responsive>
                        </div>
                        <div className="col-lg-3 col-md-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div id='modal-container-ShareProfile' className='status-modal'>
        <div id='ShareProfile-box'>
          <Link className='dot' to={""} onClick={(event) => {  hideShareProfile();}} ></Link>
          <div className='status-alert-message overflow-unset my-auto'>
            <h1 className='status-alert blue-text mb-1'>Share Profile</h1>
            <div className="row pl-5 pr-5 mt-0">
              <div className="form-group w-100 ">
                <label className="w-100">
                  <p className="float-left mb-0 px-0">
                    Insert a message to include into the email, together with
                    the link to this teacher profile.
                  </p>
                </label>
                <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                  <textarea
                    rows="6"
                    className="form-control mb-0 p-2"
                    //         value={this.state.medical_needs}
                    //         onChange={this.setUserState}
                    required
                    id= "message"
                    placeholder="Message to attach to the email"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row px-5 mt-0">
              <div className="w-100 form-group">
                <div className="input-icon">
                  <i className="mdi mdi-email"></i>
                  <input
                    type="email"
                    className="form-control rt-input"
                    name="email"
                    id="email"
                    placeholder="Enter an Email"
                    autoFocus
                    required
                  />
                </div>
              </div>
            </div>

            {/* large screen */}
            <div className="row px-5 mt-0  small-screen-disappear">
              <div className="w-100 form-group">
                <div className="input-icon d-flex justify-content-between">
                  <div className="col-5 m-0 p-0">
                    <button
                      onClick={event => {
                        hideShareProfile();
                      }}
                      className="btn btn-block btn-c secondary-button-no-margin-hover"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6 m-0 p-0">
                    <button
                      type="submit"
                      onClick={event => {
                        shareProfile();
                      }}
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* small screen */}
            <div className="row px-5 mt-0 small-screen-appear d-none">
              <div className="w-100 form-group">
                <div className="input-icon">
                  <button
                    type="submit"
                    onClick={event => {
                      shareProfile();
                    }}
                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/*      <div id='modal-container-HireMe' className='status-modal'>
                  <div id='HireMe-box'>
                    <div onClick={hideHireMe} className='dot'></div>
                    <div className='status-alert-message overflow-unset hireme-padding'>
                      <h1 className='status-alert blue-text mb-3 modal-title'>HIRE ME</h1>
                      <div className="row mb-4 main-content">
                        <div className="col-12">
                          <h4 className="pt-0 pb-0 pl-0">Please, insert the shifts you need, and we will let you know if this teacher is available</h4>
                          <p className="mb-0 pb-0 pl-0">Filling up this table, you are sending us a booking request for this teacher. </p>
                          <p className="mb-0 pb-0 pl-0">We will contact you to let you know if this teacher is available</p>
                        </div>
                        <div className="row ml-0 pr-4 col-12 d-flex justify-content-between">
                          
                          <h5 className="mt-4 d-flex ">Coming week</h5>
                          <h5 className="mt-4 d-flex ">or Pick a date</h5>
                        </div>
                        <div className="row ml-0">

                          <div className="pl-3 pr-0 col-9">
                            <div className="calendar-rule-container pb-3">
                              <div className="row ml-0">
                              <div className="col-2">
                                <div className="row week-days mb-1">Monday 25th</div>
                                <div className="row weekday-container availability-box-unavialable">
                                  Unavialable
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Tuesday 26th</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Wednesday 27th</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Thursday 28th</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row week-days mb-1">Friday 29th</div>
                                <div className="row weekday-container ">
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i></label>
                                  </div>
                                  <div className='col-4 form-check d-block text-center'>
                                    <input
                                      type='checkbox'
                                      className='check-filter'
                                    /><label className="availability-rule-checks"><i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i></label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-1"></div>
                            </div>
                            </div>
                          </div>
                          
                          <div className="pl-0 col-3 margin-t-25 mb-0">
                            <div className="form-group hireme-alert-datepicker">
                              <div className="input-icon">
                                <i className="mdi mdi-calendar calendar-ic"></i>
                                <DatePicker></DatePicker>
                              </div>
                            </div>
                          </div>
                        
                        </div>
                          
                      </div>
                      <div >
                        <div className="row qualification-footer">
                          <div className="col-md-5">
                            <button onClick={(event) => {  hideHireMe();}} className="btn btn-block btn-c secondary-button-no-margin-hover">
                              Cancel
                            </button>
                          </div>
                          <div className="col-md-7 pr-4">
                            <button onClick={(event) => {  hideHireMe();}} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">
                            Send Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>*/}

  </div>
  )
};

export default SearchTeacher;
