import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/signup.css';
import { connect } from 'react-redux';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleLogin() {
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
                if(result.message === 'Created user successfully'){
                    this.props.signup(result.user.username, result.token)
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
        const signupBtn = <button onClick={() => this.handleLogin()} className="signup-btn" >Sign up</button>
        const disabledSignupBtn = <button className="signup-btn-disabled" >Sign up</button>

        return (
            <div className="signup-container" >
                <h1>Sign up</h1>
                <input onChange={e => this.handleChange(e)} value={this.state.email} name="email" type="text" placeholder="Email" />
                <input onChange={e => this.handleChange(e)} value={this.state.username} name="username" type="text" placeholder="Username" />
                <input onChange={e => this.handleChange(e)} value={this.state.password} name="password" type="password" placeholder="Password" />
                <span className="fields-required-text" >* All fields are required</span>
                {this.state.email.length > 3 && this.state.password.length > 3 ? signupBtn : disabledSignupBtn}
                <p>Already have an account? <NavLink to="/" >Log in</NavLink></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (username, token) => dispatch({type: 'SIGNUP_SUCCESS', payload: { username, token }})
    }
}

export default connect(null, mapDispatchToProps)(SignUp);