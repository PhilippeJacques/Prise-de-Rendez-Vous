import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from '../Navbar';

import { useHistory as history } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";





class Dashboard extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  state = {
    associations: [],
    appointmentooh: [],
    nameassoc: ""
    
  }


  componentDidMount() {
    axios.get(`api/associations`)
      .then(res => {
        const associations = res.data;
        this.setState({ associations });
       
      })
      axios.get(`/appointments`)
      .then(res => {
        const appointmentooh = res.data;
        const nameassoc = appointmentooh.nameAssocs;

        this.setState({ appointmentooh });
        this.setState({ nameassoc });
      })
  }

  

render() {
    const { user } = this.props.auth;
 
    
    
    return (
      <>
      <Navbar/>
      <div  className="container text-center mt-15">

        <div className="row">
          <div className="col-sm-12">
            <h4>
              Hey there, <b className="name-lable">{user.name.split(" ")[0]}</b>, 
                votre role  <b className="name-lable">{user.role.split(" ")[0]}</b>  

              
              <p className="mt-4">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            
          
            <button
              onClick={this.onLogout}
              className="btn btn-large btn-light hoverable font-weight-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      </>
    );
  
  }
  
}



Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
