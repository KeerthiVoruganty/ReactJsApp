import React from "react";
import "./FixProfileNavbar.css";
import "./ProfileNavbar.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router";
import "./mobileNavBar.scss"
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import "./react-dd-menu.css"

function handleLogout(evt) {
    window.localStorage.clear();
}

class FirstMobileNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.offset = (this.props.offset ? "50px" : "0");
        this.state = {
            isMenuOpen: false
        }
    }

    btn_jump_profile = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    };

    btn_jump_resume = () => {
        this.props.history.push("/resume");
    };

    btn_jump_admin_allteachers = () => {
        this.props.history.push("/AllTeachers");
    };

    btn_jump_admin_allcolleges = () => {
        this.props.history.push("/AllColleges");
    };

    btn_jump_admin_validatedocs = () => {
        this.props.history.push("/validatedocuments");
    };

    btn_jump_availability = () => {
        this.props.history.push("/Availability");
    }

    btn_jump_bookings = () => {
        this.props.history.push("/Bookings");
    }

    btn_jump_information = () => {
        this.props.history.push("/PersonalDetails");
    };

    btn_jump_emergency = () => {
        this.props.history.push("/EmergencyContact");
    }

    btn_jump_identificationDoc = () => {
        this.props.history.push("/IdentificationDoc");
    };

    btn_jump_visa = () => {
        this.props.history.push("/Visa");
    }

    btn_jump_police_check = () => {
        this.props.history.push("/PoliceCheck");
    }

    btn_jump_wwcc = () => {
        this.props.history.push("/WorkingWithChildrenChk");
    }

    btn_jump_security = () => {
        this.props.history.push("/");
    };

    btn_jump_payments = () => {
        // this.props.history.push("/payments");
    };

    btn_jump_logout = () => {
        window.localStorage.clear();
        this.props.history.push("/login");
    };

    toggle = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    close = () => {
        this.setState({ isMenuOpen: false });
    };

    menuItem = (title, icon, onClick) => {
        return (<span className={icon ? `mdi mdi-${icon}` : ""} onClick={onClick}>
            <span className={icon ? "item-icon-inner" : ""}>{title}</span>
        </span>)
    }

    render() {
        const user = JSON.parse(window.localStorage.getItem("user"));

        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <span onClick={this.toggle}><i className="mdi mdi-menu"></i> Menu</span>,
            align: 'right',
            textAlign: "left",
            size: "md",
            className: "dropdown-menu-fix menu-button mobile-menu",
            animate: false,
            closeOnInsideClick: false
        };

        const nestedMenuOptions = (menuItem, icon, onClick) => {
            return {
                toggle: this.menuItem(menuItem, icon, onClick),
                delay: 0,
                openOnMouseover: false
            }
        }

        return (
            <>
                <div className="top-fix-navbar row profile-navbar menu__header" style={{ top: this.offset }}>
                    <div className="col-md-1">
                        <Link title="Ready Teacher" to="/" onClick={this.btn_jump_profile}>
                            <img src={logo} alt="logo" className="logo profile-logo" />
                        </Link>
                    </div>

                    <div className="col-md-12 menu-area-container menu-area-container-mobile">
                        <div className="menu-area">
                            <ul className="nav nav-pills">
                                <li>
                                    <div className="drop-down-box">
                                        <DropdownMenu {...menuOptions}>
                                            {user.role === "admin" ?
                                                [
                                                    <li>{this.menuItem("Teachers", "account-multiple", this.btn_jump_admin_allteachers)}</li>,
                                                    <li>{this.menuItem("Colleges", "office-building", this.btn_jump_admin_allcolleges)}</li>,
                                                    <li>{this.menuItem("Validate Teacher Documents", "calendar-check", this.btn_jump_admin_validatedocs)}</li>,
                                                    // <li><div onClick={this.btn_jump_admin_allteachers} className="mdi mdi-account-multiple item-icon">
                                                    //     <span className="item-icon-inner">Teachers</span>
                                                    // </div></li>,
                                                    // <li><div onClick={this.btn_jump_admin_allcolleges} className="mdi mdi-office-building item-icon">
                                                    //     <span className="item-icon-inner">Colleges</span>
                                                    // </div></li>,
                                                    // <li><div onClick={this.btn_jump_admin_validatedocs} className="mdi mdi-calendar-check item-icon">
                                                    //     <span className="item-icon-inner">Validate Teacher Documents</span>
                                                    // </div></li>
                                                ]
                                                : [
                                                    <li>{this.menuItem("Profile", "account-circle-outline", this.btn_jump_profile)}</li>,
                                                    <li><details>
                                                        <summary>{this.menuItem("Bookings & Availability", "calendar-check")}</summary>
                                                        <li><div className="menu-item-disabled">My Calendar</div></li>
                                                        <li><div className="menu-item-disabled">Jobs List</div></li>
                                                        <li><div className="menu-item-disabled">Timesheets</div></li>
                                                        <li><div className="menu-item-disabled">Payments</div></li>
                                                    </details></li>,
                                                    <li><details>
                                                        <summary>{this.menuItem("Personal Information", "account-card-details")}</summary>
                                                        <li><div onClick={this.btn_jump_information}>Personal Details</div></li>
                                                        <li><div onClick={this.btn_jump_emergency}>Emergency Contact</div></li>
                                                        <li><div className="menu-item-disabled">Delete Account</div></li>
                                                    </details></li>,
                                                    <li><details>
                                                        <summary>{this.menuItem("Identification", "account-check")}</summary>
                                                        <li><div onClick={this.btn_jump_identificationDoc}>Personal I.D.</div></li>
                                                        <li><div onClick={this.btn_jump_visa}>Visa Details</div></li>
                                                        <li><div onClick={this.btn_jump_police_check}>Police Check (Opt.)</div></li>
                                                        <li><div onClick={this.btn_jump_wwcc}>WWCC (Opt.)</div></li>
                                                    </details></li>,
                                                    <li><details>
                                                        <summary>{this.menuItem("Banking & Super", "credit-card-settings")}</summary>
                                                        <li><div className="menu-item-disabled">Bank Details</div></li>
                                                        <li><div className="menu-item-disabled">Tax Declaration</div></li>
                                                        <li><div className="menu-item-disabled">Superannuation</div></li>
                                                    </details></li>,
                                                ]
                                            }
                                            <li style={{ position: "fixed", bottom: 0 }}>
                                                {this.menuItem("Logout", "power", this.btn_jump_logout)}
                                            </li>
                                        </DropdownMenu>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
                {/* <button className="menu__button" style={{ top: this.offset }}>
                    <div className="mdi mdi-menu mobile-menu-button-icon">
                        <div ></div>
                    </div>
                </button> */}
                {/* <section className="menu__body" hidden="hidden">
                    <div className="menu__header">
                        <img src={logo} alt="logo" className=" ml-1 my-2 drawer-menu-logo" />
                        <p className="mobile-logo-content mr-3 my-auto p-0">
                            ReadyTeacher
                                </p>
                        <button title="Close" class="my-auto">
                            <icon className="mdi mdi-close"></icon>
                        </button>
                    </div>
                    <div className="menu__links">
                        <Link to="/">
                            <icon className="mdi mdi-account-circle-outline d-block text-center fs-16"></icon>
                                    Profile
                                </Link>
                        <Link to="/resume">
                            <icon className="mdi mdi-briefcase d-block text-center fs-16"></icon>
                                    Resume
                                </Link>
                        <Link to="/personalDetails">
                            <icon className="mdi mdi-account-card-details d-block text-center fs-16"></icon>
                                    Personal Details
                                </Link>
                        <Link to="/availability">
                            <icon className="mdi mdi-calendar-clock d-block text-center fs-16"></icon>
                                    Availability
                                </Link>
                        <Link
                            title="Logout"
                            to="/login"
                            onClick={handleLogout}
                        >
                            <icon className="mdi mdi-power d-block text-center fs-16"></icon>
                                    Logout
                                </Link>
                    </div>
                    <div className="menu-profile">
                        <Link to="/">
                            <div className="mdi mdi-account-circle-outline mobile-icon "></div>
                        </Link>
                        <Link to="/availability">
                            <div className="mdi mdi-calendar-clock mobile-icon "></div>
                        </Link>

                    </div>
                </section> */}
                {/* <div className="menu__overlay" hidden="hidden"></div> */}
            </>
        );
    }
}

const MobileNavBar = withRouter(FirstMobileNavBar);

export default MobileNavBar;
