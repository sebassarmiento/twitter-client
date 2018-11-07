import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/signup.css';
import { connect } from 'react-redux';
import Redirect from '../utils/Redirect';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleSignup() {
        fetch('http://localhost:3000/users/signup', {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(d => d.json())
            .then(result => {
                console.log(result)
                if (result.message === 'Created user successfully') {
                    this.setState({createdUser: true})
                    setTimeout(() => {
                        this.setState({redirect: true})
                    }, 2000)
                }
                if (result.message === 'Email is already taken') {
                    this.setState({ emailTaken: true })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const signupBtn = <button onClick={() => this.handleSignup()} className="signup-btn" >Sign up</button>
        const disabledSignupBtn = <button className="signup-btn-disabled" >Sign up</button>

        return (
            <div className="signup-container" >
                <h1>Sign up</h1>
                <input onChange={e => this.handleChange(e)} value={this.state.email} name="email" type="text" placeholder="Email" />
                <input onChange={e => this.handleChange(e)} value={this.state.username} name="username" type="text" placeholder="Username" />
                <input onChange={e => this.handleChange(e)} value={this.state.password} name="password" type="password" placeholder="Password" />
                <span className="fields-required-text" >* All fields are required</span>
                {
                    this.state.email.length > 3
                        &&
                        this.state.username.length > 1
                        &&
                        this.state.password.length > 3
                        ?
                        signupBtn : disabledSignupBtn
                }
                {
                    this.state.createdUser ? <h2 className="signup-success" >Created user succesfully <i className="fas fa-check-circle"></i></h2> : null
                }
                {
                    this.state.emailTaken ? <p className="invalid-data" >Email is already taken</p> : null
                }
                <p>Already have an account? <NavLink to="/" >Log in</NavLink></p>
                {
                    this.state.redirect ? <Redirect /> : null
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (userData) => dispatch({ type: 'SIGNUP_SUCCESS', payload: userData })
    }
}

export default connect(null, mapDispatchToProps)(SignUp);