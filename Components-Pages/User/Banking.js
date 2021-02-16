import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../User/DateRange.css";
import axios from "axios";
import { PORT } from "../../config";
import { notify } from "react-notify-toast";
import FixProfileNavbar from "../../Components/Navbar/FixProfileNavbar";
import "../User/UserProfile.css";
import "react-datepicker/dist/react-datepicker.css";
import MobileNavBar from "../../Components/Navbar/MobileNavBar";
import Tabs from "../../Components/Tabs/Tabs";
import $ from 'jquery';
require("./PersonalDetails.css");

const URL = PORT;

export class Banking extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user === null) {
      window.location = "/login";
    }

    this.state = {
      fund_name: user.fund_name,
      usi: user.usi,
      fund_abn: user.fund_abn,
      member_number: user.member_number,
      fund_name2: user.fund_name2,
      fund_abn2: user.fund_abn2,
      fund_bank_acc_no: user.fund_bank_acc_no,
      member_number2: user.member_number2,
      fund_bank_bsb: user.fund_bank_bsb,
    };
    this.handleradioChange = this.handleradioChange.bind(this);
    this.setUserState = this.setUserState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  handleradioChange(e) {
    const field = e.target.name;
    const value = e.target.title;
    switch (field) {
      case "rdoption1":
        $("#rdoption2").prop('checked', false);
        $("#rdoption3").prop('checked', false);
        $("#option2").hide();
        $("#option3").hide();
        break;
      case "rdoption2":
        $("#option1").hide();
        $("#option3").hide();
        $("#rdoption1").prop('checked', false);
        $("#rdoption3").prop('checked', false);
        break;
      case "rdoption3":
        $("#option2").hide();
        $("#option1").hide();
        $("#rdoption2").prop('checked', false);
        $("#rdoption1").prop('checked', false);
        break;
      default:
        break;
    }
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
    // this.state.visa_status === "I am Australian Citizen
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .put(`${URL}/updateUser`, {
        user,
      })
      .then((res) => {
        notify.show("Superannuation details saved successfully");
        document.getElementById("lnkIdentification").click();
      })
      .catch((err) => {
        notify.show(err, "error");
      });
  }

  // Updates local storage object when any control updates its state
  updateLocalStorage(field, value) {
    let userData = JSON.parse(window.localStorage.getItem("user"));
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    let userData = JSON.parse(window.localStorage.getItem("user"));

    this.state[field] = value;
    this.setState({ [`${field}`]: value });
    userData[`${field}`] = value;
    window.localStorage.setItem("user", JSON.stringify(userData));
  }

  render() {
    return (
      <div>
        <FixProfileNavbar />
        <div className="auth-right d-lg-flex bg-photoregister ">
          <div className="bg-gradient"></div>
          <div className="profile-container profile-container-transparent">
            <div className="profile-content-card-area">
              <div className="tab-content clearfix">
                <div className="mt-5">
                  <h1 className="mb-4">Personal Information</h1>
                  {/* content of the form */}
                  <div className="availability-table-container">
                    <div className="availability-table">
                      <Tabs
                        tabs={[
                          {
                            pathname: "/PersonalDetails",
                            text: "Personal Details",
                          },

                          {
                            pathname: "/Banking",
                            text: "Banking & Super",
                            active: true,
                          },
                          {
                            pathname: "/EmergencyContact",
                            text: "Emergency Contact",
                          },
                        ]}
                      />
                      {/* container of the form */}
                      <div className="availability-table-body mb-0 mt-5">
                        <div className="availability-table-body-content h-100">
                          <form onSubmit={this.handleSubmit}>
                            <div className="container mt-5">
                              <h2>Superannuation</h2>
                              <div className="row" id ="option1">
                                <div className="col-lg-6 col-md-12">
                                  <div className="row row-input-identification">
                                    <div id="r8-balloon-radio-group-wrapper-identification-1">
                                      <ul>
                                        <li>
                                          <input
                                            className="radio r8-radio-float"
                                            type="radio"
                                            id="rdoption1"
                                            name="rdoption1"
                                            radioGroup="rdoption"
                                            onChange={this.handleradioChange}
                                          />
                                        </li>
                                      </ul>
                                    </div>
                                    <h4 className="balloon-radio-idenntification-label col-8">
                                      {" "}
                                      1: Regulated Super Fund
                                    </h4>
                                  </div>
                                  <div className="auth-text-top mb-5">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Fund Name
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="fund_name"
                                        name="fund_name"
                                        placeholder="Fund Name"
                                        value={this.state.fund_name}
                                        onChange={this.setUserState}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">USI</p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control user-profile-form-input"
                                        id="usi"
                                        name="usi"
                                        placeholder="USI"
                                        value={this.state.usi}
                                        onChange={this.setUserState}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                  <h4> &nbsp;</h4>
                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">
                                        Fund ABN
                                      </p>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="fund_abn"
                                      name="fund_abn"
                                      value={this.state.fund_abn}
                                      onChange={this.setUserState}
                                      placeholder="Fund ABN"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">
                                        Member Number
                                      </p>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="member_number"
                                      name="member_number"
                                      value={this.state.member_number}
                                      onChange={this.setUserState}
                                      placeholder="Member Number"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row" id="option2">
                             
                                <div className="col-lg-6 col-md-12">
                                <div className="row row-input-identification">
                                    <div id="r8-balloon-radio-group-wrapper-identification-1">
                                      <ul>
                                        <li>
                                          <input
                                            className="radio r8-radio-float"
                                            type="radio"
                                            id="rdoption2"
                                            name="rdoption2"
                                            radioGroup="rdoption"
                                            onChange={this.handleradioChange}
                                            required
                                          />
                                        </li>
                                      </ul>
                                    </div>
                                    <h4 className="balloon-radio-idenntification-label col-8">
                                      {" "}
                                      2: Self-managed Super Fund
                                    </h4>
                                  </div>
                                  <div className="auth-text-top mb-5">
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Fund Name
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control user-profile-form-input"
                                        id="fund_name2"
                                        name="fund_name2"
                                        placeholder="Fund Name"
                                        value={this.state.fund_name2}
                                        onChange={this.setUserState}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Fund ABN
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="fund_abn2"
                                        name="fund_abn2"
                                        onChange={this.setUserState}
                                        value={this.state.fund_abn2}
                                        placeholder="Fund ABN"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Fund Bank Account Number
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="fund_bank_acc_no"
                                        name="fund_bank_acc_no"
                                        onChange={this.setUserState}
                                        value={this.state.fund_bank_acc_no}
                                        placeholder="Fund Bank Account Number"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                  <h4>&nbsp;</h4>
                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">
                                        Member Number
                                      </p>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="member_number2"
                                      name="member_number2"
                                      onChange={this.setUserState}
                                      value={this.state.member_number2}
                                      placeholder="Member Number"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">
                                        Fund Bank BSB
                                      </p>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="fund_bank_bsb"
                                      name="fund_bank_bsb"
                                      value={this.state.fund_bank_bsb}
                                      onChange={this.setUserState}
                                      placeholder="Fund Bank BSB"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row" id="option3">
                                <div className="col-lg-6 col-md-12">
                                <div className="row row-input-identification">
                                    <div id="r8-balloon-radio-group-wrapper-identification-1">
                                      <ul>
                                        <li>
                                          <input
                                            className="radio r8-radio-float"
                                            type="radio"
                                            id="rdoption3"
                                            name="rdoption3"
                                            radioGroup="rdoption"
                                            onChange={this.handleradioChange}
                                          />
                                        </li>
                                      </ul>
                                    </div>
                                    <h4 className="balloon-radio-idenntification-label col-8">
                                      {" "}
                                      3: Default fund
                                    </h4>
                                  </div>
                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">
                                        Fund Name
                                      </p>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="fund_name"
                                      name="fund_name"
                                      value="AustralianSuper"
                                      disabled
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="w-100">
                                      <p className="float-left mb-0">
                                        Fund ABN
                                      </p>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="fund_abnd"
                                      name="fund_abnd"
                                      disabled
                                      value="65 714 394 898"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                  <div className="auth-text-top mb-5">
                                    <h4> &nbsp; </h4>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">USI</p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="usid"
                                        name="usid"
                                        value="STA0100AU"
                                        disabled
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label className="w-100">
                                        <p className="float-left mb-0">
                                          Fund Phone
                                        </p>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="fund_phone"
                                        name="fund_phone"
                                        value="1300 300 273"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* submit  buttons */}
                              <div className="row pl-0 pr-0 mr-0">
                                <div className="col-lg-6 col-md-12 pr-0 m-auto">
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-c primary-button-no-margin-hover"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
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
    );
  }
}
export default Banking;
