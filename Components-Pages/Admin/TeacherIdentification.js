// import React from "react";
// import { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { PORT } from "../../config";
// import { notify } from "react-notify-toast";
// import DateRange from "../User/DateRange";
// import "../User/UserProfile.css";
// import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
// const URL = PORT;

// const date = new Date().getDate();
// const formattedDate = ("0" + date).slice(-2);
// const month = new Date().getMonth() + 1;
// const formattedMonth = ("0" + month).slice(-2);
// const year = new Date().getFullYear();
// const minPoliceCheckYear = new Date().getFullYear() - 5;

// console.log(new Date().getFullYear() - 5);
// const todayDate = year + "-" + formattedMonth + "-" + formattedDate;
// const minPoliceCheckDate = minPoliceCheckYear + "-" + formattedMonth + "-" + formattedDate;
// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

// const Countries = ["Australia", "USA", "India", "Pakistan", "UK", "Africa"];
// const States = ["Victoria", "Tasmania", "Queensland", "New South Wales"];

// export class TeacherIdentification extends Component {
//   constructor(props) {
//     super(props);
//     let user = JSON.parse(window.localStorage.getItem("teacher"));
//     console.log(user.issuing_place);
//     if (user === null) {
//       window.location = "/login";
//     }
//     const id_document_expiry =
//       user.id_document_expiry !== null && user.id_document_expiry !== undefined
//         ? user.id_document_expiry.split("T")[0]
//         : todayDate;
//     const visa_expiry =
//       user.visa_expiry !== null && user.visa_expiry !== undefined
//         ? user.visa_expiry.split("T")[0]
//         : todayDate;
//     const police_check_release =
//       user.police_check_release !== null &&
//       user.police_check_release !== undefined
//         ? user.police_check_release.split("T")[0]
//         : todayDate;
//     const wwcc_expiry =
//       user.wwcc_expiry !== null && user.wwcc_expiry !== undefined
//         ? user.wwcc_expiry.split("T")[0]
//         : todayDate;
//     this.state = {
//       user: user,
//       identification_document_number: user.identification_document_number, // Passport/ Driving Licence number
//       id_document_type: user.id_document_type,
//       id_document_expiry: id_document_expiry,
//       passport_country: user.passport_country,
//       identification_url: user.identification_url,
//       identification_filename: user.identification_filename,
//       visa_url: user.visa_url,
//       visa_filename: user.visa_filename,
//       visa_duration:user.visa_duration,
//       issuing_place: user.issuing_place,
//       subclass_name: user.subclass_name,
//       subclass_number: user.subclass_number,
//       issuing_office: user.issuing_office,
//       police_check_filename: user.police_check_filename,
//       police_check_url: user.police_check_url,
//       police_check_release: police_check_release,
//       police_check_result: user.police_check_result,
//       police_check_type:user.police_check_type,
//       wwcc_filename: user.wwcc_filename,
//       wwcc_issuing_state: user.wwcc_issuing_state,
//       wwcc_url: user.wwcc_url,
//       wwcc_expiry: wwcc_expiry,
//       wwcc_number: user.wwcc_number,
//       visa_file: {
//         name: "",
//         type: "",
//         file: []
//       },
//       visa_status: user.visa_status,
//       visa_type: user.visa_type,
//       visa_expiry: visa_expiry,
//       visa_application_number: user.visa_application_number,
//       email: user.email,
//       displayVisaType:
//         user.visa_status !== null &&
//         user.visa_status !== undefined &&
//         user.visa_status === "I am Australian Citizen"
//           ? "none"
//           : "block",
//       displayOther: "none",
//       link_style: user.identification_filename === null ? "none" : "block",
//       visa_linkstyle: user.visa_filename === null ? "none" : "block",
//       policecheck_linkstyle:
//         user.police_check_filename === null ? "none" : "block",
//       wwcc_linkstyle: user.wwcc_filename === null ? "none" : "block"
//     };

//     this.handleddlChange = this.handleddlChange.bind(this);
//     this.handleradioChange = this.handleradioChange.bind(this);
//     this.setUserState = this.setUserState.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handlefileChange = this.handlefileChange.bind(this);
//     this.deleteIDDoc = this.deleteIDDoc.bind(this);
//     this.validateFile = this.validateFile.bind(this);
//     this.toggleFileUpload = this.toggleFileUpload.bind(this);
//     this.saveData = this.saveData.bind(this);
//     this.saveFile = this.saveFile.bind(this);
//     this.changeVisaType = this.changeVisaType.bind(this);
//     this.updateLocalStorage = this.updateLocalStorage.bind(this);
//     this.bindPlaces = this.bindPlaces.bind(this);
//   }

//   componentDidMount() {
//     this.toggleFileUpload(); // Disables file upload

