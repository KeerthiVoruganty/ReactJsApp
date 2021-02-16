// import React from "react";
// import { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { PORT } from "../../config";
// import { notify } from "react-notify-toast";
// import "../User/UserProfile.css";

// import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
// const URL = PORT;

// export class TeacherEmergencyContact extends Component {
//   constructor(props) {
//     super(props);
//     let user = JSON.parse(window.localStorage.getItem("teacher"));
//     if (user === null) {
//       window.location = "/login";
//     }
//     this.state = {
//       emergency_contact_name: user.emergency_contact_name,
//       emergency_contact_lastname: user.emergency_contact_lastname,
//       emergency_contact_mobile_number: user.emergency_contact_mobile_number,
//       emergency_contact_relationship: user.emergency_contact_relationship,
//       medical_needs: user.medical_needs,
//       email: user.email
//     };
//     this.setUserState = this.setUserState.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.validateMobileNumber = this.validateMobileNumber.bind(this);
//   }

//   validateMobileNumber(){
//     let isValid = false;
//     if (isNaN(this.state.emergency_contact_mobile_number)) {
//       notify.show("please type valid number", "error");
//     }else if(this.state.emergency_contact_mobile_number.length === 10 && this.state.emergency_contact_mobile_number.substring(0,2) === "04"){
//       isValid = true;
//     }else{
//       notify.show(
//         "please use australian number eg:04XXXXXXXX (10 Digit)",
//         "error"
//       );
//     }
//     return isValid;
//   }
//   handleSubmit(event) {
//   event.preventDefault();
//     if (this.validateMobileNumber()) {
//       axios
//         .put(`${URL}/updateEmergencyContact`, {
//           emergency_contact_name: this.state.emergency_contact_name,
//           emergency_contact_mobile_number:
//            this.state.emergency_contact_mobile_number,
//           emergency_contact_relationship: this.state
//             .emergency_contact_relationship,
//           emergency_contact_lastname: this.state.emergency_contact_lastname,
//           medical_needs: this.state.medical_needs,
//           email: this.state.email
//         })
//         .then(res => {
//           notify.show("Emergency contact details saved successfully");
//           //document.getElementById("pProfile").click(); // Redirects to Profile Page
//           console.log(res);
//         })
//         .catch(err => {
//           notify.show("Error", "error");
//           console.error();
//         });
//     }else{
//       notify.show("Error", "error");
//     }
//   }
  
//   setUserState(event) {
//     let field = event.target.name;
//     let value = event.target.value;
//     let userData = JSON.parse(window.localStorage.getItem("teacher"));

//     this.state[field] = value;
//     this.setState({ [`${field}`]: value });
//     userData[`${field}`] = value;
//     window.localStorage.setItem("teacher", JSON.stringify(userData));
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

//                   {/* navigationbar on top */}
//                   <div className="userNavigation">
//                     <Link
//                       to={{
//                         pathname: "/TeacherpersonalDetails"
//                       }}
//                       className="user-links"
//                     >
//                       <p>1 - Personal Details</p>
//                     </Link>
//                     <Link
//                       id="pProfile"
//                       to={{
//                         pathname: "/TeacherIdentification"
//                       }}
//                       className="user-links text-center"
//                     >
//                       <p>2 - Identification</p>
//                     </Link>
//                     <Link
//                       to={{
//                         pathname: "/TeacherEmergencyContact"
//                       }}
//                       className="user-links user-links-active"
//                     >
//                       <p>3 - Emergency Contact</p>
//                     </Link>
//                     <Link
//                       id="lnkProfile"
//                       to={{
//                         pathname: "/"
//                       }}
//                       style={{display:"none"}}
//                       className="user-links text-right"
//                     ></Link>
//                   </div>

//                   {/* cpntent of the form */}
//                   <div className="availability-table-container">
//                     <div className="availability-table">
//                       {/* active card (on navigation bar) */}
//                       <div className="user-table-header availability-table-header-end">
//                         <div className="user-table-header-card float-right text-right">
//                           <h4 className="av-table-header-first-line">
//                             3 - Emergency Contact
//                           </h4>
//                         </div>
//                       </div>



//                       {/* container of the form */}
//                       <div className="availability-table-body">
//                         <div className="availability-table-body-content">

//                           <div className="tab-content clearfix">
//                             <form onSubmit={this.handleSubmit}>
//                               <div className="container mt-5">
//                                 {/* TESTING BEFORE IMPLEMENTATION */}
//                                 <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

