import React, { Component } from 'react';
import UserPlaceholder from '../img/user-placeholder.png';
import '../css/tweet.css';
import TimeAgo from './TimeAgo';
import { connect } from 'react-redux';

class Tweet extends Component {
    constructor(props) {
        super(props)
        this.state = {fav: false}
    }

    componentDidMount(){
        if(this.props.userFavs.indexOf(this.props.tweetId) !== -1){
            this.setState({fav: true})
        }
    }

    handleFavourite(){
        console.log('FAVOURITED!')
        this.setState({fav: !this.state.fav})
        fetch(`http://localhost:3000/users/${this.props.userId}/fav`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tweetId: this.props.tweetId
            })
        })
        .then(d => d.json())
        .then(res => {
            console.log(res)

        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        console.log('ACAAAAAAAA',this.props.favs)
        return (
            <div className="tweet" >
                <img height="54px" src={this.props.userImg ? this.props.userImg : UserPlaceholder} />
                <div className="tweet-data" >
                    <h3>{this.props.username}<span className="tweet-time-ago" > {TimeAgo(Date.now(), this.props.date)}</span></h3>
                    <p className="tweet-p" >{this.props.tweet}</p>
                    <div className="tweet-buttons" >
                        <i className="far fa-comment"></i>
                        <i className="fas fa-retweet"></i>
                        <i onClick={() => this.handleFavourite()} className={this.state.fav ? 'fas fa-star fav-icon' : 'far fa-star'}></i>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        favs: state.favs
    }
}

export default connect(mapStateToProps)(Tweet);