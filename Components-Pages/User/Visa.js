import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PORT } from "../../config";
import { notify } from "react-notify-toast";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import DeletePopup from "../User/ConfirmationBox";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../User/UserProfile.css";
import Tabs from "../../Components/Tabs/Tabs";
import MobileNavBar from "../../Components/Navbar/MobileNavBar";
import { getStates } from "../../Helper";
import $ from 'jquery';

const URL = PORT;

let Countries = [];
const States = getStates();

export class Visa extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    if (user === null) {
      window.location = "/login";
    }

    const visa_expiry =
      user.visa_expiry !== null && user.visa_expiry !== undefined
        ? new Date(user.visa_expiry.split("T")[0])
        : "";

    this.state = {
      user: user,
      visa_url: user.visa_url,
      visa_filename: user.visa_filename,
      issuing_office: user.issuing_office, // Issuing visa country
      visa_file: {
        name: "",
        type: "",
        file: []
      },
      visa_status: user.visa_status,
      visa_type: user.visa_type,
      visa_expiry: visa_expiry,
      visa_application_number: user.visa_application_number,
      email: user.email,
      displayOther: "none",
      link_style: user.identification_filename === null ? "none" : "block",
      visa_linkstyle: user.visa_filename === null ? "none" : "block",
      deletevisaPopup: false,
      visa_verification_status: user.visa_verification_status
    };

    this.handleddlChange = this.handleddlChange.bind(this);
    this.handleradioChange = this.handleradioChange.bind(this);
    this.setUserState = this.setUserState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.handleVisaExpiryDateChange = this.handleVisaExpiryDateChange.bind(
      this
    );
    this.handleVisaFileChange = this.handleVisaFileChange.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.bindPlaces = this.bindPlaces.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
    this.isFileUploaded = this.isFileUploaded.bind(this);
    this.changeVisaType = this.changeVisaType.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.toggleFileUpload = this.toggleFileUpload.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveFile = this.saveFile.bind(this);
  }

  uploadDocument(id) {
    document.getElementById(id).click();
  }

  componentDidMount() {

    //get a complete list of countries
    axios.get(`${URL}/countries`).then(res => {
      Countries = res.data;
      this.bindPlaces(Countries, "issuing_office");
    });
    this.toggleFileUpload(); // Disables file upload
    // Bind data on page load
  }

  //  Validation for file: Checks if file is uploaded, else returns false
  validateFile(file, filename) {
    let isValid = false;
    if (file !== null && file !== undefined) {
      isValid = true;
    }
    return isValid;
  }

  bindPlaces(places, id) {
    // debugger;
    var selectElem = document.getElementById(id);
    selectElem.innerHTML = "";
    var e = document.createElement("option")
    e.innerText = "Please Select";
    e.disabled = true
    selectElem.append(e);
    let place_sort = [];
    for (var i = 0; i < places.length; i++) {
      place_sort[i] = places[i];
    }
    place_sort.sort()
    for (var i = 0; i < places.length; i++) {
      var item = place_sort[i];
      var element = document.createElement("option");
      element.innerText = item;
      selectElem.append(element);
    }
  }

  saveFile(file, filename) {
    let fileParts = file.name.split(".");
    let fileType = fileParts[1];
    let fileName = filename;
    axios
      .post(`${PORT}/s3`, {
        fileName: fileName,
        fileType: fileType,
        _id: this.state.user._id
      })
      .then(response => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        let stateFileName = filename + "_filename";
        let stateFileUrl = filename + "_url";
        this.setState({ [stateFileName]: file.name });
        this.setState({ [stateFileUrl]: url });
        this.updateLocalStorage(stateFileName, file.name);
        this.updateLocalStorage(stateFileUrl, url);
        console.log("Signed request", signedRequest);
        // Put the fileType in the headers for the upload
        const options = {
          headers: {
            "Content-Type": fileType
          }
        };
        axios
          .put(signedRequest, file, options)
          .then(response2 => {
            // alert("Good " + JSON.stringify(response2));
          })
          .catch(error => {
            // alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch(error => {
        notify.show(JSON.stringify(error), "error");
      });
  }


  handleDateChange = date => {
    this.setState({ id_document_expiry: date });
    this.updateLocalStorage("id_document_expiry", date);
  };
  handleVisaExpiryDateChange = date => {
    this.setState({ visa_expiry: date });
    this.updateLocalStorage("visa_expiry", date);
  };

  toggleFileUpload() {
    if (
      this.state.visa_filename !== null &&
      this.state.visa_filename !== undefined
    ) {
      document.getElementById("btnUpload_visa").disabled = true;
    } else {
      document.getElementById("btnUpload_visa").disabled = false;
    }
  }

  isFileUploaded() {
    var isValid = true;
    if (this.state.visa_status !== "I am Australian Citizen" &&
      this.state.visa_filename === null) {
      notify.show("Please provide Visa document");
      isValid = false;
    }
    return isValid;
  }

  saveData() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    axios
      .put(`${URL}/updateUser`, {
        user
      })
      .then(res => {
        console.log(res);
        notify.show("Visa details saved successfully");
        document.getElementById("lnkPoliceCheck").click(); // Redirects to Police Verification Page
      })
      .catch(err => {
        console.error();
        notify.show("error", "error");
      });
  }

  handleddlChange(e) {
    if (e.target.name === "visa_type") {
      if (e.target.value === "Other") {
        this.setState({ displayOther: "block" });
        var visaType = document.getElementById("txtOther").value;
        this.setState({ visa_type: visaType });
      } else {
        this.setState({ displayOther: "none" });
        this.setState({ visa_type: e.target.value });
      }
    } else if (e.target.name === "wwcc_issuing_state") {
      this.setState({ wwcc_issuing_state: e.target.value });
    } else if (e.target.name === "issuing_place") {
      this.setState({ issuing_place: e.target.value });
    }
    this.updateLocalStorage(e.target.name, e.target.value);
  }

  handleradioChange(e) {
    const field = e.target.name;
    const value = e.target.title;
    switch (field) {
      case "visa_status":
        this.changeVisaType(e);
        break;
      case "police_check_type":
        this.setState({ police_check_type: value });
        break;
      case "rbAUSCityzen":
        $("#rbVisaHolder").prop('checked', false);
        $("#visaArea").hide();
        break;
      default:
        break;
    }
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  // Updates local storage object when any control updates its state
  updateLocalStorage(field, value) {
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state[field] = value;
    this.setState({ user: this.state.user });

    this.updateLocalStorage(field, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    var isFormValid = this.isFileUploaded();
    console.log(this.state.visa_status);
    if (this.state.visa_status === "I am a visa holder") {
      if (isFormValid) {
        this.saveData();
      }
    } else if (this.state.visa_status === "I am Australian Citizen") {
      if (isFormValid) {
        this.saveData();
      }
    }
  }

  deleteFile(isDelete, fileName, popupStatus) {
    var field = fileName + "_filename";
    var popUpState = "delete" + fileName + "Popup";
    var buttonID = "btnUpload_" + fileName;
    if (isDelete) {
      notify.show("File deleted successfully");
      this.setState({ [field]: null });
      this.setState({ link_style: "none" });
      document.getElementById(buttonID).disabled = false;
    } else {
    }
    this.setState({ [popUpState]: popupStatus });
  }

  changeVisaType(e) {
    let document_type = "";
    // this.setState({ visa_status: e.target.title });
    if (e.target.title === "I am a visa holder") {
      this.setState({ displayVisaType: "block" });
      document_type = document.getElementById("rbPassport").title;
      this.bindPlaces(Countries, "issuing_place");
    } else {
      this.setState({ displayVisaType: "none" });
      this.setState({ displayOther: "none" });
      this.setState({ visa_type: "" });
      document_type = document.getElementById("rbDrivingLicence").title;

      this.bindPlaces(States, "issuing_place");
    }
    this.setState({ visa_status: e.target.title });
    this.setState({ id_document_type: document_type });
  }

  handleVisaFileChange() {
    var isValidFile = false;
    let visaFile = this.uploadVisa.files[0];

    isValidFile = this.validateFile(visaFile, "visa");
    if (isValidFile) {
      this.saveFile(visaFile, "visa");
    }
  }

  render() {
    console.log("renderer");
    return (
      <div>
        <FixProfileNavbar />
        <div className="auth-right d-lg-flex bg-photoregister">
          <div className="bg-gradient"></div>
          <div className="profile-container profile-container-transparent resume-container-transparent">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">Identification</h1>

                  {/* navigationbar on top */}
                  {/* <div className="userNavigation d-flex justify-content-between">
                    <Link
                      id="lnkIdentificationDoc"
                      to={{ pathname: "/IdentificationDoc" }}
                      className="user-links d-flex "
                    >
                      <p>1 - Identification Document</p>
                    </Link>
                    <Link
                      id="lnkVisa"
                      to={{ pathname: "/Visa" }}
                      className="user-links user-links-active text-right d-flex "
                    >
                      {" "}
                      <p>2 - Visa</p>
                    </Link>
                    <Link
                      id="lnkPoliceCheck"
                      to={{ pathname: "/PoliceCheck" }}
                      className="user-links d-flex "
                    >
                      <p>3 - Police Check</p>
                    </Link>
                    <Link
                      id="lnkWorkingWithChildrenChk"
                      to={{ pathname: "/WorkingWithChildrenChk" }}
                      className="user-links text-right d-flex "
                    >
                      {" "}
                      <p>4 - Working With Children Check</p>
                    </Link>
                  </div> */}

                  {/* content of the form */}

                  <div className="availability-table-container">
                    <div className="availability-table">
                      <Tabs
                        tabs={[
                          {
                            pathname: "/IdentificationDoc",
                            text: "Personal I.D."
                          },
                          {
                            pathname: "/Visa",
                            text: "Visa Details",
                            active: true
                          },
                          {
                            pathname: "/PoliceCheck",
                            text: "Police Check (Opt.)"
                          },
                          {
                            pathname: "/WorkingWithChildrenChk",
                            text: "WWCC (Optional)"
                          }
                        ]}
                      />
                      {/* container of the form */}
                      <div className="availability-table-body mb-0 mt-5">
                        <div className="availability-table-body-content allow-overflow">
                          <form
                            id="frmIdentification"
                            onSubmit={this.handleSubmit}
                          >
                            <div className="container mt-5">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="auth-text-top mb-5">
                                    {/* VISA HOLDER FIELDS */}

                                    <div
                                      id="dvVisaHolder"
                                      style={{
                                        display: this.state.displayVisaType
                                      }}
                                      disabled={
                                        this.state.displayVisaType === "none"
                                          ? true
                                          : false
                                      }
                                    >
                                      {/* <h2 className="mb-3 visa-margin-line">Visa</h2> */}

                                    {/* -----radio----- */}
                                    <div className="boxed-radio-buttons">
                                      <div className="vertical-radio-button-margin">
                                   
                                  <label class="radio_border">  
                                  <div className="wrap">                                                               
                                  <input type="radio"                                  
                                   id="rbAUSCityzen"
                                   name="visa_status"
                                   onChange={
                                     this.handleradioChange
                                   }
                                   checked={
                                     this.state.visa_status ===
                                     "I am Australian Citizen"
                                   }
                                   
                                   title="I am Australian Citizen"
                                   required
                                   disabled
                                   />
                                  I am a Citizen of Australia or New Zealand                                   
                                  <span class="checkmark"></span>  
                                  </div>                                                           
                                 </label>
                                
                                 <label class="radio_border"> 
                                 <div className="wrap">                                    
                                  <input type="radio"                                   
                                   id="rbVisaHolder"
                                   name="visa_status"
                                   onChange={
                                     this.handleradioChange
                                   }
                                   checked={
                                     this.state.visa_status ===
                                     "I am a visa holder"
                                   }
                                   title="I am a visa holder"
                                   required
                                    disabled
                                   />
                                  I am a Visa Holder                                  
                                  <span class="checkmark"></span>  
                                  </div>                               
                                 </label>
                                  
                                 </div>                          
                                  </div>  
                                      {/* <div className="input-radio-buttons justify-content-start">
                                        <div className="row row-input-identification">
                                         
                                          <div id="r8-balloon-radio-group-wrapper-identification-1">
                                            <ul>
                                              <li>
                                                <input
                                                  className="radio r8-radio-float"
                                                  type="radio"
                                                  id="rbAUSCityzen"
                                                  name="visa_status"
                                                  onChange={
                                                    this.handleradioChange
                                                  }
                                                  checked={
                                                    this.state.visa_status ===
                                                    "I am Australian Citizen"
                                                  }
                                                  
                                                  title="I am Australian Citizen"
                                                  required
                                                  disabled
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label col-8">
                                          I am a Citizen of Australia or New Zealand
                                          </label>
                                        </div>
                                        <div className="row row-input-identification">
                                         
                                          <div id="r8-balloon-radio-group-wrapper-identification-2">
                                            <ul>
                                              <li>
                                                <input
                                                  className="radio r8-radio-float"
                                                  type="radio"
                                                  id="rbVisaHolder"
                                                  name="visa_status"
                                                  onChange={
                                                    this.handleradioChange
                                                  }
                                                  checked={
                                                    this.state.visa_status ===
                                                    "I am a visa holder"
                                                  }
                                                  title="I am a visa holder"
                                                  required
                                                  disabled
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label-2 col-8">
                                          I am a Visa Holder
                                          </label>
                                        </div>
                                      </div> */}

                                      {/* ------------ */}


                                      {/* Visa Application Number */}
                                      <div id="visaArea">

                                      <div className="form-group mb-3">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Visa Application Number
                                          </p>
                                        </label>
                                        <div className="input-icon">
                                          {/* <i className="mdi mdi-file-document"></i> */}
                                          <input
                                            type="text"
                                            className="form-control user-profile-form-input"
                                            id="visa_application_number"
                                            name="visa_application_number"
                                            onChange={this.setUserState}
                                            value={
                                              this.state.visa_application_number
                                            }
                                            required={
                                              this.state.displayVisaType ===
                                                "block"
                                                ? true
                                                : false
                                            }
                                            placeholder="Visa Grant Number"
                                          />
                                        </div>
                                      </div>

                                      {/* type of visa */}
                                      <div className="form-group mb-3">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Type of Visa
                                          </p>
                                        </label>
                                        <div className="pl-0 dropdown-box br-4">
                                          <select
                                            className="form-control"
                                            id="visa_type"
                                            name="visa_type"
                                            value={
                                              this.state.visa_type !== null
                                                ? this.state.visa_type
                                                : ""
                                            }
                                            onChange={this.handleddlChange}
                                            required={
                                              this.state.displayVisaType ===
                                                "block"
                                                ? true
                                                : false
                                            }
                                          >
                                            <option disabled value="">
                                              Please Select
                                            </option>
                                            <option>
                                              Family and Partner Visas
                                            </option>
                                            <option>
                                              Carer visa (subclass 836)
                                            </option>
                                            <option>
                                              Carer visa (subclass 116)
                                            </option>
                                            <option>
                                              New Zealand Citizen Family
                                              Relationship (temporary) visa
                                              (subclass 461)
                                            </option>
                                            <option>
                                              Parent visa (subclass 103)
                                            </option>
                                            <option>
                                              Partner (Provisional and Migrant)
                                              visa (subclass 309 100)
                                            </option>
                                            <option>
                                              Partner visa (subclass 820 801)
                                            </option>
                                            <option>
                                              Prospective Marriage visa
                                              (subclass 300)
                                            </option>
                                            <option>
                                              Remaining Relative visa (subclass
                                              115)
                                            </option>
                                            <option>
                                              Remaining Relative visa (subclass
                                              835)
                                            </option>
                                            <option>
                                              Sponsored Parent (Temporary) visa
                                              (subclass 870)
                                            </option>
                                            <option disabled value="">
                                              Visitor Visas
                                            </option>
                                            <option>
                                              Work and Holiday visa (subclass
                                              462)
                                            </option>
                                            <option>
                                              Working Holiday visa (subclass
                                              417)
                                            </option>
                                            <option disabled value="">
                                              Studying and Training Visas
                                            </option>
                                            <option>
                                              Student visa (subclass 500)
                                            </option>
                                            <option>
                                              Student Guardian visa (subclass
                                              590)
                                            </option>
                                            <option>
                                              Training visa (subclass 407)
                                            </option>
                                            <option disabled value="">
                                              Working and Skilled Visas
                                            </option>
                                            <option>
                                              Permanent Residence (Skilled
                                              Regional) visa (subclass 191)
                                            </option>
                                            <option>
                                              Regional Sponsored Migration
                                              Scheme (subclass 187)
                                            </option>
                                            <option>
                                              Skilled Employer Sponsored
                                              Regional (provisional) visa
                                              (subclass 494)
                                            </option>
                                            <option>
                                              Skilled Independent visa (subclass
                                              189)
                                            </option>
                                            <option>
                                              Skilled Nominated visa (subclass
                                              190)
                                            </option>
                                            <option>
                                              Skilled-Recognised Graduate visa
                                              (subclass 476)
                                            </option>
                                            <option>
                                              Skilled Regional (provisional)
                                              visa (subclass 489)
                                            </option>
                                            <option>
                                              Skilled Regional visa (subclass
                                              887)
                                            </option>
                                            <option>
                                              Skilled Work Regional
                                              (Provisional) visa (subclass 491)
                                            </option>
                                            <option>
                                              Temporary Activity visa (subclass
                                              408)
                                            </option>
                                            <option>
                                              Temporary Graduate visa (subclass
                                              485)
                                            </option>
                                            <option>
                                              Temporary Work (Short Stay
                                              Specialist) visa (subclass 400)
                                            </option>
                                            <option>
                                              Temporary Skill Shortage visa
                                              (subclass 482)
                                            </option>
                                            <option value="Other">
                                              {" "}
                                              Other Visa
                                            </option>
                                          </select>
                                        </div>
                                      </div>

                                      {/* other visa specify */}
                                      <div
                                        className="form-group mb-3"
                                        id="txtOther"
                                        style={{
                                          display: this.state.displayOther
                                        }}
                                        disabled={
                                          this.state.displayOther === "none"
                                            ? true
                                            : false
                                        }
                                      >
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Please, specify the visa
                                          </p>
                                        </label>
                                        <div className="input-icon">
                                          <i className="mdi mdi-file-document"></i>
                                          <input
                                            value={
                                              this.state.visa_type !== null
                                                ? this.state.visa_type
                                                : ""
                                            }
                                            type="text"
                                            id="visa_type"
                                            name="visa_type"
                                            className="form-control user-profile-form-input"
                                            onChange={this.setUserState}
                                            required={
                                              this.state.displayOther ===
                                                "block"
                                                ? true
                                                : false
                                            }
                                            placeholder="Specify your visa"
                                          />
                                        </div>
                                      </div>

                                      <div
                                        id="dvVisaHolder"
                                        style={{
                                          display: this.state.displayVisaType
                                        }}
                                        disabled={
                                          this.state.displayVisaType === "none"
                                            ? true
                                            : false
                                        }
                                      >
                                        {/* Issuing Office */}
                                        <div className="form-group mb-3">
                                          <label className="w-100">
                                            <p className="float-left mb-0">
                                              Issuing Country
                                            </p>
                                          </label>
                                          <div className="input-icon">
                                            {/* <i className="mdi mdi-web"></i> */}
                                            <select
                                              className="form-control user-profile-form-input"
                                              id="issuing_office"
                                              name="issuing_office"
                                              onChange={this.setUserState}
                                              value={this.state.issuing_office}
                                              required={
                                                this.state.displayVisaType ===
                                                  "block"
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {/* <option>Australia</option>
                                              <option>New Zealand</option> */}
                                            </select>
                                          </div>
                                        </div>

                                        {/* visa expiry date */}
                                        {this.state.displayVisaType ===
                                          "none" ? null : (
                                            <div className="form-group mb-3 float-left">
                                              <label className="w-100">
                                                <p className="float-left">
                                                  Visa Expiry Date
                                              </p>
                                              </label>
                                              <div className="input-icon">
                                                {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                                <DatePicker
                                                  className="react-datepicker-wrapper form-control"
                                                  id="visa_expiry"
                                                  selected={
                                                    this.state.visa_expiry
                                                  }
                                                  placeholderText={new Date()
                                                    .toLocaleDateString()
                                                    .split(/\//)
                                                    .join("-")}
                                                  showYearDropdown
                                                  showMonthDropdown
                                                  isClearable
                                                  showPopperArrow={false}
                                                  minDate={addDays(new Date(), 0)}
                                                  dropdownMode="select"
                                                  dateFormatCalendar="MMMM"
                                                  dateFormat="dd-MM-yyyy"
                                                  yearDropdownItemNumber={10}
                                                  scrollableYearDropdown
                                                  value={this.state.visa_expiry}
                                                  onChange={
                                                    this
                                                      .handleVisaExpiryDateChange
                                                  }
                                                  required
                                                ></DatePicker>
                                              </div>
                                            </div>
                                          )}
                                      </div>

                                      {/* visa upload */}
                                      <div className="form-group mb-5">
                                        <label className="w-100">
                                          <p className="float-left mb-0">
                                            Upload Visa
                                          </p>
                                          {this.state
                                            .visa_verification_status ? (
                                              <div className="span-hovered">
                                                <i className="mdi mdi-checkbox-marked-circle float-left pl-2 check-green"></i>
                                                <span className="span-hovered-content">
                                                  This document has been verified!
                                              </span>
                                              </div>
                                            ) : (
                                              <div className="span-hovered">
                                                <i className="mdi mdi-checkbox-marked-circle float-left pl-2 check-gray"></i>
                                                <span className="span-hovered-content">
                                                  This document has not been
                                                  verified yet!
                                              </span>
                                              </div>
                                            )}
                                        </label>
                                        <div className="input-icon d-flex justify-content-between ">
                                          {/* <i className="mdi mdi-upload"></i> */}

                                          <input
                                            type="txt"
                                            className="form-control"
                                            id="flVisa"
                                            name="userVisaDoc"
                                            disabled
                                            placeholder={
                                              this.state.visa_filename
                                                ? this.state.visa_filename
                                                : "Attach a copy of your visa in PDF format"
                                            }
                                          />
                                          <input
                                            type="file"
                                            id="visa"
                                            name="visa"
                                            onChange={() =>
                                              this.handleVisaFileChange()
                                            }
                                            ref={ref => {
                                              this.uploadVisa = ref;
                                            }}
                                            style={{ display: "none" }}
                                            accept=".pdf"
                                          />
                                          <button
                                            id="btnUpload_visa"
                                            type="button"
                                            className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                            onClick={() =>
                                              this.uploadDocument("visa")
                                            }
                                          >
                                            Upload
                                          </button>
                                        </div>

                                        <div className="row">
                                          {this.state.visa_filename ? (
                                            <div className="text-left d-flex ml-3">
                                              <Link
                                                to={{
                                                  pathname: this.state.visa_url
                                                }}
                                                target="_blank"
                                              >
                                                <p className="uploaded-file-name mt-1 ml-1">
                                                  {this.state.visa_filename}
                                                </p>
                                              </Link>
                                              <i
                                                className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                                onClick={() =>
                                                  this.setState({
                                                    deletevisaPopup: true
                                                  })
                                                }
                                              ></i>
                                              {this.state.deletevisaPopup && (
                                                <DeletePopup
                                                  togglePopup={isDelete =>
                                                    this.deleteFile(
                                                      isDelete,
                                                      "visa",
                                                      false
                                                    )
                                                  }
                                                />
                                              )}
                                            </div>
                                          ) : (
                                              ""
                                            )}
                                        </div>
                                      </div>
                                      </div>

                                      {/* submit & back buttons */}
                                      <div className="row pl-0 pr-0 mr-0 mb-5 mt-3">
                                        {/* <div className="col-lg-6 col-md-12 pr-0">
                                          <Link
                                            type="back"
                                            value="Back"
                                            to="/IdentificationDoc"
                                            className="btn btn-block btn-c secondary-button-no-margin-hover"
                                          >
                                            Back
                                          </Link>
                                        </div> */}
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
                                  </div>
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
        <div className="mobile-size-menu">
          <MobileNavBar></MobileNavBar>
        </div>
      </div>
    );
  }
}
export default Visa;
