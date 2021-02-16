import React, {Component} from 'react'
import { PORT } from '../../config'
import axios from 'axios'

export default class NavigateToPreviewProfile extends Component {

  componentDidMount = () => {
    const id = window.location.search.substring(1).split('id=')[1]
    axios.get(`${PORT}/user/getUser/${id}`)
    .then( res => {
      const path = {
        pathname: '/PreviewProfile',
        state: res.data.user
      }
      this.props.history.push(path)
    }).catch( err => {
      console.log(err)
    })
  }
  
  render = () => <div />
}