//                                   <div className="row">
//                                     <div className="col-lg-6 col-md-6 col-sm-12">
//                                       <div className="auth-text-top mb-5">
//                                         <div className="form-group">
//                                           <label className="w-100"><p className="float-left mb-0">First Name</p></label>
//                                           <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
//                                             <i className='mdi mdi-account '></i>
//                                             <input
//                                               type="text"
//                                               className="form-control mb-0"
//                                               id="emergency_contact_name"
//                                               required
//                                               name="emergency_contact_name"
//                                               value={this.state.emergency_contact_name}
//                                               onChange={this.setUserState}
//                                               placeholder='Emergency contact - First Name'
//                                             />
//                                           </div>  
//                                         </div>

//                                         <div className="form-group">
//                                           <label className="w-100"><p className="float-left mb-0">Last Name</p></label>
//                                           <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
//                                             <i className='mdi mdi-account-outline'></i>
//                                             <input
//                                               type="text"
//                                               className="form-control mb-0"
//                                               id="emergency_contact_lastname"
//                                               name="emergency_contact_lastname"
//                                               value={this.state.emergency_contact_lastname}
//                                               onChange={this.setUserState}
//                                               required
//                                               placeholder='Emergency contact - Last Name'
//                                             />
//                                           </div>  
//                                         </div>
                                       
//                                         <div className="form-group">
//                                           <label className="w-100"><p className="float-left mb-0">Mobile number</p></label>
//                                           <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
//                                             <i className='mdi mdi-phone'></i>
//                                             <input
//                                               type="text"
//                                               className="form-control mb-0"
//                                               id="emergency_contact_mobile_number"
//                                               name="emergency_contact_mobile_number"
//                                               value={this.state.emergency_contact_mobile_number}
//                                               onChange={this.setUserState}
//                                               required
//                                               placeholder='Emergency contact - Phone number'
//                                             />
//                                           </div>  
//                                         </div>
                                       
//                                       </div>
//                                     </div>
//                                     <div className="col-lg-6 col-md-6 col-sm-12">
//                                       <div className="auth-text-top mb-5">

//                                         <div className="form-group">
//                                           <label className="w-100"><p className="float-left mb-0">Relationship to you</p></label>
//                                           <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
//                                             <i className='mdi mdi-account-heart'></i>
//                                             <input
//                                               type="text"
//                                               className="form-control mb-0"
//                                               id="emergency_contact_relationship"
//                                               required
//                                               name="emergency_contact_relationship"
//                                               value={this.state.emergency_contact_relationship}
//                                               onChange={this.setUserState}
//                                               placeholder='Indicate your relationship'
//                                             />
//                                           </div>  
//                                         </div>

//                                         <div className="form-group">
//                                           <label className="w-100"><p className="float-left mb-0">Allergies / Medication / Conditions (If Any)</p></label>
//                                           <div className="d-flex justify-content-between ml-0 mr-0 w-100 input-icon">
//                                             {/* <i className='mdi mdi-alarm-light-outline'></i> */}
//                                             <i className='mdi mdi-needle'></i>
//                                             {/* <input
//                                               type="text"
//                                               className="form-control mb-0"
//                                               id="medical_needs"
//                                               name="medical_needs"
//                                               value={this.state.medical_needs}
//                                               onChange={this.setUserState}
//                                               required
//                                             /> */}
//                                             <textarea
//                                               rows="5"
//                                               className="form-control mb-0"
//                                               id="medical_needs"
//                                               name="medical_needs"
//                                               value={this.state.medical_needs}
//                                               onChange={this.setUserState}
//                                               required
//                                               placeholder='Please, indicate if you have any medical condition we should to be aware of'
//                                             ></textarea>
//                                           </div>  
//                                         </div>

//                                       </div>
//                                     </div>
//                                   </div>
//                                   {/* submit & back buttons */}
//                                   <div className="row pr-0 mr-0">
//                                     <div className="col-md-4">
//                                       <Link
//                                         type="back"
//                                         value="Back"
//                                         to="/TeacherIdentification"
//                                         className="btn btn-block btn-c secondary-button-no-margin-hover"
//                                       >Back</Link>
//                                     </div>
//                                     <div className="col-md-4 pr-0">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
//                                       >Submit</button>
//                                     </div>
//                                     <div className="col-md-4"><Link
//                                     type="teachers"
//                                     value="Teachers"
//                                     to="/AllTeachers"
//                                     className="btn btn-block btn-c secondary-button-no-margin-hover"
//                                   > All Teachers </Link></div>
//                                   </div>
//                               </div>
//                             </form>
//                           </div>
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
// export default TeacherEmergencyContact;
