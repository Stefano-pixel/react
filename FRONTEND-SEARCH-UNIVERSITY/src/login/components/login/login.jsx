import React from "react";
import loginImg from "../../login.svg";
import Context from '../../../Context'
import { Redirect } from 'react-router-dom';

const GlobalVariables =  require('../../../GlobalVariables');

export class Login extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {isLogin : false}
    this.userPass = {
      user : '',
      password : ''
    }   
  }

  componentDidMount(){
    this.context.user = ''
  }
  
  updateUsernameValue = (event) => {
    const val = event.target.value;
    this.userPass.user = val;
  }

  updatePasswordValue = (event) => {
    const val = event.target.value;
    this.userPass.password = val;
  }

  handleOnClick = () =>{
   fetch(GlobalVariables.URL_BE + GlobalVariables.USER_RESOURCE + '/login', { 
        method: 'POST',
        body: JSON.stringify(this.userPass),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        } 
      })
      .then(response => response.json())
      .then(this.loginTheUserIfExists.bind(this));
  }

  loginTheUserIfExists(isUserInDb){
    if(isUserInDb){
      alert('user exists')
      console.log('lll ' + this.context.user)
      this.context.user = this.userPass.user;
      console.log('lll ' + this.context.user)
      this.setState((currentState)=>{
       return {isLogin:!currentState.isLogin};
      });
   }else {
      this.context.user = '';
      alert('user doesn exists')
   }
  }

  render() {
    console.log(this.context.user !== '')
    console.log(this.context.user)
    return (
      this.context.user !== ''?
      <Redirect to='/universities'/>
      :
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
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
              <label htmlFor="password">Password</label>
              <input onChange={this.updatePasswordValue.bind(this)} type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.handleOnClick.bind(this)} type="button" className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
}
