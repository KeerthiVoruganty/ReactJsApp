import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PORT } from "../../config";
import { notify } from "react-notify-toast";
import "../User/UserProfile.css";
import CloseIcon from '@material-ui/icons/Close';
import Tabs from "../../Components/Tabs/Tabs";
import MobileNavBar from "../../Components/Navbar/MobileNavBar";


import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
require("./PersonalDetails.css");

const URL = PORT;
let user = JSON.parse(window.localStorage.getItem("user"));

export class EmergencyContact extends Component {
  constructor(props) {
    // let user = JSON.parse(window.localStorage.getItem("user"));

    super(props);
    if (user === null) {
      window.location = "/login";
    }
    this.state = {
      user: user
      // emergency_contact_name: user.emergency_contact_name,
      // emergency_contact_lastname: user.emergency_contact_lastname,
      // emergency_contact_mobile_number: user.emergency_contact_mobile_number,
      // emergency_contact_relationship: user.emergency_contact_relationship,
      // medical_needs: user.medical_needs,
      // email: user.email
    };
    this.setUserState = this.setUserState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateMobileNumber = this.validateMobileNumber.bind(this);
    this.stringifyFormData = this.stringifyFormData.bind(this);
  }

  // Sets value to the form controlls once DOM is ready
  componentDidMount = () => {
    // let user = JSON.parse(window.localStorage.getItem("user"));
    document.getElementById(
      "emergency_contact_name"
    ).value = user.emergency_contact_name ? user.emergency_contact_name : "";
    document.getElementById(
      "emergency_contact_lastname"
    ).value = user.emergency_contact_lastname
        ? user.emergency_contact_lastname
        : "";
    document.getElementById(
      "emergency_contact_mobile_number"
    ).value = user.emergency_contact_mobile_number
        ? user.emergency_contact_mobile_number
        : "";
    document.getElementById(
      "emergency_contact_relationship"
    ).value = user.emergency_contact_relationship
        ? user.emergency_contact_relationship
        : "";
    document.getElementById("medical_needs").value = user.medical_needs
      ? user.medical_needs
      : "";
  };

  stringifyFormData(fd) {
    // let user = JSON.parse(window.localStorage.getItem("user"));
    const data = {};
    for (let key of fd.keys()) {
      user[key] = fd.get(key);
    }
    window.localStorage.setItem("user", JSON.stringify(user));
    return JSON.stringify(data, null, 2);
  }

