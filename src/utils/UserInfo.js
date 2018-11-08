import React, { Component } from 'react';
import UserPlaceholder from '../img/user-placeholder.png';

class UserInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="home-user-img" >
                    <img height="100px" src={UserPlaceholder} />
                    <h2>{this.props.username}</h2>
                </div>
                <div className="home-user-data" >
                    <div>
                        <h4>TWEETS</h4>
                        <h2>{this.props.tweets}</h2>
                    </div>
                    <div>
                        <h4>FAVORITES</h4>
                        <h2>{this.props.favsCount}</h2>
                    </div>
                    <div>
                        <h4>RETWEETS</h4>
                        <h2>{this.props.followers}</h2>
                    </div>
                    
                </div>
                <div className="compose-new-tweet" >
                    <input placeholder="Compose new tweet..." type="text" />
                </div>
            </React.Fragment>
        )
    }
}

export default UserInfo;