//      // Bind data on page load
//     this.bindPlaces(States, "wwcc_issuing_state");
//     let place = this.state.visa_status === "I am Australian Citizen"? States: Countries;
//     this.bindPlaces(place, "issuing_place");
   
//     if(this.state.issuing_place !== null && this.state.issuing_place !== undefined){
//       document.getElementById("issuing_place").value = this.state.issuing_place;
//     }
//     if(this.state.wwcc_issuing_state !== null && this.state.wwcc_issuing_state !== undefined){
//       document.getElementById("wwcc_issuing_state").value = this.state.wwcc_issuing_state;
//     }
//   }

//   // Required validation for file: Checks if file is uploaded, else returns false
//   validateFile(file, filename) {
//     let isValid = false;
//     if(file !== null && file !== undefined)
//      {
//       isValid = true;
//     }
//     return isValid;
//   }

//   toggleFileUpload() {
//     if (
//       this.state.identification_filename !== null &&
//       this.state.identification_filename !== undefined
//     ) {
//       document.getElementById("flID").disabled = true;
//     } else {
//       document.getElementById("flID").disabled = false;
//     }
//     if (
//       this.state.visa_filename !== null &&
//       this.state.visa_filename !== undefined
//     ) {
//       document.getElementById("flVisa").disabled = true;
//     } else {
//       document.getElementById("flVisa").disabled = false;
//     }
//     if (
//       this.state.police_check_filename !== null &&
//       this.state.police_check_filename !== undefined
//     ) {
//       document.getElementById("flPoliceCheck").disabled = true;
//     } else {
//       document.getElementById("flPoliceCheck").disabled = false;
//     }
//     if (
//       this.state.wwcc_filename !== null &&
//       this.state.wwcc_filename !== undefined
//     ) {
//       document.getElementById("flWWCC").disabled = true;
//     } else {
//       document.getElementById("flWWCC").disabled = false;
//     }
//   }

//   saveData() {
//     axios
//       .put(`${URL}/updateIdentificationDetails`, {
//         id_document_type: this.state.id_document_type,
//         id_document_expiry: this.state.id_document_expiry,
//         identification_document_number: this.state
//           .identification_document_number,
//         passport_country: this.state.passport_country,
//         visa_status: this.state.visa_status,
//         visa_type: this.state.visa_type,
//         visa_expiry: this.state.visa_expiry,
//         email: this.state.email,
//         identification_url: this.state.identification_url,
//         identification_filename: this.state.identification_filename,
//         visa_filename: this.state.visa_filename,
//         visa_url: this.state.visa_url,
//         visa_application_number: this.state.visa_application_number,
//         issuing_place: this.state.issuing_place,
//         subclass_name: this.state.subclass_name,
//         subclass_number: this.state.subclass_number,
//         issuing_office: this.state.issuing_office,
//         police_check_result: this.state.police_check_result,
//         police_check_filename: this.state.police_check_filename,
//         police_check_url: this.state.police_check_url,
//         police_check_release: this.state.police_check_release,
//         police_check_type: this.state.police_check_type,
//         wwcc_filename: this.state.wwcc_filename,
//         wwcc_issuing_state: this.state.wwcc_issuing_state,
//         wwcc_url: this.state.wwcc_url,
//         wwcc_expiry: this.state.wwcc_expiry,
//         wwcc_number: this.state.wwcc_number
//       })
//       .then(res => {
//         console.log(res);
//         notify.show("Identification details saved successfully");
//       })
//       .catch(err => {
//         console.error();
//         notify.show(err);
//       });
//   }

//   saveFile(file, filename) {
//     let fileParts = file.name.split(".");
//     let fileType = fileParts[1];
//     let fileName = filename;
//     axios
//       .post(`${PORT}/s3`, {
//         fileName: fileName,
//         fileType: fileType,
//         _id: this.state.user._id
//       })
//       .then(response => {
//         const returnData = response.data.data.returnData;
//         const signedRequest = returnData.signedRequest;
//         const url = returnData.url;
//         let stateFileName = filename + "_filename";
//         let stateFileUrl = filename + "_url";
//         this.setState({ [stateFileName]: file.name });
//         this.setState({ [stateFileUrl]: url });
//         console.log("Signed request", signedRequest);
//         // Put the fileType in the headers for the upload
//         const options = {
//           headers: {
//             "Content-Type": fileType
//           }
//         };
//         axios
//           .put(signedRequest, file, options)
//           .then(response2 => {
//             // alert("Good " + JSON.stringify(response2));
//           })
//           .catch(error => {
//             // alert("ERROR " + JSON.stringify(error));
//           });
//       })
//       .catch(error => {
//         alert(JSON.stringify(error));
//       });
//   }

//   handleSubmit(event) {
    

