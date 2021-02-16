import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import Tabs from "../../Components/Tabs/Tabs";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import './Payments.css';
export class PaymentsABN extends Component {
  constructor(props) {
    super(props);
    //console.log("props: "+ JSON.stringify(props))
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log("user: " + user)
    if (user === null) {
      window.location = "/login";
    }

    this.state = {
      first_name: user.first_name,
      last_name: user.last_name,
      preferred_name: user.preferred_name,
      prefered_work_location: user.prefered_work_location,
      opt:"0",
    };
  }
 
  handleOpt(e){
    this.setState({opt:e.target.value});
    this.opt=e.target.value;
    //console.log(this.opt);
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
                      className="user-links d-flex "
                    >
                      <p>1 - Bank</p>
                    </Link>
                    <Link
                      to={{
                        pathname: "/PaymentsABN"
                      }}
                      className="user-links user-links-active text-center d-flex "
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
                            text: "Bank Details"
                          },
                          {
                            pathname: "/PaymentsABN",
                            text: "Tax Declaration",
                            active: true
                          },
                          {
                            pathname: "/PaymentsSuper",
                            text: "Superannuation"
                          }
                        ]}
                      />
                      {/* container of the form */}
                      
                      <div className="availability-table-body  mb-0 mt-5">
                        <div className="availability-table-body-content allow-overflow">

                          <div className="container mt-5">
                            {/* TESTING BEFORE IMPLEMENTATION */}
                            <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                            <div className="row">
                             <div className="col-12">
                              <div className="radio-button-margin">                              
                             <div className="boxed-radio-buttons">
                             
                                    <div className="horizontal-radio-button-long">
                                    <label class="radio_border">  
                                    <div className="wrap">                                 
                                  <input type="radio"
                                   name="TFN"  
                                   value="1"
                                   onClick={(e) => this.handleOpt(e)} 
                                   /> Enter Your Australian Tax File Number (TFN)  
                                  <span class="checkmark-horizontal"></span>                                      
                                  </div>  
                                                             
                                 </label>
                                 <label className="">OR</label>
                                   
                                    
                                    <label class="radio_border">    
                                    <div className="wrap">                                
                                  <input type="radio" 
                                  name="TFN" 
                                  value="2"
                                  onClick={(e) => this.handleOpt(e)}/> I have made a separate application to the ATO for a TFN  
                                  <span class="checkmark-horizontal"></span>   
                                  </div>                             
                                 </label>
                                     
                                    </div>                                   
                                                                     
                                  </div>
                                  </div> 
                                  </div>
                                </div> 
                                
                                <div id="choice_A" hidden={!(this.opt==1)}>
                                <div className="col-12 col-lg-9 form-group">
                                          
                                          <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                            {/* <i className="mdi mdi-account-circle"></i> */}
                                            <input
                                              type="text"
                                              className="form-control mb-0"
                                              placeholder="Enter TFN"
                                            />
                                              <label className="balloon-radio-idenntification-label col-8"> </label> 
                                          
                                            </div>      
                                           </div> 
                                        </div>
                                       

                            <div className="row">
                              <div className="col-12">
                              <div className="radio-button-margin">
                                      <label className="w-100 mb-0">
                                        <p className="float-left mb-0 radio_label">
                                          Select Residence Status
                                        </p>
                                      </label>
                                  <div className="boxed-radio-buttons">
                                  <div className="vertical-radio-button">
                                   
                                  <label class="radio_border">  
                                  <div className="wrap">                                                               
                                  <input type="radio" name="tax_type" />An Australian resident for tax purposes  
                                  
                                  <span class="checkmark"></span>  
                                  </div>                                                           
                                 </label>
                                
                                 <label class="radio_border"> 
                                 <div className="wrap">                                    
                                  <input type="radio" name="tax_type" />A foreign resident for tax purposes                                   
                                  <span class="checkmark"></span>  
                                  </div>                               
                                 </label>
                                 <label class="radio_border">   
                                 <div className="wrap">                                  
                                  <input type="radio" name="tax_type" />A working holiday maker                                    
                                  <span class="checkmark"></span> 
                                  </div>                               
                                 </label>   
                                 </div>                          
                                  </div>                                     
                                    </div>
                              </div>
                            </div>

                            

                            <div className="row">
                              <div className="col-12">
                              <div className="radio-button-margin">
                                      <label className="w-100 mb-0">
                                        <p className="float-left mb-0 radio_label">
                                        Do you want to claim the tax-free threshold from ReadyTeacher?
                                        </p>
                                      </label>
                                      
                                  <div className="boxed-radio-buttons">
                                    <div className="horizontal-radio-button">
                                    <label class="radio_border">                                    
                                  <input type="radio" name="threshold" /> Yes  
                                  <span class="checkmark-horizontal"></span>                                
                                 </label>
                                    </div>

                                    <div className="horizontal-radio-button">
                                    <label class="radio_border">                                    
                                  <input type="radio" name="threshold" /> No  
                                  <span class="checkmark-horizontal"></span>                                
                                 </label>
                                     
                                    </div>                                   
                                  </div>                                                                                                                                                                  
                                         
                                      
                                    </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-12">
                              <div className="radio-button-margin">
                                      <label className="w-100 mb-0">
                                        <p className="float-left mb-0 radio_label">
                                        Do you have a Higher Education Loan Program (HELP), Student Start-up Loan (SSL) or Trade Support Loan (TSL) debt?                                        
                                        </p> 
                                        <div className="span-hovered_a">
                                        <i className="mdi mdi-information-outline float-left" ></i>
                                        <span className="span-hovered_a-content" id="i-abn-info">If yes, ReadyTeacher will withhold additional amounts as per ATO advice </span>
                                       </div>                                       
                                      </label>
                                      <div className="boxed-radio-buttons">
                                    <div className="horizontal-radio-button">
                                    <label class="radio_border">                                    
                                  <input type="radio" name="loan" /> Yes  
                                  <span class="checkmark-horizontal"></span>                                
                                 </label>
                                    </div>

                                    <div className="horizontal-radio-button">
                                    <label class="radio_border">                                    
                                  <input type="radio" name="loan" /> No  
                                  <span class="checkmark-horizontal"></span>                                
                                 </label>
                                     
                                    </div>                                   
                                  </div> 
                                    </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-12">
                              <div className="radio-button-margin">
                                <div>
                                      <label className="w-100 mb-0">
                                        <p className="float-left mb-0 radio_label">
                                        Do you have a financial supplement debt?
                                        </p>
                                        <div className="span-hovered_a">
                                        <i className="mdi mdi-information-outline float-right" ></i>
                                        <span className="span-hovered_a-content-small" id="i-abn-info">If yes, ReadyTeacher will withhold additional amounts as per ATO advice </span>
                                       </div>
                                      </label>
                                      </div>
                                      <div className="boxed-radio-buttons">
                                    <div className="horizontal-radio-button">
                                    <label class="radio_border">                                    
                                  <input type="radio" name="debt" /> Yes  
                                  <span class="checkmark-horizontal"></span>                                
                                 </label>
                                    </div>

                                    <div className="horizontal-radio-button">
                                    <label class="radio_border">                                    
                                  <input type="radio" name="debt" /> No  
                                  <span class="checkmark-horizontal"></span>                                
                                 </label>
                                     
                                    </div>                                   
                                  </div> 
                                    </div>
                              </div>
                            </div>                                                       

                            {/* submit button */}
                            <div className="row pl-0 pr-0 mr-0 mb-5 mt-3">                             
                             
                              <div className="col-lg-6 col-md-12 pr-0 m-auto">
                                <Link
                                  title="Payments - Super"
                                  to='/paymentssuper'>
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
export default PaymentsABN;
