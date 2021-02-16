import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { useToggle } from "../../Hook";
import uuid from "uuid/v4";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import DatePicker from "react-datepicker";
import Tabs from "../../Components/Tabs/Tabs";

export class PaymentsSuper extends Component {
  constructor(props) {
    // const [CategoryAVisible, toggleCategoryAVisible] = useToggle(props.content.category_a !== "a_checked");
    // const [CategoryBVisible, toggleCategoryBVisible] = useToggle(props.content.category_b !== "b_checked");
    // const [CategoryCVisible, toggleCategoryCVisible] = useToggle(props.content.category_c !== "c_checked");
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
    
    //  const prepareValue = id =>{
    //   const category_a= document.querySelector("#regulated").checked ? "a_checked" : ""; 
    //   const category_b= document.querySelector("#self").checked ? "b_checked" : ""; 
    //   const category_c= document.querySelector("#rt").checked ? "c_checked" : ""; 
    //   }

   
  
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
                      className="user-links text-center d-flex "
                    >
                      <p>2 - ABN</p>
                    </Link>
                    <Link
                      to={{
                        pathname: "/PaymentsSuper"
                      }}
                      className="user-links user-links-active text-center d-flex "
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
                            text: "Tax Declaration"
                          },
                          {
                            pathname: "/PaymentsSuper",
                            text: "Superannuation",
                            active: true
                          }
                        ]}
                      />
                      {/* container of the form */}
                      <div className="availability-table-body  mb-0 mt-5">
                        <div className="availability-table-body-content h-100">

                          <div className="container mt-5">
                            <div className="">
                              {/* TESTING BEFORE IMPLEMENTATION */}
                              <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                              <div className="auth-text-top mb-5">                    
                                <div className="radio-button-margin">
                                <label className="w-100 mb-0">
                                        <p className="float-left mb-0 radio_label">
                                        Please nominate a superannuation fund category:
                                        </p>
                                      </label>
                                      <div className="boxed-radio-buttons">
                                  <div className="vertical-radio-button">
                                   
                                  <label class="radio_border">  
                                  <div className="wrap">                                                               
                                  <input type="radio" 
                                  name="fund_category" 
                                  value="1"
                                  onClick={(e) => this.handleOpt(e)}                                            
                                  required
                                  />Regulated Super Fund
                                  
                                  <span class="checkmark"></span>  
                                  </div>                                                           
                                 </label>
                                
                                 <label class="radio_border"> 
                                 <div className="wrap">                                    
                                  <input type="radio" 
                                  name="fund_category" 
                                  value="2"
                                  onClick={(e) => this.handleOpt(e)}                                            
                                  required/>Self-Managed Super Fund                                  
                                  <span class="checkmark"></span>  
                                  </div>                               
                                 </label>
                                 <label class="radio_border">   
                                 <div className="wrap">                                  
                                  <input type="radio" 
                                  name="fund_category" 
                                  value="3"
                                  onClick={(e) => this.handleOpt(e)}                                            
                                  required/>ReadyTeacher’s Default Superannuation Fund (AustralianSuper)                                   
                                  <span class="checkmark"></span> 
                                  </div>                               
                                 </label>   
                                 </div>                          
                                  </div> 
                                      {/* <div className="input-radio-buttons justify-content-start">
                                        <div className="row row-input-identification">
                                         
                                          <div id="r8-balloon-radio-group-wrapper-identification-1">
                                            <ul>
                                              <li>
                                                <input
                                                  className="radio r8-radio-float"
                                                  type="radio"                                                  
                                                  name="fund_category"
                                                  value="1"
                                                  onClick={(e) => this.handleOpt(e)}                                            
                                                  required
                                                  
                                                 // onChange={handleChange}
                                                />
                                                 
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label col-8">
                                            Regulated Super Fund
                                          </label>
                                        </div>
                                        <div className="row row-input-identification">                                         
                                          <div id="r8-balloon-radio-group-wrapper-identification-2">
                                            <ul>
                                              <li>
                                                <input 
                                                  className="radio r8-radio-float"
                                                  type="radio"                                                 
                                                  name="fund_category"
                                                  value="2"
                                                  onClick={(e) => this.handleOpt(e)}                                                  
                                                  required
                                                  //onChange={handleChange}
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label-2 col-8">
                                            Self-Managed Super Fund
                                          </label>
                                        </div>
                                        <div className="row row-input-identification">
                                          
                                          <div id="r8-balloon-radio-group-wrapper-identification-2">
                                            <ul>
                                              <li>
                                                <input
                                                  className="radio r8-radio-float"
                                                  type="radio"                                                  
                                                  name="fund_category"
                                                  value="3"
                                                  onClick={(e) => this.handleOpt(e)}                                                
                                                  required
                                                 // onChange={handleChange()}
                                                />
                                              </li>
                                            </ul>
                                          </div>
                                          <label className="balloon-radio-idenntification-label col-8">
                                            ReadyTeacher’s Default Superannuation Fund (AustralianSuper)
                                          </label>
                                        </div>
                                      </div> */}
                                </div>
                              </div>
                              <div id="choice_fields" hidden={!((this.opt==1)||(this.opt==2)||(this.opt==3))}>
                               {/* choice A */}    
                                                    
                               <div id="choice_A" hidden={(this.opt==0)||(this.opt==2)||(this.opt==3)}>
                              <div className="auth-text-top mb-5" >
                               
                                <div className="row">
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100"><p className="float-left mb-0">Fund Name</p></label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Fund Name'
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100"><p className="float-left mb-0">Fund ABN</p></label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Fund ABN'
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-lg-6 form-group"
                                   
                                    >
                                    <label className="w-100">
                                      <p className="float-left mb-0">USI</p>                                      
                                    </label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='USI'
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100"><p className="float-left mb-0">Member Number</p></label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Member Number'
                                      />
                                    </div>
                                  </div>                                  
                                </div>
                              </div>
                              </div>
                              

                              {/* choice B */}
                              <div id="choice_b" hidden={(this.opt==0)||(this.opt==1)||(this.opt==3)}>
                              <div className="auth-text-top mb-5">
                               
                                <div className="row">
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100"><p className="float-left mb-0">Fund Name</p></label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Fund Name'
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100"><p className="float-left mb-0">Fund BSB</p></label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Fund BSB'
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">Fund ABN</p>                                      
                                    </label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Fund ABN'
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100"><p className="float-left mb-0">Fund Bank Account Number</p></label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Fund Bank Account Number'
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-lg-6 form-group">
                                    <label className="w-100"><p className="float-left mb-0">Member Number</p></label>
                                    <div className="d-flex justify-content-between ml-0 mr-0 w-100">
                                      <input
                                        type="text"
                                        className="form-control mb-0"
                                        placeholder='Member Number'
                                      />
                                    </div>
                                  </div>                                
                                </div>
                              </div>
                              </div>

                              {/* choice C */}
                              <div id="choice_c" hidden={(this.opt==1)||(this.opt==2)}>
                              <div className="auth-text-top mb-5">
                               
                                <div className="row">
                                  <div className="col-12 form-group">
                                    <label className="w-100"><p className="float-left mb-0 radio_label">Fund Name : Australian Super </p></label>                                    
                                  </div>
                                  <div className="col-12 form-group">
                                    <label className="w-100"><p className="float-left mb-0 radio_label">USI : STA0100AU</p></label>                                   
                                  </div>
                                  <div className="col-12 form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0 radio_label">Fund ABN : 65 714 394 898</p>                                      
                                    </label>                                    
                                  </div>
                                  <div className="col-12 form-group">
                                    <label className="w-100"><p className="float-left mb-0 radio_label">Fund Phone : 1300 300 273</p></label>                                    
                                  </div> 
                                  <div className="col-12 form-group">
                                    <label className="w-100"><p className="float-left mb-0 radio_label">AustralianSuper will notify you of your member number.</p></label>                                    
                                  </div> 
                                  <div className="check-box-div">
                                    <input className="checkbox-share" type="checkbox" 
                                     id="authorize" name= "authorize" 
                                      />
                                     <label>I authorise ReadyTeacher to create an account with AustralianSuper for the purposes of making superannuation payments</label>
                                   </div>                                 
                                </div>
                              </div>
                              </div>
                              </div>

                             

                              {/* submit button */}
                              <div id="submit" hidden={!((this.opt==1)||(this.opt==2)||(this.opt==3))}>
                               <div className="row pl-0 pr-0 mr-0 mb-5 mt-3">
                               
                                {/* <div className="col-lg-4"></div>
                                <div className="col-lg-4"></div> */}
                                <div className="col-lg-6 col-md-12 pr-0 m-auto">
                                  <Link
                                    title="Submit"
                                    to=''>
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
        </div>
      </div>
    );
  }
}
export default PaymentsSuper;
