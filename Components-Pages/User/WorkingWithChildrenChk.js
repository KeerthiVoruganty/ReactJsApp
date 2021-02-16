import React, { useRef } from "react";
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
import ReactAvatarEditor from "react-avatar-editor";
//import ImageCrop from '../User/ImageCrops';
import { Button, Modal } from "react-bootstrap";
import ImageCrops from "./ImageCrops";

const URL = PORT;
let fileType;

const States = getStates();

export class WorkingWithChildrenChk extends Component {
  
  constructor(props) {
    super(props);
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user === null) {
      window.location = "/login";
    }

    const wwcc_expiry =
      user.wwcc_expiry !== null && user.wwcc_expiry !== undefined
        ? new Date(user.wwcc_expiry.split("T")[0])
        : "";

    this.state = {
      user: user,
      wwcc_filename: user.wwcc_filename,
      wwcc_issuing_state: user.wwcc_issuing_state,
      wwcc_url: user.wwcc_url,
      wwcc_expiry: wwcc_expiry,
      wwcc_number: user.wwcc_number,
      wwcc_linkstyle: user.wwcc_filename === null ? "none" : "block",
      wwcc_status: user.wwcc_verification_status,
      deletewwccPopup: false,
      filetype: true,
      file: null,
      preview: null,
      show: false,
      borderRadius: 0,
      width: 300,
      height: 200,
      scale: 1,
      image: "",
      imageName: "",
      allowZoomOut: false,
    };

