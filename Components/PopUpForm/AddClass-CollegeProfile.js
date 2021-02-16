import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "./AddClass.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import uuid from "uuid/v4";
import { notify } from 'react-notify-toast';
import { useArray, useForceUpdate } from '../../Hook';

const animatedComponents = makeAnimated();

const class_types = [
    { value: 'IELTS', label: 'IELTS' },
    { value: 'Elementary GE', label: 'Elementary GE' },
    { value: 'Pre-Intermidiate GE', label: 'Pre-Intermidiate GE' },
    { value: 'Intermidiate GE', label: 'Intermidiate GE' }
]
const days_types = [
    {value:'Monday', label:'Monday'},
    {value:'Tuesday', label:'Tuesday'},
    {value:'Wednesday',label:'Wednesday'},
    {value:'Thursday', label:'Thursday'},
    {value:'Friday', label:'Friday'}
]

const AddCollegeProfileClass = props =>{

    const [paidHours,setPaidHours] = useState();
    const [levelType,setLevelType] = useState();
    const [sessionType, setSessionType] = useState();
    const [start_ArrivalDate, setArrivalDate] = useState(new Date(10));
    const [startDate, setStartDate] = useState(new Date(10));
    const [endDate, setEndDate] = useState(new Date(10));
    const [workDays,setWorkDays] = useState();

    const handleClose = () => {
        props.showPopup(false)
    };


    useEffect(() => {
        // Change the date picker style
        const date_picker = document.querySelectorAll(".react-datepicker-wrapper");
        if(date_picker.length !== 0){
            for(let i = 0; i < date_picker.length; i++){
                date_picker[i].style.display = "block"
            }
        }

        //calculate the paid hours
        if((endDate-startDate) < 0){
            notify.show("Please Select the correct Time");
            setStartDate(new Date(10));
            setEndDate(new Date(10));

        }
        setPaidHours((endDate-startDate)/3600000);
    });


    return (
        <Modal show={true}  className="model-for-hire-me-form">
            <Modal.Header>
                <Modal.Title>ADD CLASS</Modal.Title>
                <div  className='dot' onClick={handleClose}></div>
            </Modal.Header>
            <Modal.Body>
                <div className="">
                    <form>
                        <div className="row">
                            <div className="col-12 hire-me-content-box">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="Department">Department</label>
                                            </div>
                                            <div className="col-12">
                                                <select
                                                    className="form-control"
                                                    id="class-add-department"
                                                    name="class-add-department"
                                                    required
                                                >
                                                    <option value="">Please Select</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="Class_Type">Level/Class Type</label>
                                            </div>
                                            <div className="col-12">
                                                <Select
                                                    id="class_type_college_profile"
                                                    name="class_type_college_profile"
                                                    options={class_types}
                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                    isSearchable
                                                    isMulti
                                                    required

                                                ></Select>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="Arrival_Time">Arrival Time</label>
                                            </div>
                                            <div className="col-12">
                                                <DatePicker
                                                    className="form-control"
                                                    id="class-add-start-date"
                                                    isClearable
                                                    showPopperArrow={false}
                                                    selected={start_ArrivalDate}
                                                    onChange={date => setArrivalDate(date)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    popperClassName="some-custom-class"
                                                    popperPlacement="top"
                                                ></DatePicker>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="Start_Time">Start Time</label>
                                                <DatePicker
                                                    className="form-control"
                                                    id="class-add-start-date"
                                                    selected={startDate}
                                                    onChange={date => setStartDate(date)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    popperClassName="some-custom-class"
                                                    popperPlacement="top"
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="Start_Time">End Time</label>
                                                <DatePicker
                                                    className="form-control"
                                                    id="class-add-end-date"
                                                    selected={endDate}
                                                    onChange={date => setEndDate(date)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    popperClassName="some-custom-class"
                                                    popperPlacement="top"
                                                />
                                            </div>
                                        </div>


                                    </div>
                                    <div className="col-6">

                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="paid_hours">Paid Hours (Number Only)</label>
                                            </div>
                                            <div className="col-12">
                                                    <input
                                                        className="form-control"
                                                        id="class-add-paid-hours"
                                                        placeholder={paidHours}
                                                        //value={paidHours}
                                                    ></input>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="Class_Type">Days</label>
                                            </div>
                                            <div className="col-12">
                                                <Select
                                                    id="days_college_profile"
                                                    name="days_college_profile"
                                                    options={days_types}
                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                    isSearchable
                                                    isMulti
                                                    required

                                                ></Select>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="Session">Session</label>
                                            </div>
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                                        <div id="r8-balloon-radio-group-wrapper-availability">
                                                            <ul>
                                                                <li>
                                                                    <input
                                                                        className="radio r8-radio-float"
                                                                        type="checkbox"
                                                                        id="weekday_morning"
                                                                        name="balloon-radio-group"
                                                                    />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <label className="availability-rule-checks add-class-session-icon-position">
                                                            <i className="availability-rule-icons sunrise-icon mdi mdi-weather-sunset-up"></i>
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                                        <div id="r8-balloon-radio-group-wrapper-availability">
                                                            <ul>
                                                                <li>
                                                                    <input
                                                                        className="radio r8-radio-float"
                                                                        type="checkbox"
                                                                        id="weekday_afternoon"
                                                                        name="balloon-radio-group"
                                                                    />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <label className="availability-rule-checks add-class-session-icon-position">
                                                            <i className="availability-rule-icons day-icon mdi mdi-weather-sunny"></i>
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-4 col-12 col-sm-12 form-check d-block text-center">
                                                        <div id="r8-balloon-radio-group-wrapper-availability">
                                                            <ul>
                                                                <li>
                                                                    <input
                                                                        className="radio r8-radio-float"
                                                                        type="checkbox"
                                                                        id="weekday_evening"
                                                                        name="balloon-radio-group"
                                                                    />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <label className="availability-rule-checks add-class-session-icon-position">
                                                            <i className="availability-rule-icons evening-icon mdi mdi-weather-night"></i>
                                                        </label>
                                                    </div>
                                                </div>
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

export default AddCollegeProfileClass;
