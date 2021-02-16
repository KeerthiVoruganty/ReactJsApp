import React from 'react';
import useForm from 'react-hook-form';
import { PORT } from '../../config';
import axios from 'axios'
 
const AddCustomerBankAccount = () => {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = data => {
    axios({
      method: 'post',
      url: `${PORT}/stripe/customer/add/bank`,
      data: {
        customerAccountNumber: data.customerAccountNumber,
        account_holder_name: data.account_holder_name,
        account_holder_type: data.account_holder_type,
        routing_number: data.routing_number,
        account_number: data.account_number
      }
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Customer Account Number</label>
      <input name="customerAccountNumber" ref={register({ required: true })} />
      {errors.customerAccountNumber && 'Customer account is required, login into stripe for customer acc ID.'}
      
      <label>Account Holder Name</label>
      <input name="account_holder_name" ref={register({ required: true })} />
      {errors.account_holder_name && 'Account holder name is required.'}
      
      <label>Account Holder Type</label>
      <input name="account_holder_type" ref={register({ required: true })} />
      {errors.account_holder_type && 'Account holder type is required.'}

      <label>Routing Number</label>
      <input name="routing_number" ref={register({ required: true })} />
      {errors.routing_number && 'Routing number is required.'}

      <label>Bank Account Number</label>
      <input name="account_number" ref={register({ required: true })} />
      {errors.account_number && 'Account number is required.'}
      
      <input type="submit" />
    </form>
  );
}

export default AddCustomerBankAccount;