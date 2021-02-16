import React from "react";
import "./FixProfileNavbar.css";
import "./ProfileNavbar.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router";
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import "./react-dd-menu.css"

function handleLogout(evt) {
  window.localStorage.clear();
  // window.localStorage.removeItem('token');
}

let scrollTopLast = 0;

class FixProfileNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.offset = (this.props.offset ? "50px" : "0px");
    this.state = {
      isMenuOpen: false
    }
  }

  componentDidMount() {
    // if (
    //   this.props.match.path == "/resume" ||
    //   this.props.match.path == "/reviews" ||
    //   this.props.match.path == "/" ||
    //   this.props.match.path == "/availability" ||
    //   this.props.match.path == "/bookings" ||
    //   this.props.match.path == "/personalDetails" ||
    //   this.props.match.path == "/identificationDoc"
    // ) {
    //   document
    //     .querySelectorAll('li a[href="' + this.props.match.path + '"]')[0]
    //     .classList.add("active");
    // }
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
        <div className="top-fix-navbar row profile-navbar" id="top-fix-nav" style={{ top: this.offset }}>
          <div className="col-md-1 col-sm-12 logo-position-jump">
            <Link title="Ready Teacher" to="/" onClick={this.btn_jump_profile}>
              <img src={logo} alt="logo" className="logo profile-logo" />
            </Link>
          </div>

          <div className="col-md-12 col-sm-12 menu-area-container

          ">
            {/* <div className="status-bar m-auto">
              <div className="status-bar-0 status-bar-badge"></div>
              <div className="status-bar-25 status-bar-badge"></div>
              <div className="status-bar-50 status-bar-badge"></div>
              <div className="status-bar-75 status-bar-badge"></div>
              <div className="status-bar-100 status-bar-badge"></div>
            </div> */}
            <div className="menu-area">
              <ul className="nav nav-pills">
                {/* <li>
                  <Link
                    className="mdi mdi-account-circle-outline home-icon-margin-adjust"
                    title="Home"
                    id="lnkProfile"
                    to="/"
                  ></Link>
                </li> */}
                {/* <li>
                  <Link
                    className="mdi mdi-account-circle-outline home-icon-margin-adjust"
                    title="Home"
                    to="/"
                  ></Link>
                </li> */}

                <li>
                  <div className="drop-down-box">
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

                    {/* old dropdown */}
                    {/* <Dropdown
                      // text="Menu"
                      className="dropdown-title"
                    >
                      <Dropdown.Menu className="drop-down-menu">
                        {user.role === "admin"
                          ? [
                            // <Dropdown.Item
                            //   className="mdi mdi-account-circle-outline item-icon"
                            //   text="Home"
                            //   onClick={this.btn_jump_profile}
                            // />,
                            <Dropdown.Item
                              className="mdi mdi-account-multiple item-icon drop-down-admin"
                              text="Teachers"
                              onClick={this.btn_jump_admin_allteachers}
                            />,
                            <Dropdown.Item
                              className="mdi mdi-office-building item-icon drop-down-admin"
                              text=" Colleges"
                              onClick={this.btn_jump_admin_allcolleges}
                            />,
                            <Dropdown.Item
                              className="mdi mdi-calendar-check"
                              // text="Validate Teacher Documents"
                              onClick={this.btn_jump_admin_validatedocs}
                            />
                          ]
                          : [
                            <Dropdown.Item
                              className="mdi mdi-account-circle-outline item-icon"
                              title="Home"
                              text="Profile"
                              onClick={this.btn_jump_profile}
                            />,
                            // <Dropdown.Item
                            //   className="mdi mdi-briefcase item-icon"
                            //   title="Resume"
                            //   text="Resume"
                            //   onClick={this.btn_jump_resume}
                            // />,
                            <Dropdown.Item
                              className="mdi mdi-account-card-details item-icon"
                              title="Personal Information"
                              text="Personal Information"
                              onClick={this.btn_jump_information}
                            />,
                            <Dropdown.Item
                              className="mdi mdi-account-check item-icon"
                              title="Identification"
                              text="Identification"
                              onClick={this.btn_jump_identificationDoc}
                            />,
                            <Dropdown.Divider />,
                            // <Dropdown.Item
                            //   disabled
                            //   className="mdi mdi-calendar-clock item-icon"
                            //   title="Coming Soon"
                            //   text="Availability"
                            //   onClick={this.btn_jump_availability}
                            // />,
                            // <Dropdown.Item
                            //   disabled
                            //   className="mdi mdi-calendar-check item-icon"
                            //   title="Coming Soon"
                            //   text="Bookings"
                            //   onClick={this.btn_jump_bookings}
                            // />,
                            <Dropdown.Item
                              disabled
                              className="mdi mdi-lock-open-outline item-icon"
                              title="Coming Soon"
                              text="Security"
                              onClick={this.btn_jump_security}
                            />,
                            <Dropdown.Item
                              disabled
                              className="mdi mdi-credit-card item-icon"
                              text="Payments"
                              title="Coming Soon"
                              onClick={this.btn_jump_payments}
                            />,
                            <Dropdown.Divider />
                          ]}
                        <Dropdown.Item
                          className="mdi mdi-power item-icon"
                          text="Logout"
                          title="Logout"
                          onClick={this.btn_jump_logout}
                        />
                      </Dropdown.Menu>
                    </Dropdown> */}
                  </div>
                </li>
                {user.role === "admin"
                  ? null
                  : [
                    // <li>
                    //   <Link
                    //     className="mdi mdi-briefcase"
                    //     title="Resume"
                    //     to="/resume"
                    //   ></Link>
                    // </li>,
                    // <li>
                    //   <Link
                    //     className="mdi mdi-account-card-details"
                    //     title="Personal Details"
                    //     to="/personalDetails"
                    //   ></Link>
                    // </li>,

                    // <li className="navbar-disabled-link">
                    //   <Link
                    //     className="mdi mdi-thumb-up-outline"
                    //     onClick={e => e.preventDefault()}
                    //       /*title="Reviews"*/ title="Coming Soon"
                    //     to="/reviews"
                    //   ></Link>
                    // </li>,
                    // <li className="navbar-disabled-link">
                    //   <Link
                    //     className="mdi mdi-calendar-clock"
                    //     //  title="Availability"
                    //     onClick={e => e.preventDefault()}
                    //     title="Coming Soon"
                    //     to="/availability"
                    //   ></Link>
                    // </li>,
                    // <li className="navbar-disabled-link">
                    //   <Link
                    //     className="mdi mdi-calendar-check"
                    //     onClick={e => e.preventDefault()}
                    //       /*title="Bookings"*/ title="Coming Soon"
                    //     to="/bookings"
                    //   ></Link>
                    // </li>,
                    // <li>
                    //   <Link
                    //     className="mdi mdi-power"
                    //     title="Logout"
                    //     to="/login"
                    //     onClick={handleLogout}
                    //   ></Link>
                    // </li>
                  ]}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const FixProfileNavbarWitRouter = withRouter(FixProfileNavbar);

export default FixProfileNavbarWitRouter;
