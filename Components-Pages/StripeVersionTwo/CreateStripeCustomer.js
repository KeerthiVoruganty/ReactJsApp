import React from 'react';
import useForm from 'react-hook-form';
import { PORT } from '../../config';
import axios from 'axios';



const CreateStripeCustomer = () => {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = data => {
    axios({
      method: 'post',
      url: `${PORT}/stripe/create/customer`,
      data: {
        email: data.email,
        description: data.description
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
      <label>Email</label>
      <input name="email" ref={register({ required: true })} />
      {errors.email && 'Email is required.'}
      <label>Description</label>
      <input name="description" ref={register({ required: true })} />
      {errors.description && 'Description is required.'}     
      <input type="submit" value="create account" />
    </form>
  );
}

export default CreateStripeCustomer;