  validateMobileNumber() {
    let isValid = false;
    if (isNaN(this.state.emergency_contact_mobile_number)) {
      notify.show("please type valid number", "error");
    } else if (
      this.state.emergency_contact_mobile_number.length === 10 &&
      this.state.emergency_contact_mobile_number.substring(0, 2) === "04"
    ) {
      isValid = true;
    } else {
      notify.show(
        "please use australian number eg:04XXXXXXXX (10 Digit)",
        "error"
      );
    }
    return isValid;
  }
  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    this.stringifyFormData(data);
    // if (this.validateMobileNumber()) {
    let user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .put(`${URL}/updateUser`, {
        user: user
      })
      .then(res => {
        notify.show("Emergency contact details saved successfully");

        document.getElementById("lnkProfile").click(); // Redirects to Profile Page
        console.log(res);
      })
      .catch(err => {
        notify.show("Error", "error");
        console.error();
      });
    // }else{
    //   notify.show("Error", "error");
    // }
  }

  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    let userData = JSON.parse(window.localStorage.getItem("user"));

    // this.state[field] = value;
    this.setState({ [`${field}`]: value });
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  render() {
    console.log("----------");
    return (
      <div>
        <FixProfileNavbar />
        <div className="auth-right d-lg-flex bg-photoregister ">
          <div className="bg-gradient"></div>
          <div className="profile-container profile-container-transparent resume-container-transparent">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">Personal Information</h1>

                  {/* navigationbar on top */}
                  {/* <div className="userNavigation">
                    <Link
                      id="lnkPersonalDetails"
                      to={{ pathname: "/PersonalDetails" }}
                      className="user-links"
                    >
                      <p>1 - Personal Details</p>
                    </Link>
                    <Link
                      id="lnkIdentification"
                      to={{ pathname: "/IdentificationDoc" }}
                      className="user-links text-center"
                    >
                      <p>2 - Identification</p>
                    </Link>
                    <Link
                      id="lnkEmergencyContact"
                      to={{ pathname: "/EmergencyContact" }}
                      className="user-links user-links-active text-right"
                    >
                      <p>3 - Emergency Contact</p>
                    </Link>
                    <Link
                      id="lnkProfile"
                      to={{ pathname: "/" }}
                      style={{ display: "none" }}
                      className="user-links "
                    ></Link>
                  </div> */}

                  {/* cpntent of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      <Tabs
                        tabs={[
                          {
                            pathname: "/PersonalDetails",
                            text: "Personal Details"
                          },
                          // {
                          //   pathname: "/IdentificationDoc",
                          //   text: "Identification"
                          // },
                          // {
                          //   pathname: "/Banking",
                          //   text: "Banking & Super",
                          //   disabled: true
                          // },
                          {
                            pathname: "/EmergencyContact",
                            text: "Emergency Contact",
                            active: true
                          }
                        ]}
                      />
                      {/* container of the form */}
                      <div className="availability-table-body mt-5">
                        <div className="availability-table-body-content">
                          <div className="tab-content ">
                            <form onSubmit={this.handleSubmit}>
                              <div className="container mt-5">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                                <div className="row">
                                  <div className="col-lg-6 col-md-12">
                                    <div className="auth-text-top mb-5">
                                      <div className="form-group">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            {" "}
                                            First Name
                                          </p>
                                        </label>
                                        <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                                          {/* <i className="mdi mdi-account "></i> */}
                                          <input
                                            type="text"
                                            className="form-control mb-0"
                                            id="emergency_contact_name"
                                            required
                                            name="emergency_contact_name"
                                            //    value={this.state.user.emergency_contact_name}
                                            //  onChange={this.setUserState}
                                            placeholder="Emergency contact - First Name"
                                          />
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Last Name
                                          </p>
                                        </label>
                                        <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                                          {/* <i className="mdi mdi-account-outline"></i> */}
                                          <input
                                            type="text"
                                            className="form-control mb-0"
                                            id="emergency_contact_lastname"
                                            name="emergency_contact_lastname"
                                            //     value={this.state.emergency_contact_lastname}
                                            //   onChange={this.setUserState}
                                            required
                                            placeholder="Emergency contact - Last Name"
                                          />
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Mobile number
                                          </p>
                                        </label>
                                        <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                                          {/* <i className="mdi mdi-phone"></i> */}
                                          <input
                                            type="text"
                                            className="form-control mb-0"
                                            id="emergency_contact_mobile_number"
                                            name="emergency_contact_mobile_number"
                                            //      value={this.state.emergency_contact_mobile_number}
                                            //     onChange={this.setUserState}
                                            required
                                            placeholder="Emergency contact - Phone number"
                                            pattern="^[0-9]{10}" 

                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12">
                                    <div className="auth-text-top mb-5">
                                      <div className="form-group">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Relationship to you
                                          </p>
                                        </label>
                                        <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                                          {/* <i className="mdi mdi-account"></i> */}
                                          <input
                                            type="text"
                                            className="form-control mb-0"
                                            id="emergency_contact_relationship"
                                            required
                                            name="emergency_contact_relationship"
                                            //   value={this.state.emergency_contact_relationship}
                                            //  onChange={this.setUserState}
                                            placeholder="Indicate your relationship"
                                          />
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Allergies / Medication / Conditions
                                            (If Any)
                                          </p>
                                        </label>
                                        <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                                          {/* <i className='mdi mdi-alarm-light-outline'></i> */}
                                          {/* <i className="mdi mdi-needle"></i> */}
                                          {/* <input
                                              type="text"
                                              className="form-control mb-0"
                                              id="medical_needs"
                                              name="medical_needs"
                                              value={this.state.medical_needs}
                                              onChange={this.setUserState}
                                              required
                                            /> */}
                                          <textarea
                                            rows="5"
                                            className="form-control mb-0"
                                            id="medical_needs"
                                            name="medical_needs"
                                            //         value={this.state.medical_needs}
                                            //         onChange={this.setUserState}
                                            placeholder="Please indicate if you have a medical condition"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* submit & back buttons */}
                                <div className="row pl-0 pr-0 mr-0">
                                  {/* <div className="col-lg-6 col-md-12 pr-0">
                                    <Link
                                      type="back"
                                      value="Back"
                                      to="/Identification"
                                      className="btn btn-block btn-c secondary-button-no-margin-hover"
                                    >
                                      Back
                                    </Link>
                                  </div> */}
                                  <div className="col-lg-6 col-md-12 pr-0 m-auto pt-4">
                                    <button
                                      type="submit"
                                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
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
        <div className="mobile-size-menu">
          <MobileNavBar></MobileNavBar>
        </div>
      </div>
    );
  }
}
export default EmergencyContact;
