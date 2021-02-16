import React, { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../config";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import { notify } from "react-notify-toast";
import { Link } from "react-router-dom";
import {
  Search,
  Pagination,
  Responsive,
  Menu,
  Dropdown
} from "semantic-ui-react";
import "./Admin.css";
import PopUp from "../../Components/PopUpForm/ShareProfile-PopUp";
import $ from "jquery";
require("../ValidateDocuments/ValidateDocuments.css");
require("../Bookings/AllBookings/AllBookings.css");

const AllTeachers = props => {
  const [user, setUser] = useState(); //Shared user
  let [pageNum, setPageNum] = useState(1);
  let [showCurrentUsers, setShowCurrentUsers] = useState([]);
  let [allUsers, setAllUsers] = useState([]);
  const [isPopup, togglePopup] = useState(false);
  const [formType, setFormType] = useState("");
  const POFILE_URL = `https://master.d2ui2xxezlfztd.amplifyapp.com/NavigateToShareProfile?id=`;
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
    if (allUsers.length !== 0 && allUsers.length % 10 === 0) {
      for (let i = 1; i <= allUsers.length / 10; i++) {
        arr.push(i);
      }
    } else if (allUsers.length === 0) {
    } else if (allUsers.length !== 0 && allUsers.length % 10 !== 0) {
      for (let i = 1; i <= allUsers.length / 10 + 1; i++) {
        arr.push(i);
      }
    }
    return arr;
  };

  const showShareProfile = user => {
    setUser(user);
    setFormType("shareProfile");
    togglePopup(true);
  };

  // Show 10 users per page ------
  let handlePage = (pageNumber, allTeachers) => {
    let currentUser = [];
    if (allTeachers.length > 0) {
      if (allTeachers.length % 10 === 0) {
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

  const copyToClipboard = elementId => {
    var aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);
  };

  const goToDetail = user => {
    const path = {
      user: "user",
      pathname: "/TeacherpersonalDetails"
    };
    console.log("user: " + user);
    props.history.push(path);
  };

  const searchByInstitution = () => {
    let searchItem = [];
    if (document.getElementById("institution-name-to-search")) {
      searchItem = document
        .getElementById("institution-name-to-search")
        .value.toLowerCase();
    }
    if (searchItem.length > 0) {
      const allUsers = JSON.parse(window.localStorage.getItem("allusers"));
      
      // if (allUsers != undefined){
      //   console.log(allUsers);
      // }

      if (allUsers.length > 0) {
        //let search =searchItem
        let filter_users = allUsers.filter(b =>
          b.first_name === undefined ||
          b.last_name === undefined ||
          b.email === undefined ||
          b.contact_number === undefined ||
          b.can_deliver == undefined ||
          b.can_deliver == []
            ? (null 
              // ,console.log("No teacher")
            )
            : (
                // b.first_name.toLowerCase() +
                // b.last_name.toLowerCase() +
                // b.email.toLowerCase() +
                // b.contact_number.toLowerCase() +
                // getCanDelivers(b.can_deliver)
                filterCriterias(b)
              ).includes(searchItem)
        );

        console.log("result", filter_users);

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

  // const getCanDelivers = (can_deliver) => {
  //   let result = "";
  //   for (let i=0; i<can_deliver.length; i++){
  //     result += can_deliver[i].can_deliver + " ";
  //   }
  //   return result.toLowerCase();
  // }

  const filterCriterias = (b) => {
    let result = b.first_name.toLowerCase() +
                b.last_name.toLowerCase() +
                b.email.toLowerCase() +
                b.contact_number.toLowerCase();
    
    let can_deliver = b.can_deliver;
    for (let i=0; i<can_deliver.length; i++){
      result += can_deliver[i].can_deliver + " ";
    }

    // if (b.wwcc_number) result += b.wwcc_number;
    if (b.street_name) result += b.street_name;
    if (b.street_type) result += b.street_type;
    if (b.street_number) result += b.street_number;
    if (b.unit_number) result += b.unit_number;
    if (b.address) result += b.address;
    if (b.address_line1) result += b.address_line1;
    if (b.address_line2) result += b.address_line2;
    if (b.street) result += b.street;
    if (b.state) result += b.state;
    if (b.suburb) result += b.suburb;
    if (b.postcode) result += b.postcode;
    if (b.visa_grant_number) result += b.visa_grant_number;

    return result.toLowerCase();
  }



  return (
    <div>
      <FixProfileNavbar />
      {isPopup && (
        <PopUp user={user} showPopup={togglePopup} formType={formType} />
      )}
      <div className="auth-right d-lg-flex bg-photoregister ">
        <div className="bg-gradient"></div>
        <div className="profile-container mt-4">
          <div className="profile-content-card-area">
            <div className="tab-content clearfix">
              <div className="mt-5">
                <h1 className="col-12 ">Manage Teachers</h1>
                <div className="d-flex mt-4 mb-0">
                  <div className="search-label">Search</div>
                  <div className="searchbar" id="all-teachers-search">
                    <input
                      id="institution-name-to-search"
                      className="search_input"
                      type="text"
                      name=""
                      placeholder="Search..."
                      onChange={e => {
                        searchByInstitution();
                        setPageNum(1);
                      }}
                    />
                    <a
                      onClick={() => {
                        searchByInstitution();
                      }}
                      pointer={true}
                      className="search_icon font-25"
                    >
                      <i className="mdi mdi-account-search"></i>
                    </a>
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
                          All Teachers
                        </div>
                        <div className=" av-table-header-second-line similar-to-h4-style-1">
                          Details of all teachers
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
                                Email
                              </th>
                              <th className="availability-table-head-cell">
                                Contact Number
                              </th>
                              <th className="availability-table-head-cell">
                                Profile
                              </th>
                              <th className="availability-table-head-cell">
                                Share
                              </th>
                              <th className="availability-table-head-cell">
                                Hiperlink
                              </th>
                              <th className="availability-table-head-cell">
                                Details
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
                                <td className="availability-table-cell small">
                                  {user.email}
                                </td>
                                <td className="availability-table-cell">
                                  {user.contact_number}
                                </td>
                                <td className="availability-table-cell">
                                  {/* <Link className="btn btn-success" onClick= {() => handledetails(user._id)}>More Details</Link> */}
                                  {/* <Link className="mdi mdi-account-circle-outline home-icon-margin-adjust profile-link" to={{ pathname: `https://master.d2ui2xxezlfztd.amplifyapp.com/NavigateToShareProfile?id=${user.email}`}}  target="blank"></Link> */}
                                  <Link
                                    className="mdi mdi-account-circle-outline home-icon-margin-adjust profile-link"
                                    to={{
                                      pathname: `/NavigateToShareProfile?id=${user._id}`
                                    }}
                                    target="blank"
                                  ></Link>
                                </td>
                                <td className="availability-table-cell">
                                  <Link
                                    className="mdi mdi-share home-icon-margin-adjust profile-link"
                                    id="lnkShareProfile"
                                    target="_self"
                                    onClick={() => showShareProfile(user)}
                                  ></Link>
                                </td>

                                <td className="availability-table-cell" >
                                  <span id={"lnkProfile" + user._id} class="d-none">
                                    {POFILE_URL + user._id}
                                  </span>
                                  <span className="d-inline-block" id="tooltip" tabindex="0" data-toggle="tooltip" title="Copy Profile Link">

                                  <Link
                                    id={"t"+user._id}

                                    className="mdi mdi-link-variant home-icon-margin-adjust profile-link"
                                    to={{}}
                                    onClick={() => {
                                      copyToClipboard("lnkProfile" + user._id);
                                    }}
                                  > </Link></span>
                                  {/* <input type="text" placeholder="Paste here for test" /> */}
                                </td>

                                <td className="availability-table-cell">
                                  <Link
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                    onClick={() => (
                                      window.localStorage.setItem(
                                        "teacher",
                                        JSON.stringify(user)
                                      ),
                                      props.history.push(
                                        "/TeacherpersonalDetails"
                                      )
                                    )}
                                  >
                                    More Details
                                  </Link>
                                </td>
                                {
                                  //onClick = {handledetails(user._id)}
                                }
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
    </div>
  );
};

export default AllTeachers;