//     this.saveData();
//     //document.getElementById("lnkEmergencyContact").click(); // Redirects to EmergencyContact Page
   
//     //   if(this.validateFile()){
//     //   let file = this.uploadInput.files[0];

//     //   // Split the filename to get the name and type
//     //   let fileParts = this.uploadInput.files[0].name.split(".");
//     //   let fileType = fileParts[1];

//     //   axios.post(`${PORT}/s3`,{
//     //     fileName : 'identification',
//     //     fileType : fileType,
//     //     _id : this.state.user._id
//     //   })
//     //   .then(response => {
//     //     const returnData = response.data.data.returnData;
//     //     const signedRequest = returnData.signedRequest;
//     //     const url = returnData.url;
//     //     this.setState({identification_filename:file.name});
//     //     this.setState({identification_url:url});
//     //     console.log("Signed request",signedRequest);
//     //    // Put the fileType in the headers for the upload
//     //     const options = {
//     //       headers: {
//     //         'Content-Type': fileType
//     //       }
//     //     };
//     //     axios.put(signedRequest,file,options)
//     //     .then(response2 => {
//     //         alert("Good " + JSON.stringify(response2));
//     //         axios
//     //         .put(`${URL}/updateIdentificationDetails`, {
//     //           id_document_type: this.state.id_document_type,
//     //           id_document_expiry: this.state.id_document_expiry,
//     //           passport_country: this.state.passport_country,
//     //           visa_status: this.state.visa_status,
//     //           visa_type: this.state.visa_type,
//     //           visa_expiry: this.state.visa_expiry,
//     //           email: this.state.email,
//     //           identification_url: this.state.identification_url,
//     //           identification_filename:file.name,
//     //         })
//     //         .then(res => {
//     //           console.log(res);
//     //         })
//     //         .catch(err => {
//     //           console.error();
//     //         });
//     //     })
//     //     .catch(error => {
//     //       alert("ERROR " + JSON.stringify(error));
//     //     })
//     //   })
//     //   .catch(error => {
//     //     alert(JSON.stringify(error));
//     //   })
//     // }else{
//     //   alert("please upload a file");
//     // }
//   }

//   setUserState(event) {
//     let field = event.target.name;
//     let value = event.target.value;
//     this.state[field] = value;
//     this.setState({ user: this.state.user });

//     this.updateLocalStorage(field, value);
//   }

//   // Updates local storage object when any control updates its state
//   updateLocalStorage(field, value) {
//     let userData = JSON.parse(window.localStorage.getItem("teacher"));
//     userData[`${field}`] = value;
//     window.localStorage.setItem("teacher", JSON.stringify(userData));
//   }

//   handleddlChange(e) {
//     if (e.target.name === "visa_type") {
//       if (e.target.value === "Other") {
//         this.setState({ displayOther: "block" });
//         var visaType = document.getElementById("txtOther").value;
//         this.setState({ visa_type: visaType });
//       } else {
//         this.setState({ displayOther: "none" });
//         this.setState({ visa_type: e.target.value });
//       }
//     }else if (e.target.name === "wwcc_issuing_state"){
//       this.setState({ wwcc_issuing_state: e.target.value });
//     }
//     else if(e.target.name === "issuing_place"){
//       this.setState({ issuing_place: e.target.value });

//     }
//     this.updateLocalStorage(e.target.name, e.target.value);
//   }
  
//   handlefileChange(e) {
//     var isValidFile = false;
//     let idFile = this.uploadInput.files[0];
//     let visaFile = this.uploadVisa.files[0];
//     let policecheckFile = this.uploadPoliceCheck.files[0];
//     let wwccFile = this.uploadWWCC.files[0];

//     isValidFile = this.validateFile(idFile, "identification");
//     if (isValidFile) {
//       this.saveFile(idFile, 'identification');
//     } 

//     isValidFile = this.validateFile(policecheckFile, "police_check");
//     if (isValidFile) {
//       this.saveFile(policecheckFile, 'police_check');
//     } 

//     isValidFile = this.validateFile(wwccFile, "wwcc");
//     if (isValidFile) {
//       this.saveFile(wwccFile, 'wwcc');
//     } 

//     isValidFile = this.validateFile(visaFile, "visa");
//     if (isValidFile) {
//       this.saveFile(visaFile, 'visa');
//     }
//   }

//   deleteIDDoc(e) {
//     // alert(e.target.name);
//     // notify.show("File deleted successfully");
//     // this.setState({ identification_filename: null });
//     // this.setState({identification_url : null});
//     // this.setState({ link_style: "none" });
//     // document.getElementById("flID").disabled = false;
//   }

