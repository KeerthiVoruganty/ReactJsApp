import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import './Payments.css'
import Tabs from "../../Components/Tabs/Tabs";

const banks = [
  { value: "Commonwealth", label: "Commonwealth" },
  { value: "Nab", label: "Nab" },
  { value: "bla bla", label: "bla bla" },
  { value: "...", label: "..." }
];
export class Payments extends Component {
  constructor(props) {
    super(props);
    //console.log("props: "+ JSON.stringify(props))
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log("user: " + user)
    if (user === null) {
      window.location = "/login";
    }

    this.state = {


    };
  }

  render() {
    return (

      <div>
        <FixProfileNavbar />

        <div className="auth-right d-lg-flex bg-photoregister ">
          <div className='bg-gradient'></div>
          <div className="profile-container profile-container-transparent">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">Banking & Super</h1>

                  {/* navigationbar on top */}
                  {/* <div className="userNavigation d-flex justify-content-between">
                    <Link
                      to={{
                        pathname: "/Payments"
                      }}
                      className="user-links user-links-active d-flex "
                    >
                      <p>1 - Bank</p>
                    </Link>
                    <Link
                      to={{
                        pathname: "/PaymentsABN"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>2 - ABN</p>
                    </Link>
                    <Link
                      to={{
                        pathname: "/PaymentsSuper"
                      }}
                      className="user-links text-center d-flex "
                    >
                      <p>3 - Super</p>
                    </Link>


                  </div> */}

                  {/* cpntent of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      <Tabs
                        tabs={[
                          {
                            pathname: "/Payments",
                            text: "Bank Details",
                            active: true
                          },
                          {
                            pathname: "/PaymentsABN",
                            text: "Tax Declaration"
                          },
                          {
                            pathname: "/PaymentsSuper",
                            text: "Superannuation"
                          }
                        ]}
                      />
                      {/* container of the form */}
                      <div className="availability-table-body  mb-0 mt-5">
                        <div className="availability-table-body-content h-100 allow-overflow">

                        
                          <div className="container mt-5">

                            <div className="row">
                              {/* TESTING BEFORE IMPLEMENTATION */}
                              <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>


                              <div className="col-lg-6 col-md-12">
                                <div className="auth-text-top mb-5">
                                <div className="form-group">
                                <label className="w-100">
                                <p className="float-left mb-0">Account Name</p>
                                </label>
                                <div className="input-icon mt-1">
                              
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder='e.g.: Mary W Haddad'
                                  />
                                </div>
                                </div>
                              
                                <div className="form-group">
                                <label className="w-100">
                                  <p className="float-left mb-0">BSB</p>
                                  </label>
                                <div className="input-icon mt-1">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder='XXX-XXX'
                                    required
                                    pattern="[0-9]"
                                  />
                                </div>
                                </div>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-12">
                               <div className="auth-text-top mb-5">
                               <div className="form-group">
                                <label className="w-100">
                                  <p className="float-left mb-0">Bank Name</p>
                                </label>
                                <div className="input-icon mt-1">
                                  <input
                                    type="text"
                                    id="bank_name"
                                    required
                                    className="form-control"
                                    placeholder='e.g.: NAB'
                                    
                                  />
                                </div>
                              </div>
                            
                            
                             
                              <div className="form-group">
                                <label className="w-100">
                                  <p className="float-left mb-0">Account Number</p>
                                  </label>
                                <div className="input-icon mt-1">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder='XX-XXX-XXX'
                                    required
                                    pattern="[0-9]"
                                  />
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

                            {/* submit button */}
                            <div className="row pl-0 pr-0 mr-0 mb-5 mt-3">
                            
                              <div className="col-lg-6 col-md-12 pr-0 m-auto">
                                <Link
                                  title="Payments - ABN"
                                  to='/paymentsabn'>
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">
                                    Submit
                                  </button>
                                </Link>
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
export default Payments;
