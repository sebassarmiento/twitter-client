import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/login.css';
import { connect } from 'react-redux';
import Loader from '../utils/Loader';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleLogin() {
    if (this.state.email.indexOf('@') === -1 || this.state.email.indexOf('.') === -1) {
      this.setState({invalidEmail: true})
    } else {
      this.setState({ loginFailure: false, loginTry: true , invalidEmail: false})
      fetch('http://localhost:3000/users/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(d => d.json())
        .then(result => {
          this.setState({ loginTry: false })
          console.log('AQUIIIII',result)
          if (result.token) {
            sessionStorage.setItem('token', result.token)
            this.props.login(result.token, result.userId, result.username, result.favs)
          }
          if (result.message === 'Login failure') {
            this.setState({ loginFailure: true })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    const loginBtn = <button onClick={() => this.handleLogin()} className="login-btn" >Login</button>
    const disabledLoginBtn = <button className="login-btn-disabled" >Login</button>

    const invalidText = <p className="invalid-data" >Invalid username or password</p>

    return (
      <div className="login-container" >
        <h1>LOGIN</h1>
        <input onChange={e => this.handleChange(e)} value={this.state.email} name="email" type="text" placeholder="Email" />
        {this.state.invalidEmail ? <span className="invalid-data" >Please enter a valid email adress</span> : null}
        <input onChange={e => this.handleChange(e)} value={this.state.password} name="password" type="password" placeholder="Password" />
        {this.state.loginFailure ? invalidText : null}
        {this.state.loginTry ? <Loader /> : null}
        {this.state.email.length > 3 && this.state.password.length > 3 ? loginBtn : disabledLoginBtn}
        <p>Don't have an account? <NavLink to="/signup" >Sign up</NavLink></p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (token, userId, username, favs) => dispatch({ type: 'LOGIN_SUCCESS', payload: {token, userId, username, favs} })
  }
}

export default connect(null, mapDispatchToProps)(Login);