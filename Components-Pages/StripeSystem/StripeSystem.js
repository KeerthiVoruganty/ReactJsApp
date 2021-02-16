import React, {Component} from 'react'
import axios from 'axios';
import InputKeyValue from './InputKeyValue';
import { Elements } from 'react-stripe-elements';
// stripe stuff
import BankAccountForm from './BankAccountForm';

require('./StripeSystem.css')

// class StripeSystem extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       setupBegan: false,
//       isLoading: true,
//       error: null,
//       account: null,
//       fieldsNeededForm: {},
//     };

//     this.fetchAccount = this.fetchAccount.bind(this);
//     this.onClickBeginSetup = this.onClickBeginSetup.bind(this);
//     this.onStartAccountSetup = this.onStartAccountSetup.bind(this);
//     this.getFieldValue = this.getFieldValue.bind(this);
//     this.fieldsNeededFormChange = this.fieldsNeededFormChange.bind(this);
//     this.onClickSaveFieldsNeeded = this.onClickSaveFieldsNeeded.bind(this);
//   }

//   componentWillMount() {
//     this.fetchAccount();
//   }

//   getFieldValue(key) {
//     const {
//       fieldsNeededForm,
//     } = this.state;

//     if (fieldsNeededForm[key]) {
//       return fieldsNeededForm[key];
//     } else {
//       return '';
//     }
//   }

//   fieldsNeededFormChange(e, key) {
//     const {
//       fieldsNeededForm,
//     } = this.state;

  

//     fieldsNeededForm[key] = e.target.value;

//     this.setState({
//       fieldsNeededForm,
//     })
//   }

//   fetchAccount() {
//     fetch('http://localhost:3001/stripe/setup-details',
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}),
//       }
//     ).then(res => res.json())
//        .then(json => {
//          const {
//            success,
//            message,
//            setupBegan,
//            account,
//          } = json;

//          if (success) {
//             this.setState({
//               setupBegan,
//               isLoading: false,
//               account,
//             }); 
//          } else {
//             this.setState({
//               error: message,
//               isLoading: false,
//             }); 
//          }
//        });
//   }

//   onStartAccountSetup() {
//     this.setState({
//       isLoading: true,
//     }); 
//     fetch('http://localhost:3001/stripe/account/setup',
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           countryCode: 'AU',
//         }),
//       }
//     ).then(res => res.json())
//        .then(json => {
//          const {
//            success,
//            message,
//          } = json;

//          if (success) {
//            this.fetchAccount();
//          } else {
//             this.setState({
//               error: message,
//               isLoading: false,
//             }); 
//          }
//        });
//   }

//   onClickBeginSetup() {
//     console.log('onClickBeginSetup');
//     this.onStartAccountSetup();
//   }

//   onClickSaveFieldsNeeded() {
//     console.log('onClickSavedFieldsNeeded')

//     const {
//       fieldsNeededForm,
//     } = this.state;

//     this.setState({
//       isLoading: true,
//     });
//     fetch('http://localhost:3001/stripe/account/save',
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(fieldsNeededForm),
//       }
//     ).then(res => res.json())
//        .then(json => {
//          const {
//            success,
//            message,
//          } = json;

//          if (success) {
//             this.fetchAccount();
//          } else {
//             this.setState({
//               error: message,
//               isLoading: false,
//             }); 
//          }
//        });
//   }

//   render() {
//     const { isLoading, setupBegan, error, account } = this.state
//     console.log(error)

//     if (isLoading) {
//       return (
//         <p>Loading...</p>
//       )
//     }

//     if (!setupBegan) {
//       return (
//         <div>
//         <br />
//           {
//             (error) ? (
//               <p>(error)</p>
//             ) : (null)
//           }
//           <button onClick={this.onClickBeginSetup}>
//             Begin Setup
//           </button>
//           <p>By clicking setup you agree to the TOS for Stripe and us</p>
//         </div>
//       )
//     }

//     console.log('account', account)

//     const { verification } = account;
//     const { fields_needed } = verification;

//     return (
//       <div>
//       <br />
//         {
//           (error) ? (
//             <p>(error)</p>
//           ) : (null)
//         }
//         {
//           (fields_needed.length === 0) ? (
//             <p>All setup</p>
//           ) : (
//           <div>
//             {
//               fields_needed.map(fieldKey => {
//                 if (fieldKey === 'external_account') {
//                  return (
//                   <Elements>
//                     <BankAccountForm />
//                   </Elements>
//                   );
//                 }
//                 return (
//                  <InputKeyValue
//                    text={fieldKey}
//                    id={fieldKey}
//                    value={this.getFieldValue(fieldKey)}
//                    key={Math.random()}
//                    onTextboxChange={this.fieldsNeededFormChange}
//                  />
//                 )
//               })
//             }
//             <div>
//               <button onClick={this.onClickSaveFieldsNeeded}>Save</button>
//             </div>
//           </div>
//           )
//         }
//       </div>
//     )
//   }
// }

// export default StripeSystem;
