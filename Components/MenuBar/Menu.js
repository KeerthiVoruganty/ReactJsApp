import React from "react";
import "../Navbar/FixProfileNavbar.css";
import "../Navbar/ProfileNavbar.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router";
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import "../Navbar/react-dd-menu.css"

function handleLogout(evt) {
    window.localStorage.clear();
}

let scrollTopLast = 0;

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.offset = (this.props.offset ? "50px" : "0px");
        this.state = {
            isMenuOpen: false
        }
    }

    componentDidMount() {
        document
            .getElementById("root")
            .addEventListener("scroll", this.handleScroll, true);
    }

    componentWillUnmount() {
        document
            .getElementById("root")
            .removeEventListener("scroll", this.handleScroll, true);
    }

    handleScroll(event) {
        let scrollTop = event.target.scrollTop;
        if (scrollTop <= 0) {
            document.getElementById("top-fix-nav").style.top = this.offset;
        } else {
            if (scrollTop > scrollTopLast) {
                document.getElementById("top-fix-nav").style.top = "-150px";
            } else {
                document.getElementById("top-fix-nav").style.top = this.offset;
            }
        }
        scrollTopLast = scrollTop;
    }

    btn_jump_profile = (e) => {
        e.preventDefault();
        this.props.history.push("/home2");
    };

    btn_jump_resume = () => {
        this.props.history.push("/resume2");
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
        this.props.history.push("/home2");
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

    render() {
        const user = JSON.parse(window.localStorage.getItem("user"));

        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <span onClick={this.toggle}><i className="mdi mdi-menu"></i> Menu</span>,
            align: 'right',
            textAlign: "left",
            size: "md",
            className: "dropdown-menu-fix",
            animate: false
        };

        const nestedMenuOptions = (menuItem, icon, onClick) => {
            return {
                toggle: <div className={icon ? `mdi mdi-${icon} item-icon` : ""} onClick={onClick}>
                    <span className={icon ? "item-icon-inner" : ""}>{menuItem}</span>
                </div>,
                delay: 0
            }
        }

        return (
            <>
               
            <div className="drop-down-box-menuBar">
                {/* new dropdown */}
                <DropdownMenu {...menuOptions}>
                    {user.role === "admin" ?
                        [
                            <li><div onClick={this.btn_jump_admin_allteachers} className="mdi mdi-account-multiple item-icon">
                                <span className="item-icon-inner">Teachers</span>
                            </div></li>,
                            <li><div onClick={this.btn_jump_admin_allcolleges} className="mdi mdi-office-building item-icon">
                                <span className="item-icon-inner">Colleges</span>
                            </div></li>,
                            <li><div onClick={this.btn_jump_admin_validatedocs} className="mdi mdi-calendar-check item-icon">
                                <span className="item-icon-inner">Validate Teacher Documents</span>
                            </div></li>
                        ]
                        : [
                            <li><div className="mdi mdi-account-circle-outline item-icon" onClick={this.btn_jump_profile}>
                                <span className="item-icon-inner">Profile</span>
                            </div></li>,
                            <NestedDropdownMenu {...nestedMenuOptions("Bookings & Availability", "calendar-check")}>
                                <li><div className="menu-item-disabled">My Calendar</div></li>
                                <li><div className="menu-item-disabled">Jobs List</div></li>
                                <li><div className="menu-item-disabled">Timesheets</div></li>
                                <li><div className="menu-item-disabled">Payments</div></li>
                            </NestedDropdownMenu>,
                            <NestedDropdownMenu {...nestedMenuOptions("Personal Information", "account-card-details")}>
                                <li><div onClick={this.btn_jump_information}>Personal Details</div></li>
                                <li><div onClick={this.btn_jump_emergency}>Emergency Contact</div></li>
                                <li><div className="menu-item-disabled">Delete Account</div></li>
                            </NestedDropdownMenu>,
                            <NestedDropdownMenu {...nestedMenuOptions("Identification", "account-check")}>
                                <li><div onClick={this.btn_jump_identificationDoc}>Personal I.D.</div></li>
                                <li><div onClick={this.btn_jump_visa}>Visa Details</div></li>
                                <li><div onClick={this.btn_jump_police_check}>Police Check (Opt.)</div></li>
                                <li><div onClick={this.btn_jump_wwcc}>WWCC (Opt.)</div></li>
                            </NestedDropdownMenu>,
                            <NestedDropdownMenu {...nestedMenuOptions("Banking & Super", "credit-card-settings")}>
                                <li><div className="menu-item-disabled">Bank Details</div></li>
                                <li><div className="menu-item-disabled">Tax Declaration</div></li>
                                <li><div className="menu-item-disabled">Superannuation</div></li>
                            </NestedDropdownMenu>
                        ]
                    }
                    <li><div className="mdi mdi-power item-icon" onClick={this.btn_jump_logout}>
                        <span className="item-icon-inner">Logout</span>
                    </div></li>
                </DropdownMenu>
            </div>
                               
            </>
        );
    }
}

const FixProfileNavbarWitRouter = withRouter(Menu);

export default FixProfileNavbarWitRouter;