//   handleradioChange(e) {
//     const field = e.target.name;
//     const value = e.target.title;
//     switch (field) {
//       case "visa_status":
//         this.changeVisaType(e);
//         break;
//       case "police_check_type":
//         this.setState({ police_check_type: value });
//         break;
//       case "id_document_type":
//         break;
//       default:
//     }
//     let userData = JSON.parse(window.localStorage.getItem("teacher"));
//     userData[`${field}`] = value;
//     window.localStorage.setItem("teacher", JSON.stringify(userData));
//   }

//   changeVisaType(e) {
//     let document_type = "";
//     this.setState({ visa_status: e.target.title });
//     if (e.target.title === "I am a visa holder") {
//       this.setState({ displayVisaType: "block" });
//       document_type = document.getElementById("rbPassport").title;
//       this.bindPlaces(Countries, "issuing_place");
//     } else {
//       this.setState({ displayVisaType: "none" });
//       this.setState({ displayOther: "none" });
//       this.setState({ visa_type: "" });
//       document_type = document.getElementById("rbDrivingLicence").title;

//       this.bindPlaces(States, "issuing_place");
//     }
//     this.setState({visa_status : e.target.title});
//     this.setState({ id_document_type: document_type });
//   }

//   bindPlaces(places, id) {
//     var selectElem = document.getElementById(id);
//     selectElem.innerHTML = "";
//     var e = document.createElement("option");
//     e.innerText = "Please Select";
//     selectElem.append(e);
//     for (var i = 0; i < places.length; i++) {
//       var item = places[i];
//       var element = document.createElement("option");
//       element.innerText = item;
//       selectElem.append(element);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <FixProfileNavbar />
//         <div className="auth-right d-lg-flex bg-photoregister ">
//           <div className='bg-gradient'></div>
//           <div className="profile-container">
//             <div className="profile-content-card-area">
//               <div className="tab-content clearfix">
//                 <div className="mt-5">
//                   <h1 className="mb-4">Personal Information</h1>
//                   <div className="userNavigation">
//                     <Link
//                       to={{  pathname: "/TeacherpersonalDetails"  }}
//                       className="user-links"
//                     >
//                       <p>1 - Personal Details</p>
//                     </Link>
//                     <Link
//                       to={{ pathname: "/TeacherIdentification"  }}
//                       className="user-links user-links-active"
//                     >
//                       <p>2 - Identification</p>
//                     </Link>
//                     <Link
//                       id="lnkEmergencyContact"
//                       to={{ pathname: "/TeacherEmergencyContact" }}
//                       className="user-links text-right"
//                     >
//                       <p>3 - Emergency Contact</p>
//                     </Link>
//                   </div>

//                   {/* cpntent of the form */}
//                   <div className="availability-table-container">
//                     <div className="availability-table">
                      
//                       {/* active card (on navigation bar) */}
//                       <div className="user-table-header availability-table-header-center">
//                         <div className="user-table-header-card">
//                           <h4 className="av-table-header-first-line">
//                             2 - Identification
//                           </h4>
//                         </div>
//                       </div>

//                       {/* container of the form */}
//                       <div className="availability-table-body">
//                           <div className="availability-table-body-content">
//                           <form id="frmIdentification" onSubmit={this.handleSubmit}>
//                             <div className="container  mt-5">
//                               <div className="row">
//                                 {/* TESTING BEFORE IMPLEMENTATION */}
//                                 <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

//                                 <div className="col-lg-6 col-md-6 col-sm-12">
//                                   <div className="auth-text-top mb-5">


//                                     <h2>Identification Document</h2>
//                                     {/* residential status radio button */}
//                                     <div className="radio-button-margin">
//                                       <label className="w-100 mb-0"><p className="float-left mb-0">Residential Status</p></label>
//                                       <div className="input-radio-buttons row justify-content-start">
//                                         <div className="">
//                                           <input
//                                             type="radio"
//                                             id="rbAUSCityzen"
//                                             name="visa_status"
//                                             onChange={this.handleradioChange}
//                                             checked={this.state.visa_status ==="I am Australian Citizen"}
//                                             title="I am Australian Citizen"
//                                             required
//                                           />
//                                           <label>I am Australian Citizen (Driving Licence)</label>
//                                         </div>
//                                         <div className="ml-5">
//                                           <input
//                                             type="radio"
//                                             id="rbVisaHolder"
//                                             name="visa_status"
//                                             onChange={this.handleradioChange}
//                                             checked={this.state.visa_status === "I am a visa holder"}
//                                             title="I am a visa holder"
//                                             required
//                                           />
//                                           <label>I am a visa holder (Passport)</label>
//                                         </div>
//                                       </div>
//                                     </div>
//                                     {/* document number */}
//                                     <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">{this.state.id_document_type} Number</p></label>
//                                       <div className="input-icon">
//                                         {this.state.id_document_type === "Passport" ?  <i className="mdi mdi-passport"></i> : <i className="mdi mdi-account-card-details"></i>}
//                                         <input
//                                           type="text"
//                                           className="form-control user-profile-form-input"
//                                           id="identification_document_number"
//                                           name="identification_document_number"
//                                           onChange={this.setUserState}
//                                           value={this.state.identification_document_number}    
//                                           required  
//                                           placeholder='Insert the ID Number'                                  
//                                         />
//                                       </div>
//                                     </div>

