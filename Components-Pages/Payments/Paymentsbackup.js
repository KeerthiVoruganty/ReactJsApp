import React from "react";
import { Component } from "react";
import { PORT } from "../../config";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import "../Payments/Payments.css";

const URL = PORT;


export class Payments extends Component {
  constructor(props) {
    super(props);
  
    
    
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
                  
                  {/* cpntent of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      
                      {/* active card (on navigation bar) */}
                      <div className="user-table-header">

                        <div className="user-table-header-card float-left text-left">
                          <h4 className="av-table-header-first-line">Payments Information</h4>
                        </div>
                      </div>

                      {/* container of the form */}
                      <div className="availability-table-body">
                          <div className="availability-table-body-content">
                          <form onSubmit={this.handleSubmit}>
                            <div className="container  mt-5">




                              <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                      <div className="auth-text-top mb-5">

                                        <h2>Banking Details</h2>

                                        
                                        <div className="form-group">
                                          <label className="w-100"><p className="float-left mb-0">Account Name</p></label>
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder='Full Name'
                                            />
                                          </div>  
                                        </div>

                                        <div className="row">
                                          <div className="col-4 form-group">
                                            <label className="w-100"><p className="float-left mb-0">BSB</p></label>
                                            <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                              <input
                                                type="text"
                                                className="form-control mb-0"
                                                placeholder='Insert your BSB (6-dgts)'
                                              />
                                            </div>  
                                          </div>
                                          <div className="col-8 form-group">
                                            <label className="w-100"><p className="float-left mb-0">Account Number</p></label>
                                            <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                              <input
                                                type="text"
                                                className="form-control mb-0"
                                                placeholder='Insert your Account Number (8-dgts)'
                                              />
                                            </div>  
                                          </div>
                                        </div>

                                        <h2 className="mt-5">ABN</h2>

                                        <div className="form-group">
                                          <label className="w-100"><p className="float-left mb-0">ABN</p></label>
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder='Please, insert your ABN (11-dgts)'
                                            />
                                          </div>  
                                        </div>

                                        <div className="form-group">
                                          <label className="w-100"><p className="float-left mb-0">Address</p></label>
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder='Please, insert your Address'
                                            />
                                          </div>  
                                        </div>
                                        <div className="form-group">
                                          <label className="w-100"><p className="float-left mb-0">Rate Per Hour</p></label>
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder='Rate Per Hour'
                                            />
                                          </div>  
                                        </div>

                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                      <div className="auth-text-top mb-5">

                                        <h2>Superannuation Details</h2>

                                        
                                        <div className="form-group">
                                          <label className="w-100"><p className="float-left mb-0">Fund Type</p></label>
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder='Fund Type'
                                            />
                                          </div>  
                                        </div>

                                        <div className="form-group">
                                          <label className="w-100"><p className="float-left mb-0">Fund Name</p></label>
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder='Insert the Fund Name'
                                            />
                                          </div>  
                                        </div>

                                        <div className="form-group">
                                          <label className="w-100"><p className="float-left mb-0">Fund ABN</p></label>
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder='Insert the Fund ABN (11-dgts)'
                                            />
                                          </div>  
                                        </div>

                                      </div>
                                    </div>
                              </div>

                              {/* submit button */}
                              <div className="row pr-0 mr-0">
                                <div className="col-md-4"></div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4 pr-0">
                                   <button
                                      type="submit"
                                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover">
                                      Update
                                    </button>

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
      </div>
    );
  }
}
export default Payments;
