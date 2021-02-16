import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PORT } from "../../config";
import { notify } from "react-notify-toast";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";

import originalMoment from "moment";
import { extendMoment } from "moment-range";
import DeletePopup from "../User/ConfirmationBox";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../User/UserProfile.css";


const moment = extendMoment(originalMoment);

const today = moment();
const URL = PORT;

const date = new Date().getDate();
const formattedDate = ("0" + date).slice(-2);
const month = new Date().getMonth() + 1;
const formattedMonth = ("0" + month).slice(-2);
const year = new Date().getFullYear();
const minPoliceCheckYear = new Date().getFullYear() - 5;

const todayDate = year + "-" + formattedMonth + "-" + formattedDate;
const minPoliceCheckDate = minPoliceCheckYear + "-" + formattedMonth + "-" + formattedDate;
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

let Countries = ["Australia", "USA", "India", "Pakistan", "UK", "Africa"];
const States = ["Victoria", "Tasmania", "Queensland", "New South Wales"];

export class Identification extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    if (user === null) {
      window.location = "/login";
    }
    const id_document_expiry =
      user.id_document_expiry !== null && user.id_document_expiry !== undefined
        ? new Date(user.id_document_expiry.split("T")[0])
        : "";
    const visa_expiry =
      user.visa_expiry !== null && user.visa_expiry !== undefined
        ? new Date(user.visa_expiry.split("T")[0])
        : "";
    const police_check_release =
      user.police_check_release !== null &&
      user.police_check_release !== undefined
        ? new Date(user.police_check_release.split("T")[0])
        : "";
    const wwcc_expiry =
      user.wwcc_expiry !== null && user.wwcc_expiry !== undefined
        ? new Date(user.wwcc_expiry.split("T")[0])
        : "";
    this.state = {
      user: user,
      identification_document_number: user.identification_document_number, // Passport/ Driving Licence number
      id_document_type: user.id_document_type,
      id_document_expiry: id_document_expiry,
      passport_country: user.passport_country,
      identification_url: user.identification_url,
      identification_filename: user.identification_filename,
      visa_url: user.visa_url,
      visa_filename: user.visa_filename,
      visa_duration:user.visa_duration,
      issuing_place: user.issuing_place,
      subclass_name: user.subclass_name,
      subclass_number: user.subclass_number,
      issuing_office: user.issuing_office,
      police_check_filename: user.police_check_filename,
      police_check_url: user.police_check_url,
      police_check_release: police_check_release,
      police_check_result: user.police_check_result,
      police_check_type:user.police_check_type,
      wwcc_filename: user.wwcc_filename,
      wwcc_issuing_state: user.wwcc_issuing_state,
      wwcc_url: user.wwcc_url,
      wwcc_expiry: wwcc_expiry,
      wwcc_number: user.wwcc_number,
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
      displayVisaType:
        user.visa_status !== null &&
        user.visa_status !== undefined &&
        user.visa_status === "I am Australian Citizen"
          ? "none"
          : "block",
      displayOther: "none",
      link_style: user.identification_filename === null ? "none" : "block",
      visa_linkstyle: user.visa_filename === null ? "none" : "block",
      policecheck_linkstyle:
        user.police_check_filename === null ? "none" : "block",
      wwcc_linkstyle: user.wwcc_filename === null ? "none" : "block",
      deleteidentificationPopup:false,
      deletevisaPopup:false,
      deletepolice_checkPopup:false,
      deletewwccPopup:false,
      wwcc_status: user.wwcc_verification_status,
      police_check_status: user.police_check_verification_status,
      visa_verification_status: user.visa_verification_status,
      police_check_issuing_organisation:user.police_check_issuing_organisation
    };

    this.handleddlChange = this.handleddlChange.bind(this);
    this.handleradioChange = this.handleradioChange.bind(this);
    this.setUserState = this.setUserState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handlefileChange = this.handlefileChange.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.toggleFileUpload = this.toggleFileUpload.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.changeVisaType = this.changeVisaType.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.bindPlaces = this.bindPlaces.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
    this.handleIdentificationFileChange = this.handleIdentificationFileChange.bind(this);
    this.handlePoliceCheckFileChange = this.handlePoliceCheckFileChange.bind(this);
    this.handleVisaFileChange = this.handleVisaFileChange.bind(this);
    this.handleWWCCFileChange = this.handleWWCCFileChange.bind(this);
    this.isFileUploaded = this.isFileUploaded.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleVisaExpiryDateChange = this.handleVisaExpiryDateChange.bind(this);
    this.handleWWCCExpiryDateChange = this.handleWWCCExpiryDateChange.bind(this);
    this.handlePoliceReleaseDateChange = this.handlePoliceReleaseDateChange.bind(this);
  }

  uploadDocument(id){
    document.getElementById(id).click();
  }

  
  componentDidMount() {
    //get a complete list of countries
    axios.get(`${URL}/countries`)
    .then((res) =>{
      Countries = res.data
    })
    this.toggleFileUpload(); // Disables file upload
     // Bind data on page load
    this.bindPlaces(States, "wwcc_issuing_state");
    let place = this.state.visa_status === "I am Australian Citizen"? States: Countries;
    this.bindPlaces(place, "issuing_place");
  
    if(this.state.issuing_place !== null && this.state.issuing_place !== undefined){
      document.getElementById("issuing_place").value = this.state.issuing_place; 
    }
    if(this.state.wwcc_issuing_state !== null && this.state.wwcc_issuing_state !== undefined){
      document.getElementById("wwcc_issuing_state").value = this.state.wwcc_issuing_state;
    }
    if(this.state.id_document_type === null || this.state.id_document_type === undefined){
      this.setState({id_document_type: "Identification Document"})
    }
  }

  //  Validation for file: Checks if file is uploaded, else returns false
  validateFile(file, filename) {
    let isValid = false;
    if(file !== null && file !== undefined)
     {
      isValid = true;
    }
    return isValid;
  }

  handleDateChange = date => {
    this.setState({ id_document_expiry: date });
    this.updateLocalStorage("id_document_expiry", date);
  };
  handleVisaExpiryDateChange = date => {
    this.setState({ visa_expiry: date });
    this.updateLocalStorage("visa_expiry", date);
  };
  handlePoliceReleaseDateChange = date => {
    this.setState({ police_check_release: date });
    this.updateLocalStorage("police_check_release", date);
  };
  handleWWCCExpiryDateChange = date => {
    this.setState({ wwcc_expiry: date });
    this.updateLocalStorage("wwcc_expiry", date);
  };

  toggleFileUpload() {
    if (
      this.state.identification_filename !== null &&
      this.state.identification_filename !== undefined
    ) {
      document.getElementById("btnUpload_identification").disabled = true;
    } else {
      document.getElementById("btnUpload_identification").disabled = false;
    }
    if (
      this.state.visa_filename !== null &&
      this.state.visa_filename !== undefined
    ) {
      document.getElementById("btnUpload_visa").disabled = true;
    } else {
      document.getElementById("btnUpload_visa").disabled = false;
    }
    if (
      this.state.police_check_filename !== null &&
      this.state.police_check_filename !== undefined
    ) {
      document.getElementById("btnUpload_police_check").disabled = true;
    } else {
      document.getElementById("btnUpload_police_check").disabled = false;
    }
    if (
      this.state.wwcc_filename !== null &&
      this.state.wwcc_filename !== undefined
    ) {
      document.getElementById("btnUpload_wwcc").disabled = true;
    } else {
      document.getElementById("btnUpload_wwcc").disabled = false;
    }
  }

  isFileUploaded(){
    var isValid = true;
    if(this.state.identification_filename === null){
      notify.show("Please provide Identification document");
      isValid = false;
    }
    else if(this.state.visa_status !== "I am Australian Citizen" && this.state.visa_filename === null){
      notify.show("Please provide Visa document");
      isValid = false;
    } 
   else if(this.state.wwcc_filename === null){
      notify.show("Please provide WWCC document");
      isValid = false;
    }
   else if(this.state.police_check_filename === null){
      notify.show("Please provide Police Check document");
      isValid = false;
    }
    return isValid;
  }

  saveData() {
   // let visa_expiry = document.getElementById("visa_expiry")!== null ? document.getElementById("visa_expiry").value : this.state.visa_expiry;
   // let police_check_release = document.getElementById("police_check_release").value;
   // let wwcc_expiry = document.getElementById("wwcc_expiry").value;
   // let id_document_expiry = document.getElementById("id_document_expiry").value;
   
    axios
      .put(`${URL}/updateIdentificationDetails`, {
        id_document_type: this.state.id_document_type,
        id_document_expiry: this.state.id_document_expiry,
        identification_document_number: this.state
          .identification_document_number,
        passport_country: this.state.passport_country,
        visa_status: this.state.visa_status,
        visa_type: this.state.visa_type,
        visa_expiry: this.state.visa_expiry,
        email: this.state.email,
        identification_url: this.state.identification_url,
        identification_filename: this.state.identification_filename,
        visa_filename: this.state.visa_filename,
        visa_url: this.state.visa_url,
        visa_application_number: this.state.visa_application_number,
        issuing_place: this.state.issuing_place,
        subclass_name: this.state.subclass_name,
        subclass_number: this.state.subclass_number,
        issuing_office: this.state.issuing_office,
        police_check_result: this.state.police_check_result,
        police_check_filename: this.state.police_check_filename,
        police_check_url: this.state.police_check_url,
        police_check_release: this.state.police_check_release,
        police_check_type: this.state.police_check_type,
        wwcc_filename: this.state.wwcc_filename,
        wwcc_issuing_state: this.state.wwcc_issuing_state,
        wwcc_url: this.state.wwcc_url,
        wwcc_expiry: this.state.wwcc_expiry,
        wwcc_number: this.state.wwcc_number,
        police_check_issuing_organisation:this.state.police_check_issuing_organisation
      })
      .then(res => {
        console.log(res);
        notify.show("Identification details saved successfully");
         document.getElementById("lnkEmergencyContact").click(); // Redirects to EmergencyContact Page
      })
      .catch(err => {
        console.error();
        notify.show("error", "error");
      });
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
        this.updateLocalStorage(stateFileName, file.name );
        this.updateLocalStorage(stateFileUrl, url );
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
        notify.show(JSON.stringify(error),"error");
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    var isFormValid = this.isFileUploaded();
    if (this.state.visa_status === "I am a visa holder"){
      if(isFormValid){
        this.saveData();
      }
    }
    else if(this.state.visa_status === "I am Australian Citizen"){
      if(isFormValid){
        this.saveData();
      }
    }
  }

  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state[field] = value;
    this.setState({ user: this.state.user });

    this.updateLocalStorage(field, value);
  }

  // Updates local storage object when any control updates its state
  updateLocalStorage(field, value) {
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
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
    }else if (e.target.name === "wwcc_issuing_state"){
      this.setState({ wwcc_issuing_state: e.target.value });
    }
    else if(e.target.name === "issuing_place"){
      this.setState({ issuing_place: e.target.value });

    }
    this.updateLocalStorage(e.target.name, e.target.value);
  }
  
  // handlefileChange(e) {
  //   debugger;
  //   var isValidFile = false;
  //   let idFile = this.uploadInput.files[0];
  //   let visaFile = this.uploadVisa.files[0];
  //   let policecheckFile = this.uploadPoliceCheck.files[0];
  //   let wwccFile = this.uploadWWCC.files[0];

  //   isValidFile = this.validateFile(idFile, "identification");
  //   if (isValidFile) {
  //     this.saveFile(idFile, 'identification');
  //   } 

  //   isValidFile = this.validateFile(policecheckFile, "police_check");
  //   if (isValidFile) {
  //     this.saveFile(policecheckFile, 'police_check');
  //   } 

  //   isValidFile = this.validateFile(wwccFile, "wwcc");
  //   if (isValidFile) {
  //     this.saveFile(wwccFile, 'wwcc');
  //   } 

  //   isValidFile = this.validateFile(visaFile, "visa");
  //   if (isValidFile) {
  //     this.saveFile(visaFile, 'visa');
  //   }
  // }
  

  handleIdentificationFileChange(){
    var isValidFile = false;
    let idFile = this.uploadInput.files[0];
    
    isValidFile = this.validateFile(idFile, "identification");
    if (isValidFile) {
      this.saveFile(idFile, 'identification');
    } 
  }

  handleVisaFileChange(){
    var isValidFile = false;
    let visaFile = this.uploadVisa.files[0];
    
    isValidFile = this.validateFile(visaFile, "visa");
    if (isValidFile) {
      this.saveFile(visaFile, 'visa');
    }
  }

  handlePoliceCheckFileChange(){
    var isValidFile = false;
    let policecheckFile = this.uploadPoliceCheck.files[0];
    
    isValidFile = this.validateFile(policecheckFile, "police_check");
    if (isValidFile) {
      this.saveFile(policecheckFile, 'police_check');
    } 
  }

  handleWWCCFileChange(){
    var isValidFile = false;
    let wwccFile = this.uploadWWCC.files[0];
    isValidFile = this.validateFile(wwccFile, "wwcc");
      if (isValidFile) {
        this.saveFile(wwccFile, 'wwcc');
      }  
  }

  deleteFile(isDelete, fileName, popupStatus) {
    var field = fileName +"_filename";
    var popUpState = "delete"+ fileName+ "Popup";
    var buttonID = "btnUpload_" + fileName;
    if(isDelete){
      notify.show("File deleted successfully");
      this.setState({ [field]: null });
      this.setState({ link_style: "none" });
      document.getElementById(buttonID).disabled = false;
    }else{
    }
    this.setState({[popUpState]: popupStatus});
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
      default:
        break;
    }
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
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
    this.setState({visa_status : e.target.title});
    this.setState({ id_document_type: document_type });
  }

  bindPlaces(places, id) {
    var selectElem = document.getElementById(id);
    selectElem.innerHTML = "";
    var e = document.createElement("option")
    e.innerText = "Please Select";
    e.disabled = true
    selectElem.append(e);
    let place_sort =[];
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

  render() {
    console.log("rerender")
    return (
      <div>
        <FixProfileNavbar />
        <div className="auth-right d-lg-flex bg-photoregister">
          <div className='bg-gradient'></div>
          <div className="profile-container">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">Personal Information</h1>

                  {/* navigationbar on top */}
                  <div className="userNavigation d-flex justify-content-between">
                    <Link
                      id="lnkPersonalDetails"
                      to={{ pathname: "/PersonalDetails" }}
                      className="user-links d-flex "
                    ><p>1 - Personal Details</p>
                    </Link>
                    <Link
                      id="lnkIdentification"
                      to={{ pathname: "/IdentificationDoc" }}
                      className="user-links user-links-active text-center d-flex "
                    ><p>2 - Identification</p>
                    </Link>
                    <Link
                      id="lnkEmergencyContact"
                      to={{ pathname: "/EmergencyContact"}}
                      className="user-links text-right d-flex "
                    > <p>3 - Emergency Contact</p>
                    </Link>
                  </div>

                  {/* content of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">

                      {/* container of the form */}
                      <div className="availability-table-body mb-0 mt-5">
                          <div className="availability-table-body-content">
                          <form id="frmIdentification" onSubmit={this.handleSubmit}>
                            <div className="container  mt-5">
                              <div className="row">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                                <div className="col-lg-6 col-md-12">
                                  <div className="auth-text-top mb-5">


                                    <h2>Identification Document</h2>
                                    {/* residential status radio button */}
                                    <div className="radio-button-margin">
                                      <label className="w-100 mb-0"><p className="float-left mb-0">Residential Status</p></label>
                                      <div className="input-radio-buttons justify-content-start">
                                        <div className="row row-input-identification">
{/*                                          <input
                                            type="radio"
                                            id="rbAUSCityzen"
                                            name="visa_status"
                                            onChange={this.handleradioChange}
                                            checked={this.state.visa_status ==="I am Australian Citizen"}
                                            title="I am Australian Citizen"
                                            required
                                          />*/}
                                          {/* change the Radio Style*/}
                                          <div id="r8-balloon-radio-group-wrapper-identification-1">
                                            <ul>
                                              <li>
                                                <input className="radio r8-radio-float"
                                                       type="radio"
                                                       id="rbAUSCityzen"
                                                       name="visa_status"
                                                       onChange={this.handleradioChange}
                                                       checked={this.state.visa_status ==="I am Australian Citizen"}
                                                       title="I am Australian Citizen"
                                                       required
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className='balloon-radio-idenntification-label col-8'>I am Australian Citizen (Driving Licence)</label>
                                        </div>
                                        <div className="row row-input-identification">
{/*                                          <input
                                            type="radio"
                                            id="rbVisaHolder"
                                            name="visa_status"
                                            onChange={this.handleradioChange}
                                            checked={this.state.visa_status === "I am a visa holder"}
                                            title="I am a visa holder"
                                            required
                                          />*/}
                                          <div id="r8-balloon-radio-group-wrapper-identification-2">
                                            <ul>
                                              <li>
                                                <input className="radio r8-radio-float"
                                                       type="radio"
                                                       id="rbVisaHolder"
                                                       name="visa_status"
                                                       onChange={this.handleradioChange}
                                                       checked={this.state.visa_status === "I am a visa holder" }
                                                       title="I am a visa holder"
                                                       required
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label-2 col-8">I am a visa holder (Passport)</label>
                                        </div>
                                      </div>
                                    </div>
                                    {/* document number */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">{this.state.id_document_type} Number</p></label>
                                      <div className="input-icon">
                                        {this.state.id_document_type === "Passport" ?  <i className="mdi mdi-passport"></i> : <i className="mdi mdi-account-card-details"></i>}
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="identification_document_number"
                                          name="identification_document_number"
                                          onChange={this.setUserState}
                                          value={this.state.identification_document_number}
                                          maxLength="10"
                                          required  
                                          placeholder='Insert the ID Number'                                  
                                        />
                                      </div>
                                    </div>

                                    {/* document issuing place */}
                                    {/* TODO: Chane select control to searchable dropdown */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">{this.state.visa_status === "I am a visa holder" ? "Issuing Country"  : "Issuing Australian State"}</p></label>
                                      <div className="pl-1 dropdown-box br-4">
                                        <select
                                          className="form-control"
                                          id="issuing_place"
                                          name="issuing_place"
                                          value={this.state.issuing_place}
                                          onChange={this.handleddlChange}
                                          required
                                        >
                                          {/* <option>Please Select the Country</option> */}
                                        </select>
                                      </div>
                                    </div>

                                    {/* expiry date */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">{this.state.id_document_type} Expiry Date</p></label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                        <DatePicker 
                                          className="react-datepicker-wrapper form-control"
                                          id="id_document_expiry"                                          
                                          selected={this.state.id_document_expiry}
                                          placeholderText={new Date().toLocaleDateString().split(/\//).join("-")}
                                          showYearDropdown
                                          showMonthDropdown
                                          isClearable                                          
                                          showPopperArrow={false}
                                          minDate = {addDays(new Date(), 0)}
                                          dropdownMode="select"
                                          dateFormatCalendar="MMMM"
                                          dateFormat="dd-MM-yyyy"
                                          yearDropdownItemNumber={10}
                                          scrollableYearDropdown     
                                          value={this.state.id_document_expiry}
                                          onChange={this.handleDateChange}  
                                          required                                                                        
                                        ></DatePicker>
                                       
                                      </div>
                                    </div>

                                    {/* document upload */}
                                    <div className="form-group mb-5">
                                      <label className="w-100"><p className="float-left mb-0">Upload {this.state.id_document_type}</p></label>
                                      <div className="input-icon d-flex justify-content-between ">
                                        <i className="mdi mdi-upload"></i>
                                        <input
                                            type="txt"
                                            className="form-control"
                                            placeholder={this.state.identification_filename ? this.state.identification_filename:'Attach a copy of your ID'}
                                            disabled
                                          />
                                          <input type="file"
                                            id="identification"
                                            name="identification"
                                            onChange={()=>this.handleIdentificationFileChange()}
                                            ref={ref => {this.uploadInput = ref;}}
                                            style={{display:"none"}} 
                                            accept="image/*, .pdf"/>
                                          <button
                                            id="btnUpload_identification"
                                            type="button"
                                            required
                                            className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                            onClick={()=> this.uploadDocument("identification")}>

                                            Upload
                                          </button> 
                                      </div>

                                      <div className="row">
                                 
                                      {this.state.identification_filename ? 
                                      <div className="text-left d-flex ml-3" >
                                        <Link
                                          to={{ pathname: this.state.identification_url }}
                                          target="_blank"
                                        >
                                          <p className="uploaded-file-name mt-1 ml-1">{this.state.identification_filename}</p>
                                        </Link> 
                                        <i
                                          className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                          onClick={()=>this.setState({deleteidentificationPopup:true})}
                                        ></i>
                                      {this.state.deleteidentificationPopup && <DeletePopup togglePopup={(isDelete)=>this.deleteFile(isDelete, 'identification', false)}/>}
                                      </div>:""}
                                    </div>
                                    </div>

                                    {/* VISA HOLDER FIELDS */}
                                    <div
                                      id="dvVisaHolder"
                                      style={{display: this.state.displayVisaType}}
                                      disabled={this.state.displayVisaType === "none" ? true  : false}
                                    >

                                        <h2 className="mb-3 visa-margin-line">Visa</h2>


                                        {/* Visa Application Number */}
                                        
                                        <div className="form-group mb-3">
                                          <label className="w-100"><p className="float-left mb-0">Visa Application Number</p></label>
                                          <div className="input-icon">
                                            <i className="mdi mdi-file-document"></i>
                                            <input
                                              type="text"
                                              className="form-control user-profile-form-input"
                                              id="visa_application_number"
                                              name="visa_application_number"
                                              onChange={this.setUserState}
                                              value={this.state.visa_application_number}
                                              required={ this.state.displayVisaType === "block"  ? true : false }  
                                              placeholder='Visa Grant Number'
                                            />
                                          </div>
                                        </div>

                                        {/* type of visa */}
                                        <div className="form-group mb-3">
                                          <label className="w-100"><p className="float-left mb-0">Type of Visa</p></label>
                                          <div className="pl-1 dropdown-box br-4">
                                            <select
                                              className="form-control"
                                              id="visa_type"
                                              name="visa_type"
                                              value={this.state.visa_type !== null? this.state.visa_type:""}
                                              onChange={this.handleddlChange}
                                              required={this.state.displayVisaType === "block"  ? true  : false }
                                            >
                                              <option disabled value="">Please Select</option>
                                              <option disabled value="">Family and Partner Visas</option>
                                              <option>Carer visa (subclass 836)</option>
                                              <option>Carer visa (subclass 116)</option>
                                              <option>New Zealand Citizen Family Relationship (temporary) visa (subclass 461)</option>
                                              <option>Parent visa (subclass 103)</option>
                                              <option>Partner (Provisional and Migrant) visa (subclass 309 100)</option>
                                              <option>Partner visa (subclass 820 801)</option>
                                              <option>Prospective Marriage visa (subclass 300)</option>
                                              <option>Remaining Relative visa (subclass 115)</option>
                                              <option>Remaining Relative visa (subclass 835)</option>
                                              <option>Sponsored Parent (Temporary) visa (subclass 870)</option>
                                              <option disabled value="">Visitor Visas</option>
                                              <option>Work and Holiday visa (subclass 462)</option>
                                              <option>Working Holiday visa (subclass 417)</option>
                                              <option disabled value="">Studying and Training Visas</option>
                                              <option>Student visa (subclass 500)</option>
                                              <option>Student Guardian visa (subclass 590)</option>
                                              <option>Training visa (subclass 407)</option>
                                              <option disabled value="">Working and Skilled Visas</option>
                                              <option>Permanent Residence (Skilled Regional) visa (subclass 191)</option>
                                              <option>Regional Sponsored Migration Scheme (subclass 187)</option>
                                              <option>Skilled Employer Sponsored Regional (provisional) visa (subclass 494)</option>
                                              <option>Skilled Independent visa (subclass 189)</option>
                                              <option>Skilled Nominated visa (subclass 190)</option>
                                              <option>Skilled-Recognised Graduate visa (subclass 476)</option>
                                              <option>Skilled Regional (provisional) visa (subclass 489)</option>
                                              <option>Skilled Regional visa (subclass 887)</option>
                                              <option>Skilled Work Regional (Provisional) visa (subclass 491)</option>
                                              <option>Temporary Activity visa (subclass 408)</option>
                                              <option>Temporary Graduate visa (subclass 485)</option>
                                              <option>Temporary Work (Short Stay Specialist) visa (subclass 400)</option>
                                              <option>Temporary Skill Shortage visa (subclass 482)</option>
                                              <option value="Other"> Other Visa</option>
                                            </select>
                                          </div>
                                        </div>

                                        {/* other visa specify */}
                                        <div className="form-group mb-3" id="txtOther" style={{ display: this.state.displayOther  }}
                                        disabled={ this.state.displayOther ===  "none"  ? true  : false }>
                                          <label className="w-100"><p className="float-left mb-0">Please, specify the visa</p></label>
                                          <div className="input-icon">
                                            <i className="mdi mdi-file-document"></i>
                                            <input
                                              value={this.state.visa_type !== null? this.state.visa_type:""}
                                              type="text"
                                              id="visa_type"
                                              name="visa_type"
                                              className="form-control user-profile-form-input"
                                              onChange={this.setUserState}
                                              required={ this.state.displayOther === "block"  ? true : false } 
                                              placeholder='Specify your visa'
                                            />
                                          </div>
                                        </div>

                                        

                                      {/* <div className="row mb-3">
                                         {/* Subclass Name */}
                                        {/* <div className="col-6 form-group mb-1">
                                          <label className="w-100"><p className="float-left mb-0">Subclass Name</p></label>
                                          <div className="">
                                            <input
                                              type="text"
                                              className="form-control user-profile-form-input"
                                              id="subclass_name"
                                              name="subclass_name"
                                              value={this.state.subclass_name}
                                              onChange={this.setUserState}
                                              required={ this.state.displayVisaType === "block"  ? true : false  } 
                                              placeholder='Subclass Name'                                     
                                            />
                                          </div>
                                        </div> */}
                                        {/* Subclass Number */}
                                        {/* <div className="col-6 form-group mb-1">
                                          <label className="w-100"><p className="float-left mb-0">Subclass Number</p></label>
                                          <div className="">
                                            <input
                                              type="text"
                                              className="form-control user-profile-form-input"
                                              id="subclass_number"
                                              name="subclass_number"
                                              onChange={this.setUserState}
                                              value={this.state.subclass_number}
                                              required={ this.state.displayVisaType === "block"  ? true : false } 
                                              placeholder='Subclass Number'                             
                                            />
                                          </div>
                                        </div>
                                      </div>  */}

                                      <div
                                        id="dvVisaHolder"
                                        style={{ display: this.state.displayVisaType  }}
                                        disabled={ this.state.displayVisaType ===  "none"  ? true  : false }
                                      >

                                        {/* Issuing Office */}
                                        <div className="form-group mb-3">
                                          <label className="w-100"><p className="float-left mb-0">Issuing Country</p></label>
                                          <div className="input-icon">
                                            <i className="mdi mdi-web"></i>
                                            <select
                                              className="form-control user-profile-form-input"
                                              id="issuing_office"
                                              name="issuing_office"
                                              onChange={this.setUserState}
                                              value={this.state.issuing_office}
                                              required={ this.state.displayVisaType === "block"  ? true : false }                          
                                            >
                                              <option>Australia</option>
                                              <option>New Zealand</option>
                                            </select>
                                          </div>
                                        </div>

                                        {/* visa expiry date */}
                                        {this.state.displayVisaType ===  "none" ?  null :
                                        <div className="form-group mb-3">
                                          <label className="w-100"><p className="float-left mb-0">Visa Expiry Date</p></label>
                                          <div className="input-icon">
                                            {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                            <DatePicker 
                                              className="react-datepicker-wrapper form-control"
                                              id="visa_expiry"                                         
                                              selected={this.state.visa_expiry}
                                              placeholderText={new Date().toLocaleDateString().split(/\//).join("-")}
                                              showYearDropdown
                                              showMonthDropdown
                                              isClearable                                          
                                              showPopperArrow={false}
                                              minDate = {addDays(new Date(), 0)}
                                              dropdownMode="select"
                                              dateFormatCalendar="MMMM"
                                              dateFormat="dd-MM-yyyy"
                                              yearDropdownItemNumber={10}
                                              scrollableYearDropdown     
                                              value={this.state.visa_expiry}
                                              onChange={this.handleVisaExpiryDateChange}    
                                              required                                                                      
                                            ></DatePicker>
                                          </div>
                                        </div>
                                        }

                                    </div>

                                    {/* visa upload */}
                                    <div className="form-group">
                                      <label className="w-100"><p className="float-left mb-0">Upload Visa</p>
                                      {this.state.visa_verification_status ? 
                                        <div className='span-hovered'>
                                          <i className="mdi mdi-checkbox-marked-circle float-right check-green"></i>
                                          <span className="span-hovered-content">This document has been verified!</span>  
                                        </div>
                                        :
                                        <div className='span-hovered'>                                          
                                          <i className="mdi mdi-checkbox-marked-circle float-right check-gray"></i>
                                          <span className="span-hovered-content">This document has not been verified yet!</span>                                        
                                        </div>
                                        }
                                      </label>
                                      <div className="input-icon d-flex justify-content-between ">
                                        <i className="mdi mdi-upload"></i>
                                       
                                        <input
                                            type="txt"
                                            className="form-control"
                                            id="flVisa"
                                            name="userVisaDoc"
                                            disabled
                                            placeholder={this.state.visa_filename  ? this.state.visa_filename:  'Attache a copy of your Visa'}
                                          />
                                          <input type="file"
                                            id="visa"
                                            name="visa"
                                            onChange={()=>this.handleVisaFileChange()}
                                            ref={ref => {this.uploadVisa = ref;}}
                                            style={{display:"none"}} 
                                            accept="image/*, .pdf"/>
                                          <button
                                          id="btnUpload_visa"
                                            type="button"
                                            className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                            onClick={()=>this.uploadDocument("visa")}>
                                            Upload  
                                          </button> 
                                          
                                      </div>

                                      <div className="row">
                                 
                                        {this.state.visa_filename ? 
                                        <div className="text-left d-flex ml-3" >
                                          <Link
                                            to={{ pathname: this.state.visa_url }}
                                            target="_blank"
                                          >
                                            <p className="uploaded-file-name mt-1 ml-1">{this.state.visa_filename}</p>
                                          </Link> 
                                          <i
                                            className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                            onClick={()=>this.setState({deletevisaPopup:true})}
                                          ></i>
                                        {this.state.deletevisaPopup && <DeletePopup togglePopup={(isDelete)=>this.deleteFile(isDelete, 'visa', false)}/>}
                                        </div>:""}
                                      </div>

                                    </div>
                                    </div>
                                  </div>
                                </div>



                                <div className="col-lg-6 col-md-12">
                                  <div className="auth-text-top mb-5"> 
                                  
                                    <h2>Police Check</h2> 

                                    {/* Police Check Type radio button */}
                                    <div className="radio-button-margin">
                                      <label className="w-100 mb-0"><p className="float-left mb-0">Police Check Type</p></label>
                                      <div className="input-radio-buttons justify-content-start">
                                        <div className="p-0 adaptation-for-radio-button">
{/*                                          <input
                                            type="radio"
                                            id="rbEmployment"
                                            name="police_check_type"
                                            title="Employement/Professional"
                                            onChange={this.handleradioChange}
                                            checked={ this.state.police_check_type ===  "Employement/Professional" }
                                            required
                                          />*/}
                                          <div id="r8-balloon-radio-group-wrapper-identification-3">
                                            <ul>
                                              <li>
                                                <input className="radio r8-radio-float"
                                                  type="radio"
                                                  id="rbEmployment"
                                                  name="police_check_type"
                                                  title="Employement/Professional"
                                                  onChange={this.handleradioChange}
                                                  checked={ this.state.police_check_type ===  "Employement/Professional" }
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className='balloon-radio-professional-label'>Employment/Professional</label>
                                        </div>
                                        <div className="p-0 adaptation-for-radio-button-1">
{/*                                          <input
                                            type="radio"
                                            id="rbVolunteer"
                                            name="police_check_type"
                                            title="Volunteer/Student Placement"
                                            onChange={ this.handleradioChange  }
                                            checked={ this.state.police_check_type ===  "Volunteer/Student Placement" }
                                            required
                                          />*/}
                                          <div id="r8-balloon-radio-group-wrapper-identification-3">
                                            <ul>
                                              <li>
                                                <input className="radio r8-radio-float"
                                                  type="radio"
                                                  id="rbVolunteer"
                                                  name="police_check_type"
                                                  title="Volunteer/Student Placement"
                                                  onChange={ this.handleradioChange  }
                                                  checked={ this.state.police_check_type ===  "Volunteer/Student Placement" }
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className='balloon-radio-volunteer-label'>Volunteer/Student Placement</label>
                                        </div>
                                      </div>
                                    </div>

                                    {/* residential status radio button */}
                                    <div className="radio-button-margin d-none" >
                                      <label className="w-100 mb-0"><p className="float-left mb-0">Identification Document Type</p></label>
                                      <div className="input-radio-buttons row">
                                        <div className="">
                                          <input
                                            type="radio"
                                            id="rbDrivingLicence"
                                            name="id_document_type"
                                            onChange={this.handleradioChange}
                                            checked={this.state.visa_status ==="I am Australian Citizen"}
                                            title="Driving Licence"
                                          />
                                          <label>Driving Licence</label>
                                        </div>
                                        <div className="">
                                          <input
                                            type="radio"
                                            id="rbPassport"
                                            name="id_document_type"
                                            onChange={this.handleradioChange}
                                            checked={this.state.visa_status === "I am a Visa Holder"}
                                            title="Passport"
                                          />
                                          <label>Passport</label>
                                        </div>
                                      </div>
                                    </div>       

                                    {/* Police Check Result */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">Police Check Result</p></label>
                                      <div className="input-icon">
                                        <i className="mdi mdi-fingerprint"></i>
                                        <select
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="police_check_result"
                                          name="police_check_result"
                                          onChange={this.setUserState}
                                          value={this.state.police_check_result}
                                        >
                                          <option disabled selected>Select</option>
                                          <option>Non disclosable outcomes</option>
                                          <option>Disclosable outcomes</option>
                                          </select>
                                      </div>
                                    </div>
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">Police Check Issuing Organisation</p></label>
                                      <div className="input-icon">
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="police_check_issuing_organisation"
                                          name="police_check_issuing_organisation"
                                          onChange={this.setUserState}
                                          value={this.state.police_check_issuing_organisation}
                                          maxLength="120"
                                          placeholder='Insert the police check issuing organisation'                                  
                                        />
                                      </div>
                                    </div>
                                    {/* Police Check Release Date */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">Police Check Release Date</p></label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                        <DatePicker 
                                              className="react-datepicker-wrapper form-control"
                                              id="police_check_release"                                         
                                              selected={this.state.police_check_release}
                                              placeholderText={new Date().toLocaleDateString().split(/\//).join("-")}
                                              showYearDropdown
                                              showMonthDropdown
                                              isClearable                                          
                                              showPopperArrow={false}
                                              maxDate = {addDays(new Date(), 0)}
                                              dropdownMode="select"
                                              dateFormatCalendar="MMMM"
                                              dateFormat="dd-MM-yyyy"
                                              yearDropdownItemNumber={10}
                                              scrollableYearDropdown     
                                              value={this.state.police_check_release}
                                              onChange={this.handlePoliceReleaseDateChange}
                                            ></DatePicker>
                                      </div>
                                    </div>

                                    {/* Upload Police Check */}
                                    <div className="form-group mb-5">
                                      <label className="w-100 lineheight-17">
                                        <p className="float-left mb-0">Upload Police Check</p>
                                        {this.state.police_check_status ? 
                                        <div className='span-hovered'>
                                          <i className="mdi mdi-checkbox-marked-circle float-right check-green"></i>
                                          <span className="span-hovered-content">This document has been verified!</span>  
                                        </div>
                                        :
                                        <div className='span-hovered'>
                                          <i className="mdi mdi-checkbox-marked-circle float-right check-gray"></i>
                                          <span className="span-hovered-content">This document has not been verified yet!</span>                                           
                                        </div>
                                        }
                                      </label>
                                      <div className="input-icon d-flex justify-content-between ">
                                        <i className="mdi mdi-upload"></i>
                                        <input
                                            type="txt"
                                            className="form-control"
                                            id="flPoliceCheck"
                                            name="userPoliceCheck"
                                            disabled
                                            placeholder={this.state.police_check_filename ?  this.state.police_check_filename:'Attach a copy of your Police Check Document'}
                                          />
                                        <input type="file"
                                            id="police_check"
                                            name="police_check"
                                            onChange={()=>this.handlePoliceCheckFileChange()}
                                            ref={ref => {this.uploadPoliceCheck = ref;}}
                                            style={{display:"none"}} 
                                            accept="image/*, .pdf"/>
                                          <button
                                            id = "btnUpload_police_check"
                                            type="button"
                                            className="ml-3 pl-5 pr-5 mr-0 btn btn-primary btn-c primary-button-no-margin-hover"
                                            onClick={()=>this.uploadDocument("police_check")}
                                            >
                                            Upload
                                          </button> 
                                          
                                      </div>


                                      <div className="row">
                                 
                                        {this.state.police_check_filename ? 
                                        <div className="text-left d-flex ml-3" >
                                          <Link
                                            to={{ pathname: this.state.police_check_url }}
                                            target="_blank"
                                          >
                                            <p className="uploaded-file-name mt-1 ml-1">{this.state.police_check_filename}</p>
                                          </Link> 
                                          <i
                                            className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                            onClick={()=>this.setState({deletepolice_checkPopup:true})}
                                          ></i>
                                        {this.state.deletepolice_checkPopup && <DeletePopup togglePopup={(isDelete)=>this.deleteFile(isDelete, 'police_check', false)}/>}
                                        </div>:""}
                                      </div>

 
                                    </div>


                                    <h2>Working With Children Check</h2>

                                    {/* WWCC Number */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">Working With Children Check Number</p></label>
                                      <div className="input-icon">
                                        <i className="mdi mdi-face"></i>
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="wwcc_number"
                                          name="wwcc_number"
                                          onChange={this.setUserState}
                                          value={this.state.wwcc_number}
                                          placeholder='WWCC Number'     
                                        />
                                      </div>
                                    </div>

                                    {/* WWCC Issuing State */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">Working With Children Check Issuing State</p></label>
                                      <div className="pl-1 dropdown-box br-4">
                                        <select
                                          className="form-control" 
                                          id="wwcc_issuing_state"
                                          name="wwcc_issuing_state"
                                          value={this.state.wwcc_issuing_state}
                                          onChange={this.handleddlChange}
                                        >
                                          {/* <option>Please Select the issuing State</option> */}
                                        </select>
                                      </div>
                                    </div>

                                    {/* WWCC Expiry Date */}
                                    <div className="form-group mb-3">
                                      <label className="w-100"><p className="float-left mb-0">Working With Children Check Expiry Date</p></label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                        <DatePicker 
                                          className="react-datepicker-wrapper form-control"
                                          id="wwcc_expiry"             
                                          selected={this.state.wwcc_expiry}          
                                          placeholderText={new Date().toLocaleDateString().split(/\//).join("-")}
                                          showYearDropdown
                                          showMonthDropdown
                                          isClearable                                          
                                          showPopperArrow={false}
                                          minDate = {addDays(new Date(), 0)}
                                          dropdownMode="select"
                                          dateFormatCalendar="MMMM"
                                          dateFormat="dd-MM-yyyy"
                                          yearDropdownItemNumber={10}
                                          scrollableYearDropdown     
                                          value={this.state.wwcc_expiry}
                                          onChange={this.handleWWCCExpiryDateChange}
                                        ></DatePicker>
                                      </div>
                                    </div>


                                    {/* WWCC upload */}
                                    <div className="form-group">
                                      <label className="w-100 lineheight-17">
                                        <p className="float-left mb-0">Upload Working With Children Check Document</p>
                                        {this.state.wwcc_status ? 
                                        <div className='span-hovered'>
                                          <i className="mdi mdi-checkbox-marked-circle float-right check-green"></i>
                                          <span className="span-hovered-content">This document has been verified!</span>  
                                        </div>
                                        :
                                        <div className='span-hovered'>                                          
                                          <i className="mdi mdi-checkbox-marked-circle float-right check-gray"></i>
                                          <span className="span-hovered-content">This document has not been verified yet!</span>                                        
                                        </div>
                                        }
                                      </label>
                                      <div className="input-icon d-flex justify-content-between">
                                        <i className="mdi mdi-upload"></i>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="flWWCC"
                                            name="userWWCC"
                                            disabled
                                            placeholder={ this.state.wwcc_filename ? this.state.wwcc_filename: 'Attach a copy of your Working With Children Check'}
                                          />
                                          <input type="file"
                                            id="wwcc"
                                            name="wwcc"
                                            onChange={()=>this.handleWWCCFileChange()}
                                            ref={ref => {this.uploadWWCC = ref;}}
                                            style={{display:"none"}} 
                                            accept="image/*, .pdf"/>
                                          <button
                                            id="btnUpload_wwcc"
                                            type="button"
                                            className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                            onClick={()=>this.uploadDocument("wwcc")}>
                                            Upload
                                          </button> 
                                      </div>

                                      <div className="row">
                                 
                                        {this.state.wwcc_filename ? 
                                        <div className="text-left d-flex ml-3" >
                                          <Link
                                            to={{ pathname: this.state.wwcc_url }}
                                            target="_blank"
                                          >
                                            <p className="uploaded-file-name mt-1 ml-1">{this.state.wwcc_filename}</p>
                                          </Link> 
                                          <i
                                            className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                            onClick={()=>this.setState({deletewwccPopup:true})}
                                          ></i>
                                        {this.state.deletewwccPopup && <DeletePopup togglePopup={(isDelete)=>this.deleteFile(isDelete, 'wwcc', false)}/>}
                                        </div>:""}
                                      </div>


                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* submit & back buttons */}
                              <div className="row pl-0 pr-0 mr-0 mb-5">
                                <div className="col-lg-6 col-md-12 pr-0">
                                  <Link
                                    type="back"
                                    value="Back"
                                    to="/PersonalDetails"
                                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                                  >Back</Link>
                                </div>
                                <div className="col-lg-6 col-md-12 pr-0 float-right">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                  >Submit</button>
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
    );
  }
}
export default Identification;
