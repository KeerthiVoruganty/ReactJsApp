import React, { useState , useEffect } from 'react';
import axios from 'axios';  
import { PORT } from '../../config';
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';
import { Search } from 'semantic-ui-react';
import TeacherBookingDetails from './TeacherBookingDetails'
require('../ValidateDocuments/ValidateDocuments.css')
require('./AllBookings/AllBookings.css')



const TeacherBookings = (props) => {
  const user = JSON.parse(window.localStorage.getItem("user"))
  const [pageNum,setPageNum] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [popupBooking, setPopupBooking] = useState();
  const [showCurrentBookings, setShowCurrentBookings] = useState([]);
  useEffect(() => {
    axios.get(`${PORT}/teacherBooking`, {
        params: {
            email: user.email
        }
    })
      .then(res => {
          setBookings(res.data.data)
          handlePage(pageNum,res.data.data)          
      }).catch(err => {
        console.log(err)
      })
  },[pageNum], ()=> {handlePage(pageNum,bookings)});


  // Calculate pages -----
  const pages = () => {
    let arr= [];
    if((bookings.length!=0)&&((bookings.length%10)==0)){
      for(let i=1;i<=(bookings.length/10);i++){
        arr.push(i)
      }
    }
    else if(bookings.length==0){
    }
    else if((bookings.length!=0)&&((bookings.length%10)!=0)){
      for(let i=1;i<=(bookings.length/10 + 1);i++){
        arr.push(i)
      }
    }
    console.log(arr.length)
    return arr
  }


    // Show 10 users per page ------
  let handlePage = (pageNumber, allTeachers) => {
    console.log("======handlePage=======")
    let currentUser = []
    if(allTeachers.length > 0){
      if((allTeachers.length%10)==0){
        for(let i=((pageNumber-1)*10);i<(((pageNumber-1)*10)+10);i++){
          currentUser.push(allTeachers[i])
        }
      }
      else{ 
        for(let i=((pageNumber-1)*10);i<(((pageNumber-1)*10)+10);i++){
          if((i<allTeachers.length)){
            currentUser.push(allTeachers[i])
            }
        } 
      }

      setShowCurrentBookings(currentUser)
      setPageNum(pageNumber)
    } else{
      console.log("No Teachers")
      setShowCurrentBookings([])
    }
  }

  // Left and right buttons-----
  const handleButtons = (direction) => {
      if(direction == 'left'){
        if(pageNum>1){
          handlePage(pageNum-1,bookings)
        }
        else{
          handlePage(pageNum,bookings)
        }
      }
      else{
        let arr = pages()
        if(pageNum<(arr.length)){
          handlePage(pageNum+1,bookings)
        }
      }
  } 

  const togglePopup = (b) => {
    setPopupBooking(b)
    setIsPopup(true)
  }


  return (
   
    <div>
        <FixProfileNavbar />
        {isPopup && <TeacherBookingDetails cancelPopup={setIsPopup} booking={popupBooking} />}
        <div className="auth-right d-lg-flex bg-photoregister ">
            <div className="bg-gradient"></div>
                <div className="profile-container">
                <div className="profile-content-card-area">
                    <div className="tab-content clearfix">
                    <div className="mt-5">
                        <div className="availability-table-container">
                        <div className="availability-table">
                            <div className="availability-table-header">
                            <div className="availability-table-header-card">
                                <h4 className="ml-3 av-table-header-first-line">
                                Bookings
                                </h4>
                                <h4 className="av-table-header-second-line">
                                Details of your bookings
                                </h4>
                            </div>
                            </div>
                            <div className="availability-table-body mb-0">
                            <div className="availability-table-body-content">
                                <table className="av-tab-root">
                                <thead className="availability-table-head">
                                    <tr className="availability-table-head-row">
                                    <th className="availability-table-head-cell">
                                        Summary
                                    </th>
                                    <th className="availability-table-head-cell">
                                        Date
                                    </th>
                                    <th className="availability-table-head-cell">
                                        Time
                                    </th>                              
                                    </tr>
                                </thead>
                                <tbody className="availability-table-body-bodytable">
                                    {showCurrentBookings.map((b, index) => (
                                    <tr key={index} className="availability-table-body-row" onClick={() => togglePopup(b)}>                                                                    
                                    <td className="availability-table-cell">
                                        {b.summary}
                                    </td>
                                    <td className="availability-table-cell">
                                        {b.start.dateTime.slice(0,10)}
                                    </td>
                                    <td className="availability-table-cell">
                                        {b.start.dateTime.slice(11,16)} - {b.end.dateTime.slice(11,16)}
                                        </td>
                                        <td className="availability-table-cell">
                                        {/* <Link className="btn btn-success" onClick= {() => handledetails(user._id)}>More Details</Link> */}
                                        </td>
                                        {
                                        //onClick = {handledetails(user._id)}
                                        }
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>

                            <div className="table-pagination"  >
                                <div className="pagination-boxes">
                                <span className = "hover-color" onClick={() => handleButtons("left") }>&laquo;</span>

                                    <span className = "hover-color" onClick={()=>handlePage(1,bookings)}>1</span>
                                    <span className='isActive'>{pageNum}</span>
                                    <span className = "hover-color" onClick={()=>handlePage(pages().length>0?pages().length:1,bookings)}>{pages().length>0?pages().length:1}</span>

                                <span className = "hover-color" onClick={()=>handleButtons("Right")}>&raquo;</span>
                                </div>
                                <div className="page-toggle">
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
  )
};

export default TeacherBookings;