import React from 'react';
// import logo from "../../assets/img/logo.png"
import logo from '../../assets/img/logo_right-removebg.png';
import './Register.css';


const BeforeEmailConfirm = (props) => {
    return (
        <>
          
            <div className="row">
                <div className="col-lg-6 auth-left mobile-background-registration">
                    <div className="row auth-form mb-4">
                    <div className='row auth-form pr-0 pl-5 login-form-container small-screen-small-padding'>
                        <div className="col-12 col-sm-12">
                            <div className="auth-text-top mb-5">
                                <h1 className="small-scree-white-text">Email Confirmation</h1>
                                <hr></hr>
                                {/* <p className="text-lg">Please check your {props.location.emailId} mailbox to confirm and proceed your registration with us.</p> */}
                                <p className="text-lg">Please check your email inbox {props.location.emailId} and promotions folders for your account verification email.</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </div>
                <div className="col-xl-6 auth-right d-lg-flex d-none bg-photoregister">

                    <div className="bg-gradient"></div>

                        <div className="logo-container">
                            
                            <img src={logo} alt="logo" className="logo logo_right"/>
                            
                            {/* <div className="heading">
                                <h2 className="name"> ReadyTeacher</h2>
                                <p>Welcome to the ELICOS industry’s first and only staffing platform</p>
                            </div> */}
                        </div>
                    
                    <div className="shape"></div>
                </div>
            </div>
        </>
    );
}


export default BeforeEmailConfirm
