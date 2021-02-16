import React, { useState , useEffect } from 'react';
import axios from 'axios';  
import { PORT } from '../../config';
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';
import { Search } from 'semantic-ui-react';
import './Admin.css'

require('../ValidateDocuments/ValidateDocuments.css')
require('../Bookings/AllBookings/AllBookings.css')



const AllColleges = (props) => {

  let [pageNum,setPageNum] = useState(1)
  let [showCurrentUsers, setShowCurrentUsers] = useState([]);
  let [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    axios.get(`${PORT}/AllColleges`)
      .then(res => {
        window.localStorage.setItem("allusers",JSON.stringify(res.data))
        setAllUsers((res.data));
        searchByInstitution()
        //console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
  },[pageNum]);


  // Calculate pages -----
  const pages = () => {
    let arr= [];
    if((allUsers.length!=0)&&((allUsers.length%10)==0)){
      for(let i=1;i<=(allUsers.length/10);i++){
        arr.push(i)
      }
    }
    else if(allUsers.length==0){
    }
    else if((allUsers.length!=0)&&((allUsers.length%10)!=0)){
      for(let i=1;i<=(allUsers.length/10 + 1);i++){
        arr.push(i)
      }
    }
    return arr
  }


    // Show 10 users per page ------
  let handlePage = (pageNumber, AllColleges) => {
    let currentUser = []
    if(AllColleges.length > 0){
      if((AllColleges.length%10)==0){
        for(let i=((pageNumber-1)*10);i<(((pageNumber-1)*10)+10);i++){
          currentUser.push(AllColleges[i])
        }
      }
      else{ 
        for(let i=((pageNumber-1)*10);i<(((pageNumber-1)*10)+10);i++){
          if((i<AllColleges.length)){
            currentUser.push(AllColleges[i])
            }
        } 
      }
      setShowCurrentUsers(currentUser)
      setPageNum(pageNumber)
    } else{
      console.log("No Colleges")
      setShowCurrentUsers([])
    }
  }

  const goToDetail = (user) => {
    const path ={
    user: "user",
    pathname: '/TeacherpersonalDetails'
    }
    console.log("user: "+user)
    props.history.push(path)
  }


  // Left and right buttons-----
  const handleButtons = (direction) => {
      if(direction == 'left'){
        if(pageNum>1){
          handlePage(pageNum-1,allUsers)
        }
        else{
          handlePage(pageNum,allUsers)
        }
      }
      else{
        let arr = pages()
        if(pageNum<(arr.length)){
          handlePage(pageNum+1,allUsers)
        }
      }
  } 

  const searchByInstitution = () => {
    let searchItem = document.getElementById('institution-name-to-search').value
    if(searchItem.length>0){
      
      const allUsers = JSON.parse(window.localStorage.getItem("allusers"))
      if(allUsers.length > 0){

        //let search =searchItem
        let filter_users = allUsers.filter( b => b.first_name==undefined || b.last_name==undefined|| b.email==undefined||b.contact_number==undefined ? (null, console.log("No teacher")):(b.first_name+b.last_name+b.email+b.contact_number).includes(searchItem))

        handlePage(pageNum,filter_users)
        setAllUsers(filter_users)
        pages()
      }
    } else{
      setAllUsers(JSON.parse(window.localStorage.getItem("allusers")))
      handlePage(pageNum,JSON.parse(window.localStorage.getItem("allusers")))
      pages()
    }   
  };


  return (
    <div>
    <FixProfileNavbar />

    <div className="auth-right d-lg-flex bg-photoregister ">
      <div className="bg-gradient"></div>
      <div className="profile-container mt-4">
        <div className="profile-content-card-area">
          <div className="tab-content clearfix">
            <div className="mt-5">

              <h1 className="col-12 ">Manage Colleges</h1>
              <div className="d-flex mt-4 mb-0">
                <div className="search-label">Search</div>
                <div className="searchbar" id="all-teachers-search">
                  <input id="institution-name-to-search" className="search_input" type="text" name="" placeholder="Search..." onChange = {(e) => { searchByInstitution(); setPageNum(1)} } /> 
                  <a onClick={() => { searchByInstitution();}} pointer className="search_icon font-25"><i className="mdi mdi-account-search"></i></a>
                </div>
              </div>

              <div className="availability-table-container mt-0">
                <div className="availability-table">
                  <div className="availability-table-header">
                    <div className="availability-table-header-card availability-header-behind"></div>
                    <span id="front-header" className="availability-table-header-card" >
                      <h4 className=" av-table-header-first-line">All Colleges</h4>
                      <h4 className="av-table-header-second-line">Details of all colleges</h4>
                    </span>
                    
                  </div>
                  <div className="availability-table-body mb-0">
                    <div className="availability-table-body-content overflow-auto">
                      <table className="av-tab-root">
                        <thead className="availability-table-head">
                          <tr className="availability-table-head-row">
                            <th className="availability-table-head-cell">
                              Institution Name
                            </th>
                            <th className="availability-table-head-cell">
                              Profile
                            </th> 
                            <th className="availability-table-head-cell">
                              Details
                            </th>                              
                          </tr>
                        </thead>
                        <tbody className="availability-table-body-bodytable">
                            <tr 
                            // key={index} 
                            className="availability-table-body-row h-40">                                                               
                              <td className="availability-table-cell">
                                College Name
                              </td>
                              <td className="availability-table-cell">
                                <Link className="mdi mdi-account-circle-outline home-icon-margin-adjust profile-link" 
                                // to={{ pathname: `https://master.d2ui2xxezlfztd.amplifyapp.com/sharedProfile?id=${user.email}`}}  
                                target="blank"></Link>
                              </td>
                              <td className="availability-table-cell">
                                <Link className="btn btn-primary btn-block btn-c primary-button-no-margin-hover" 
                                 to={{ pathname: "/CollegeCampuses" }}
                                // onClick= {() => (window.localStorage.setItem('college',JSON.stringify(user)), props.history.push('/CollegePesonalDetails'))}
                                >More Details</Link>
                              </td>
                              {
                                //onClick = {handledetails(user._id)}
                              }
                          </tr>
                          <tr >
                            <table className="av-tab-root ml-5">
                              <thead className="availability-table-head">
                                <tr className="availability-table-head-row">
                                  <th className="availability-table-head-cell">
                                    Campus Name
                                  </th>
                                  <th className="availability-table-head-cell">
                                    Managers
                                  </th> 
                                </tr>
                              </thead>
                              <tbody className="availability-table-body-bodytable">
                                <tr 
                                  // key={index} 
                                  className="availability-table-body-row h-40">                                                               
                                    <td className="availability-table-cell">
                                      Campus 1
                                    </td>
                                    <td className="availability-table-cell">
                                      Manager 1, Manager 2, Manager 3
                                    </td>
                                </tr>
                                <tr 
                                  // key={index} 
                                  className="availability-table-body-row h-40">                                                               
                                    <td className="availability-table-cell">
                                      Campus 2
                                    </td>
                                    <td className="availability-table-cell">
                                      Manager 1, Manager 2, Manager 3
                                    </td>
                                </tr>
                              </tbody>
                            </table>
                          </tr>

                          <tr 
                            // key={index} 
                            className="availability-table-body-row h-40">                                                               
                              <td className="availability-table-cell">
                                College Name
                              </td>
                              <td className="availability-table-cell">
                                <Link className="mdi mdi-account-circle-outline home-icon-margin-adjust profile-link" 
                                // to={{ pathname: `https://master.d2ui2xxezlfztd.amplifyapp.com/sharedProfile?id=${user.email}`}}  
                                target="blank"></Link>
                              </td>
                              <td className="availability-table-cell">
                                <Link className="btn btn-primary btn-block btn-c primary-button-no-margin-hover" 
                                  to={{ pathname: "/CollegeCampuses" }}
                                // onClick= {() => (window.localStorage.setItem('college',JSON.stringify(user)), props.history.push('/CollegePesonalDetails'))}
                                >More Details</Link>
                              </td>
                              {
                                //onClick = {handledetails(user._id)}
                              }
                          </tr>
                          <tr >
                            <table className="av-tab-root ml-5">
                              <thead className="availability-table-head">
                                <tr className="availability-table-head-row">
                                  <th className="availability-table-head-cell">
                                    Campus Name
                                  </th>
                                  <th className="availability-table-head-cell">
                                    Managers
                                  </th> 
                                </tr>
                              </thead>
                              <tbody className="availability-table-body-bodytable">
                                <tr 
                                  // key={index} 
                                  className="availability-table-body-row h-40">                                                               
                                    <td className="availability-table-cell">
                                      Campus 1
                                    </td>
                                    <td className="availability-table-cell">
                                      Manager 1, Manager 2, Manager 3
                                    </td>
                                </tr>
                                <tr 
                                  // key={index} 
                                  className="availability-table-body-row h-40">                                                               
                                    <td className="availability-table-cell">
                                      Campus 2
                                    </td>
                                    <td className="availability-table-cell">
                                      Manager 1, Manager 2, Manager 3
                                    </td>
                                </tr>
                              </tbody>
                            </table>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="table-pagination"  >
                      
                      <div className="pagination-boxes">
                        <span className = "hover-color" onClick={() => handleButtons("left") }>&laquo;</span>
                        <span className = "hover-color" onClick={()=>handlePage(1,allUsers)}>1</span>
                        <span className='isActive'>{pageNum}</span>
                        <span className = "hover-color" onClick={()=>handlePage(pages().length>0?pages().length:1,allUsers)}>{pages().length>0?pages().length:1}</span>
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

export default AllColleges;