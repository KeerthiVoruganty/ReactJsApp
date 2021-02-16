import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "./HireMe.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { getClass } from '../../Helper';
import { PORT } from "../../config";
import axios from 'axios';
import uuid from "uuid/v4";
import { notify } from 'react-notify-toast';
import { useArray, useForceUpdate } from '../../Hook';


const HireMePopUp = props =>{

    const [startDate, setStartDate] = useState(new Date());
    const [start_FromDate, setFromStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date);

    const handleClose = () => {
        props.showPopup(false)
    };

    useEffect(() => {
        // Change the date picker style
        const date_picker = document.querySelectorAll(".react-datepicker-wrapper");
        console.log(date_picker)
        if(date_picker.length !== 0){
            for(let i = 0; i < date_picker.length; i++){
                date_picker[i].style.display = "block"
            }
        }
    });

        return (
            <Modal show={true}  className="model-for-hire-me-form">
                <Modal.Header>
                    <Modal.Title>HIRE ME</Modal.Title>
                    <div  className='dot' onClick={handleClose}></div>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <form>
                            <div className="row">
                                <div className="col-12">
                                    <div className="HireMe-explanation-tittle">If you want to hire this teacher, Send us a request, checking off his availability. We will let you know ASAP. </div>
                                </div>
                                <div className="col-12 hire-me-content-box">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label htmlFor="Campus">Campus</label>
                                                </div>
                                                <div className="col-12">
                                                    <select
                                                        className="form-control"
                                                        id="Campus"
                                                        name="Campus"
                                                        required
                                                    >
                                                        <option value="">Please Select</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <label htmlFor="Campus">Class</label>
                                                </div>
                                                <div className="col-12">
                                                    <select
                                                        className="form-control"
                                                        id="Class"
                                                        name="Class"
                                                        required
                                                    >
                                                        <option value="">Please Select</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <label htmlFor="graduation_date">Date</label>
                                                </div>
                                                <div className="col-12">
                                                    <DatePicker
                                                        className="form-control"
                                                        id="date"
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        isClearable
                                                        showPopperArrow={false}
                                                        dropdownMode="select"
                                                        dateFormatCalendar="MMMM"
                                                        yearDropdownItemNumber={10}
                                                        scrollableYearDropdown
                                                        selected={startDate}
                                                        onChange={date => setStartDate(date)}
                                                        popperClassName="some-custom-class"
                                                        popperPlacement="top"
                                                    ></DatePicker>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="From_date">From</label>
                                                    <DatePicker
                                                        className="form-control"
                                                        id="from_date"
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        isClearable
                                                        showPopperArrow={false}
                                                        dropdownMode="select"
                                                        dateFormatCalendar="MMMM"
                                                        yearDropdownItemNumber={10}
                                                        scrollableYearDropdown
                                                        selected={start_FromDate}
                                                        onChange={date => setFromStartDate(date)}
                                                        popperClassName="some-custom-class"
                                                        popperPlacement="top"
                                                    ></DatePicker>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="To_date">To</label>
                                                    <DatePicker
                                                        className="form-control"
                                                        id="to_data"
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        isClearable
                                                        showPopperArrow={false}
                                                        dropdownMode="select"
                                                        dateFormatCalendar="MMMM"
                                                        yearDropdownItemNumber={10}
                                                        scrollableYearDropdown
                                                        selected={endDate}
                                                        onChange={date => setEndDate(date)}
                                                        popperClassName="some-custom-class"
                                                        popperPlacement="top"
                                                    ></DatePicker>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label htmlFor="Message">Message</label>
                                                </div>
                                                <div className="col-12">
                                                    <textarea
                                                        rows="12"
                                                        className="form-control mb-0 p-2"
                                                        id="hire_me_message"
                                                        placeholder="Message to attach to the email"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="row hire-me-bottom-box">
                                <div className="col-md-6">
                                    <button  className="btn btn-block btn-c secondary-button-no-margin-hover" onClick={handleClose}>
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-primary btn-block btn-c primary-button-no-margin-hover position-above-cancel">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        )
}

export default HireMePopUp;
