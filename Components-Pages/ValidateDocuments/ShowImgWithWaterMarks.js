import React, {useState, useEffect, Component} from 'react';
import { withRouter } from "react-router";
import './WaterMarks.css';
import logo from '../../assets/img/logo.png';


const ImgWaterMarks = props => {


    useEffect(() => {
        let res = window.localStorage.getItem("imgURL")

        //res = res.replace(/ /g, '%20');
      //  res = encodeURI(res);
        let can = document.createElement('canvas');
        var body = document.getElementById('water_mark_box');
        console.log(res);
        console.log(encodeURI(res).replace(" ", "%20"));
        console.log(encodeURI(res.replace(" ", "%20")));
        console.log(encodeURIComponent(res.replace(" ", "%20")))
       // console.log(res.replace(" ", "%20"));
        body.appendChild(can);

        can.width=140;
        can.height=100;
        can.style.display='block';


        var cans = can.getContext('2d');
        cans.rotate(-20*Math.PI/180);
        cans.font = "16px Microsoft JhengHei";
        cans.fillStyle = "rgba(17, 17, 17, 0.50)";
        cans.textAlign = 'left';
        cans.textBaseline = 'Middle';
        cans.fillText('ReadyTeacher',can.width/10,can.height/2);

        body.style.backgroundImage="url("+can.toDataURL(encodeURI(res).replace(" ", "%20"))+"),url(" +encodeURI(res).replace(" ", "%20") + ")";
  //    body.style.backgroundImage="url(' + '" + res + "' + ')";
        body.style.backgroundRepeat="repeat, no-repeat";
    })
        return (
            <div id='water_mark_box'>
            {/* <img src={encodeURI(window.localStorage.getItem("imgURL"))} alt="dsds"/> */}
            </div>
        )
}

// const ImgWaterMarks = withRouter(ImgWaterMarksOriginal);

export default ImgWaterMarks;