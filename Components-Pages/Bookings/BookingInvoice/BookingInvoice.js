
import React from 'react';
import Moment from 'react-moment';
import './BookingInvoice.css';
import '../../Home/Home.css'



const BookingInvoice = (props) => {
  // getting one booking data
  // console.log(props.location.state.eachBooking)
  // const invoiceData = props.location.state.eachBooking
  // getting the id from the url
  //  console.log(invoiceData.length)
  // const id = props.match.params.id
  return (
   <div>
      <div className="auth-right d-lg-flex bg-photoregister ">
          <div className="bg-gradient"></div>
          <div className="profile-container invoice-profile-container">



            <div className=" right-booking-invoice-tittle">
              <div className='row av-table-header-second-line font-size-booking-invoice'>
                <span className="fist-line-tittle" >To:</span>
                <span className="">ReadyTeacher Pty Ltd</span>
              </div>
              <div className='row av-table-header-second-line font-size-booking-invoice'>
                <span className="second-line-tittle">Address:</span>
                <span className="">PO Box 733, Brunswick Lower 3056 VIC</span>
              </div>
              <div className='row av-table-header-second-line font-size-booking-invoice'>
                <span className="third-line-tittle">ABN:</span>
                <span className="">21168539017</span>
              </div>
            </div>


            <div className=" left-booking-invoice-tittle">
              <div className='row av-table-header-second-line font-size-booking-invoice'>
                <span className="fist-line-tittle" >Date of Invoice</span>
              </div>
              <div className='row av-table-header-second-line font-size-booking-invoice'>
                <span className="fist-line-tittle" >Educator’s Full Name:</span>
              </div>
              <div className='row av-table-header-second-line font-size-booking-invoice'>
                <span className="fist-line-tittle" >Invoice Reference:</span>
              </div>
              <div className='row av-table-header-second-line font-size-booking-invoice'>
                <span className="fist-line-tittle" >ABN:</span>
              </div>
            </div>





            <div className="profile-content-card-area booking_invoice-area">
              <div className="tab-content clearfix">                                  
                <div className="">

                  <div className="availability-table-container">
                    <div className="availability-table">
                      <div className="availability-table-header">
                        <div className="availability-table-header-card width-100">

                          <div className="invoice-title">Educator Invoice</div>


                        </div>
                      </div>
                      <div className="availability-table-body">
                        <div className="availability-table-body-content">
                          <table className="av-tab-root">
                            <thead className="availability-table-head">
                              <tr className="availability-table-head-row">
                                <th className="availability-table-head-cell">Job Description</th>
                                <th className="availability-table-head-cell">Date</th>
                                <th className="availability-table-head-cell">Institution</th>
                                <th className="availability-table-head-cell">Class Level / Type</th>
                                <th className="availability-table-head-cell">Paid Hours Per Class</th>
                                <th className="availability-table-head-cell">Rate Per Hour</th>
                                <th className="availability-table-head-cell">Total Paid Hours</th>
                              </tr>
                         </thead>
                         <tbody className="availability-table-body-bodytable">
                          <tr className="availability-table-body-row">
                            <td className="availability-table-cell">
                              Job
                            </td>
                            <td className="availability-table-cell">
                              <Moment format="DD//MM/YYYY">
                                {/* {invoiceData.start.dateTime} */}
                              </Moment>
                            </td>
                            <td className="availability-table-cell">
                              Location  {/* {invoiceData.location} */}
                            </td>
                            <td className="availability-table-cell">
                              Class {/* {invoiceData.summary} */}
                            </td>
                            <td className="availability-table-cell">
                              Paid hours {/* {invoiceData.total_hours} */}
                            </td>
                            <td className="availability-table-cell">
                              $ 55
                            </td>
                            <td className="availability-table-cell">
                            $ {/* {invoiceData.total_hours ? null || "" : 0 * 55} */}
                            </td>
                          </tr> 
                         </tbody>

                         <thead className="availability-table-head">
                              <tr className="availability-table-head-row ">
                                <th className="availability-table-head-cell availability-table-head-cell-subtotal">Subtotal</th>
                                <th className="availability-table-head-cell"></th>
                                <th className="availability-table-head-cell"></th>
                                <th className="availability-table-head-cell"></th>
                                <th className="availability-table-head-cell"></th>
                                <th className="availability-table-head-cell"></th>
                                <th className="availability-table-head-cell  text-align-right">$ 8080</th>
                              </tr>
                         </thead>

                       </table>
                     </div>
                   </div>
                    </div>
                  </div>
                    <button
                      type="submit" /*only appears if there is any checks selected*/ 
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover button-print-invoice float-right create-invoice-button">
                      Send<br/>Invoice!
                    </button>
                  <div className="availability-table-container">
                    <div className="availability-table">
                  <div className="availability-table-header">
                    <div className="availability-table-header-card ">
                      <h4 className="invoice-title">Totals</h4>
                    </div>
                  </div>
                  <div className="availability-table-body">
                  <div className="availability-table-body-content">
                          <table className="av-tab-root">
                            <thead className="availability-table-head">
                              <tr className="availability-table-head-row">
                                <th className="availability-table-head-cell display-flex-totals">
                                  <p className="margin-right-2">Total Wages</p> 
                                  <p className="font-small line-height-24">Minus 10% commission (Subtotal ÷ 100 x 90)</p></th>
                                <th className="availability-table-head-cell text-align-right">$ 2000</th>
                              </tr>
                              <tr className="availability-table-head-row">
                                <th className="availability-table-head-cell display-flex-totals">
                                  <p className="margin-right-2">Super</p> 
                                  <p className="font-small line-height-24 margin-left-47">Calculate super 9.5% (Total wages ÷ 100 x 9.5)</p>
                                </th>
                                <th className="availability-table-head-cell text-align-right">$ 800</th>
                              </tr>
                              <tr className="availability-table-head-row">
                                <th className="availability-table-head-cell display-flex-totals">
                                  <p className="margin-right-2">Invoice Total</p> 
                                  <p className="font-small line-height-24">(Total wages + Super)</p>
                                </th>
                                <th className="availability-table-head-cell text-align-right">$ 2800</th>
                              </tr>
                              
                         </thead>
                         
                       </table>
                     </div>
                  </div>
                   </div>
                  </div>
                    <div className=" availability-table-container display-block">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-c primary-button-no-margin-hover button-print-invoice float-right max-width-300">
                        Print
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-c primary-button-no-margin-hover button-print-invoice float-right margin-right-2 mt-0 max-width-300">
                        Download
                      </button>
                      <button
                        type="button"
                        className=" btn btn-block btn-c  max-width-300 button-invoice ">
                        Report a Problem!!
                      </button>
                      <p className=" font-small">
                        *Do you think there is a problem with your invoice? Please, Report it to us and we will fix it!
                      </p>
                      
                      
                  </div>
                </div>
              </div>
            </div>
          </div>             
        </div>
      </div>
  
  )
};

export default BookingInvoice;