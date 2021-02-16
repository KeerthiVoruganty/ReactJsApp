import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PORT } from '../../../config';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import FixProfileNavbar from "../../../Components/Navbar/FixProfileNavbar";
import { Button, Divider, Pagination } from 'semantic-ui-react'
import { Dropdown, Menu, Responsive } from 'semantic-ui-react'
import "./RadioButtonStyle.scss"
import Tabs from "../../../Components/Tabs/Tabs";
import MobileNavBar from "../../../Components/Navbar/MobileNavBar";


require('./AllBookings.css')

const AllBookings = () => {
  let [searchBookings, setSearchBookings] = useState([])
  let [bookings, setBookings] = useState([]);
  let [no_bookings, setNo_bookings] = useState('')
  let [pageNum, setPageNum] = useState(1)
  let [checkboxIDs, setCheckboxIDs] = useState([]);
  let [showCurrentBookings, setShowCurrentBookings] = useState([]);
  let [bookingTime, setBookingTime] = useState('all');
  let [rowsOption, setRowsOption] = useState(10);
  let [booking_type, setBookingType] = useState('All');
  let [booking_tittle, setBookingTittle] = useState('See All Your Bookings');
  useEffect(() => {
    axios.get(`${PORT}/bookings`)
      .then(res => {
        window.localStorage.setItem("allbookings", JSON.stringify(res.data))
        setBookings(res.data);
        //handleBookings(bookingTime)
        searchByInstitution()
      }).catch(err => {
        console.log("Allbookings.js: ", err)
      })
  }, [checkboxIDs, bookingTime, rowsOption], () => { handlePage(pageNum, rowsOption, bookings) });


  // Search Bar ------------------------------------------------------
  const searchByInstitution = () => {
    // // Declare variables
    // var input, filter, table, tr, td, i, txtValue;
    // input = document.getElementById("institution-name-to-search");
    // filter = input.value.toUpperCase();
    // table = document.getElementById("bookings-table");
    // tr = table.getElementsByTagName("tr");

    // // Loop through all table rows, and hide those who don't match the search query
    // for (i = 0; i < tr.length; i++) {
    //   td = tr[i].getElementsByTagName("td")[2];
    //   if (td) {
    //     txtValue = td.textContent || td.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }
    // }
    let searchItem = document.getElementById('institution-name-to-search').value
    console.log('search item: ' + searchItem)
    console.log(searchItem.length)
    // searchItem.replace
    //handleBooking(bookingTime)
    //let searchBookings = []
    if (searchItem.length > 0) {

      const bookings = JSON.parse(window.localStorage.getItem("allbookings"))
      if (bookings.length > 0) {
        // for(let i = 0;i<bookings.length;i++){
        //   if(bookings[i].institution_id==searchItem){
        //     //setSearchBookings([...searchBookings,bookings[i]])
        //     searchBookings.push(bookings[i])
        //   }
        // }
        console.log("66")
        const filter_bookings = bookings.filter(b => b.institution_id.includes(searchItem))
        filter_bookings.map(b => { console.log(b.institution_id) })
        setBookings(filter_bookings)
        pages()
        //setSearchBookings(filter_bookings)
        handlePage(pageNum, rowsOption, filter_bookings)
        //setSearchBookings(bookings.filter(b => b.institution_id.includes(searchItem)))
        //console.log(searchBookings)
        //searchBookings
        //handlePage(1,bookings)
      }
    } else {
      console.log("=====")
      setBookings([])
      pages()
      //setSearchBookings([])
      handleBookings(bookingTime)
    }
  };

  // Search on 'Enter'
  const handlerKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchByInstitution();
    }
  }
  //-----------------------------------------------------------------



  // Checkboxes -----------------------------------------------------
  const handleOnclickCB = (booking_id) => {
    if (document.getElementById(booking_id) != null) {
      console.log('!null')
      if (document.getElementById(booking_id).checked == true) {
        //setPageNum(pageNum)
        setCheckboxIDs([...checkboxIDs, booking_id])
        console.log('now in handle click and added array to checkbox')

      }
      else if (document.getElementById(booking_id).checked == false) {
        if (checkboxIDs.indexOf(booking_id) > -1) {
          //setPageNum(pageNum)
          checkboxIDs.splice(checkboxIDs.indexOf(booking_id), 1)
          setCheckboxIDs([...checkboxIDs])
          console.log('checkbox ids ' + checkboxIDs)
        }
      }
    }
  }
  //--------------------------------------------------------------------



  // Set values of the bookings variable according to options all, past, future and by default all
  const handleBookings = (bookingTime) => {
    if (bookingTime == 'all') {
      setBookings(JSON.parse(window.localStorage.getItem("allbookings")))
      console.log("126")
      console.log(bookings.length)
      handlePage(pageNum, rowsOption, JSON.parse(window.localStorage.getItem("allbookings")))
    }
    else if (bookingTime == 'past' || bookingTime == 'future') {
      const allbookings = JSON.parse(window.localStorage.getItem('allbookings'))
      let bookingsPorF = allbookings.filter(b => {
        // Calculate timezone according to Australia
        const time_zone = ((Math.abs((new Date()).getTimezoneOffset() * 10)) / 6) / 100
        let b_date = new Date(b.booking_date + 'T' + b.arrival_time + '+' + time_zone + ':00')
        if (bookingTime == 'past') {
          return b_date <= (new Date())
        } else if (bookingTime == 'future') {
          return b_date >= (new Date())
        }
      }
      );
      bookingsPorF = bookingsPorF.sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date))
      setBookings(bookingsPorF)
      handlePage(pageNum, rowsOption, bookingsPorF)
    }
    // Clearing search Textbox
    document.getElementById('institution-name-to-search').value = ''
  }

  // Show 10 bookings per page
  let handlePage = (pageNumber, rowsOption, getBookings) => {
    let currentBookings = []
    if (getBookings.length > 0) {
      if ((getBookings.length % rowsOption) == 0) {
        for (let i = ((pageNumber - 1) * rowsOption); i < (((pageNumber - 1) * rowsOption) + rowsOption); i++) {
          if (checkboxIDs.indexOf(getBookings[i].booking_id) > -1) {
            getBookings[i].checked = true
          }
          else {
            getBookings[i].checked = false
          }
          currentBookings.push(getBookings[i])
        }
        setShowCurrentBookings(currentBookings)
        console.log("170 PGNB row gb" + pageNumber + "," + rowsOption + "," + getBookings)
        setPageNum(pageNumber)
        setNo_bookings('')

      }
      else {
        for (let i = ((pageNumber - 1) * rowsOption); i < (((pageNumber - 1) * rowsOption) + rowsOption); i++) {
          if ((i < getBookings.length)) {
            if (checkboxIDs.indexOf(getBookings[i].booking_id) > -1) {
              getBookings[i].checked = true
            }
            else {
              getBookings[i].checked = false
            }
            currentBookings.push(getBookings[i])
          }
        }
        setShowCurrentBookings(currentBookings)
        setPageNum(pageNumber)
        setNo_bookings('')
        console.log("170 PGNB row gb" + pageNumber + "," + rowsOption + "," + getBookings)

      }

    } else {
      setShowCurrentBookings([])
      setPageNum(1)
      setNo_bookings('There are no bookings')
    }
  }

  // ------------------------------------------------------------------------------------------

  // Pagination ------------------------------------------------------------------------
  // Highlight page number
  const spanActive = (p) => {
    if (p === pageNum) {
      return "isActive"
    }
    else {
      return ""
    }
  }

  // Calculate page number
  const pages = () => {
    let arr = [];
    if ((bookings.length != 0) && ((bookings.length % rowsOption) == 0)) {
      for (let i = 1; i <= (bookings.length / rowsOption); i++) {
        arr.push(i)
      }
    }
    else if (bookings.length == 0) {
    }
    else if ((bookings.length != 0) && ((bookings.length % rowsOption) != 0)) {
      for (let i = 1; i <= (bookings.length / rowsOption + 1); i++) {
        arr.push(i)
      }
    }
    return arr
  }

  // Left and right buttons
  const handleButtons = (direction) => {
    if (direction == 'left') {
      if (pageNum > 1) {
        handlePage(pageNum - 1, rowsOption, bookings)
      }
    }
    else {
      let arr = pages()
      if (pageNum < (arr.length)) {
        handlePage(pageNum + 1, rowsOption, bookings)
      }
    }
  }

  const onPageNumChange = (e) => {
    console.log(e.target.getAttribute('value'));
    handlePage(e.target.getAttribute('value'), rowsOption, bookings);
  }

  const onRowsChange = (e) => {
    // If options are selected too fast then it will through a undefined value
    if (parseInt(e.target.childNodes[0].innerText))
      setRowsOption(parseInt(e.target.childNodes[0].innerText));
  }

  const handleChangeColorPast = () => {
    document.getElementById("choose-bookings-types-past").style.background = '#3bb4d8';
    document.getElementById("choose-bookings-types-all").style.background = '#DFE1E2';
    document.getElementById("choose-bookings-types-future").style.background = '#DFE1E2';
  }
  const handleChangeColorAll = () => {
    document.getElementById("choose-bookings-types-all").style.background = '#3bb4d8';
    document.getElementById("choose-bookings-types-past").style.background = '#DFE1E2';
    document.getElementById("choose-bookings-types-future").style.background = '#DFE1E2';
  }
  const handleChangeColorFuture = () => {
    document.getElementById("choose-bookings-types-future").style.background = '#3bb4d8';
    document.getElementById("choose-bookings-types-all").style.background = '#DFE1E2';
    document.getElementById("choose-bookings-types-past").style.background = '#DFE1E2';
  }
  const rOptions = [
    {
      key: '5',
      text: '5',
      value: parseInt('5'),
    },
    {
      key: '10',
      text: '10',
      value: parseInt('10'),
    },
    {
      key: '15',
      text: '15',
      value: parseInt('15'),
    },
  ]

  //------------------------------------------------------------




  return (
    <div>
      <FixProfileNavbar />

      {/* <h1> All Bookings Page </h1>
      <p> Total Number of Bookings: {bookings.length}</p> */}
      {/* <GoogleCalendar /> */}

      <div className="auth-right d-lg-flex bg-photoregister ">
        <div className="bg-gradient"></div>
        <div className="profile-container profile-container-transparent resume-container-transparent">
          <div className="profile-content-card-area">
            <div className="tab-content clearfix">
              <div className="mt-5">
                <h1 className="row mb-2 ">Bookings</h1>
                <div className="d-flex h-100 w-100 justify-content-between">
                  <div className=' triple-buttons-for-bookings'>
                    <Button.Group size='medium' className='triple-buttons-for-bookings-contents'>
                      <Button className='choose-bookings-types' id='choose-bookings-types-past'>
                        <Link
                          onClick={() => {
                            setBookingTime('past');
                            handleChangeColorPast();
                            handleBookings(bookingTime);
                            setBookingType('Past');
                            setBookingTittle('See Your Past Bookings');
                            setPageNum(1)
                          }}>
                          Past
                            </Link>
                      </Button>
                      <Button className='choose-bookings-types' id="choose-bookings-types-all">
                        <Link
                          onClick={() => {
                            setBookingTime('all');
                            handleChangeColorAll();
                            handleBookings(bookingTime);
                            setBookingType('All');
                            setBookingTittle('See All Your Bookings');
                            setPageNum(1)
                          }} >
                          All
                            </Link>
                      </Button>
                      <Button className='choose-bookings-types' id='choose-bookings-types-future'>
                        <Link
                          onClick={() => {
                            setBookingTime('future');
                            handleChangeColorFuture();
                            handleBookings(bookingTime);
                            setBookingType('Future');
                            setBookingTittle('See Your Future Bookings');
                            setPageNum(1)
                          }} >
                          Future
                            </Link>
                      </Button>
                    </Button.Group>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex float-left search-label">Filter by College</div>
                    <div className="d-flex float-right searchbar">
                      <input id="institution-name-to-search" className="search_input" type="text" name="" placeholder="Search..." onChange={() => { searchByInstitution(); setPageNum(1) }} />
                      <a onClick={() => { searchByInstitution(); }} pointer className="search_icon"><i className="mdi mdi-magnify filter-search-icon"></i></a>
                    </div>
                  </div>
                </div>
                <div className="bookingsNavigation">
                  <Link to="/BookingInvoice/1" target="_blank">
                    <button
                      type="submit" /*only appears if there is any checks selected*/
                      className="btn btn-primary btn-block btn-c primary-button-no-margin-hover button-print-invoice float-right create-invoice-button">
                      Create<br />Invoice!
                      </button>
                  </Link>

                </div>
                <div className="availability-table-container">
                  <div className="availability-table text-left">
                    <Tabs
                      tabs={[
                        {
                          pathname: "/Availability",
                          text: "My Calendar"
                        },
                        {
                          pathname: "/Bookings",
                          text: "Jobs List",
                          active: true
                        },
                        // {
                        //   pathname: "/Timesheets",
                        //   text: "Timesheets",
                        //   disabled: true
                        // },
                        {
                          pathname: "/Payments",
                          text: "Payments",
                          disabled: true
                        }
                      ]}
                    />
                    <div className="availability-table-header">
                      <div className="availability-table-header-card w-auto availability-header-behind"></div>
                      <div className="availability-table-header-card">
                        <div className="similar-to-h4-style av-table-header-first-line">{booking_type}</div>
                        <div className="similar-to-h4-style-1 av-table-header-second-line">
                          {booking_tittle}</div>
                      </div>
                      {/* <span className="availability-table-header-card table-width active" id = "button-all" onClick={()=>{setBookingTime('all'); setPageNum(1)}} >
                      <h4 className="ml-3 av-table-header-first-line">
                      ALL  Bookings
                      </h4>
                      <h4 className="av-table-header-second-line">
                        See all your bookings from here
                      </h4>
                    </span>
                    <span className="availability-table-header-card table-width active" id = "button-past" onClick={()=>{setBookingTime('past'); setPageNum(1)}}>
                      <h4 className="ml-3 av-table-header-first-line">
                      Past Bookings
                      </h4>
                      <h4 className="av-table-header-second-line">
                        See all your bookings from here
                      </h4>
                    </span>
                    <span className="availability-table-header-card table-width active" id = "button-future" onClick={()=>{setBookingTime('future'); setPageNum(1)}}>
                      <h4 className="ml-3 av-table-header-first-line">
                      Future  Bookings
                      </h4>
                      <h4 className="av-table-header-second-line">
                        See all your bookings from here
                      </h4>
                    </span> */}
                    </div>
                    <div className="container h-100 pt-4 pb-4 pr-0">

                    </div>
                    <div className="availability-table-body mb-0 mt-20">
                      <div className="availability-table-body-content">
                        <table className="av-tab-root">
                          <thead className="availability-table-head">
                            <tr className="availability-table-head-row">
                              <th className="availability-table-head-cell">
                                Date
                            </th>
                              <th className="availability-table-head-cell">
                                College
                            </th>
                              <th className="availability-table-head-cell">
                                Class
                            </th>
                              <th className="availability-table-head-cell">
                                <p className="mb-0">Teaching</p><p>Paid Hours</p>
                              </th>
                              <th className="availability-table-head-cell">
                                <p className="mb-0 ">Non-Teaching</p><p className="mb-0 ">Paid Hours</p><p className="small">(College Approved)</p>
                              </th>
                              <th className="availability-table-head-cell">
                                Total Hours
                            </th>
                              <th className="availability-table-head-cell">
                                <p className="mb-0 small">Check to include</p>
                                <p className=" small">in invoice</p>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="availability-table-body-bodytable">
                            {showCurrentBookings.map((booking, index) => (
                              <tr key={index} className="availability-table-body-row">
                                <td className="availability-table-cell">
                                  <Moment format="DD/MM/YYYY">
                                    {booking.booking_date}
                                  </Moment>
                                </td>
                                <td className="availability-table-cell">
                                  {booking.institution_id}
                                </td>
                                <td className="availability-table-cell">
                                  {booking.class_type}
                                </td>
                                <td className="availability-table-cell">
                                  {booking.paid_hours}
                                </td>
                                <td className="availability-table-cell">
                                  {booking.non_teching_hr}
                                </td>
                                <td className="availability-table-cell">
                                  {booking.total_hours}
                                </td>
                                <td className="availability-table-cell">
                                  {/* Paid (<Link to='/BookingInvoice/1'  target="_blank" className=""><p>View Invoice</p></Link>  )            THIS IS THE PAID VALUE!!    */}
                                  {/* Submitted (<Link to='/BookingInvoice/1'  target="_blank" className=""><p>View Invoice</p></Link>  )       THIS IS THE SUBMITTEDA VALUE!!   */}
                                  <div className='d-flex form-check terms-and-conditions-check mt-0 pt-5px' >
                                    <div id="r8-balloon-radio-group-wrapper" className="top-0">
                                      <ul>
                                        <li>
                                          <input id={booking.booking_id}
                                            className="radio r8-radio-float"
                                            type="checkbox"
                                            value={booking.booking_id}
                                            checked={booking.checked}
                                            onClick={() => handleOnclickCB(booking.booking_id)}
                                            name="balloon-radio-group" />
                                        </li>
                                      </ul>
                                    </div>
                                    <label className="lh-40 mb-0" htmlFor={booking.booking_id}>Add to invoice</label>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <Divider />
                      <div className='row bookings-bottom pb-0'>
                        <div className='col-lg-3 col-md-0 '></div>
                        <div className='col-lg-5  col-md-12 bookings-bottom-pagination'>
                          <Responsive minWidth={1500}>
                            <Pagination totalPages={pages().length > 0 ? pages().length : 1}
                              siblingRange={1} ellipsisItem={false}
                              firstItem={false} lastItem={false}
                              onPageChange={(e) => onPageNumChange(e)} activePage={pageNum}
                            />
                          </Responsive>
                          <Responsive minWidth={1200} maxWidth={1499}>
                            <Pagination totalPages={pages().length > 0 ? pages().length : 1}
                              ellipsisItem={false} firstItem={false}
                              lastItem={false} boundaryRange={0} siblingRange={1}
                              onPageChange={(e) => onPageNumChange(e)} activePage={pageNum}
                            />
                          </Responsive>
                          <Responsive maxWidth={1199}>
                            <Pagination totalPages={pages().length > 0 ? pages().length : 1}
                              ellipsisItem={false} firstItem={false}
                              lastItem={false} boundaryRange={0} siblingRange={0}
                              onPageChange={(e) => onPageNumChange(e)} activePage={pageNum}
                            />
                          </Responsive>


                        </div>
                        <div className='col-lg-2 rows-per-page-show-1'>
                          <Responsive minWidth={1200}>
                            Rows Per Page:
                        </Responsive>
                        </div>
                        <div className='col-lg-1  col-md-12 col-xs-12 rows-per-page-show-2'>
                          <Menu compact>
                            <Dropdown id='dropdown-bookings' selection fluid options={rOptions} defaultValue={rowsOption} simple item onChange={(e) => onRowsChange(e)}
                              style={{ width: '50px', height: '25px' }}
                            />
                          </Menu>
                        </div>
                        <div className='col-lg-1 col-md-12'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="mobile-size-menu">
        <MobileNavBar></MobileNavBar>
      </div>
    </div>
  )
};

export default AllBookings;