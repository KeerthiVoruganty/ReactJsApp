import React, { Component } from "react";
import axios from "axios";
import "../User/UserProfile.css";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import ProfileStatus from "../../Components/StatusAlerts/ProfileStatus";
import { PORT } from "../../config";
import { notify } from 'react-notify-toast';

const date = new Date().getDate();
const formattedDate = ("0" + date).slice(-2);
const month = new Date().getMonth() + 1;
const formattedMonth = ("0" + month).slice(-2);
const year = new Date().getFullYear();
const URL = PORT;
// const userData = [];

const todayDate = year + "-" + formattedMonth + "-" + formattedDate;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(window.localStorage.getItem('user'));
    this.state = {
      first_name: user.first_name,
      last_name: user.last_name,
      preferred_name: user.preferred_name,
      contact_number: user.contact_number,
      street: user.street,
      suburb: user.suburb,
      email:user.email,
      postcode: user.postcode,
      visa_status: user.visa_status,
      emergency_contact_name: user.emergency_contact_name,
      emergency_contact_relationship: user.emergency_contact_relationship,
      emergency_contact_mobile_number: user.emergency_contact_mobile_number,
      displayOther: "none",
      displayVisaType: "none",
      file_name: "",
      passport_country: "",
      ID_Doc_Type: "",
      visa_type: "",
      current_password:"",
      new_password:"",
      re_new_password:""
      //  type_identity_doc:""
    };
    this.handleddlChange = this.handleddlChange.bind(this);
    this.handleradioChange = this.handleradioChange.bind(this);
    this.handleIDddlChange = this.handleIDddlChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setUserState = this.setUserState.bind(this);
    this.validattion = this.validattion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   // this.handlecontactChange = this.handlecontactChange.bind(this);
  }


  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state[field] = value;
    this.setState({ user: this.state.user });
  }

  
  componentDidMount = async () => {
    
    // try {
    //   const responseData = await axios.get(`${PORT}/user`);
    //   console.log(
    //     responseData.data.visa_type === "I am a visa holder" ? "block" : "none"
    //   );
    //   this.setState({
    //     first_name: responseData.data.first_name,
    //     last_name: responseData.data.last_name,
    //     preferred_name: responseData.data.preferred_name,
    //     contact_number: responseData.data.contact_number,
    //     street: responseData.data.street,
    //     suburb: responseData.data.suburb,
    //     postcode: responseData.data.postcode,
    //     visa_status: responseData.data.visa_status,
    //     emergency_contact_name: responseData.data.emergency_contact_name,
    //     emergency_contact_relationship:
    //       responseData.data.emergency_contact_relationship,
    //     emergency_contact_mobile_number:
    //       responseData.data.emergency_contact_mobile_number,
    //     passport_country: responseData.data.passport_country,
    //     displayOther: "none",
    //     displayVisaType:
    //       responseData.data.visa_status === "I am a visa holder"
    //         ? "block"
    //         : "none",
    //     visa_type: responseData.data.visa_type,
    //     ID_Doc_Type: responseData.data.ID_Doc_Type
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  handleddlChange(e) {
    if (e.target.value === "Other") {
      this.setState({ displayOther: "block" });
    } else {
      this.setState({ displayOther: "none" });
      this.setState({ visa_status: e.target.value });
    }
  }

  handleIDddlChange(e) {
    this.setState({ ID_Doc_Type: e.target.value });
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    return this.setState({
      [name]: value
    });
  }

  handlefileChange(e) {
    this.setState({
      file_name: e.target.files[0].name
    });
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);

    // reader.onload = (e) => {
    //   console.warn("file data",e.target.result);
    // }
  }

  handleradioChange(e) {
    this.setState({ visa_status: e.target.title });

    if (e.target.title === "I am a visa holder") {
      this.setState({ displayVisaType: "block" });
    } else {
      this.setState({ displayVisaType: "none" });
      this.setState({ displayOther: "none" });
    }
  }

  handleSubmit(event) {

   if(isNaN(this.state.emergency_contact_mobile_number))
    {
      alert("please type valid number");  
    }
    
  else if(this.state.emergency_contact_mobile_number.length == 8)
      {
    alert("Saved in database");
     axios
       .post(`${URL}/user`, {
              first_name: this.state.first_name,
               last_name: this.state.last_name,
               email:this.state.email,
               preferred_name: this.state.preferred_name,
               contact_number: this.state.contact_number,
               street: this.state.street,
               suburb: this.state.suburb,
               postcode: this.state.postcode,
               visa_status: this.state.visa_status,
               emergency_contact_name: "04"+ this.state.emergency_contact_name,
               emergency_contact_relationship: this.state
                 .emergency_contact_relationship,
               emergency_contact_mobile_number: this.state
                 .emergency_contact_mobile_number
       })
       .then(res => {
         console.log(res);
       })
       .catch(err => {
         console.error();
       });
  
  }

else{
    alert("please use australian number eg:04-XXXXXXXX (8 Digit)")
    }

}
  validattion(){
    var isValid = false;
    if(this.state.new_password !== "" && this.state.re_new_password !== "" && this.state.current_password !== ""){
      if(this.state.new_password === this.state.re_new_password  ){
        console.log(this.state.new_password + "-----new password--------");
        isValid = true;
      }
      else {
        alert("Passwords did not match.");
        isValid = false;
      }
    }else if((this.state.new_password === "" && (this.state.re_new_password !== ""  || this.state.current_password !== ""))|| (this.state.new_password !== "" && (this.state.re_new_password === "" || this.state.current_password !== "")) || ((this.state.new_password !== "" || this.state.re_new_password !== "")&& this.state.current_password === "")){
      alert("Please enter new password and/or re-enter new password and/or current password");
      isValid = false;
    }
    return isValid;
  }
  // handleSubmit(event) {
  //   event.preventDefault();
  //   axios
  //     .put(`${PORT}/palaktank1111@gmail.com`, {
  //       first_name: this.state.file_name,
  //       last_name: this.state.last_name,
  //       preferred_name: this.state.preferred_name,
  //       contact_number: this.state.contact_number,
  //       street: this.state.street,
  //       suburb: this.state.suburb,
  //       postcode: this.state.postcode,
  //       visa_status: this.state.visa_status,
  //       emergency_contact_name: this.state.emergency_contact_name,
  //       emergency_contact_relationship: this.state
  //         .emergency_contact_relationship,
  //       emergency_contact_mobile_number: this.state
  //         .emergency_contact_mobile_number,
  //       passport_country: this.state.passport_country,
  //       ID_Doc_Type: this.state.ID_Doc_Type,
  //       visa_type: this.state.visa_type
  //     })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.error();
  //     });
  // }

  render() {
    return (
      <div>
        {/* menu bar */}
        <FixProfileNavbar />

        <div className="auth-right d-lg-flex bg-photoregister ">
          <div className="bg-gradient"></div>
          <div className="profile-container">
            {/* status link with alerts: when the status value is ACTIVE, it should link to the success-bot,
            otherwise, it should link to the error-box */}
            <ProfileStatus />

            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="profile-area">
                  <form>
                    <div className="container row">
                      {/* TESTING BEFORE IMPLEMENTATION */}
                      <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="row auth-form ">
                          <div className="col-12 col-sm-12">
                            <div className="auth-text-top mb-5">
                              <h3>Personal Information</h3>
                              <hr></hr>

                              <div className="form-group">
                                <label>First Name</label>
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
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtLastName"
                                  name="last_name"
                                  required
                                  value={this.state.last_name}
                                  onChange={this.setUserState}
                                />
                              </div>

                              <div className="form-group">
                                <label>Prefered Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtPN"
                                  required
                                  name="preferred_name"
                                  value={this.state.preferred_name}
                                  onChange={this.setUserState}
                                />
                              </div>
                              <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtContactNumber"
                                  required
                                  name="contact_number"
                                  value={this.state.contact_number}
                                  onChange={this.setUserState}
                                />
                              </div>

                              <div className="form-group">
                                <label>Address - Street Details</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtAddress"
                                  required
                                  value={
                                    this.state.postcode +
                                    ", " +
                                    this.state.street +
                                    " " +
                                    this.state.suburb
                                  }
                                  readOnly
                                />
                              </div>
                              <div className="form-group">
                                <label>Street</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtState"
                                  required
                                  name="street"
                                  value={this.state.street}
                                  onChange={this.setUserState}
                                />
                              </div>
                              <div className="form-group">
                                <label>Suburb</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtSuburb"
                                  required
                                  name="suburb"
                                  value={this.state.suburb}
                                  onChange={this.setUserState}
                                />
                              </div>
                              <div className="form-group">
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtPostalCode"
                                  required
                                  name="postcode"
                                  value={this.state.postcode}
                                  onChange={this.setUserState}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="row auth-form ">
                          <div className="col-12 col-sm-12">
                            <div className="auth-text-top mb-5">
                              <h3>Identification</h3>
                              <hr></hr>

                              <div className="form-group">
                                <label>Passport Country</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtPastportCountry"
                                  name="passport_country"
                                  value={this.state.passport_country}
                                  onChange={this.setUserState}
                                />
                              </div>

                              <div className="form-group">
                                <label>Identification Document Type</label>
                                <div className="form-group dropdown-box dropdown-box-no-padding">
                                  <select
                                    className="form-control"
                                    name="ID_Doc_Type"
                                    onChange={this.handleddlChange}
                                   // value={this.state.ID_Doc_Type}
                                    required
                                  >
                                    <option value="">Select ID Type</option>
                                    <option>Passport</option>
                                    <option>Driving License</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Upload ID</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="flID"
                                  name="userIDDoc"
                                  onChange={this.handlefileChange}
                                />
                              </div>
                              <div className="form-group">
                                <label>
                                  Identification Document Expiry Date
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="txtExpiryDate"
                                  min={todayDate}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="radio ">
                                <label>Visa Status</label>
                                <div className="input-radio-buttons row">
                                  <div>
                                    <input
                                      type="radio"
                                      id="rbAUSCityzen"
                                      name="visa_status"
                                      onChange={this.handleradioChange}
                                      checked={
                                        this.state.visa_status ===
                                        "I am Australian Citizen"
                                      }
                                      title="I am Australian Citizen"
                                    />
                                    {""}
                                    <label>I am Australian Citizen</label>
                                  </div>
                                  <div>
                                    <input
                                      type="radio"
                                      id="rbVisaHolder"
                                      name="visa_status"
                                      onChange={this.handleradioChange}
                                      checked={
                                        this.state.visa_status ===
                                        "I am a visa holder"
                                      }
                                      title="I am a visa holder"
                                    />
                                    {""}
                                    <label>I am a visa holder</label>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="form-group"
                                id="dvVisaType"
                                style={{ display: this.state.displayVisaType }}
                              >
                                <label>Visa Type</label>
                                <div className="form-group dropdown-box dropdown-box-no-padding">
                                  <select
                                    className="form-control"
                                    name="visa_type"
                                    value={this.state.visa_type}
                                    onChange={this.handleddlChange}
                                    required
                                  >
                                    <option value="">Select Visa Type</option>
                                    <option>Student Visa 457</option>
                                    <option>Partner Spouse visa</option>
                                    <option>Working Holiday</option>
                                    <option>Skilled Migration</option>
                                    <option>Asylum/ Refugee </option>
                                    <option>TR / PR </option>
                                    <option>Other</option>
                                  </select>
                                </div>
                              </div>
                              <div
                                className="form-group"
                                style={{ display: this.state.displayOther }}
                              >
                                <label>Other</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtOther"
                                />
                              </div>
                              <div className="form-group">
                                <label>Visa Expiry Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="txtExpiryDate"
                                  min={todayDate}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="row auth-form ">
                          <div className="col-12 col-sm-12">
                            <div className="auth-text-top mb-5">
                              <h3>Emergency Contact</h3>
                              <hr></hr>

                              <div className="form-group">
                                <label>Emergency Contact Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtECName"
                                  required
                                  name="emergency_contact_name"
                                  value={this.state.emergency_contact_name}
                                  onChange={this.setUserState}
                                />
                              </div>
                              <div className="form-group">
                                <label> Emergency Contact Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtECNumber"
                                  name="emergency_contact_mobile_number"
                                  value={
                                    this.state.emergency_contact_mobile_number
                                  }
                                  onChange={this.setUserState}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Emergency Contact Relationship</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtECRelationship"
                                  name="emergency_contact_relationship"
                                  onChange={this.setUserState}
                                  value={
                                    this.state.emergency_contact_relationship
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                    
                     
                      </div>
                    </div>
                    
                    <div className="row auth-form">
                    <div className="col-4 col-sm-12">
                        <div className="auth-text-top mb-1">
                          <h3>Submit Changes</h3>
                          <hr></hr>
                          
                        </div>
                      </div>
                      <div className="col-6 col-xs-12">
                          <button
                            type="reset" value="Reset"
                            className="btn btn-block btn-c secondary-button-no-margin-hover">
                            Clear
                          </button>
                      </div>
                      <div className="col-6 col-xs-12">
                        
                          <button
                            type="submit" onClick={this.handleSubmit}
                            className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">
                            Submit
                          </button>
                      </div>
                    </div>
                     
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserProfile;
