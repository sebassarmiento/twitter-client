import React, { Component } from 'react';
import UserPlaceholder from '../img/user-placeholder.png';
import '../css/tweet.css';
import TimeAgo from './TimeAgo';
import { connect } from 'react-redux';

class Tweet extends Component {
    constructor(props) {
        super(props)
        this.state = {fav: false, retweet: false}
    }

    componentDidMount(){
        if(this.props.userFavs.indexOf(this.props.tweetId) !== -1){
            this.setState({fav: true})
        }
        if(this.props.retweet){
            this.setState({retweet: true})
        }
    }

    handleRetweet(){
        console.log('RETWEETED!')
        fetch(`http://localhost:3000/tweets/${this.props.tweetId}/retweet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.userId,
                retweetUsername: this.props.currentUsername,
                tweet: this.props.tweet,
                originalUser: this.props.username
            })
        })
        .then(d => d.json())
        .then(res => {
            console.log(res)
            if(res.message === 'Retweet succesfull'){
                this.setState({successRetweet: true})
                setTimeout(() => {
                    this.setState({successRetweet: false})
                }, 3000)
            }
        })
        .catch(err => {
            console.log(err)
        })
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
        return (
            <div className="tweet" >
                <img alt="user-img" height="54px" src={this.props.userImg ? this.props.userImg : UserPlaceholder} />
                <div className="tweet-data" >
                    {
                        this.state.retweet ? <p className="retweeted-text" >{this.props.retweetUsername} retweeted this <i className="fas fa-retweet"></i></p> : null
                    }
                    <h3>{this.props.username}<span className="tweet-time-ago" > {TimeAgo(Date.now(), this.props.date)}</span></h3>
                    <p className="tweet-p" >{this.props.tweet}</p>
                    <div className="tweet-buttons" >
                        <i className="far fa-comment"></i>
                        <i onClick={() => this.handleRetweet()} className="fas fa-retweet"></i>
                        <i onClick={() => this.handleFavourite()} className={this.state.fav ? 'fas fa-star fav-icon' : 'far fa-star'}></i>
                    </div>
                </div>
                {
                    this.state.successRetweet ? <h1 className="success-retweet" >Retweeted succesfully!</h1> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        favs: state.favs,
        currentUsername: state.username
    }
}

export default connect(mapStateToProps)(Tweet);