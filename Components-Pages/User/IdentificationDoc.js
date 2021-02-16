import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PORT } from "../../config";
import { notify } from "react-notify-toast";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import DeletePopup from "./ConfirmationBox";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../User/UserProfile.css";
import "../Payments/Payments.css";
import Tabs from "../../Components/Tabs/Tabs";
import MobileNavBar from "../../Components/Navbar/MobileNavBar";
import { getStates } from "../../Helper";
import ImageCrops from "./ImageCrops";
// require("./PersonalDetails.css");

const URL = PORT;

let Countries = [];
const States = getStates();

export class IdentificationDoc extends Component {
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

    this.state = {
      user: user,
      visa_status: user.visa_status,
      identification_document_number: user.identification_document_number, // Passport/ Driving Licence number
      id_document_type: user.id_document_type,
      id_document_expiry: id_document_expiry,
      passport_country: user.passport_country,
      identification_url: user.identification_url,
      identification_filename: user.identification_filename,
      issuing_place: user.issuing_place,
      deleteidentificationPopup: false,
      link_style: user.identification_filename === null ? "none" : "block",
      filetype: true,
      file: null,
      preview: null,
      show: false,
      borderRadius: 0,
      width: 200,
      height: 200,
      scale: 1,
      image: "",
      imageName: "",
      allowZoomOut: false,
    };

    this.handleddlChange = this.handleddlChange.bind(this);
    this.handleradioChange = this.handleradioChange.bind(this);
    this.setUserState = this.setUserState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.changeVisaType = this.changeVisaType.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.isFileUploaded = this.isFileUploaded.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
  }

  uploadDocument(id) {
    document.getElementById(id).click();
  }

  componentDidMount() {
    //get a complete list of countries
    axios.get(`${URL}/countries`).then((res) => {
      Countries = res.data;
      let place = this.state.visa_status === "I am a visa holder" ? Countries : States;
      this.bindPlaces(place, "issuing_place");
    });
    this.toggleFileUpload(); // Disables file upload
    // Bind data on page load

    if (
      this.state.issuing_place !== null &&
      this.state.issuing_place !== undefined
    ) {
      document.getElementById("issuing_place").value = this.state.issuing_place;
    }

    if (
      this.state.id_document_type === null ||
      this.state.id_document_type === undefined
    ) {
      this.setState({ id_document_type: "Identification Document" });
    }
  }

  handleDateChange = (date) => {
    this.setState({ id_document_expiry: date });
    this.updateLocalStorage("id_document_expiry", date);
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
  }

  isFileUploaded() {
    var isValid = true;
    if (this.state.identification_filename === null) {
      notify.show("Please provide Identification document");
      isValid = false;
    } else if (
      this.state.visa_status !== "I am Australian Citizen" &&
      this.state.visa_filename === null
    ) {
      notify.show("Please provide Visa document");
      isValid = false;
    } else if (this.state.wwcc_filename === null) {
      notify.show("Please provide WWCC document");
      isValid = false;
    } else if (this.state.police_check_filename === null) {
      notify.show("Please provide Police Check document");
      isValid = false;
    }
    return isValid;
  }

  saveData() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    user.identification_document_number = this.state.identification_document_number;

    axios
      .put(`${URL}/updateUser`, {
        user,
      })
      .then((res) => {
        console.log(res);
        notify.show("Identification details saved successfully");
        document.getElementById("lnkVisa").click(); // Redirects to EmergencyContact Page
      })
      .catch((err) => {
        console.error(err);
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
      default:
        break;
    }
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
    // this.state.visa_status === "I am Australian Citizen
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

  saveFile(file, filename) {
    let fileParts = file.name.split(".");
    let fileType = fileParts[1];
    let fileName = filename;
    axios
      .post(`${PORT}/s3`, {
        fileName: fileName,
        fileType: fileType,
        _id: this.state.user._id,
      })
      .then((response) => {
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
            "Content-Type": fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((response2) => {
            // alert("Good " + JSON.stringify(response2));
          })
          .catch((error) => {
            // alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        notify.show(JSON.stringify(error), "error");
      });
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

  handleIdentificationFileChange() {
    var isValidFile = false;
    let idFile = this.uploadInput.files[0];

    isValidFile = this.validateFile(idFile, "identification");
    if (isValidFile) {
      this.saveFile(idFile, "identification");
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

  validateFile(file, filename) {
    let isValid = false;
    if (file !== null && file !== undefined) {
      isValid = true;
    }
    return isValid;
  }

  changeVisaType(e) {
    let document_type = "";
    let link = document.getElementById("lnkVisa");
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

  bindPlaces(places, id) {
    var selectElem = document.getElementById(id);
    selectElem.innerHTML = "";
    var e = document.createElement("option");
    e.innerText = "Please Select";
    e.disabled = true;
    selectElem.append(e);
    for (var i = 0; i < places.length; i++) {
      var item = places[i];
      var element = document.createElement("option");
      element.innerText = item;
      selectElem.append(element);
    }
  }
  onFileLoad = (e) => {
    this.setState({ file: e });
    this.setState({ Name: e.name });
    // alert("Hello");
    var isValidFile = false;
    let identity = e;
    isValidFile = this.validateFile(identity, "identification");
    //this.fileType(wwccFile);
    // if (isValidFile) {
    //   this.saveFile(wwccFile, "wwcc_img");
    // }
  };
  fileType() {
    let identification = this.uploadInput.files[0];
    this.setState({image: this.uploadInput.files[0] });
    this.setState({imageName: identification.name});
    // this.setState({wwcc_filename: this.uploadWWCC.files[0]});

    let isPdf = true;
    let filesplit = identification.name.split(".");
    let filetype = filesplit[1];
    if (filetype != "pdf") {
      isPdf = false;
    }
    return isPdf;
  }
  handleChage = () =>{
    debugger;
    let newUserData = JSON.parse(window.localStorage.getItem("user"));
    this.setState({user: newUserData});
    this.setState({identification_filename:newUserData.identification_filename});
    console.log(this.state.user.identification_filename);
  }

  render() {
    // const CheckedCitizen = this.state.visa_status ==="I am Australian Citizen";

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
                      className="user-links user-links-active text-center d-flex "
                    ><p>1 - Identification Document</p>
                    </Link>
                    <Link
                      id="lnkVisa"
                      to={{ pathname: "/Visa" }}
                      className="user-links text-right d-flex"
                    // onClick={ e => preventDefault()}
                    // onClick ={!this.state.disabledVisa}
                    > <p>2 - Visa</p>
                    </Link>
                    <Link
                      id="lnkPoliceCheck"
                      to={{ pathname: "/PoliceCheck" }}
                      className="user-links d-flex "
                    ><p>3 - Police Check</p>
                    </Link>
                    <Link
                      id="lnkWorkingWithChildrenChk"
                      to={{ pathname: "/WorkingWithChildrenChk" }}
                      className="user-links text-right d-flex "
                    > <p>4 - Working With Children Check</p>
                    </Link>
                  </div> */}

                  {/* content of the form */}

                  <div className="availability-table-container">
                    <div className="availability-table">
                      <Tabs
                        tabs={[
                          {
                            pathname: "/IdentificationDoc",
                            text: "Personal I.D.",
                            active: true,
                          },
                          {
                            pathname: "/Visa",
                            text: "Visa Details",
                          },
                          {
                            pathname: "/PoliceCheck",
                            text: "Police Check (Opt.)",
                          },
                          {
                            pathname: "/WorkingWithChildrenChk",
                            text: "WWCC (Optional)",
                          },
                        ]}
                      />
                      {/* container of the form */}
                      <div className="availability-table-body mb-0 mt-5">
                        <div className="availability-table-body-content">
                          <form
                            id="frmIdentification"
                            onSubmit={this.handleSubmit}
                          >
                            <div className="container  mt-5">
                              <div className="row">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>
                                <div className="col-md-12">
                                  <div className="auth-text-top mb-5">
                                    {/* <h2>Identification Document</h2> */}
                                    {/* residential status radio button */}
                                    <div className="radio-button-margin">
                                      <label className="w-100 mb-0">
                                        <p className="float-left mb-0">
                                          Select one form of identification
                                        </p>
                                      </label>
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
                                  // value={this.state.disabledVisa}
                                  title="I am Australian Citizen"
                                  required />
                                  Australian Driver Licence                                    
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
                                  required/>
                                  Passport                                   
                                  <span class="checkmark"></span>  
                                  </div>                               
                                 </label>
                                  
                                 </div>                          
                                  </div>   
                                      {/* <div className="input-radio-buttons justify-content-start">
                                        <div className="row row-input-identification">
                                          {/* change the Radio Style*/}
                                          {/* <div id="r8-balloon-radio-group-wrapper-identification-1">
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
                                                  // value={this.state.disabledVisa}
                                                  title="I am Australian Citizen"
                                                  required
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label col-8">
                                            Australian Driver Licence
                                          </label>
                                        </div>
                                        <div className="row row-input-identification"> */}
                                          {/*                                          <input
                                                        type="radio"
                                                        id="rbVisaHolder"
                                                        name="visa_status"
                                                        onChange={this.handleradioChange}
                                                        checked={this.state.visa_status === "I am a visa holder"}
                                                        title="I am a visa holder"
                                                        required
                                                    />*/}
                                          {/* <div id="r8-balloon-radio-group-wrapper-identification-2">
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
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label-2 col-8">
                                            Passport
                                          </label>
                                        </div>
                                      </div> */} 
                                    </div>

                                    {/* document number */}
                                    <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          {this.state.id_document_type} No.
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* {this.state.id_document_type === "Passport" ? <i className="mdi mdi-passport"></i> : <i className="mdi mdi-account-card-details"></i>} */}
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="identification_document_number"
                                          name="identification_document_number"
                                          onChange={this.setUserState}
                                          value={
                                            this.state
                                              .identification_document_number
                                          }
                                          maxLength="10"
                                          required
                                          placeholder={
                                            this.state.visa_status ===
                                              "I am a visa holder"
                                              ? "Insert Passport Number"
                                              : "Insert Licence Number"
                                          }
                                        />
                                      </div>
                                    </div>

                                    {/* document issuing place */}
                                    {/* TODO: Chane select control to searchable dropdown */}
                                    <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          {this.state.visa_status ===
                                            "I am a visa holder"
                                            ? "Issuing Country"
                                            : "Issuing State"}
                                        </p>
                                      </label>
                                      <div className="pl-0 dropdown-box br-4">
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
                                    <div className="form-group mb-3 float-left">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          {this.state.visa_status ===
                                            "I am a visa holder"
                                            ? "Passport"
                                            : "Licence"}{" "}
                                          Expiry{" "}
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                        <DatePicker
                                          className="react-datepicker-wrapper form-control"
                                          id="id_document_expiry"
                                          selected={
                                            this.state.id_document_expiry
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
                                          value={this.state.id_document_expiry}
                                          onChange={this.handleDateChange}
                                          required
                                        ></DatePicker>
                                      </div>
                                    </div>

                                    {/* document upload */}
                                    <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Upload{" "}
                                          {this.state.visa_status ===
                                            "I am a visa holder"
                                            ? "Passport"
                                            : "Card"}
                                        </p>
                                      </label>
                                      <div className="input-icon d-flex justify-content-between ">
                                        {/* <i className="mdi mdi-upload"></i> */}
                                        <input
                                          type="txt"
                                          className="form-control"
                                          placeholder={
                                            this.state.identification_filename?this.state.identification_filename:
                                            this.state.visa_status ===
                                              "I am a visa holder"
                                              ? "Please attach a photo of your passport in PNG, JPEG or JPG format"
                                              : "Please attach a photo of your card in PNG, JPEG or JPG format"
                                              
                                          }
                                          disabled
                                        />
                                        <input
                                          type="file"
                                          id="identification"
                                          name="identification"
                                          onChange={() =>
                                            this.fileType()
                                              ? this.handleIdentificationFileChange()
                                              : this.setState({
                                                  filetype: false,
                                                })                                            
                                          }
                                          ref={(ref) => {
                                            this.uploadInput = ref;
                                          }}
                                          style={{ display: "none" }}
                                          accept="image/*, .pdf"
                                        />
                                         <div>
                                          {this.state.filetype ? (
                                            false
                                          ) : (
                                            <ImageCrops
                                              imageSrc={
                                                this.state.image
                                              }
                                             user={this.state.user}
                                             fileType="identification"
                                             fileName={this.state.imageName}
                                             action={this.handleChage}
                                            />
                                          )}
                                        </div>
                                        <button
                                          id="btnUpload_identification"
                                          type="button"
                                          required
                                          className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                          onClick={() =>
                                            this.uploadDocument(
                                              "identification"
                                            )
                                          }
                                        >
                                          Upload
                                        </button>
                                      </div>

                                      <div className="row">
                                        {this.state.identification_filename ? (
                                          <div className="text-left d-flex ml-3">
                                            <Link
                                              to={{
                                                pathname: this.state
                                                  .identification_url,
                                              }}
                                              target="_blank"
                                            >
                                              <p className="uploaded-file-name mt-1 ml-1">
                                                {
                                                  this.state
                                                    .identification_filename
                                                }
                                              </p>
                                            </Link>
                                            <i
                                              className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                              onClick={() =>
                                                this.setState({
                                                  deleteidentificationPopup: true,
                                                })
                                              }
                                            ></i>
                                            {this.state
                                              .deleteidentificationPopup && (
                                                <DeletePopup
                                                  togglePopup={(isDelete) =>
                                                    this.deleteFile(
                                                      isDelete,
                                                      "identification",
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

                                   
                                    {/* residential status radio button */}
                                    <div className="radio-button-margin d-none">
                                      <label className="w-100 mb-0">
                                        <p className="float-left mb-0">
                                          Identification Document Type
                                        </p>
                                      </label>
                                      <div className="input-radio-buttons row">
                                        <div className="">
                                          <input
                                            type="radio"
                                            id="rbDrivingLicence"
                                            name="id_document_type"
                                            onChange={this.handleradioChange}
                                            checked={
                                              this.state.visa_status ===
                                              "I am Australian Citizen"
                                            }
                                            title="Driver Licence"
                                          />
                                          <label>Driver Licence</label>
                                        </div>
                                        <div className="">
                                          <input
                                            type="radio"
                                            id="rbPassport"
                                            name="id_document_type"
                                            onChange={this.handleradioChange}
                                            checked={
                                              this.state.visa_status ===
                                              "I am a Visa Holder"
                                            }
                                            title="Passport"
                                          />
                                          <label>Passport</label>
                                        </div>
                                      </div>
                                    </div>

                                    {/* submit & back buttons */}
                                    <div className="row pl-0 pr-0 mr-0 mb-5">
                                      {/* <div className="col-lg-6 col-md-12 pr-0">
                                        <Link
                                          type="back"
                                          value="Back"
                                          to="/PersonalDetails"
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
export default IdentificationDoc;
