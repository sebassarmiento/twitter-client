import React, { Component } from 'react';
import UserPlaceholder from '../img/user-placeholder.png';

class UserInfo extends Component {
    render() {
        return (
            <div>
                <div className="home-user-img" >
                    <img height="100px" src={UserPlaceholder} />
                    <h2>{this.props.username}</h2>
                </div>
                <div className="home-user-data" >
                    <div>
                        <h4>{this.props.tweets}</h4>
                        <h4>TWEETS</h4>
                    </div>
                    <div>
                        <h4>{this.props.followers}</h4>
                        <h4>FOLLOWERS</h4>
                    </div>
                    <div>
                        <h4>{this.props.following}</h4>
                        <h4>FOLLOWING</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo;