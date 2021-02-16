import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";

export class TeacherBillings extends Component {
  constructor(props) {
    super(props);
    //console.log("props: "+ JSON.stringify(props))
    let user = JSON.parse(window.localStorage.getItem("teacher"));
    console.log("user: "+user)
    if (user === null) {
      window.location = "/login";
    }
    
    this.state = {
      first_name: user.first_name,
      last_name: user.last_name,
      preferred_name: user.preferred_name,
      prefered_work_location: user.prefered_work_location,
      
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
                             pathname: "/TeacherpersonalDetails"
                          }}
                          className="user-links  d-flex user-links-background-transparent "
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
                          className="user-links user-links-active text-center d-flex "
                      >
                        <p>5 - Billings</p>
                      </Link>
                    </div>
                    
                  </div>
                  
                  {/* cpntent of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      
                      {/* container of the form */}
                      <div className="availability-table-body  mb-5 mt-5">
                        <div className="availability-table-body-content h-100">
                          
                            <div className="container mt-3">
                              <div className="">
                                {/* TESTING BEFORE IMPLEMENTATION */}
                                <script src="https://cdn.jsdelivr.net/npm/places.js@1.16.4"></script>

                                <div className="">
                                <h5 className="mb-0 mt-3 w-fillava">Check on the invoices the teacher's sent you (LIFO = last in first out)</h5> 
                                <div className="d-flex justify-content-between mt-4"> 
                                  <div className="d-flex mt-0 mb-0">
                                    <div className="search-label pl-0">Search</div>
                                    <div className="searchbar mt-0">
                                      <input id="institution-name-to-search" className="search_input" type="text" name="" placeholder="Search..."
                                        //search by invoice number, or date
                                        /> 
                                      <a 
                                      pointer className="search_icon font-25"><i className="mdi mdi-account-search"></i></a>
                                    </div>
                                  </div>
                                  <div className='d-flex form-check terms-and-conditions-check mt-0 pt-5px' >
                                    <div id="r8-balloon-radio-group-wrapper" className="mt-3">
                                      <ul>
                                        <li>
                                          <input 
                                            className="radio r8-radio-float"
                                            type="checkbox"
                                            //this will check if there is any invoice number related to that booking
                                            name="balloon-radio-group"/>
                                        </li>
                                      </ul>
                                    </div>
                                    <label  className="lh-40 mb-0">Display only UNPAID</label>
                                  </div>
                                </div>
                                
                                <div className="availability-table-body mb-0 mt-1 mx-0 px-0">
                                  <div className="availability-table-body-content overflow-auto">
                                    <table className="av-tab-root">
                                      <thead className="availability-table-head">
                                        <tr className="availability-table-head-row">
                                          <th className="availability-table-head-cell">
                                            Invoice Ref. Number
                                          </th>
                                          <th className="availability-table-head-cell">
                                            Date 
                                          </th>
                                          <th className="availability-table-head-cell">
                                            Total Hours
                                          </th> 
                                          <th className="availability-table-head-cell">
                                            Invoice Total
                                          </th> 
                                          <th className="availability-table-head-cell">
                                            Invoice
                                          </th>  
                                          <th className="availability-table-head-cell">
                                            Status
                                          </th>                              
                                        </tr>
                                      </thead>
                                      <tbody className="availability-table-body-bodytable">
                                        <tr  className="availability-table-body-row">                                                               
                                          <td  className="availability-table-cell">
                                            32145874
                                          </td>
                                          <td className="availability-table-cell small">
                                            12/04/2020 {/* of the invoice */}
                                          </td>
                                          <td className="availability-table-cell">
                                            45 Hours {/* of the invoice */}
                                          </td>
                                          <td className="availability-table-cell">
                                            $ 1000
                                          </td>
                                          <td className="availability-table-cell">
                                          <Link className="" target="blank" >See Invoice</Link>
                                          </td>
                                          <td className="availability-table-cell">
                                            <i className="mdi mdi-alert-circle-outline red"></i><Link className="" >Unpaid</Link>
                                          </td>
                                        </tr>
                                        <tr  className="availability-table-body-row">                                                               
                                          <td  className="availability-table-cell">
                                            12345678
                                          </td>
                                          <td className="availability-table-cell small">
                                            02/03/2020 {/* of the invoice */}
                                          </td>
                                          <td className="availability-table-cell">
                                            55 Hours {/* of the invoice */}
                                          </td>
                                          <td className="availability-table-cell">
                                            $ 1200
                                          </td>
                                          <td className="availability-table-cell">
                                          <Link className="" target="blank" >See Invoice</Link>
                                          </td>
                                          <td className="availability-table-cell">
                                            <i className="mdi mdi-checkbox-marked-circle-outline green"></i><Link className="" >Paid</Link>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
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
export default TeacherBillings;