//                                     {/* document issuing place */}
//                                     {/* TODO: Chane select control to searchable dropdown */}
//                                     <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">{this.state.id_document_type === "Passport" ? "Issuing Country"  : "Issuing Australian State"}</p></label>
//                                       <div className="pl-1 dropdown-box br-4">
//                                         <select
//                                           className="form-control"
//                                           id="issuing_place"
//                                           name="issuing_place"
//                                           value={this.state.issuing_place}
//                                           onChange={this.handleddlChange}
//                                           required
//                                         >
//                                           <option>Please Select the Country</option>
//                                         </select>
//                                       </div>
//                                     </div>

//                                     {/* expiry date */}
//                                     {/* Chnage this control with React Date Picker */}
//                                     <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">{this.state.id_document_type} Expiry Date</p></label>
//                                       <div className="input-icon">
//                                         <i className="mdi mdi-calendar"></i>
//                                         <input
//                                           type="date"
//                                           className="form-control user-profile-form-input"
//                                           id="id_document_expiry"
//                                           name="id_document_expiry"
//                                           min={todayDate}
//                                           onChange={this.setUserState}
//                                           value={this.state.id_document_expiry }
//                                           required                             
//                                         />
//                                       </div>
//                                     </div>

//                                     {/* document upload */}
//                                     <div className="form-group mb-5">
//                                       <label className="w-100"><p className="float-left mb-0">Upload {this.state.id_document_type}</p></label>
//                                       <div className="input-icon d-flex justify-content-between ">
//                                         <i className="mdi mdi-upload"></i>
//                                         <input
//                                             type="txt"
//                                             className="form-control"
//                                             id="flID"
//                                             name="userIDDoc"
//                                             onChange={this.handlefileChange}
//                                             ref={ref => {this.uploadInput = ref;}}
//                                             required
//                                             placeholder='Attach a copy of your ID'
//                                           />
//                                           <button
//                                             type="button"
//                                             className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
//                                             onClick={this.handlefileChange}>
//                                             Upload
//                                           </button> 

                                          
//                                       </div>
//                                   {/* <div style={{display: this.state.link_style}}   className="text-left" >
//                                     <Link
//                                       to={{ pathname: this.state.identification_url }}
//                                       target="_blank"
//                                     >
//                                       <p className="uploaded-file-name">{this.state.identification_filename}</p>
//                                     </Link> */}
//                                     {/* <i
//                                       className="mdi mdi-file-remove"
//                                       onClick={()=>this.deleteIDDoc("userIDDoc")}
//                                     ></i> */}
//                                   {/* </div> */}
//                                     </div>

//                                     {/* VISA HOLDER FIELDS */}
//                                     <div
//                                       id="dvVisaHolder"
//                                       style={{display: this.state.displayVisaType}}
//                                       disabled={this.state.displayVisaType === "none" ? true  : false}
//                                     >

//                                       <h2>Visa</h2>

//                                       <div className="row mb-3">

//                                         {/* Visa Application Number */}
//                                         <div className="col-6 form-group mb-1">
//                                           <label className="w-100"><p className="float-left mb-0">Visa Application Number</p></label>
//                                           <div className="input-icon">
//                                             <i className="mdi mdi-file-document"></i>
//                                             <input
//                                               type="text"
//                                               className="form-control user-profile-form-input"
//                                               id="visa_application_number"
//                                               name="visa_application_number"
//                                               onChange={this.setUserState}
//                                               value={this.state.visa_application_number}
//                                               required={ this.state.displayVisaType === "block"  ? true : false }  
//                                               placeholder='Visa Grant Number'
//                                             />
//                                           </div>
//                                         </div>

//                                         {/* type of visa */}
//                                         <div className="col-6 form-group mb-1">
//                                           <label className="w-100"><p className="float-left mb-0">Type of Visa</p></label>
//                                           <div className="pl-1 dropdown-box br-4">
//                                             <select
//                                               className="form-control"
//                                               id="visa_type"
//                                               name="visa_type"
//                                               value={this.state.visa_type}
//                                               onChange={this.handleddlChange}
//                                               required={this.state.displayVisaType === "block"  ? true  : false }
//                                             >
//                                               <option value="">Please Select</option>
//                                               <option>Visitor</option>
//                                               <option>Studying/Training</option>
//                                               <option>Family & Partner</option>
//                                             </select>
//                                           </div>
//                                         </div>
//                                       </div>

