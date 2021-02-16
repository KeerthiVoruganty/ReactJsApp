import React from "react";
import Routes from "./Routes";
import Notifications from "react-notify-toast";
// import {StripeProvider} from 'react-stripe-elements';
// import { stripe_public_key } from '../src/config';
import "./index.css";

function App() {
  return (
    <div className="container fadein p-0">
      <Notifications options={{ zIndex: 2001 }} />
      <Routes />
    </div>
  );
}

export default App;
