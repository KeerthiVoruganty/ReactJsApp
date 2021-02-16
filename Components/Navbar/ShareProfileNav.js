import React from "react";
import "./FixProfileNavbar.css";
import "./ProfileNavbar.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router";

function handleLogout(evt) {
  window.localStorage.clear();
  // window.localStorage.removeItem('token');
}

// const [formType, setFormType] = useState("");

// const showShareProfile = () => {
//     setFormType("shareProfile");
//     togglePopup(true);
// }

let scrollTopLast = 0;

class ShareProfileNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (
      this.props.match.path == "/resume" ||
      this.props.match.path == "/reviews" ||
      this.props.match.path == "/" ||
      this.props.match.path == "/availability" ||
      this.props.match.path == "/bookings" ||
      this.props.match.path == "/personalDetails"||
      this.props.match.path == "/identificationDoc"
    ) {
      document
        .querySelectorAll('li a[href="' + this.props.match.path + '"]')[0]
        .classList.add("active");
    }
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
      document.getElementById("top-fix-nav").style.top = "0px";
      // document.getElementById("share-button2").style.top = "15px";

    } else {
      if (scrollTop > scrollTopLast) {
        document.getElementById("top-fix-nav").style.top = "-150px";
        // document.getElementById("share-button2").style.top = "-150px";

      } else {
        document.getElementById("top-fix-nav").style.top = "0px";
        // document.getElementById("share-button2").style.top = "15px";

      }
    }
    scrollTopLast = scrollTop;
  }

 
  

  render() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return (
      <>
        <div className="top-fix-navbar row profile-navbar" id="top-fix-nav">
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
              
              {/* share btn */}
              <div className="row mb-5 ml-0 front-1 front-2 for-small-size-margin-change-all ">
                            {/* <div className="mobile-for-share-button">
                              <button
                                type="submit"
                                // onClick={showShareProfile}
                                id="share-button2"
                                className="btn btn-block btn-c primary-button-no-margin-hover pl-2 pr-2 gray-shadow-box "
                              ><i className="mdi mdi-share" id="mdi-share-profile">  </i></button>
                            </div> */}
             </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const ShareProfileNavWitRouter = withRouter(ShareProfileNav);

export default ShareProfileNavWitRouter;
