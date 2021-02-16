import React from "react";
// import { stripe_public_key } from '../src/config'
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Components-Pages/Home/Home";
import Home2 from "./Components-Pages/Home/Home2";
import Resume from "./Components-Pages/Resume/Resume";
import Resume2 from "./Components-Pages/Resume/Resume2";
import Availability from "./Components-Pages/Availability/Availability";
import Reviews from "./Components-Pages/Reviews/Reviews";
import Login from "./Components-Pages/Login/Login";
import Register from "./Components-Pages/Register/Register";
import ResetPassword from "./Components-Pages/ResetPassword/ResetPassword";
import ResetSendEmail from "./Components-Pages/ResetPassword/ResetSendEmail";
import RegisterCollege from "./Components-Pages/RegisterCollege/RegisterCollege";
import Lock from "./Components-Pages/Login/Lock";
import Bookings from "./Components-Pages/Bookings/Bookings";
import AllBookings from "./Components-Pages/Bookings/AllBookings/AllBookings";
import EmployeeTrailPeriod from "./Components-Pages/Bookings/EmployeeTrailPeriod/EmployeeTrailPeriod";
import GoogleCalender from "./Components-Pages/Bookings/GoogleCalendar";
import BookingInvoice from "./Components-Pages/Bookings/BookingInvoice/BookingInvoice";
import secondaryRegistration from "./Components-Pages/SecondaryRegistration/SecondaryRegistration";
import secondaryRegistrationCollege from "./Components-Pages/SecondaryRegistrationCollege/SecondaryRegistrationCollege";
import Confirm from "./Components-Pages/Register/Confirm";
import BeforeEmailConfirm from "./Components-Pages/Register/BeforeEmailConfirm";
import CreateMainStripeAcc from "./Components-Pages/StripeVersionTwo/CreateMainStripeAcc";
import CreateStripeCustomer from "./Components-Pages/StripeVersionTwo/CreateStripeCustomer";
import AddCustomerBankAccount from "./Components-Pages/StripeVersionTwo/AddCustomerBankAccount";
import UploadDocument from "./Components-Pages/User/UploadDocument";
import PersonalDetails from "./Components-Pages/User/PersonalDetails";
import Banking from "./Components-Pages/User/Banking"
import Identification from "./Components-Pages/User/Identification";
import IdentificationDoc from "./Components-Pages/User/IdentificationDoc";
import Visa from "./Components-Pages/User/Visa";
import PoliceCheck from "./Components-Pages/User/PoliceCheck";
import WorkingWithChildrenChk from "./Components-Pages/User/WorkingWithChildrenChk";
import EmergencyContact from "./Components-Pages/User/EmergencyContact";
import ValidateDocuments from "./Components-Pages/ValidateDocuments/ValidateDocuments";
import Payments from "./Components-Pages/Payments/Payments";
import PaymentsABN from "./Components-Pages/Payments/PaymentsABN";
import PaymentsSuper from "./Components-Pages/Payments/PaymentsSuper";
import AllTeachers from "./Components-Pages/Admin/AllTeachers";
import AllColleges from "./Components-Pages/Admin/AllColleges";
import CollegeCampuses from "./Components-Pages/Admin/CollegeCampuses";
import CollegePeople from "./Components-Pages/Admin/CollegePeople";
import CollegePersonalCalendar from "./Components-Pages/Admin/CollegePersonalCalendar";
import TeacherpersonalDetails from "./Components-Pages/Admin/TeacherpersonalDetails";
import TeacherBanking from "./Components-Pages/Admin/TeacherBanking";
import TeacherBillings from "./Components-Pages/Admin/TeacherBillings";
import TeacherCalendar from "./Components-Pages/Admin/TeacherCalendar";
import ImgWaterMarks from "./Components-Pages/ValidateDocuments/ShowImgWithWaterMarks";
// import TeacherEmergencyContact from './Components-Pages/Admin/TeacherEmergencyContact'
// import TeacherIdentification from './Components-Pages/Admin/TeacherIdentification'
import TeacherBookings from "./Components-Pages/Bookings/TeacherBooking";
import SearchTeacher from "./Components-Pages/College/SearchTeacher";
import CollegeProfile from "./Components-Pages/College/CollegeProfile";
import CollegeDetails from "./Components-Pages/College/CollegeDetails";
import CollegeCalendar from "./Components-Pages/College/CollegeCalendar";
import NavigateToShareProfile from "./Components-Pages/Home/NavigateToShareProfile";
import NavigateToPreviewProfile from "./Components-Pages/Home/NavigateToPreviewProfile";
import NavigateToReferenceForm from "./Components-Pages/PublicPage/Reference/NavigateToReferenceForm";
import SharedResume from "./Components-Pages/Resume/SharedResume";
import ShareProfile from "./Components-Pages/Home/ShareProfile";
import PreviewResume from "./Components-Pages/Resume/PreviewResume";
import PreviewResume2 from "./Components-Pages/Resume/PreviewResume2";
import PreviewProfile from "./Components-Pages/Home/PreviewProfile";
import PreviewProfile2 from "./Components-Pages/Home/PreviewProfile2";
import Rating from "./Components-Pages/PublicPage/Rating/rating";
import RegisterOption from "./Components-Pages/Register/RegisterOption";
import NavigateToRating from "./Components-Pages/PublicPage/NavigateToRating";
import ReferenceForm from "./Components-Pages/PublicPage/Reference/ReferenceForm";
import PdfViewer from  "./Components-Pages/ValidateDocuments/PdfViewer"
// import CollegeInvoice from './Components-Pages/InvoiceStatement/College/CollegeInvoice'
// import TestForm from './Components-Pages/test2/test2form'

// stripe Payment system TEST MODE
// import StripeSystem from './Components-Pages/StripeSystem/StripeSystem';
// import { StripeProvider } from 'react-stripe-elements';

const badRequest = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};
// only admin can access specific components
const isAdmin = component => {
  let user = JSON.parse(window.localStorage.getItem("user"));
  if (user) {
    if (user.role === "admin") {
      return component;
    } else {
      return badRequest;
    }
  }
};

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home2" component={Home2} />
          <Route
            exact
            path="/NavigateToShareProfile"
            component={NavigateToShareProfile}
          />
          <Route
            exact
            path="/NavigateToPreviewProfile"
            component={NavigateToPreviewProfile}
          />
          <Route
            exact
            path="/NavigateToReferenceForm"
            component={NavigateToReferenceForm}
          />
          <Route
              exact
              path="/RegisterOption"
              component={RegisterOption}
          />
          <Route exact path="/ShareProfile" component={ShareProfile} />
          <Route exact path="/PreviewProfile" component={PreviewProfile} />
          <Route exact path="/PreviewProfile2" component={PreviewProfile2} />
          <Route exact path="/PreviewResume" component={PreviewResume} />
          <Route exact path="/PreviewResume2" component={PreviewResume2} />
          <Route exact path="/sharedResume" component={SharedResume} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/registercollege" component={RegisterCollege} />
          <Route exact path="/ReferenceForm" component={ReferenceForm} />
          <Route
            exact
            path="/beforeEmailConfirm"
            component={BeforeEmailConfirm}
          />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/resetSendEmail" component={ResetSendEmail} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route
            exact
            path="/secondaryRegistration"
            component={secondaryRegistration}
          />
          <Route
            exact
            path="/secondaryRegistrationCollege"
            component={secondaryRegistrationCollege}
          />
          <Route exact path="/lock" component={Lock} />
          <Route exact path="/resume" component={Resume} />
          <Route exact path="/resume2" component={Resume2} />
          <Route exact path="/availability" component={Availability} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/payments" component={Payments} />
          <Route
            exact
            path="/bookings"
            render={props => {
              return <AllBookings {...props} />;
            }}
          />
          <Route
            exact
            path="/teacherBookings"
            render={props => {
              return <TeacherBookings {...props} />;
            }}
          />
          <Route
            exact
            path="/BookingInvoice/:1"
            render={props => {
              return <BookingInvoice {...props} />;
            }}
          />
          <Route
            exact
            path="/UploadDocument"
            render={props => {
              return <UploadDocument {...props} />;
            }}
          />
          <Route
            exact
            path="/personalDetails"
            render={props => {
              return <PersonalDetails {...props} />;
            }}
          />
          <Route
            exact
            path="/Identification"
            render={props => {
              return <Identification {...props} />;
            }}
          />
          <Route
            exact
            path="/Banking"
            render={props => {
              return <Banking {...props} />;
            }}
          /> 
          <Route
            exact
            path="/IdentificationDoc"
            render={props => {
              return <IdentificationDoc {...props} />;
            }}
          />
          <Route
            exact
            path="/Visa"
            render={props => {
              return <Visa {...props} />;
            }}
          />
          <Route
            exact
            path="/PoliceCheck"
            render={props => {
              return <PoliceCheck {...props} />;
            }}
          />
          <Route
            exact
            path="/WorkingWithChildrenChk"
            render={props => {
              return <WorkingWithChildrenChk {...props} />;
            }}
          />
          <Route
            exact
            path="/EmergencyContact"
            render={props => {
              return <EmergencyContact {...props} />;
            }}
          />
          <Route
            exact
            path="/employeetrialperiod"
            render={() => {
              return <EmployeeTrailPeriod />;
            }}
          />
          <Route
            exact
            path="/gcal"
            render={() => {
              return <GoogleCalender />;
            }}
          />
          <Route
            exact
            path="/create/main/stripe"
            render={() => {
              return <CreateMainStripeAcc />;
            }}
          />
          <Route
            exact
            path="/create/stripe/customer"
            render={() => {
              return <CreateStripeCustomer />;
            }}
          />
          <Route
            exact
            path="/add/stripe/customer/bank"
            render={() => {
              return <AddCustomerBankAccount />;
            }}
          />
          <Route
            exact
            path="/validatedocuments"
            component={isAdmin(ValidateDocuments)}
          />
          <Route
            exact
            path="/Payments"
            render={props => {
              return <Payments {...props} />;
            }}
          />
          <Route
            exact
            path="/PaymentsABN"
            render={props => {
              return <PaymentsABN {...props} />;
            }}
          />
          <Route
            exact
            path="/PaymentsSuper"
            render={props => {
              return <PaymentsSuper {...props} />;
            }}
          />
          <Route exact path="/AllColleges" component={isAdmin(AllColleges)} />
          <Route exact path="/AllTeachers" component={isAdmin(AllTeachers)} />
          <Route
            exact
            path="/CollegeCampuses"
            component={isAdmin(CollegeCampuses)}
          />
          <Route exact path="/CollegePeople" component={CollegePeople} />
          <Route
            exact
            path="/CollegePersonalCalendar"
            component={CollegePersonalCalendar}
          />
          <Route
            exact
            path="/TeacherpersonalDetails"
            component={isAdmin(TeacherpersonalDetails)}
          />
          <Route
            exact
            path="/TeacherBanking"
            component={isAdmin(TeacherBanking)}
          />
          <Route
            exact
            path="/TeacherBillings"
            component={isAdmin(TeacherBillings)}
          />
          <Route
            exact
            path="/TeacherCalendar"
            component={isAdmin(TeacherCalendar)}
          />
          {/* <Route exact path="/TeacherEmergencyContact" component={isAdmin(TeacherEmergencyContact)}/>
                    <Route exact path="/TeacherIdentification" component={isAdmin(TeacherIdentification)}/>) */}
          <Route exact path="/SearchTeacher" component={SearchTeacher} />
          <Route
            exact
            path="/ImgWaterMarks"
            render={props => {
              return <ImgWaterMarks {...props} />;
            }}
          />
          <Route
            exact
            path="/PdfViewer"
            render={props => {
              return <PdfViewer {...props} />;
            }}
          />
          
          <Route exact path="/CollegeProfile" component={CollegeProfile} />
          <Route exact path="/CollegeDetails" component={CollegeDetails} />
          <Route exact path="/CollegeCalendar" component={CollegeCalendar} />
          {/* <Route
            path="/temporary/rating"
            component={Rating}
          /> */}
          <Route
            path="/temporary/rating"
            component={Rating}
          />
           <Route
            exact
            path="/feedback"
            component={NavigateToRating}
          />


          <Route render={() => <h1>404</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Routes;
