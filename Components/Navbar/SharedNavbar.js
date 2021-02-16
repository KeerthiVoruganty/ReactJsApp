import React, { useEffect } from "react";
// import "./FixProfileNavbar.css";
import "./ProfileNavbar.css";
import "../../../src/Components-Pages/Home/Home.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router";
import Notifications, { notify } from "react-notify-toast";
import CloseIcon from '@material-ui/icons/Close';


// const SharedNavbar = props => {


//   useEffect(() => {
//     // const user = props.location.state;
//     // window.localStorage.setItem("user", JSON.stringify(props.location.state));
//     // setUser(user);
//     let myColor = { background: '#006e78',
//                     text: "#FFFFFF",



//                      };
//     notify.show(
//       <div>
//     <span id="notify-text">You are viewing profile as College</span>
//     <span id="iconclose" onClick={notify.hide}><CloseIcon/><span id="exitpreview">EXIT PREVIEW</span></span>
//      </div>, "custom", -1 , myColor
//       );
//     // window.localStorage.setItem('shared_teacher', JSON.stringify(user))

//     // setIsLoading(false);
//   }, []);


// }



function handleLogout(evt) {
  window.localStorage.clear();
  // window.localStorage.removeItem('token');
}

let scrollTopLast = 0;

class SharedNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.offset = (this.props.offset ? "50px" : "0px");

  }

  componentDidMount() {
    // if (
    //   this.props.match.path == "/resume" ||
    //   this.props.match.path == "/reviews" ||
    //   this.props.match.path == "/" ||
    //   this.props.match.path == "/availability" ||
    //   this.props.match.path == "/bookings" ||
    //   this.props.match.path == "/personalDetails"
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
      document.getElementById("top-fix-nav-share").style.top = this.offset;
    } else {
      if (scrollTop > scrollTopLast) {
        document.getElementById("top-fix-nav-share").style.top = "-150px";
      } else {
        document.getElementById("top-fix-nav-share").style.top = this.offset;
      }
    }
    scrollTopLast = scrollTop;
  }



  render() {
    const user = JSON.parse(window.localStorage.getItem("shared_teacher"));
    return (
      <>
        {/* <div className="notify">

      </div> */}

        {/* { notify.show("You are viewing resume as College")} */}



        <div className="top-fix-navbar row profile-navbar" id="top-fix-nav-share" style={{ top: this.offset }}>
          <div className="col-md-1 col-sm-12 logo-position-jump">
            <Link title="Ready Teacher" to={{
              pathname: `/NavigateToShareProfile?id=${user._id}`
            }}
              target="blank">
              <img src={logo} alt="logo" className="logo profile-logo" id="navLogo" />
            </Link>
          </div>

          <div className="col-md-12 col-sm-12 menu-area-container

          ">
            {/* icon on the right top */}

            {/* <div className="menu-area mobile-share-navbar-content">
              <ul className="nav nav-pills">
                <li>
                  <Link
                    className="mdi mdi-account-circle-outline home-icon-margin-adjust"
                    title="Home"
                    to={{
                                      pathname: `/NavigateToShareProfile?id=${user._id}`
                                    }}
                                    target="blank"
                  ></Link>
                </li>
                <li>
                    <Link
                        className="mdi mdi-briefcase"
                        title="Resume"
                     //   to="/resume"
                        to= {{
                                    pathname:'/sharedResume',
                                    data: {user}
                                              }
                                              }
                        ></Link>
                      </li>
              </ul>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

const SharedNavbarWitRouter = withRouter(SharedNavbar);

export default SharedNavbarWitRouter;