    this.handleddlChange = this.handleddlChange.bind(this);
    this.setUserState = this.setUserState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.bindPlaces = this.bindPlaces.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.handleWWCCExpiryDateChange = this.handleWWCCExpiryDateChange.bind(
      this
    );
    this.uploadDocument = this.uploadDocument.bind(this);
    this.isFileUploaded = this.isFileUploaded.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.handleScale = this.handleScale.bind(this);
    //this.fileType=this.fileType.bind(this);
  }

  handleScale(e) {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  }

  bindPlaces(places, id) {
    var selectElem = document.getElementById(id);
    selectElem.innerHTML = "";
    var e = document.createElement("option");
    e.innerText = "Please Select";
    e.disabled = true;
    selectElem.append(e);
    let place_sort = [];
    for (var i = 0; i < places.length; i++) {
      place_sort[i] = places[i];
    }
    place_sort.sort();
    for (var i = 0; i < places.length; i++) {
      var item = place_sort[i];
      var element = document.createElement("option");
      element.innerText = item;
      selectElem.append(element);
    }
  }
  uploadDocument(id) {
    document.getElementById(id).click();
  }

  componentDidMount() {
    this.toggleFileUpload(); // Disables file upload
    // Bind data on page load

    this.bindPlaces(States, "wwcc_issuing_state");

    if (
      this.state.issuing_place !== null &&
      this.state.issuing_place !== undefined
    ) {
      document.getElementById("issuing_place").value = this.state.issuing_place;
    }
    if (
      this.state.wwcc_issuing_state !== null &&
      this.state.wwcc_issuing_state !== undefined
    ) {
      document.getElementById(
        "wwcc_issuing_state"
      ).value = this.state.wwcc_issuing_state;
    }


  }

  // Updates local storage object when any control updates its state
  updateLocalStorage(field, value) {
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  toggleFileUpload() {
    if (
      this.state.wwcc_filename !== null &&
      this.state.wwcc_filename !== undefined
    ) {
      document.getElementById("btnUpload_wwcc").disabled = true;
    } else {
      document.getElementById("btnUpload_wwcc").disabled = false;
    }
  }

  handleWWCCExpiryDateChange = (date) => {
    this.setState({ wwcc_expiry: date });
    this.updateLocalStorage("wwcc_expiry", date);
  };

  isFileUploaded() {
    var isValid = true;

    if (this.state.user.wwcc_filename === null) {
      notify.show("Please provide WWCC document");
      isValid = false;
    }
    return isValid;
  }

  // addWatermark(file){
  // console.log(file);
  // var viewerElement = this.setState({viewerElement:null});
  // debugger
  // WebViewer({
  // initialDoc:file ,
  // // ...
  // }, viewerElement,
  // ).then((instance) => {
  //   const { docViewer } = instance;
  //   const path = '/src/assets/img/watermark_edited.png'

  //   // Promise resolves with options object
  //   const promise = new Promise(resolve => {
  //     const img = new Image();
  //     const options = {
  //       // footer: {
  //       //   fontSize: 15,
  //       //   fontFamily: 'sans-serif',
  //       //   color: 'red',
  //       //   opacity: 70,
  //       //   left: 'left watermark',
  //       //   center: 'center watermark'
  //       // },
  //       custom: (ctx, pageIndex, pageWidth, pageHeight) => {
  //         // the pageIndex is also passed in so you could have
  //         // a different watermark for each page
  //         ctx.drawImage(
  //           img,
  //           pageWidth / 2 - img.width / 2,
  //           pageHeight / 2 - img.height / 2
  //         );
  //       }
  //     };
  //     img.onload = () => { 
  //       return resolve(options);
  //     };
  //     img.src = path;
  //   });

  //   docViewer.setWatermark(promise);
  // });
  // }

  saveData() {
    let user = JSON.parse(window.localStorage.getItem("user"));

    axios
      .put(`${URL}/updateUser`, {
        user,
      })
      .then((res) => {
        notify.show("Working with Children Check details saved successfully");
        // document.getElementById("lnkProfile").click(); // Redirects to Profile Page
        const path = {
          pathname: "/resume",
          state: res.data,
        };
        this.props.history.push(path);
      })
      .catch((err) => {
        console.error();
        notify.show("error", "error");
      });
  }

  handleddlChange(e) {
    if (e.target.name === "wwcc_issuing_state") {
      this.setState({ wwcc_issuing_state: e.target.value });
    } else if (e.target.name === "issuing_place") {
      this.setState({ issuing_place: e.target.value });
    }
    this.updateLocalStorage(e.target.name, e.target.value);
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
    if (isFormValid) {
      this.saveData();
    }
  }

  handleWWCCFileChange() {
    var isValidFile = false;
    let wwccFile = this.uploadWWCC.files[0];
    isValidFile = this.validateFile(wwccFile, "wwcc");
    //this.addWatermark(wwccFile);
    //this.fileType(wwccFile);
    if (isValidFile) {
      this.saveFile(wwccFile, "wwcc");
    }
  }

  handleWWCCimgChange(e) {
    var isValidFile = false;
    debugger;
    // let wwccFile = this.state.file;
    // isValidFile = this.validateFile(wwccFile, "wwcc_img");
    // //this.fileType(wwccFile);
    // if (isValidFile) {
    //   this.saveFile(wwccFile, "wwcc_img");
    // }
  }

  onFileLoad = (e) => {
    this.setState({ file: e });
    this.setState({ Name: e.name });
    // alert("Hello");
    var isValidFile = false;
    let wwccFile = e;
    isValidFile = this.validateFile(wwccFile, "wwcc_img");
    //this.fileType(wwccFile);
    // if (isValidFile) {
    //   this.saveFile(wwccFile, "wwcc_img");
    // }
  };
  fileType() {
    let wwccFile = this.uploadWWCC.files[0];
    this.setState({image: this.uploadWWCC.files[0] });
    this.setState({imageName: wwccFile.name});
    // this.setState({wwcc_filename: this.uploadWWCC.files[0]});

    let isPdf = true;
    let filesplit = wwccFile.name.split(".");
    let filetype = filesplit[1];
    if (filetype != "pdf") {
      isPdf = false;
    }
    return isPdf;
  }

  // onhide = () => {
  //   // this.setState({showPopup:false});
  //   this.togglePopup.bind(this);
  // };
  

  validateFile(file, filename) {
    let isValid = false;
    if (file !== null && file !== undefined) {
      isValid = true;
    }
    return isValid;
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

  handleChage = () =>{
    debugger;
    let newUserData = JSON.parse(window.localStorage.getItem("user"));
    this.setState({user: newUserData});
    this.setState({wwcc_filename:newUserData.wwcc_filename});
    console.log(this.state.user.wwcc_filename);
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


  render() {
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
                      className="user-links d-flex "
                    >
                      <p>3 - Police Check</p>
                    </Link>
                    <Link
                      id="lnkWorkingWithChildrenChk"
                      to={{ pathname: "/WorkingWithChildrenChk" }}
                      className="user-links text-right user-links-active text-center d-flex "
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
                            text: "Personal I.D.",
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
                            active: true,
                          },
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
                                    {/* <h2>Working With Children Check</h2> */}

                                    {/* WWCC Issuing State */}
                                    <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Working With Children Check (WWCC)
                                          Issuing State
                                        </p>
                                      </label>
                                      <div className="pl-0 dropdown-box br-4">
                                        <select
                                          className="form-control pl-2"
                                          id="wwcc_issuing_state"
                                          name="wwcc_issuing_state"
                                          value={this.state.wwcc_issuing_state}
                                          onChange={this.handleddlChange}
                                          required
                                        >
                                          {/* <option>Please Select the issuing State</option> */}
                                          {/* <option disabled selected>Select</option>
                                                    <option>Victoria</option>
                                                    <option>Australian Capital Territory</option>
                                                    <option>New South Wales</option>
                                                    <option>Northern Territory</option>
                                                    <option>Queensland</option>
                                                    <option>South Australia</option>
                                                    <option>Tasmania</option>
                                                    <option>Northern Territory</option> */}
                                        </select>
                                      </div>
                                    </div>

                                    {/* WWCC Number */}
                                    <div className="form-group mb-3">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Card Number
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-face"></i> */}
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          id="wwcc_number"
                                          name="wwcc_number"
                                          onChange={this.setUserState}
                                          value={this.state.wwcc_number}
                                          required
                                          placeholder="WWCC Number"
                                        />
                                      </div>
                                    </div>

                                    {/* WWCC Expiry Date */}
                                    <div className="form-group mb-3 float-left">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Expiry Date
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        {/* <i className="mdi mdi-calendar calendar-ic"></i> */}
                                        <DatePicker
                                          className="react-datepicker-wrapper form-control"
                                          id="wwcc_expiry"
                                          selected={this.state.wwcc_expiry}
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
                                          value={this.state.wwcc_expiry}
                                          onChange={
                                            this.handleWWCCExpiryDateChange
                                          }
                                          required
                                        ></DatePicker>
                                      </div>
                                    </div>

                                    {/* WWCC upload */}
                                    <div className="form-group mb-5">
                                      <label className="w-100 lineheight-17">
                                        <p className="float-left mb-0">
                                          Upload Card
                                        </p>
                                        {this.state.wwcc_status ? (
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
                                      <div className="input-icon d-flex justify-content-between">
                                        {/* <i className="mdi mdi-upload"></i> */}
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="flWWCC"
                                          name="userWWCC"
                                          disabled
                                          placeholder={
                                            this.state.wwcc_filename
                                              ? this.state.wwcc_filename
                                              : "Please attach a photo of your card in PNG, JPEG or JPG format"
                                          }
                                          required
                                        />

                                        {/* {console.log(((this.state.wwcc_filename).split("."))[1])}                                                                           */}
                                        <input
                                          type="file"
                                          id="wwcc"
                                          name="wwcc"
                                          // onLoad={() => this.saveFile()}
                                          onChange={() =>
                                            this.fileType()
                                              ? this.handleWWCCFileChange()
                                              : this.setState({
                                                  filetype: false,
                                                })
                                          }
                                          ref={(ref) => {
                                            this.uploadWWCC = ref;
                                          }}
                                          style={{ display: "none" }}
                                          accept="image/*, .pdf"
                                        />

                                        {/* {((this.state.wwcc_filename.split("."))[1]) == "pdf" ? " " */}
                                        {/* : */}

                                        <div>
                                          {this.state.filetype ? (
                                            false
                                          ) : (
                                            <ImageCrops
                                              imageSrc={
                                                this.state.image
                                              }
                                            user={this.state.user}
                                             fileType="wwcc"
                                             fileName={this.state.imageName}
                                             action={this.handleChage}
                                            />
                                          )}
                                        </div>

                                        <button
                                          id="btnUpload_wwcc"
                                          type="button"
                                          className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                          onClick={() =>
                                            this.uploadDocument("wwcc")
                                          }
                                        >
                                          Upload
                                        </button>
                                      </div>
                                      {console.log(this.state.user.wwcc_filename)}
                                      <div className="row">
                                        {this.state.wwcc_filename ? (
                                          <div className="text-left d-flex ml-3">
                                            {/* <Link
                                              to={{
                                                pathname: this.state.wwcc_url
                                              }}
                                              target="_blank"
                                            > */}
                                            <Link
                                              to={{
                                                pathname: this.state.wwcc_url
                                                  ? `/pdfViewer?id=${this.state.wwcc_url}`
                                                  : "/WorkingWithChildrenChk",
                                              }}
                                              target="_blank"
                                            >
                                              <p className="uploaded-file-name mt-1 ml-1">
                                                {this.state.wwcc_filename}
                                              </p>
                                            </Link>
                                            <i
                                              className="mdi mdi-delete-circle d-flex mt-1 ml-1 uploaded-file-delete-icon"
                                              onClick={() =>
                                                this.setState({
                                                  deletewwccPopup: true,
                                                })
                                              }
                                            ></i>
                                            {this.state.deletewwccPopup && (
                                              <DeletePopup
                                                togglePopup={(isDelete) =>
                                                  this.deleteFile(
                                                    isDelete,
                                                    "wwcc",
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
                                          to="/PoliceCheck"
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
export default WorkingWithChildrenChk;
