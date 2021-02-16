import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../User/DateRange.css";
import axios from "axios";
import { PORT } from "../../config";
import { notify } from "react-notify-toast";
import Select from "react-select";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import "../User/UserProfile.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { addDays } from "date-fns";
import MobileNavBar from "../../Components/Navbar/MobileNavBar";
import Tabs from "../../Components/Tabs/Tabs";
import { getStates } from "../../Helper";

require("./PersonalDetails.css");

const moment = extendMoment(originalMoment);
const isNumeric = value => {
  return /^[0-9]*$/.test(value);
};

const URL = PORT;
const today = moment();


// const
const cities = [
  { value: "Melbourne", label: "Melbourne" },
  { value: "Sydney", label: "Sydney" },
  { value: "Geelong", label: "Geelong" },
  { value: "Brisbane", label: "Brisbane" },
  { value: "Sunshine Coast", label: "Sunshine Coast" },
  { value: "Gold Coast", label: "Gold Coast" },
  { value: "Newcastle", label: "Newcastle" },
  { value: "Christchurch", label: "Christchurch" },
  { value: "Auckland", label: "Auckland" },
  { value: "Ballarat", label: "Ballarat" }
];

const states = getStates();

export class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user === null) {
      window.location = "/login";
    }
    const date_of_birth =
      user.date_of_birth !== null && user.date_of_birth !== undefined
        ? new Date(user.date_of_birth.split("T")[0])
        : "";

    const address_line = user.address_line1 !== null ? user.address_line1 : (user.street_name !== (null || undefined)) && (user.street_number !== (null || undefined)) ? user.street_number + ", " + user.street_name : " ";
    this.state = {
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name,
      preferred_name: user.preferred_name,
      prefered_work_location: user.prefered_work_location,
      default_work_location:
        user.prefered_work_location !== null &&
          user.prefered_work_location !== undefined
          ? user.prefered_work_location.map(item => {
            return { value: item, label: item };
          })
          : "Please select",
      date_of_birth: date_of_birth,
      contact_number: user.contact_number,
      street_name: user.street_name,
      street_number: user.street_number,
      street_type: user.street_type,
      unit_number: user.unit_number,
      state: user.state,
      suburb: user.suburb,
      email: user.email,
      postcode: user.postcode,
      id: user._id,
      contact_number_verified: user.contact_number_verified,

      isMobileValid: false,
      showConfirmNumber: false,
      address_line1: address_line,
      address_line2: user.address_line2,
      state2: user.state2,
      suburb2: user.suburb2,
      postcode2: user.postcode2,
      whereby_link: user.whereby_link,
    };
    this.setUserState = this.setUserState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDDL = this.handleDDL.bind(this);
    this.showChangePhoneNumber = this.showChangePhoneNumber.bind(this);
    this.hideChangePhoneNumber = this.hideChangePhoneNumber.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocationDDL = this.handleLocationDDL.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.handleRequestOTP = this.handleRequestOTP.bind(this);

  }

  /* popup to change phone number*/
  showChangePhoneNumber = () => {
    document.getElementById("modal-container-ChangePhoneNumber").style.display =
      "block";
  };
  hideChangePhoneNumber = () => {
    document.getElementById("modal-container-ChangePhoneNumber").style.display =
      "none";
  };

  // handleCancelCode() {
  //   document.getElementById("modal-container-ChangePhoneNumber").style.display =
  //     "none";
  //   document.getElementById(
  //     "modal-container-ChangePhoneNumberOTP"
  //   ).style.display = "none";
  // }
  /** end popup */

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.prefered_work_location.length === 0) {
      notify.show("Please select preferred work location", "warning");
    } else {
      let user = JSON.parse(window.localStorage.getItem("user"))

      // let date_of_birth = moment(document.getElementById("date_of_birth").value);
      axios
        .put(`${URL}/updateUser`, {
          user
          // .put(`${URL}/user`, {
          //   first_name: this.state.first_name,
          //   last_name: this.state.last_name,
          //   email: this.state.email,
          //   preferred_name: this.state.preferred_name,
          //   prefered_work_location: this.state.prefered_work_location,
          //   date_of_birth: this.state.date_of_birth,
          //   contact_number: this.state.contact_number,
          //   street_number: this.state.street_number,
          //   street_type: this.state.street_type,
          //   unit_number: this.state.unit_number,
          //   state: this.state.state,
          //   street_name: this.state.street_name,
          //   suburb: this.state.suburb,
          //   postcode: this.state.postcode
        })
        .then(res => {
          notify.show("Personal details saved successfully");
          document.getElementById("lnkIdentification").click();
        })
        .catch(err => {
          console.error();
          // notify.show(err, "error");
        });
    }
  }

  handleDDL(e) {
    if (e.target.name === "street_type") {
      this.setState({ street_type: e.target.value });
    }
    this.updateLocalStorage("street_type", e.target.value);
  }

  handleLocationDDL(e) {
    let locations = [];
    if (e !== null) {
      e.map(item => {
        locations.push(item.value);
        this.setState({
          prefered_work_location: locations
        });
        return locations;
      });
    } else {
      this.setState({
        prefered_work_location: locations
      });
    }

    this.updateLocalStorage("prefered_work_location", locations);
  }

  // Updates local storage object when any control updates its state
  updateLocalStorage(field, value) {
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  handleDateChange = date => {
    // console.log(typeof date);
    this.setState({ date_of_birth: date });
    this.updateLocalStorage("date_of_birth", date);
  };


  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    let userData = JSON.parse(window.localStorage.getItem("user"));

    this.state[field] = value;
    this.setState({ [`${field}`]: value });
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  handleRequestOTP(event) {
    event.preventDefault();
    debugger;
    this.state.contact_number = document.getElementById(
      "txtnewContactNumber"
    ).value;
    this.setState({
      isMobileValid: false,
      showConfirmNumber: false
    });
    if (this.state.contact_number.length === 10) {
      if (isNumeric(this.state.contact_number)) {
        axios
          .get(`${PORT}/requestOTP`, {
            params: {
              email: this.state.email,
              mobile: this.state.contact_number.substring(1)
            }
          })
          .then(function (response) {
            window.auth_user_id = response.data.auth_user_id;
            document.getElementById(
              "modal-container-ChangePhoneNumber"
            ).style.display = "none";
            document.getElementById(
              "modal-container-ChangePhoneNumberOTP"
            ).style.display = "block";
          })
          .catch(function (error) {
            console.log(error);
            notify.show("Error in sending OTP");
          });
      } else {
        notify.show("Please enter only numbers");
      }
    } else {
      notify.show("Please enter 10 digit numbers");
    }
  }

  togglePopup() {
    const codes = document.querySelector("#verifycode").value;
    let newUser = JSON.parse(window.localStorage.getItem("user"));

    if (isNumeric(codes)) {
      axios
        .get(`${PORT}/verifyOTP`, {
          params: {
            id: window.auth_user_id,
            token: codes,
            email: this.state.email,
            contact_number: this.state.contact_number
          }
        })
        .then(function (response) {
          axios
            .put(`${PORT}/updateUser`, {
              user: newUser
            })
            .then(res => {
              document.getElementById(
                "modal-container-ChangePhoneNumberOTP"
              ).style.display = "none";
              notify.show("Your contact number is verified.");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(function (error) {
          console.log(error);
          notify.show("Please enter the correct code");
        });
    } else {
      console.log("Please enter only numbers");
      notify.show("Please enter only numbers");
    }
  }

  render() {
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
                  {/* <div className="userNavigation d-flex justify-content-between">
                    <Link
                      to={{
                        pathname: "/PersonalDetails"
                      }}
                      className="user-links user-links-active d-flex "
                    >
                      <p>1 - Personal Details</p>
                    </Link>
                    <Link
                      id="lnkIdentification"
                      to={{
                        pathname: "/IdentificationDoc"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>2 - Identification</p>
                    </Link>
                    <Link
                      id="lnkEmergencyContact"
                      to={{
                        pathname: "/EmergencyContact"
                      }}
                      className="user-links text-right d-flex "
                    >
                      <p>3 - Emergency Contact</p>
                    </Link>
                  </div> */}

                  {/* content of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      <Tabs
                        tabs={[
                          {
                            pathname: "/PersonalDetails",
                            text: "Personal Details",
                            active: true
                          },
                          // {
                          //   pathname: "/Banking",
                          //   text: "Banking & Super",
                          //   disabled: true
                          // },
                          {
                            pathname: "/EmergencyContact",
                            text: "Emergency Contact"
                          }
                        ]}
                      />
                      {/* container of the form */}
                      <div className="availability-table-body mb-0 mt-5">
                        <div className="availability-table-body-content h-100 allow-overflow">
                          <form onSubmit={this.handleSubmit}>
                            <div className="container mt-5">
                              <div className="row">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                                <div className="col-lg-6 col-md-12">
                                  <div className="auth-text-top mb-5">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Username
                                        </p>
                                      </label>
                                      <div className="input-icon mt-1">
                                        <i className="mdi mdi-account-circle"></i>
                                        <input
                                          type="text"
                                          className="form-control pl-5"
                                          id="txtUsername"
                                          name="Username"
                                          placeholder="Username"
                                          disabled
                                          value={this.state.first_name.toUpperCase() + "_" + this.state.last_name[0]}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          First Name
                                        </p>
                                      </label>
                                      <div className="input-icon mt-1">
                                        {/* <i className="mdi mdi-account-circle"></i> */}
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="txtFN"
                                          required
                                          name="first_name"
                                          placeholder="First Name"
                                          value={this.state.first_name}
                                          onChange={this.setUserState}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Middle Name (Optional)
                                        </p>
                                      </label>
                                      <div className="input-icon mt-1">
                                        {/* <i className="mdi mdi-account-circle"></i> */}
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="middle_name"
                                          name="middle_name"
                                          placeholder="Middle Name"
                                          value={this.state.middle_name}
                                          onChange={this.setUserState}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Last Name
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-account-circle-outline "></i> */}
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="txtLastName"
                                          name="last_name"
                                          required
                                          value={this.state.last_name}
                                          onChange={this.setUserState}
                                          placeholder="Last Name"
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Preferred Name (Optional)
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-account-circle-outline "></i> */}
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="preferred_name"
                                          name="preferred_name"
                                          value={this.state.preferred_name}
                                          onChange={this.setUserState}
                                          placeholder="Please leave blank if your First Name and Preferred Name are the same"
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Email
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        <i className="mdi mdi-account-check"></i>
                                        <input
                                          type="text"
                                          className="form-control pl-5"
                                          id="txtEmail"
                                          name="email"
                                          disabled
                                          value={this.state.email}
                                          onChange={this.setUserState}
                                          placeholder="Email"
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100 ">
                                        <p className="float-left mb-0 mr-2">
                                          Contact Number
                                        </p>
                                        {this.state.contact_number_verified ? (
                                          <div className="span-hovered">
                                            <i className="mdi mdi-checkbox-marked-circle float-left check-green"></i>
                                            <span className="span-hovered-content">
                                              This contact is verified!
                                            </span>
                                          </div>
                                        ) : (
                                            <div className="span-hovered">
                                              <i className="mdi mdi-checkbox-marked-circle mdi-spin float-right check-gray"></i>
                                              <span className="span-hovered-content">
                                                The contact is not verified yet!
                                            </span>
                                            </div>
                                          )}
                                      </label>
                                      <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
                                        <i className="mdi mdi-phone"></i>
                                        <input
                                          type="text"
                                          className="form-control mb-0 pl-5"
                                          id="txtContactNumber"
                                          required
                                          name="contact_number"
                                          value={this.state.contact_number}
                                          onChange={this.setUserState}
                                          readOnly
                                          placeholder="Phone Number"
                                        />
                                        <button
                                          type="button"
                                          id="btnChnage"
                                          className="ml-3 pl-5 pr-5 mt-1 btn btn-primary btn-c primary-button-no-margin-hover"
                                          onClick={this.showChangePhoneNumber}
                                        >
                                          Change
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                  <div className="auth-text-top mb-5">

                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-1 mr-2">
                                          Date of Birth
                                        </p>
                                        <div className="span-hovered">
                                          <i className="mdi mdi-information-outline float-left"> </i>
                                          <span className="span-hovered-content">
                                            We need your DOB to verify your qualifications, and deposit your wages and superannuation
                                          </span>
                                        </div>
                                      </label>
                                      <div className="input-icon float-left mb-3">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                        <DatePicker
                                          className="react-datepicker-wrapper form-control"
                                          id="date_of_birth"
                                          selected={this.state.date_of_birth}
                                          placeholderText={new Date()
                                            .toLocaleDateString()
                                            .split(/\//)
                                            .join("-")}
                                          showYearDropdown
                                          showMonthDropdown
                                          isClearable
                                          showPopperArrow={false}
                                          maxDate={addDays(new Date(), 0)}
                                          dropdownMode="select"
                                          dateFormatCalendar="MMMM"
                                          dateFormat="dd-MM-yyyy"
                                          yearDropdownItemNumber={10}
                                          scrollableYearDropdown
                                          value={this.state.date_of_birth}
                                          onChange={this.handleDateChange}
                                          required
                                        ></DatePicker>
                                      </div>
                                    </div>

                                    {/* address */}
                                    <div>
                                      <div className="form-group mb-3">
                                        <label className="w-100">
                                          <p className="float-left mb-1">
                                            Address Line 1
                                          </p>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="address_line1"
                                          name="address_line1"
                                          required
                                          value={this.state.address_line1}
                                          onChange={this.setUserState}
                                          placeholder="Address Line 1"
                                        />
                                      </div>

                                      <div className="form-group mb-3">
                                        <label className="w-100">
                                          <p className="float-left mb-1">
                                            Address Line 2
                                          </p>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="address_line2"
                                          name="address_line2"
                                          value={this.state.address_line2}
                                          onChange={this.setUserState}
                                          placeholder="Address Line 2"
                                        />
                                      </div>




                                      <div className="row form-group mb-2">
                                        <div className="col-5 form-group mb-0">
                                          <label className="w-100">
                                            <p className="float-left mb-0">
                                              Suburb
                                          </p>
                                          </label>
                                          <div className="input-icon">
                                            {/* <i className="mdi mdi-city"></i> */}
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="suburb"
                                              required
                                              name="suburb"
                                              value={this.state.suburb}
                                              onChange={this.setUserState}
                                              placeholder="Suburb"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-4 form-group mb-0">
                                          <label className="w-100">
                                            <p className="float-left mb-1">
                                              State
                                          </p>
                                          </label>
                                          <div className="form-group dropdown-box br-4 pl-0">
                                            <select
                                              className="form-control"
                                              id="txtState"
                                              name="state"
                                              value={this.state.state}
                                              onChange={this.setUserState}
                                              placeholder="State"
                                              required
                                            >
                                              {states.map(state => <option>{state}</option>)}
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-3 form-group mb-0">
                                          <label className="w-100">
                                            <p className="float-left mb-1">
                                              Postcode
                                          </p>
                                          </label>
                                          <div className="input-icon">
                                            {/* <i className="mdi mdi-sign-direction"></i> */}
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="postcode"
                                              required
                                              name="postcode"
                                              value={this.state.postcode}
                                              onChange={this.setUserState}
                                              placeholder="Postal code"
                                            />
                                          </div>
                                        </div>

                                      </div>

                                    </div>

                                    {/* <div className="row form-group mb-2">
                                      <div className="col-5 form-group mb-0">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Suburb
                                          </p>
                                        </label>
                                        <div className="input-icon">
                                          <i className="mdi mdi-city"></i>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="suburb2"
                                            name="suburb2"
                                            value={this.state.suburb2}
                                            onChange={this.setUserState}
                                            placeholder="Suburb"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-4 form-group mb-0">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            State
                                          </p>
                                        </label>
                                        <div className="form-group dropdown-box br-4 pl-0">
                                          <select
                                            className="form-control"
                                            id="txtState2"
                                            name="state2"
                                            value={this.state.state2}
                                            onChange={this.setUserState}
                                            placeholder="State"
                                          >
                                            <option>New South Wales</option>
                                            <option>Queensland</option>
                                            <option>South Australia</option>
                                            <option>Tasmania</option>
                                            <option>Victoria</option>
                                            <option>Western Australia</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-3 form-group mb-0">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Postal Code
                                          </p>
                                        </label>
                                        <div className="input-icon">
                                          <i className="mdi mdi-sign-direction"></i>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="postcode2"
                                            name="postcode2"
                                            value={this.state.postcode2}
                                            onChange={this.setUserState}
                                            placeholder="Postal code"
                                          />
                                        </div>
                                      </div>

                                    </div> */}
                                    <div className="form-group text-left">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Preferred Work Locations
                                        </p>
                                      </label>
                                      <div className="dropdown-box input-icon br-4 mt-0">
                                        {/* <i className="mdi mdi-map-marker "></i> */}
                                        <Select
                                          id="prefered_work_location"
                                          name="prefered_work_location"
                                          onChange={this.handleLocationDDL}
                                          defaultValue={
                                            this.state.default_work_location
                                          }
                                          options={cities}
                                          isSearchable
                                          isMulti
                                          required={true}
                                          placeholder="Choose cities where you'd like to work"
                                        ></Select>
                                      </div>
                                    </div>

                                     {/* whereby link */}
                                     <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Whereby Link (Optional)
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="whereby_link"
                                          name="whereby_link"
                                          onChange={this.setUserState}
                                          value={this.state.whereby_link}
                                          title="Please match url format with https://whereby.com/example"
                                          pattern="^https:\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                                          placeholder="Insert your whereby.com link here e.g.: https://whereby.com/example"
                                        />
                                      </div>
                                    </div>
                                    {/* <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Home Address - Street Details
                                        </p>
                                      </label>
                                      <div className="input-icon margin-top-">
                                        <i className="mdi mdi-home-map-marker"></i>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="txtAddress"
                                          required
                                          placeholder={
                                            this.state.street_name &&
                                              this.state.street_number &&
                                              this.state.suburb &&
                                              this.state.postcode
                                              ? (this.state.unit_number
                                                ? this.state.unit_number + "/"
                                                : "") +
                                              this.state.street_number +
                                              ", " +
                                              this.state.street_name +
                                              " " +
                                              (this.state.street_type
                                                ? this.state.street_type
                                                : "") +
                                              ", " +
                                              this.state.suburb +
                                              ", " +
                                              this.state.postcode +
                                              ", " +
                                              this.state.state
                                              : "e.g.: 2/10, dalgan street, oakleigh, 3136"
                                          }
                                          readOnly
                                        />
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                              </div>

                              {/* submit  buttons */}
                              <div className="row pl-0 pr-0 mr-0">
                                <div className="col-lg-6 col-md-12 pr-0 m-auto">
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

                          {/* <div id='modal-container-ChangePhoneNumber' className='status-modal'>
                          <div className='popup modal-not-popup'>
                            <div  className='display-box'>
                              <div onClick={this.hideChangePhoneNumber} className='dot'></div>
                              <h1 className='status-alert blue-text mb-4 mt-4 '>Change your number!</h1>
                              <div className='overflow-unset position-static'>
                                <div className="row pl-5 pr-5 mt-1 mb-4">
                                  <h4>Change your phone number and get OTP to verify</h4>
                                </div>
                                <div className="col-6 m-auto mb-5">
                                  <div className="form-group">
                                    <div className="input-icon">
                                      <i className="mdi mdi-phone"></i>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="txtnewContactNumber"
                                        required
                                        name="contact_number"
                                        value={ this.state.contact_number}
                                        onChange={this.setUserState}
                                        placeholder="Phone Number"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row col-10 m-auto qualification-footer">
                                  <div className="col-md-5">
                                    <button onClick={(event) => {  this.hideChangePhoneNumber();}} className="btn btn-block btn-c secondary-button-no-margin-hover">
                                      Cancel
                                    </button>
                                  </div>
                                  <div className="col-md-7 pr-4">
                                    {/* <button onClick={(event) => {  this.handleRequestOTP();}} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"> */}
                          {/*<button onClick={this.handleRequestOTP} className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">

                                    Send OTP
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                          </div> */}

                          <div
                            // id="modal-container-ChangePhoneNumberOTP"
                            id="modal-container-ChangePhoneNumber"
                            className="status-modal"
                          >
                            <div className="popup modal-not-popup">
                              <div className="display-box">
                                <div
                                  onClick={this.hideChangePhoneNumber}
                                  className="dot"
                                ></div>
                                <h1 className="status-alert blue-text mb-4 mt-4 ">
                                  Confirm your number!
                                </h1>
                                <div className="overflow-unset position-static">
                                  <div className="row pl-5 pr-5 mt-1 mb-4">
                                    <h4>
                                      Please, insert the code we have sent to
                                      you by sms
                                    </h4>
                                  </div>
                                  <div className="col-6 m-auto mb-5">
                                    <div className="form-group">
                                      <div className="input-icon">
                                        <i className="mdi mdi-numeric"></i>
                                        <input
                                          type="text"
                                          className="form-control verifycode"
                                          id="verifycode"
                                          autoFocus
                                          required
                                          placeholder="OTP Code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row col-10 m-auto qualification-footer">
                                    <div className="col-md-5">
                                      <button
                                        onClick={this.hideChangePhoneNumber}
                                        className="btn btn-block btn-c secondary-button-no-margin-hover"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                    <div className="col-md-7 pr-4">
                                      <button
                                        onClick={this.togglePopup.bind(this)}
                                        className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                      >
                                        Confirm codes
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
        <div className="mobile-size-menu">
          <MobileNavBar></MobileNavBar>
        </div>
      </div>
    );
  }
}
export default PersonalDetails;