//                                       <div className="row mb-3">
//                                          {/* Subclass Name */}
//                                         <div className="col-6 form-group mb-1">
//                                           <label className="w-100"><p className="float-left mb-0">Subclass Name</p></label>
//                                           <div className="">
//                                             <input
//                                               type="text"
//                                               className="form-control user-profile-form-input"
//                                               id="subclass_name"
//                                               name="subclass_name"
//                                               value={this.state.subclass_name}
//                                               onChange={this.setUserState}
//                                               required={ this.state.displayVisaType === "block"  ? true : false  } 
//                                               placeholder='Subclass Name'                                     
//                                             />
//                                           </div>
//                                         </div>
//                                         {/* Subclass Number */}
//                                         <div className="col-6 form-group mb-1">
//                                           <label className="w-100"><p className="float-left mb-0">Subclass Number</p></label>
//                                           <div className="">
//                                             <input
//                                               type="text"
//                                               className="form-control user-profile-form-input"
//                                               id="subclass_number"
//                                               name="subclass_number"
//                                               onChange={this.setUserState}
//                                               value={this.state.subclass_number}
//                                               required={ this.state.displayVisaType === "block"  ? true : false } 
//                                               placeholder='Subclass Number'                             
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>

                                     

//                                       {/* Duration of Visa */}
//                                       {/* <div className="form-group datepicker mb-1">
//                                         <label className="w-100"><p className="float-left mb-0">Duration of Visa</p></label>
//                                         <div className="input-icon">
//                                           <i className="mdi mdi-calendar datapicker-icon"></i>
//                                           <div style={styles}>
//                                                 <DateRange />
//                                               </div>
//                                         </div>
//                                       </div> */}

//                                       <div
//                                         id="dvVisaHolder"
//                                         style={{ display: this.state.displayVisaType  }}
//                                         disabled={ this.state.displayVisaType ===  "none"  ? true  : false }
//                                       >

//                                         {/* Issuing Office */}
//                                         <div className="form-group mb-3">
//                                           <label className="w-100"><p className="float-left mb-0">Issuing Country</p></label>
//                                           <div className="input-icon">
//                                             <i className="mdi mdi-web"></i>
//                                             <input
//                                               type="text"
//                                               className="form-control user-profile-form-input"
//                                               id="issuing_office"
//                                               name="issuing_office"
//                                               onChange={this.setUserState}
//                                               value={this.state.issuing_office}
//                                               required={ this.state.displayVisaType === "block"  ? true : false }   
//                                               placeholder='Country of Issue'                             
//                                             />
//                                           </div>
//                                         </div>

//                                         {/* visa expiry date */}
//                                         {/* Chnage this control with React Date Picker */}
//                                         {this.state.displayVisaType ===  "none" ?  null :
//                                         <div className="form-group mb-3">
//                                           <label className="w-100"><p className="float-left mb-0">Visa Expiry Date</p></label>
//                                           <div className="input-icon">
//                                             <i className="mdi mdi-calendar"></i>
//                                             <input
//                                               type="date"
//                                               className="form-control user-profile-form-input"
//                                               id="visa_expiry"
//                                               name="visa_expiry"
//                                               min={todayDate}
//                                               onChange={this.setUserState}
//                                               value={this.state.visa_expiry }
//                                               required                             
//                                             />
//                                           </div>
//                                         </div>
//                                         }

//                                     </div>

//                                     {/* visa upload */}
//                                     <div className="form-group">
//                                       <label className="w-100"><p className="float-left mb-0">Upload Visa</p></label>
//                                       <div className="input-icon d-flex justify-content-between ">
//                                         <i className="mdi mdi-upload"></i>
//                                         <input
//                                             type="txt"
//                                             className="form-control"
//                                             id="flVisa"
//                                             name="userVisaDoc"
//                                             onChange={ this.handlefileChange }
//                                             ref={ref => { this.uploadVisa = ref; }}
//                                             required={  this.state.displayVisaType ===  "block"  ? true  : false }
//                                             placeholder='Attache a copy of your Visa'
//                                           />
//                                           <button
//                                             type="button"
//                                             className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
//                                             onClick={this.handlefileChange}>
//                                             Upload
//                                           </button> 
                                          
//                                       </div>
//                                       {/* <div style={{display: this.state.link_style}} className="text-left">
//                                             <Link
//                                               to={{ pathname: this.state.visa_url }}
//                                               target="_blank"
//                                             >
//                                               <p className="uploaded-file-name">{this.state.visa_filename}</p>
//                                             </Link> */}
//                                             {/* <i
//                                                   className="mdi mdi-file-remove"
//                                                   onClick={this.deleteIDDoc}
//                                                 ></i> */}
//                                           {/* </div> */}
//                                     </div>
//                                     </div>
//                                   </div>
//                                 </div>



