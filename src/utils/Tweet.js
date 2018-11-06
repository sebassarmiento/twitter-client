import React, { Component } from 'react';
import UserPlaceholder from '../img/user-placeholder.png';
import '../css/tweet.css';
import TimeAgo from './TimeAgo';

class Tweet extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        console.log(this.props.date)
        return (
            <div className="tweet" >
                <img height="54px" src={this.props.userImg ? this.props.userImg : UserPlaceholder} />
                <div className="tweet-data" >
                    <h3>{this.props.username}<span className="tweet-time-ago" > {TimeAgo(Date.now(), this.props.date)}</span></h3>
                    <p className="tweet-p" >{this.props.tweet}</p>
                    <div className="tweet-buttons" >
                        <i className="far fa-comment"></i>
                        <i className="fas fa-retweet"></i>
                        <i className="far fa-star"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tweet;