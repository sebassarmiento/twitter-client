import React, { Component } from 'react';
import '../css/home.css';
import Tweet from '../utils/Tweet';
import Loader from '../utils/Loader';
import { connect } from 'react-redux';
import UserInfo from '../utils/UserInfo';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    let token = sessionStorage.getItem('token')

    fetch(`http://localhost:3000/users/${this.props.userId}`)
    .then(d => d.json())
    .then(result => {
      console.log(result)
      this.setState({userData: result})
    })
    .catch(err => {
      console.log(err)
    })

    fetch('http://localhost:3000/tweets', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
    .then(d => d.json())
    .then(result => {
      console.log('AQUIAQUI',result)
      this.setState({data: result})
    })
    .catch(err => {
      console.log(err)
    })
  }


  render() {

    console.log('ACAAA', this.state.data)

    const tweets = this.state.data ? this.state.data.map(tweet => {
      return <Tweet userFavs={this.state.userData.favs} tweetId={tweet._id} key={tweet._id} date={tweet.date} username={tweet.username} tweet={tweet.tweet} />
    }) : <Loader />

    return (
      <div className="home-container" >
        <div className="home-column-1" >
          {this.state.userData ? <UserInfo favsCount={this.state.userData.favs.length} username={this.state.userData.username} tweets={this.state.userData.tweets} following={this.state.userData.following} followers={this.state.userData.followers} /> : null}
        </div>
        <div className="home-column-2" >
          <h1>Tweets</h1>
          {tweets}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(Home);