//                                 <div className="col-lg-6 col-md-6 col-sm-12">
//                                   <div className="auth-text-top mb-5"> 
                                  
//                                     <h2>Police Check</h2> 

//                                     {/* Police Check Type radio button */}
//                                     <div className="radio-button-margin mb-4">
//                                       <label className="w-100 mb-0 margintop-60"><p className="float-left mb-0">Police Check Type</p></label>
//                                       <div className="input-radio-buttons justify-content-start row">
//                                         <div className="">
//                                           <input
//                                             type="radio"
//                                             id="rbEmployment"
//                                             name="police_check_type"
//                                             title="Employement/Professional"
//                                             onChange={this.handleradioChange}
//                                             checked={ this.state.police_check_type ===  "Employement/Professional" }
//                                             required
//                                           />
//                                           <label>Employement/Professional</label>
//                                         </div>
//                                         <div className="ml-5">
//                                           <input
//                                             type="radio"
//                                             id="rbVolunteer"
//                                             name="police_check_type"
//                                             title="Volunteer/Student Placement"
//                                             onChange={ this.handleradioChange  }
//                                             checked={ this.state.police_check_type ===  "Volunteer/Student Placement" }
//                                             required
//                                           />
//                                           <label>Volunteer/Student Placement</label>
//                                         </div>
//                                       </div>
//                                     </div>

//                                     {/* residential status radio button */}
//                                     <div className="radio-button-margin d-none" >
//                                       <label className="w-100 mb-0"><p className="float-left mb-0">Identification Document Type</p></label>
//                                       <div className="input-radio-buttons row">
//                                         <div className="">
//                                           <input
//                                             type="radio"
//                                             id="rbDrivingLicence"
//                                             name="id_document_type"
//                                             onChange={this.handleradioChange}
//                                             checked={this.state.visa_status ==="I am Australian Citizen"}
//                                             title="Driving Licence"
//                                             required
//                                           />
//                                           <label>Driving Licence</label>
//                                         </div>
//                                         <div className="">
//                                           <input
//                                             type="radio"
//                                             id="rbPassport"
//                                             name="id_document_type"
//                                             onChange={this.handleradioChange}
//                                             checked={this.state.visa_status === "I am a Visa Holder"}
//                                             title="Passport"
//                                             required
//                                           />
//                                           <label>Passport</label>
//                                         </div>
//                                       </div>
//                                     </div>       

//                                     {/* Police Check Result */}
//                                     <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">Police Check Result</p></label>
//                                       <div className="input-icon">
//                                         <i className="mdi mdi-car-connected"></i>
//                                         <input
//                                           type="text"
//                                           className="form-control user-profile-form-input"
//                                           id="police_check_result"
//                                           name="police_check_result"
//                                           onChange={this.setUserState}
//                                           value={this.state.police_check_result}
//                                           required
//                                           placeholder='Police Check Result'                        
//                                         />
//                                       </div>
//                                     </div>

//                                     {/* Police Check Release Date */}
//                                       {/* Chnage this control with React Date Picker */}
//                                       <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">Police Check Release Date</p></label>
//                                       <div className="input-icon">
//                                         <i className="mdi mdi-calendar"></i>
//                                         <input
//                                           type="date"
//                                           className="form-control user-profile-form-input"
//                                           id="police_check_release"
//                                           name="police_check_release"
//                                           min={minPoliceCheckDate}
//                                           onChange={this.setUserState}
//                                           value={  this.state.police_check_release }
//                                           required                                 
//                                         />
//                                       </div>
//                                     </div>

//                                     {/* Upload Police Check */}
//                                     <div className="form-group mb-5">
//                                       <label className="w-100 lineheight-17">
//                                         <p className="float-left mb-0">Upload Police Check</p>
//                                         <div className='span-hovered'>
//                                           <i className="mdi mdi-checkbox-marked-circle mdi-spin float-right check-gray"></i>
//                                           <span className="span-hovered-content">This document has not been verified yet!</span>
//                                         </div>
//                                       </label>
//                                       <div className="input-icon d-flex justify-content-between ">
//                                         <i className="mdi mdi-upload"></i>
//                                         <input
//                                             type="txt"
//                                             className="form-control"
//                                             id="flPoliceCheck"
//                                             name="userPoliceCheck"
//                                             onChange={this.handlefileChange}
//                                             ref={ref => {this.uploadPoliceCheck = ref;}}
//                                             required
//                                             placeholder='Attach a copy of your Police Check Document' 
//                                           />
//                                           <button
//                                             type="button"
//                                             className="ml-3 pl-5 pr-5 mr-0 btn btn-primary btn-c primary-button-no-margin-hover"
//                                             onClick={this.handlefileChange}>
//                                             Upload
//                                           </button> 
                                          
