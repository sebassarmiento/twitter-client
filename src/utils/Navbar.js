import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import WriteLogo from '../img/write-icon.png';
import '../css/navbar.css';
import { connect } from 'react-redux';
import NewTweet from './NewTweet';

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      home: true,
      notifications: false,
      me: false
    }
  }
  
  handleNavigation(btn){
    switch(btn){
      case 'home':
      this.setState({home: true, notifications: false, me: false})
      break;
      case 'notifications':
      this.setState({home: false, notifications: true, me: false})
      break;
      case 'me':
      this.setState({home: false, notifications: false, me: true})
      break;
      default:
      console.log("SALE POR DEFAULT")
    }
  }

  newTweet(){
    this.props.newTweetFunc()
    //this.setState({newTweet: true})
  }

  render() {
    return (
      <div className="navbar">
        <p className="navbar-title" >Twitter</p>
        <input placeholder="Search..." type="text" />
        <img onClick={() => this.newTweet()} src={WriteLogo} height="24px" alt="Write new tweet" />
        <div className="navbar-menu">
          <NavLink onClick={() => this.handleNavigation('home')} className={this.state.home ? 'navbar-current' : null} to="/" ><i className="fas fa-home"></i> Home</NavLink>
          <NavLink onClick={() => this.handleNavigation('notifications')} className={this.state.notifications ? 'navbar-current' : null} to="/notifications" ><i className="fas fa-bell"></i> Notifications</NavLink>
          <NavLink onClick={() => this.handleNavigation('me')} className={this.state.me ? 'navbar-current' : null} to="/profile" ><i className="fas fa-user"></i> Me</NavLink>
          <i className="fas fa-cog"></i>
          {this.props.newTweet ? <NewTweet /> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    newTweet: state.newTweet
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newTweetFunc: () => dispatch({type: 'NEW_TWEET'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);