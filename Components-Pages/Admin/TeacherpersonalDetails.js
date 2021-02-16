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

export class TeacherpersonalDetails extends Component {
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
        ?  new Date(user.date_of_birth.split("T")[0]).getDate() + "-" + new Date(user.date_of_birth.split("T")[0]).getMonth() + 1 + "-" + new Date(user.date_of_birth.split("T")[0]).getFullYear()
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

/*francesca*/
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
      referees: user.referees
    };
    //let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()

   
    
/*francesca*/
    // this.setWatermarkedImage = this.setWatermarkedImage.bind(this);

  }

  setWatermarkedImage = (imgURL) => {
    window.localStorage.setItem("imgURL",imgURL);
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
                  <h1 className="mb-4">{this.state.first_name}'s Details</h1>

                  {/* navigationbar on top */}
                  <div className="userNavigation d-flex justify-content-between">
                    <Link
                      to={{
                        pathname: "/AllTeachers"
                      }}
                      className="user-links text-center d-flex  btn-primary primary-button-no-margin-hover text-white"
                    >
                      <p>BACK</p>
                    </Link>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        // pathname: "/TeacherpersonalDetails"
                      }}
                      className="user-links  user-links-active d-flex user-links-background-transparent "
                    >
                      <p>1 - Personal</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/TeacherBanking"
                      }}
                      className="user-links text-center d-flex  "
                    >
                      <p>2 - Banking</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/validatedocuments"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>3 - Documents</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/TeacherCalendar"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>4 - Calendar</p>
                    </Link>
                    </div>
                    <div className='behind-user-links'>
                    <Link
                      to={{
                        pathname: "/TeacherBillings"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>5 - Billings</p>
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
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Personal Information</h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  <div className="auth-text-top mb-3 row">

                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">First Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.first_name}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Email:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.email}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Last Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.last_name}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6  my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0 line-height-24">Contact Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17  text-capitalize line-height-24">{this.state.contact_number}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Preferred Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.preferred_name}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Date of Birth:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.date_of_birth}</p> 
                                        {/* console.log(new Date(user.date_of_birth).getDate()+); */}
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Preferred Work Locations:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">
                                          {this.state.prefered_work_location  && this.state.prefered_work_location.length > 0 ? this.state.prefered_work_location.map(location => location).join(', ') : "Melbourne"}
                                          {/* {this.state.default_work_location} */}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Profile Status:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">INACTIVE</p>
                                      </div>
                                    </div>
                                    {/* <div className="form-group col-12 my-1 d-flex line-height-24"> */}
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Address:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">
                                          {  (this.state.unit_number ? this.state.unit_number + "/" :"")  
                                           + (this.state.street_number ? this.state.street_number : "") + " "
                                           + (this.state.street_name ? this.state.street_name :"") + " " 
                                           + (this.state.street_type? this.state.street_type:"") + ", "
                                           + (this.state.suburb  ? this.state.suburb:"") + ", " 
                                           + (this.state.postcode? this.state.postcode : "") + " " 
                                           + (this.state.state ?this.state.state:"") }
                                        </p>
                                      </div>
                                    </div>
                                    {/* <div className="form-group col-12 my-1 d-flex line-height-24"> */}
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Suburb:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">
                                          { this.state.suburb ? this.state.suburb : "" }
                                        </p>
                                      </div>
                                    </div>
                                    {/* <div className="form-group col-12 my-1 d-flex line-height-24"> */}
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Postcode:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">
                                          { this.state.postcode? this.state.postcode : "" }
                                        </p>
                                      </div>
                                    </div>
                                    {/* <div className="form-group col-12 my-1 d-flex line-height-24"> */}
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">State:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">
                                          { (this.state.state ?this.state.state:"") }
                                        </p>
                                      </div>
                                    </div>                                  
                                  </div>

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Referee Information</h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  {this.state.referees && this.state.referees.length > 0 ?  this.state.referees.map((referee, index) => {return(
                                    <div className="auth-text-top mb-5 row" key={index}>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">First Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{referee.referee_first_name}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Position:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{referee.referee_position_title}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Last Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{referee.referee_last_name}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Organisation:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{referee.organisation}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Email:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{referee.referee_email}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Reference Check Form:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">
                                          {referee.flag? <a href={referee.url}>View Here</a> : "Waitng for complete"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  )
                                  }
                                  ): "No referee details found"}
                                 

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Emargency Contact</h5> <div className="light-blue-border ml-3"></div>
                                  </div>

                                  <div className="auth-text-top mb-5 row">
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">First Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.emergency_contact_name}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Last Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.emergency_contact_lastname}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Mobile number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.emergency_contact_mobile_number}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Relationship:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.emergency_contact_relationship}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Allergies / Medication / Conditions:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.medical_needs}</p>
                                      </div>
                                    </div>
                                  </div>




                                  <div className="d-flex mb-4">
                                    {/* if any information about the document is bad, such as, it's not valid or it's expired, it will have an alert linking to the validatedocuments page, and the expired writing will appear */}
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava"> Identification Document<Link to={{pathname: "/validatedocuments"}} ><i className="ml-2 mdi mdi-alert-circle mdi-spin text-lg  red"></i></Link></h5> <div className="light-blue-border ml-3"></div>
                                  </div>
                                  <div className="auth-text-top mb-3 row">
                                    
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Residential Status:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.visa_status}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">{this.state.id_document_type} Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.identification_document_number}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">{this.state.visa_status === "I am a visa holder" ? "Issuing Country"  : "Issuing Australian State"}:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.issuing_place}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">{this.state.id_document_type} Expiry Date:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        {/* if it's expired, it has .red class */}
                                        <p className="red font-17 text-capitalize  line-height-24 ">{this.state.id_document_expiry} Expired!! </p>
                                        {/* <p className="font-17 text-capitalize  line-height-24 ">{this.state.id_document_expiry}</p> */}
                                      </div>
                                    </div>
                                    <div className="form-group col-12  my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0 line-height-24">{this.state.id_document_type}:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                     
                                        <Link
                                    onClick = {() => { this.setWatermarkedImage(this.state.identification_url)}}
                                        to ={{
                                          pathname: '/ImgWaterMarks'
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank">
                                        {this.state.identification_filename}
                                    </Link>

                                      </div>
                                    </div>
                                  </div>
                                    

                                    {this.state.visa_status === "I am a visa holder" ? 
                                    <>

                                    <div className="d-flex mb-4">
                                      <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Visa</h5> <div className="light-blue-border ml-3"></div>
                                    </div>

                                  <div className="auth-text-top mb-3 row">
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Visa Application Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.visa_application_number}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Type of Visa:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.visa_type}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Subclass Name:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.subclass_name}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Subclass Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.subclass_number}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Issuing Country:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.issuing_office}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Visa Expiry Date:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.visa_expiry}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12  my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0 line-height-24">Visa:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                    
                                        <Link
                                        onClick = {() => { this.setWatermarkedImage(this.state.visa_url)}}
                                        to ={{
                                          pathname: '/ImgWaterMarks'
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank">
                                        {this.state.visa_filename}
                                    </Link>
                                      </div>
                                    </div>
                                  </div>
                                  
                                    </>
                                    : null}

                                    <div className="d-flex mb-4">
                                      <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Police Check</h5> <div className="light-blue-border ml-3"></div>
                                    </div>

                                  <div className="auth-text-top mb-3 row">


                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Police Check Type:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.police_check_type}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Police Check Result:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.police_check_result}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Police Check Issuing Organisation:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.police_check_issuing_organisation}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">Police Check Release Date:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.police_check_release}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-12  my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0 line-height-24">Police Check:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                     
                                        <Link
                                        onClick = {() => { this.setWatermarkedImage(this.state.police_check_url)}}
                                        to ={{
                                          pathname: '/ImgWaterMarks'
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank">
                                        {this.state.police_check_filename}
                                    </Link>
                                      </div>
                                    </div>
                                    
                                  </div>

                                  <div className="d-flex mb-4">
                                    <div className="light-blue-border mr-3"></div> <h5 className="mb-0 mt-3 w-fillava">Working With Children Check</h5> <div className="light-blue-border ml-3"></div>
                                  </div>

                                  <div className="auth-text-top mb-5 row">
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">WWCC Number:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.wwcc_number}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">WWCC Issuing State:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.wwcc_issuing_state}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6 my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0  line-height-24">WWCC Expiry Date:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <p className="font-17 text-capitalize  line-height-24">{this.state.wwcc_expiry}</p>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-12 col-lg-6  my-1 d-flex line-height-24">
                                      <label className=" line-height-24"><p className="text-left mb-0 line-height-24">Working With Children Check:</p></label>
                                      <div className="input-icon ml-2 text-left line-height-24">
                                        <Link
                                    onClick = {() => { this.setWatermarkedImage(this.state.wwcc_url)}}
                                        to ={{
                                          pathname: '/ImgWaterMarks'
                                        }}
                                        className="profile-linkfont-12"
                                        target="_blank">
                                        {this.state.wwcc_filename}
                                    </Link>
                                      </div>
                                    </div>
                                  </div>

                                </div>




                              </div> 
                              {/* submit button */}
                              {/*<div className="row pr-0 mr-0">
                                <div className="col-md-4"><Link
                                    type="teachers"
                                    value="Teachers"
                                    to="/AllTeachers"
                                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                                  > All Teachers </Link></div>
                                 <div className="col-md-4 pr-0"></div>
                                <div className="col-md-4"><Link
                                    type="next"
                                    value="Next"
                                    to="/TeacherIdentification"
                                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                                  > Next </Link></div> 
                              </div>*/}
                            </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                
                  {/* navigationbar on bottom */}
                  <div className="adminBottomNavigation ">
                    <Link
                      to={{
                        pathname: "/AllTeachers"
                      }}
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                    >
                      <p>BACK - All Teachers</p>
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
export default TeacherpersonalDetails;





