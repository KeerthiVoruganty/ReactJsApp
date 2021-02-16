import React, {Component} from 'react'
import { PORT } from '../../../config'
import axios from 'axios'

export default class NavigateToShareProfile extends Component {

  componentDidMount = () => {

    const ids = window.location.search.substring(1).split("tid=")[1];
    const tid = ids ? ids.split("&rid=")[0] : null;
    const rid = ids ? ids.split("&rid=")[1] : null;

    axios.get(`${PORT}/user/getUser/${tid}`)
    .then( res => {  
      const flag = res.data.user.referees
        .filter(ele => ele._id === rid)[0].flag;

      const path = {
        pathname: '/ReferenceForm',
        state: res.data.user,
        tid: tid,
        rid: rid,
        flag: flag ? flag : false,
      }
      
      this.props.history.push(path)
    }).catch( err => {
      console.log(err)
    })
  }
  
  render = () => <div />
}