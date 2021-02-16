import React from 'react';
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
require('./InvoiceLayout.css')

export const InvoiceLayout = () => {
  const uniqueURl = window.location.pathname
 return (
   
   <div>
                                           
    <div className="profile-area">
        <div className="availability-table-container">
          <div className="availability-table">
            <div className="availability-table-header">
              <div className="availability-table-header-card">
                <div className="similar-to-h4-style av-table-header-first-line">All Bookings</div>
                <div className="similar-to-h4-style-1 av-table-header-second-line">See all your bookings from here</div>
              </div>
            </div>
            <div className="availability-table-body">
              <div className="availability-table-body-content">
                <table className="av-tab-root">
                  <thead className="availability-table-head">
                    <tr className="availability-table-head-row">
                      <th className="availability-table-head-cell">Start Date</th>
                      <th className="availability-table-head-cell">End Date</th>
                      <th className="availability-table-head-cell">Institution</th>
                      <th className="availability-table-head-cell">Class Level / Type</th>
                      <th className="availability-table-head-cell">Paid Hours Per Class</th>
                      <th className="availability-table-head-cell">College Approved Non-Teaching Hours</th>
                      <th className="availability-table-head-cell">Total Hours</th>
                    </tr>
                </thead>
                <tbody className="availability-table-body-bodytable">
                <tr className="availability-table-body-row">
                  <td className="availability-table-cell">
                  </td>
                  <td className="availability-table-cell">
                    
                  </td>
                  <td className="availability-table-cell">
                    
                  </td>
                  <td className="availability-table-cell">
                    
                  </td>
                  <td className="availability-table-cell">
                    
                  </td>
                  <td className="availability-table-cell">
                    
                  </td>
                  <td className="availability-table-cell">
                    
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
 )
}