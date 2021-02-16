import React from 'react';
import useForm from 'react-hook-form';
import { PORT } from '../../config'
import axios from 'axios';
 
const CreateMainStripeAcc = () => {
  
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = data => {
    console.log(data);
    axios({
      method: 'post',
      url: `${PORT}/stripe/create/main/account`,
      data: {
        email: data.email,
        countryCode: data.country
      }
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  

  
  return (
    <div>
      <h1> Step 1 - Create Account</h1>
      <p> <i>Create the main Account</i></p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        
        <input name="email" ref={register({ required: true })} /> {/* register an input */}
        {errors.email && 'email required.'}
        <label>Country</label>
        
        <input name="country" ref={register({ required: true })} />
        {errors.country && 'country is required. Type AU only!!!'}
        
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateMainStripeAcc;