import React, { Component } from 'react';
import '../css/newTweet.css';
import { connect } from 'react-redux';

class NewTweet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweet: ''
        }
        this.textarea = React.createRef()
    }

    handleChange(e) {
        this.setState({ tweet: e.target.value })
    }

    handleClick() {
        console.log(this.state.tweet)
        this.props.newTweetClose()
    }

    postTweet() {
        console.log('ACAAA', this.props.username)
        let token = sessionStorage.getItem('token')
        fetch('http://localhost:3000/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                tweet: this.state.tweet,
                username: this.props.username,
                userId: this.props.userId
            })
        })
            .then(d => d.json())
            .then(result => {
                console.log(result)
                if (result.message === 'Posted tweet successfully') {
                    this.setState({ succesfullTweet: true, tweet: '' })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        const tweetBtn = this.state.tweet.length > 0 ? <button onClick={() => this.postTweet()} className="new-tweet-btn" >Tweet</button> : <button className="new-tweet-btn-disabled" >Tweet</button>

        return (
            <div className="new-tweet-background">
                <div className="new-tweet-container" >
                    <React.Fragment>
                        <h1>What's happening?</h1>
                        <i onClick={() => this.handleClick()} className="fas fa-times"></i>
                        <textarea value={this.state.tweet} onChange={(e) => this.handleChange(e)} placeholder="Write a new tweet..." ></textarea>
                        {this.state.succesfullTweet ? <p className="new-tweet-posted" >New tweet posted!</p> : null}
                        {tweetBtn}
                    </React.Fragment>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newTweetClose: () => dispatch({ type: 'NEW_TWEET_CLOSE' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTweet);