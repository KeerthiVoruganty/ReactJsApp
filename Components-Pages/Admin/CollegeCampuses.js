import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import "../User/UserProfile.css";

// const
const cities = [
  { value: "Melbourne", label: "Melbourne" },
  { value: "Sydney", label: "Sydney" },
  { value: "Geelong", label: "Geelong" },
  { value: "Brisbane", label: "Brisbane" },
  { value: "Perth", label: "Perth" },
  { value: "Adelaide", label: "Adelaide" },
  { value: "GoldCost", label: "GoldCost" },
  { value: "Canberra", label: "Canberra" }
];

export class CollegeCampuses extends Component {
  constructor(props) {
    super(props);
    //console.log("props: "+ JSON.stringify(props))
    let user = JSON.parse(window.localStorage.getItem("teacher"));
    console.log("user: "+user)
    if (user === null) {
      window.location = "/login";
    }
    const date_of_birth =
      user.date_of_birth !== null && user.date_of_birth !== undefined
        ? user.date_of_birth.split("T")[0]
        : "";
    const visa_expiry =
      user.visa_expiry !== null && user.visa_expiry !== undefined
        ? user.visa_expiry.split("T")[0]
        : "";
    const police_check_release =
      user.police_check_release !== null &&
      user.police_check_release !== undefined
        ? user.police_check_release.split("T")[0]
        : "";
    const wwcc_expiry =
      user.wwcc_expiry !== null && user.wwcc_expiry !== undefined
        ? user.wwcc_expiry.split("T")[0]
        : "";
    this.state = {
      first_name: user.first_name,
      last_name: user.last_name,
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
      street_type:user.street_type,
      unit_number:user.unit_number,
      state:user.state,
      suburb: user.suburb,
      postcode: user.postcode,

      identification_document_number: user.identification_document_number, // Passport/ Driving Licence number
      id_document_type: user.id_document_type,
      id_document_expiry: user.id_document_expiry,
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

      emergency_contact_name: user.emergency_contact_name,
      emergency_contact_lastname: user.emergency_contact_lastname,
      emergency_contact_mobile_number: user.emergency_contact_mobile_number,
      emergency_contact_relationship: user.emergency_contact_relationship,
      medical_needs: user.medical_needs,
    };
  }



  render() {
    return (
                
      <div>
        <FixProfileNavbar />

        <div className="auth-right d-lg-flex bg-photoregister ">
          <div className='bg-gradient'></div>
          <div className="profile-container">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">College-name's Details</h1>

                  {/* navigationbar on top */}
                  <div className="userNavigation d-flex justify-content-between">
                    <Link
                      to={{
                        pathname: "/AllColleges"
                      }}
                      className="user-links text-center d-flex  btn-primary primary-button-no-margin-hover text-white"
                    >
                      <p>BACK</p>
                    </Link>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        // pathname: "/CollegeCampuses"
                      }}
                      className="user-links  user-links-active d-flex user-links-background-transparent "
                    >
                      <p>1 - Campuses</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/CollegePeople"
                      }}
                      className="user-links text-center d-flex  "
                    >
                      <p>2 - People</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/CollegePersonalCalendar"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>3 - Calendar</p>
                    </Link>
                    </div>
                    
                  </div>
                  
                  {/* cpntent of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      
                      {/* container of the form */}
                      <div className="availability-table-body  mb-0 mt-5">
                        <div className="availability-table-body-content h-100">
                          
                            <div className="container mt-3">
                              <div className="">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                                <div className="">

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Campus</h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  <div className="auth-text-top mb-3 row">
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Campus Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">campus 1</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Address:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">floor, unit / number street-name, suburb, post-code state </p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Classes delivered:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Class 1, Class 2, Class 3</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Manager:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Manager 1 / Academic Manager</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Manager:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Manager 1 / Academic Manager</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Campus</h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  <div className="auth-text-top mb-3 row">
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Campus Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">campus 2</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Address:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">floor, unit / number street-name, suburb, post-code state </p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Classes delivered:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Class 1, Class 2, Class 3</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Manager:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Manager 1 / Academic Manager</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Manager:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Manager 1 / Academic Manager</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Campus</h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  <div className="auth-text-top mb-3 row">
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Campus Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">campus 3</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Address:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">floor, unit / number street-name, suburb, post-code state </p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Classes delivered:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Class 1, Class 2, Class 3</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Manager:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Manager 1 / Academic Manager</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Manager:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">Manager 1 / Academic Manager</p>
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
                
                  {/* navigationbar on bottom */}
                  <div className="adminBottomNavigation ">
                    <Link
                      to={{
                        pathname: "/AllColleges"
                      }}
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      <p>BACK - All Colleges</p>
                    </Link>
                    
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
export default CollegeCampuses;





