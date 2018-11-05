import React, { Component } from 'react';
import UserPlaceholder from '../img/user-placeholder.png';
import '../css/tweet.css';

class Tweet extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        return (
            <div className="tweet" >
                <img height="54px" src={this.props.userImg ? this.props.userImg : UserPlaceholder} />
                <div className="tweet-data" >
                    <h3>{this.props.username}<span>{this.props.timeAgo}</span></h3>
                    <p>{this.props.tweet}</p>
                </div>
            </div>
        )
    }
}

export default Tweet;