//                                       </div>
//                                       <div style={{display: this.state.policecheck_linkstyle}} className="text-left">
//                                             <Link
//                                               to={{ pathname: this.state.police_check_url }}
//                                               target="_blank"
//                                             >
//                                               <p className="uploaded-file-name">{this.state.police_check_filename}</p>
//                                             </Link>
//                                             {/* <i
//                                               className="mdi mdi-file-remove"
//                                               onClick={()=>this.deleteIDDoc}
//                                             ></i> */}
//                                           </div>
//                                     </div>


//                                     <h2>Working With Children Check</h2>

//                                     {/* WWCC Number */}
//                                     <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">Working With Children Check Number</p></label>
//                                       <div className="input-icon">
//                                         <i className="mdi mdi-human-child"></i>
//                                         <input
//                                           type="text"
//                                           className="form-control user-profile-form-input"
//                                           id="wwcc_number"
//                                           name="wwcc_number"
//                                           onChange={this.setUserState}
//                                           value={this.state.wwcc_number}
//                                           required
//                                           placeholder='WWCC Number'                      
//                                         />
//                                       </div>
//                                     </div>

//                                     {/* WWCC Issuing State */}
//                                     <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">Working With Children Check Issuing State</p></label>
//                                       <div className="pl-1 dropdown-box br-4">
//                                         <select
//                                           className="form-control"
//                                           id="wwcc_issuing_state"
//                                           name="wwcc_issuing_state"
//                                           value={this.state.wwcc_issuing_state}
//                                           onChange={this.handleddlChange}
//                                           required
//                                         >
//                                           <option>Please Select the issuing State</option>
//                                         </select>
//                                       </div>
//                                     </div>

//                                     {/* WWCC Expiry Date */}
//                                     {/* Chnage this control with React Date Picker */}
//                                     <div className="form-group mb-3">
//                                       <label className="w-100"><p className="float-left mb-0">Working With Children Check Expiry Date</p></label>
//                                       <div className="input-icon">
//                                         <i className="mdi mdi-calendar"></i>
//                                         <input
//                                           type="date"
//                                           className="form-control user-profile-form-input"
//                                           id="wwcc_expiry"
//                                           name="wwcc_expiry"
//                                           min={todayDate}
//                                           onChange={this.setUserState}
//                                           value={this.state.wwcc_expiry }
//                                           required                             
//                                         />
//                                       </div>
//                                     </div>


//                                     {/* WWCC upload */}
//                                     <div className="form-group">
//                                       <label className="w-100 lineheight-17">
//                                         <p className="float-left mb-0">Upload Working With Children Check Document</p>
//                                         <div className='span-hovered'>
//                                           <i className="mdi mdi-checkbox-marked-circle float-right check-green"></i>
//                                           <span className="span-hovered-content">This document has been verified!</span>
//                                         </div>
//                                       </label>
//                                       <div className="input-icon d-flex justify-content-between">
//                                         <i className="mdi mdi-upload"></i>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="flWWCC"
//                                             name="userWWCC"
//                                             onChange={this.handlefileChange}
//                                             ref={ref => {this.uploadWWCC = ref;}}
//                                             required
//                                           />
//                                           <button
//                                             type="button"
//                                             className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
//                                             onClick={this.handlefileChange}>
//                                             Upload
//                                           </button> 
//                                           {/* <div style={{display: this.state.wwcc_linkstyle}} className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover">
//                                             <Link
//                                               to={{ pathname: this.state.wwcc_url }}
//                                               target="_blank"
//                                             >
//                                               <p>{this.state.wwcc_filename}</p>
//                                             </Link>
//                                             {/* <i
//                                               className="mdi mdi-file-remove"
//                                               onClick={()=>this.deleteIDDoc}
//                                             ></i> */}
//                                           {/* </div> */} 
//                                       </div>
//                                     </div>

//                                   </div>
//                                 </div>

//                               </div>




//                               {/* submit button */}
//                               <div className="row pr-0 mr-0">
//                                 <div className="col-md-4">
//                                   <Link
//                                     type="back"
//                                     value="Back"
//                                     to="/TeacherpersonalDetails"
//                                     className="btn btn-block btn-c secondary-button-no-margin-hover"
//                                   > Back </Link>
//                                 </div>
//                                 <div className="col-md-4 pr-0">
//                                   <button
//                                     type="submit"
//                                     className="btn btn-primary btn-block btn-c primary-button-no-margin-hover" 
//                                   > Submit </button>
//                                 </div>
//                                 <div className="col-md-4"><Link
//                                     type="next"
//                                     value="Next"
//                                     to="/TeacherEmergencyContact"
//                                     className="btn btn-block btn-c secondary-button-no-margin-hover"
//                                   > Next </Link></div>
//                               </div>





//                               </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default TeacherIdentification;
