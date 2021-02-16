import React, {Component} from 'react'
import { PORT } from '../../config'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Rating from './Rating/rating'
import CircularProgress from "@material-ui/core/CircularProgress";

export default class NavigateToPreviewProfile extends Component {

  componentDidMount = () => {
    const data = window.location.search.substring(1).split('data=')[1]
    console.log("link "+data)
    var decodedData = decodeURIComponent(data).replace("\'","")
    var ratingData = JSON.parse(decodedData)
    console.log("Name "+ratingData.firstName)
   
    const userId = ratingData.firstName[0].toUpperCase() + ratingData.firstName.slice(1)  + "_" + ratingData.lastName[0].toUpperCase()
    axios.get(`${PORT}/getTeacherIdByUserId?user_id=${userId}`, {
      "first_name": ratingData.firstName,
      "last_name": ratingData.lastName
    })//get teacher id by names
    .then( res => {
      console.log(res.data)
      if(res.status === 200){
        ratingData["teacher_id"] = res.data.teacher_id;
        console.log("nr "+ratingData)
        const path = {
          pathname: '/temporary/rating',
          state: ratingData }

        this.props.history.push(path)
      }else{
        console.log(res)
      return <div><p>ID not found</p></div>
      }

    }).catch( err => {
      console.log(err)
      return <div><p>Invalid Link</p></div>
    })
  }
  
  render = () =>  <div className="justify-center justify"><CircularProgress color="inherit" /></div>
}