import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../User/DateRange.css";
import Select from "react-select";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import "../User/UserProfile.css";
import "react-datepicker/dist/react-datepicker.css";

export class CollegeDetails extends Component {

  render() {
    return (
      <div>
        <FixProfileNavbar />
        <div className="auth-right d-lg-flex bg-photoregister ">
          <div className="bg-gradient"></div>
          <div className="profile-container">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">Manage Profile Information</h1>

                  {/* content of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      {/* container of the form */}
                      <div className="availability-table-body mb-0">
                        <div className="availability-table-body-content">
                         
                            <div className="container">
                              <div className="row">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>
                                  <div className="auth-text-top col-lg-6 col-md-12">
                                  <div className="form-group">
                                    <label className="w-100"><p className="float-left mb-0">College Name</p></label>
                                    <div className="input-icon d-flex justify-content-between ">
                                      <i className="mdi mdi-school"></i>
                                      <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          placeholder="Institution Name"
                                        />
                                      <button
                                        // id="btnUpload_identification"
                                        type="button"
                                        required
                                        className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                        // onClick={()=> this.uploadDocument("identification")}
                                        >
                                        Change
                                      </button> 
                                    </div>
                                  </div>
                                  </div>
                                  <div className="auth-text-top col-lg-6 col-md-12">
                                  <div className="form-group">
                                    <label className="w-100"><p className="float-left mb-0">Logo</p></label>
                                    <div className="input-icon d-flex justify-content-between ">
                                      <i className="mdi mdi-image-outline"></i>
                                      <input
                                        type="txt"
                                        className="form-control"
                                        placeholder='Logo'
                                        disabled
                                        />
                                      <input type="file"
                                        // id="identification"
                                        // name="identification"
                                        // onChange={()=>this.handleIdentificationFileChange()}
                                        // ref={ref => {this.uploadInput = ref;}}
                                        style={{display:"none"}} 
                                        accept="image/*, .pdf"/>
                                      <button
                                        // id="btnUpload_identification"
                                        type="button"
                                        required
                                        className="ml-3 pl-5 pr-5 btn btn-primary btn-c primary-button-no-margin-hover"
                                        // onClick={()=> this.uploadDocument("identification")}
                                        >
                                        Upload
                                      </button> 
                                    </div>

                                    <div className="row">
                                    <div className="text-left d-flex ml-3" >
                                      <Link
                                        // to={{ pathname: this.state.identification_url }}
                                        target="_blank">
                                        <p className="uploaded-file-name mt-1 ml-1">filename
                                          </p>
                                      </Link> 
                                    </div>
                                  </div>
                                  </div>
                                  </div>
                              </div>



{/* people */}
                              <div className="w-fill  availability-table profile-qualification-container gray-shadow-box mb-5">
                                <div className="d-flex justify-content-between mt-5 ">
                                  <h4 className="font-xlg text-left ml-5 pl-4 text-gradient  d-flex">PEOPLE</h4>
                                  <p className="d-flex small text-right my-auto mr-5">List of people allowed to access this profile.</p>
                                </div>
                                    <div className="profile-qualification-body">
                                      <hr className="qualification-line"></hr>
                                      {/* here a list of all people added so far, the button to delete them, and a button to add new */}
                                          <div className="availability-table-body m-0 row pt-0 padding-left-80 padding-right-60 pb-0">
                                          <ul className="profile-list-qualifications resume-list">
                                          
                                              {/* each li represents a person, with his  information */}
                                              <li className="mb-3" >
                                                <div className="d-flex justify-content-between">
                                                  <p className="ml-1 mb-0 float-left d-flex text-lg"><i className="mdi mdi-account-circle mr-1"></i>Full Name</p>
                                                  <div className="float-right pr-0 resume-delete-qualification">
                                                    <div className='delete-box'>
                                                      <button name='delete' className='box'>
                                                        <div className='row'>
                                                          <div className='box-left'>
                                                            <i className='but-icon fa fa-lg fa-times'
                                                            //  id={q._id+"del"} 
                                                            //  onClick={delete_over}
                                                             ></i>
                                                            <div className='bar' 
                                                            // onClick={deletePD_check}
                                                            >
                                                              <i className='but-icon fa fa-lg fa-check' 
                                                              // id={q._id}
                                                              ></i>
                                                            </div>
                                                          </div>
                                                          <div className='box-right'></div>
                                                        </div>
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                                <p className="w-100 mb-0 ml-1 float-left small">Email</p>
                                                <p className="w-100 mb-0 ml-1 float-left small">Phone Number</p>
                                                <div className="w-100 d-flex justify-content-between">
                                                  <p className="mb-0 ml-1 small">Campus</p>
                                                  <p className="mb-0 ml-1 small">Role</p>
                                                </div>
                                                <div className="w-100 d-flex justify-content-between">
                                                  <p className="mb-0 ml-1 small">Campus</p>
                                                  <p className="mb-0 ml-1 small">Role</p>
                                                </div>
                                                <div className="w-100 d-flex justify-content-between">
                                                  <p className="mb-0 ml-1 small">Campus</p>
                                                  <p className="mb-0 ml-1 small">Role</p>
                                                </div>
                                              </li>
                                          </ul>
                                        </div> 
                                    </div>
                                    <div className="div-pop-name-btn div-pop-name d-contents btn btn-primary btn-block btn-c primary-button-no-margin-hover" 
                                    // onClick={showAddPD} 
                                    > 
                                      <a href="#" className="no-top-radius ml-0 mr-0 btn-block btn-c btn-primary">
                                        <i className="mdi mdi-plus"><p>ADD NEW</p></i>
                                      </a>
                                    </div>
                                  </div>
                             



{/* campuses */}
                              <div className="w-fill  availability-table profile-qualification-container gray-shadow-box mb-5">
                                <div className="d-flex justify-content-between mt-5 ">
                                  <h4 className="font-xlg text-left ml-5 pl-4 text-gradient  d-flex">CAMPUSES</h4>
                                  <p className="d-flex small text-right my-auto mr-5">List of all campuses of the college.</p>
                                </div>
                                    <div className="profile-qualification-body">
                                      <hr className="qualification-line"></hr>
                                      {/* here a list of all people added so far, the button to delete them, and a button to add new */}
                                          <div className="availability-table-body m-0 row pt-0 padding-left-80 padding-right-60 pb-0">
                                          <ul className="profile-list-qualifications resume-list">
                                          
                                              {/* each li represents a person, with his  information */}
                                              <li className="mb-3" >
                                                <div className="d-flex justify-content-between">
                                                  <p className="ml-1 mb-0 float-left d-flex text-lg"><i className="mdi mdi-city mr-1"></i>Campus Name</p>
                                                  <div className="float-right pr-0 resume-delete-qualification">
                                                    <div className='delete-box'>
                                                      <button name='delete' className='box'>
                                                        <div className='row'>
                                                          <div className='box-left'>
                                                            <i className='but-icon fa fa-lg fa-times'
                                                            //  id={q._id+"del"} 
                                                            //  onClick={delete_over}
                                                             ></i>
                                                            <div className='bar' 
                                                            // onClick={deletePD_check}
                                                            >
                                                              <i className='but-icon fa fa-lg fa-check' 
                                                              // id={q._id}
                                                              ></i>
                                                            </div>
                                                          </div>
                                                          <div className='box-right'></div>
                                                        </div>
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                                <p className="w-100 mb-0 ml-1 float-left small">Address</p>
                                                <div className="w-100 d-flex justify-content-between mb-1">
                                                  <p className="mb-0 ml-1 small">Classes Delivered:</p>
                                                  <div className="mb-0 ml-1 small d-flex"> 
                                                    <p className="d-flex mb-0">Class1</p> 
                                                    <p className="d-flex mb-0">, Class2</p>
                                                    <p className="d-flex mb-0">, Class3</p>
                                                  </div>
                                                </div>
                                                <div className="w-100 d-flex justify-content-between">
                                                  <p className="mb-0 ml-1 small">Manager Name</p>
                                                  <p className="mb-0 ml-1 small">Role</p>
                                                </div>
                                                <div className="w-100 d-flex justify-content-between">
                                                  <p className="mb-0 ml-1 small">Manager Name</p>
                                                  <p className="mb-0 ml-1 small">Role</p>
                                                </div>
                                              </li>
                                          </ul>
                                        </div> 
                                    </div>
                                    <div className="div-pop-name-btn div-pop-name d-contents btn btn-primary btn-block btn-c primary-button-no-margin-hover" 
                                    // onClick={showAddPD} 
                                    > 
                                      <a href="#" className="no-top-radius ml-0 mr-0 btn-block btn-c btn-primary">
                                        <i className="mdi mdi-plus"><p>ADD NEW</p></i>
                                      </a>
                                    </div>
                                  </div>
                               

                                

<h5>modal to add new people</h5>
                              <div className="mb-5 p-3 br-4 gray-shadow-box">
                                <div className="row">
                                <div className="col-lg-4 col-md-12">
                                  <div className="auth-text-top">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">Full Name </p>
                                      </label>
                                      <div className="input-icon mt-1">
                                        <i className="mdi mdi-account-circle"></i>
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          placeholder="First and Last Name"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                  <div className="auth-text-top">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">Email</p>
                                      </label>
                                      <div className="input-icon mt-1">
                                        <i className="mdi mdi-email-outline"></i>
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          placeholder="Insert the email for the login"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                  <div className="auth-text-top">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">Phone number</p>
                                      </label>
                                      <div className="input-icon mt-1">
                                        <i className="mdi mdi-phone"></i>
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          placeholder="Insert the phone used to text Ally"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-5 col-md-12">
                                  <div className="form-group text-left">
                                    <label className="w-100">
                                      <p className="float-left mb-0">Campus</p>
                                    </label>
                                    <div className=" dropdown-box input-icon br-4 mt-1">
                                      <i className="mdi  mdi-city"></i>
                                      <Select
                                        isSearchable
                                        isMulti
                                        required={true}
                                        placeholder="Indicate the campus where this person will work"
                                      ></Select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-5 col-md-12">
                                  <div className="auth-text-top">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">Role</p>
                                      </label>
                                      <div className="input-icon mt-1">
                                        <i className="mdi mdi-clipboard-outline"></i>
                                        <input
                                          type="text"
                                          className="form-control user-profile-form-input"
                                          placeholder="Indicate the role of this person in this campus"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-2 col-md-12">
                                  <div className="auth-text-top">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">Add Campus</p>
                                      </label>
                                      <button
                                        type="button"
                                        className="mt-2 w-100 pl-1 pr-1 btn btn-primary btn-c primary-button-no-margin-hover"
                                        // onClick={this.showChangePhoneNumber}
                                      >Add Campus
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </div>



                              <h5>modal to add new campus</h5>
                              <div className="mb-5 p-3 br-4 gray-shadow-box">
                              <div className="row">
                              <div className="col-lg-6 col-md-12">
                                <div className="auth-text-top">
                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">Campus Name </p>
                                    </label>
                                    <div className="input-icon mt-1">
                                      <i className="mdi mdi-city"></i>
                                      <input
                                        type="text"
                                        className="form-control user-profile-form-input"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-12">
                                <div className="form-group text-left">
                                  <label className="w-100">
                                    <p className="float-left mb-0">
                                      Classes Delivered
                                    </p>
                                  </label>
                                  <div className=" dropdown-box input-icon br-4 mt-1">
                                    <i className="mdi mdi-clipboard-outline"></i>
                                    <Select
                                      name="prefered_work_location"
                                      isSearchable
                                      isMulti
                                      required={true}
                                      placeholder="Indicate the class type this campus delivers"
                                    ></Select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="auth-text-top">
                                  {/* address */}
                                  <div className="row form-group">
                                    <div className="col-4 col-lg-2 form-group pr-1 mb-0">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Floor
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Floor"
                                      />
                                    </div>
                                    <div className="col-4 col-lg-2 form-group pr-1 mb-0">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Unit
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="unit_number"
                                        name="unit_number"
                                        placeholder="Unit"
                                      />
                                    </div>
                                    <div className="col-4 col-lg-2 form-group pr-3 mb-0">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Number
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="street_number"
                                        required
                                        name="street_number"
                                        placeholder="Number"
                                      />
                                    </div>
                                    <div className="col-6 col-lg-4 form-group pr-1 pl-3 mb-0">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Street Name
                                        </p>
                                      </label>
                                      <div className="input-icon">
                                        <i className="mdi mdi-highway"></i>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="street_name"
                                          required
                                          name="street_name"
                                          placeholder="Street"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-6 col-lg-2 form-group pl-3 mb-0">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Street Type
                                        </p>
                                      </label>
                                      <div className="form-group dropdown-box br-4 pl-0">
                                        <select
                                          className="form-control"
                                          id="street_type"
                                          name="street_type"
                                          required
                                        >
                                          <option disabled>
                                            Please Select
                                          </option>
                                          <option>Street</option>
                                          <option>Road</option>
                                          <option>Avenue</option>
                                          <option>Lane</option>
                                          <option>Place</option>
                                          <option>Court</option>
                                          <option>Alley</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row form-group">
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
                                          id="suburb"
                                          required
                                          name="suburb"
                                          placeholder="Suburb"
                                        />
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
                                          id="postcode"
                                          required
                                          name="postcode"
                                          placeholder="Postcode"
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
                                          id="txtState"
                                          name="state"
                                          placeholder="State"
                                          required
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
                                  </div>

                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">
                                        Campus Address - Street Details
                                      </p>
                                    </label>
                                    <div className="input-icon margin-top-">
                                      <i className="mdi mdi-home-map-marker"></i>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="txtAddress"
                                        required
                                        placeholder={"e.g.: 2/10, dalgan street, oakleigh, 3136"}
                                        readOnly
                                      />
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
        </div>
      </div>
    );
  }
}
export default CollegeDetails;
