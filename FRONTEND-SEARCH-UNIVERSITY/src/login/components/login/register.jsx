import React from "react";
import loginImg from "../../login.svg";
const GlobalVariables =  require('../../../GlobalVariables');
const validator = require('validator');

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isRegistered : false}
    this.userEmailPass = {
      user : '',
      email : '',
      password : ''
    }
  }

  updateUsernameValue = (event) => {
    const val = event.target.value;
    this.userEmailPass.user = val;
  }

  updateEmail = (event) => {
    const val = event.target.value;
    this.userEmailPass.email = val;
  }

  updatePasswordValue = (event) => {
    const val = event.target.value;
    this.userEmailPass.password = val;
  }

  componentDidUpdate = (prevProps, prevState) =>{
    if(prevState.isRegistered !== this.state.isRegistered){
      fetch(GlobalVariables.URL_BE + GlobalVariables.USER_RESOURCE, {
        method: 'POST',
        body: JSON.stringify(this.userEmailPass),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(this.addedUser.bind(this))
    }
  }

  addedUser(){
    alert('User registered correctly')
  }

  handleOnClick(event) {
    if(this.userEmailPass.user == '' || this.userEmailPass.email == '' || this.userEmailPass.password == ''){
      alert('Complete the form')
      return;
    }
    if(!validator.isEmail(this.userEmailPass.email)){
      alert('Write an email')
      return;
    }
    const queryString = this.objToQueryString({
      user: this.userEmailPass.user,
      email:this.userEmailPass.email
    });
    fetch(GlobalVariables.URL_BE + GlobalVariables.USER_RESOURCE + `?${queryString}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        } 
    })
    .then(function (response){return response.json()})
    .then(this.isUserExists.bind(this));
  }

  isUserExists(numberUsers){
    if(numberUsers>0)
      alert('The user already exists')
    else{
      alert('User available')
      this.setState({isRegistered: !this.state.isRegistered})
    }
  }

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={this.updateUsernameValue.bind(this)} type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={this.updateEmail.bind(this)} type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={this.updatePasswordValue.bind(this)} type="text" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.handleOnClick.bind(this)} type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
