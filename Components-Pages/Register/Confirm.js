import React, {Component} from 'react'
import { PORT } from '../../config'
import axios from 'axios'

export default class Confirm extends Component {
  
  // A bit of state to give the user feedback while their email
  // address is being confirmed on the User model on the server.
  // state = {
  //   confirming: true
  // }

  // When the component mounts the mongo id for the user is pulled  from the 
  // params in React Router. This id is then sent to the server to confirm that 
  // the user has clicked on the link in the email. The link in the email will 
  // look something like this: 
  // 
  // http://localhost:3000/confirm?id=5c40d7607d259400989a9d42
  // 
  // where 5c40d...a9d42 is the unique id created by Mongo
  componentDidMount = () => {
    const id = window.location.search.substring(1).split('id=')[1]
    axios.get(`${PORT}/user/confirm/${id}`)
    .then( res => {
      const path = {
        pathname: '/secondaryRegistration',
        state: res.data.user
      }
      this.props.history.push(path)
    }).catch( err => {
      console.log(err)
    })
  }
  
  render = () => <div />
}