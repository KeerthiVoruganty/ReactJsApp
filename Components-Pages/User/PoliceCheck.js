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
import ImageCrops from "./ImageCrops";
const URL = PORT;

export class PoliceCheck extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    if (user === null) {
      window.location = "/login";
    }

    const police_check_release =
      user.police_check_release !== null &&
        user.police_check_release !== undefined
        ? new Date(user.police_check_release.split("T")[0])
        : "";

    this.state = {
      user: user,
      police_check_filename: user.police_check_filename,
      police_check_url: user.police_check_url,
      police_check_release: police_check_release,
      police_check_result: user.police_check_result,
      police_check_type: user.police_check_type,
      police_check_status: user.police_check_verification_status,
      deletepolice_checkPopup: false,
      policecheck_linkstyle:
        user.police_check_filename === null ? "none" : "block",
      police_check_issuing_organisation: user.police_check_issuing_organisation,
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
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
    this.isFileUploaded = this.isFileUploaded.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.handlePoliceReleaseDateChange = this.handlePoliceReleaseDateChange.bind(
      this
    );
  }

  uploadDocument(id) {
    document.getElementById(id).click();
  }

  componentDidMount() {
    //get a complete list of countries

    this.toggleFileUpload(); // Disables file upload
  }

  handleDateChange = date => {
    this.setState({ id_document_expiry: date });
    this.updateLocalStorage("id_document_expiry", date);
  };

  toggleFileUpload() {
    if (
      this.state.police_check_filename !== null &&
      this.state.police_check_filename !== undefined
    ) {
      document.getElementById("btnUpload_police_check").disabled = true;
    } else {
      document.getElementById("btnUpload_police_check").disabled = false;
    }
  }

  isFileUploaded() {
    var isValid = true;
    if (this.state.police_check_filename === null) {
      notify.show("Please provide Police Check document");
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

        notify.show("Police Check details saved successfully");
        document.getElementById("lnkWorkingWithChildrenChk").click(); // Redirects to EmergencyContact Page
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

  handlePoliceReleaseDateChange = date => {
    this.setState({ police_check_release: date });
    this.updateLocalStorage("police_check_release", date);
  };

  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state[field] = value;
    this.setState({ user: this.state.user });

    this.updateLocalStorage(field, value);
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

  handleSubmit(e) {
    e.preventDefault();
    var isFormValid = this.isFileUploaded();
    console.log(this.state.visa_status);
    if (isFormValid) {
      this.saveData();
    }
  }

  validateFile(file, filename) {
    let isValid = false;
    if (file !== null && file !== undefined) {
      isValid = true;
    }
    return isValid;
  }

  handlePoliceCheckFileChange() {
    var isValidFile = false;
    let policecheckFile = this.uploadPoliceCheck.files[0];

    isValidFile = this.validateFile(policecheckFile, "police_check");
    if (isValidFile) {
      this.saveFile(policecheckFile, "police_check");
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
  onFileLoad = (e) => {
    this.setState({ file: e });
    this.setState({ Name: e.name });
    // alert("Hello");
    var isValidFile = false;
    let policeCheck = e;
    isValidFile = this.validateFile(policeCheck, "police_check");
    //this.fileType(wwccFile);
    // if (isValidFile) {
    //   this.saveFile(wwccFile, "wwcc_img");
    // }
  };
  fileType() {
    let police_check = this.uploadPoliceCheck.files[0];
    this.setState({image: this.uploadPoliceCheck.files[0] });
    this.setState({imageName: police_check.name});
    // this.setState({wwcc_filename: this.uploadWWCC.files[0]});

    let isPdf = true;
    let filesplit = police_check.name.split(".");
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
    this.setState({police_check_filename:newUserData.police_check_filename});
    console.log(this.state.user.police_check_filename);
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
                      className="user-links text-right d-flex "
                    >
                      {" "}
                      <p>2 - Visa</p>
                    </Link>
                    <Link
                      id="lnkPoliceCheck"
                      to={{ pathname: "/PoliceCheck" }}
                      className="user-links user-links-active text-center d-flex "
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
                            text: "Visa Details"
                          },
                          {
                            pathname: "/PoliceCheck",
                            text: "Police Check (Opt.)",
                            active: true
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
                            <div className="container  mt-5">
                              <div className="row">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>
                                <div className="col-md-12">
                                  <div className="auth-text-top mb-5">
                                    {/* <h2>Police Check</h2> */}

                                    {/* Police Check Type radio button */}
                                    <div className="radio-button-margin">
                                      <label className="w-100 mb-0">
                                        <p className="float-left mb-0">
                                          Police Check Type
                                        </p>
                                      </label>
                                      <div className="boxed-radio-buttons">
                                      <div className="vertical-radio-button-margin">
                                   
                                  <label class="radio_border">  
                                  <div className="wrap">                                                               
                                  <input type="radio"                                  
                                  id="rbEmployment"
                                  name="police_check_type"
                                  title="Employement/Professional"
                                  onChange={
                                    this.handleradioChange
                                  }
                                  checked={
                                    this.state
                                      .police_check_type ===
                                    "Employement/Professional"
                                  }
                                  required />
                                  Employment/Professional                                   
                                  <span class="checkmark"></span>  
                                  </div>                                                           
                                 </label>
                                
                                 <label class="radio_border"> 
                                 <div className="wrap">                                    
                                  <input type="radio"                                   
                                  id="rbVolunteer"
                                  name="police_check_type"
                                  title="Volunteer/Student Placement"
                                  onChange={
                                    this.handleradioChange
                                  }
                                  checked={
                                    this.state
                                      .police_check_type ===
                                    "Volunteer/Student Placement"
                                  }
                                  required/>
                                  Volunteer/Student Placement                                   
                                  <span class="checkmark"></span>  
                                  </div>                               
                                 </label>
                                  
                                 </div>                          
                                  </div>  
                                      {/* <div className="input-radio-buttons justify-content-start">
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
                                          {/* <div id="r8-balloon-radio-group-wrapper-identification-3">
                                            <ul>
                                              <li>
                                                <input
                                                  className="radio r8-radio-float"
                                                  type="radio"
                                                  id="rbEmployment"
                                                  name="police_check_type"
                                                  title="Employement/Professional"
                                                  onChange={
                                                    this.handleradioChange
                                                  }
                                                  checked={
                                                    this.state
                                                      .police_check_type ===
                                                    "Employement/Professional"
                                                  }
                                                  required
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-professional-label">
                                            Employment/Professional
                                          </label>
                                        </div>
                                        <div className="p-0 adaptation-for-radio-button-1"> */}
                                          {/*                                          <input
                                                            type="radio"
                                                            id="rbVolunteer"
                                                            name="police_check_type"
                                                            title="Volunteer/Student Placement"
                                                            onChange={ this.handleradioChange  }
                                                            checked={ this.state.police_check_type ===  "Volunteer/Student Placement" }
                                                            required
                                                        />*/}
                                          {/* <div id="r8-balloon-radio-group-wrapper-identification-3">
                                            <ul>
                                              <li>
                                                <input
                                                  className="radio r8-radio-float"
                                                  type="radio"
                                                  id="rbVolunteer"
                                                  name="police_check_type"
                                                  title="Volunteer/Student Placement"
                                                  onChange={
                                                    this.handleradioChange
                                                  }
                                                  checked={
                                                    this.state
                                                      .police_check_type ===
                                                    "Volunteer/Student Placement"
                                                  }
                                                  required
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-volunteer-label">
                                            Volunteer/Student Placement
                                          </label>
                                        </div>
                                      </div> */} 
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

                                    {/* Police Check Result */}
                                    <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Police Check Result
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-fingerprint"></i> */}
                                        <select
                                          type="text"
                                          className="form-control user-profile-form-input float-right"
                                          id="police_check_result"
                                          name="police_check_result"
                                          onChange={this.setUserState}
                                          value={this.state.police_check_result}
                                          required
                                        >
                                          <option disabled selected>
                                            Select
                                          </option>
                                          <option>
                                            Non disclosable outcomes
                                          </option>
                                          <option>Disclosable outcomes</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0 mt-3">
                                          Police Check Issuing Organisation
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i> */}

                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="police_check_issuing_organisation"
                                          name="police_check_issuing_organisation"
                                          onChange={this.setUserState}
                                          value={
                                            this.state
                                              .police_check_issuing_organisation
                                          }
                                          maxLength="120"
                                          required
                                          placeholder="Insert the police check issuing organisation"
                                        />
                                      </div>
                                    </div>
                                    {/* Police Check Release Date */}
                                    <div className="form-group mb-3 float-left">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Police Check Release Date
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i>  */}
                                        <DatePicker
                                          className="react-datepicker-wrapper form-control"
                                          id="police_check_release"
                                          selected={
                                            this.state.police_check_release
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
                                          value={
                                            this.state.police_check_release
                                          }
                                          onChange={
                                            this.handlePoliceReleaseDateChange
                                          }
                                          required
                                        ></DatePicker>
                                      </div>
                                    </div>

                                    {/* Upload Police Check */}
                                    <div className="form-group mb-5">
                                      <label className="w-100 lineheight-17">
                                        <p className="float-left mb-0">
                                          Upload Police Check
                                        </p>
                                        {this.state.police_check_status ? (
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
                                          id="flPoliceCheck"
                                          name="userPoliceCheck"
                                          disabled
                                          required
                                          placeholder={
                                            this.state.police_check_filename
                                              ? this.state.police_check_filename
                                              : "Attach a copy of your Police Check Document"
                                          }
                                        />
                                        {console.log(
                                          this.state.police_check_filename
                                        )}
                                        <input
                                          type="file"
                                          id="police_check"
                                          name="police_check"
                                          onChange={() =>
                                            this.fileType()
                                              ? this.handlePoliceCheckFileChange()
                                              : this.setState({
                                                  filetype: false,
                                                })
                                          }
                                          ref={ref => {
                                            this.uploadPoliceCheck = ref;
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
                                             fileType="police_check"
                                             fileName={this.state.imageName}
                                             action={this.handleChage}
                                            />
                                          )}
                                        </div>
                                        <button
                                          id="btnUpload_police_check"
                                          type="button"
                                          className="ml-3 pl-5 pr-5 mr-0 btn btn-primary btn-c primary-button-no-margin-hover"
                                          onClick={() =>
                                            this.uploadDocument("police_check")
                                          }
                                        >
                                          Upload
                                        </button>
                                      </div>

                                      <div className="row">
                                        {this.state.police_check_filename ? (
                                          <div className="text-left d-flex ml-3">
                                            <Link
                                              to={{
                                                pathname: this.state
                                                  .police_check_url
                                              }}
                                              target="_blank"
                                            >
                                              <p className="uploaded-file-name mt-1 ml-1">
                                                {
                                                  this.state
                                                    .police_check_filename
                                                }
                                              </p>
                                            </Link>
                                            <i
                                              className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                              onClick={() =>
                                                this.setState({
                                                  deletepolice_checkPopup: true
                                                })
                                              }
                                            ></i>
                                            {this.state
                                              .deletepolice_checkPopup && (
                                                <DeletePopup
                                                  togglePopup={isDelete =>
                                                    this.deleteFile(
                                                      isDelete,
                                                      "police_check",
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

                                    {/* submit & back buttons */}
                                    <div className="row pl-0 pr-0 mr-0 mb-5">
                                      {/* <div className="col-lg-6 col-md-12 pr-0">
                                        <Link
                                          type="back"
                                          value="Back"
                                          to="/Visa"
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

                                    {/*  */}
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
export default PoliceCheck;
