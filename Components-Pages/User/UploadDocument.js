import React, { Component } from "react";
import axios from "axios";
import { PORT } from '../../config'

const URL = `${PORT}/UploadDocument`;
const date = new Date();

class UploadDocument extends Component {
    constructor(props){
      super(props)
      this.state ={
        // userID:"sample@gmail.com",
        file_name : "No file selected",
        //  date:"",
        //  document_type:"",
         file:"",
         is_uploaded:""
      }

      this.handlefileChange = this.handlefileChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlefileChange(e){
        this.setState({
            // user_name: "sample@gmail.com",
            // date:date,
            // document_type:"NA",
            file: e.target.files[0],
            file_name:e.target.files[0].name
        })
      }

     handleSubmit= async(event) =>{
        
        alert(this.state.file_name);
        axios.post(`${URL}`,{
            // formData
        }).then(res=>{
            if(res.data != null){
                alert("data");
                 // this.setState({is_uploaded:res.data})
                console.log(res.data);
            }
            else{
                alert("no data");
            }
            // console.log(res.data);
        }).catch(err=>{
            console.error("ygygy");
        })
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
                        <div className="row auth-form mb-4 login-form-container">
                            <div className="col-lg-6">
                                <div className="form-group">
                                     <label>Upload ID</label>
                                     <input
                                        type="file"
                                        className="form-control rt-input"
                                        id="flID"
                                        name="userIDDoc"
                                        onChange={this.handlefileChange}
                                        />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn-c mt-5 mb-4"
                                >
                                Submit
                                </button>
                        </div>
                        </form>
                    </div>
                </div>             
            </div>
        )
    }
}

export default UploadDocument;
