import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useToggle } from '../../Hook';
import { Link } from "react-router-dom";
import '../Resume/Resume.css';

const TeacherBookingDetails = (props) => {
    
    const booking = props.booking
    const handleClose = () => {
        props.cancelPopup(false)
    };
    const [info, warmer, pencil, college_induction] = booking.description.split('<br><br>')
    return(
        <Modal show={true} className="model-for-qualificationForm">
            <Modal.Header>
                <Modal.Title>Booking Details</Modal.Title>
                <div onClick={handleClose} className='dot'></div>
            </Modal.Header>
            <Modal.Body>
                <div className="model-main-content">               
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <h4>Summary:</h4> {booking.summary}
                            </div>
                            <div className="col-12"><br/></div>
                            <div className="col-12">
                                <h4>Location:</h4> {booking.location}
                            </div>
                            <div className="col-12"><br/></div>
                             <div className="col-12">
                                <h4>Description:</h4> <br/>
                                {info} <br/><br/>
                                {warmer} <br/><br/>
                                {pencil} <br/><br/>
                                {college_induction}
                            </div>
                        </div>
                        <div className="row qualification-footer">
                            <div className="col-md-12">
                                <div
                                    onClick={handleClose}
                                    className="btn btn-block btn-c secondary-button-no-margin-hover"
                                > Cancel </div>
                            </div>
                        </div>
                    </form>
                </div>

            </Modal.Body>

        </Modal>






    )
}

  
export default TeacherBookingDetails;
