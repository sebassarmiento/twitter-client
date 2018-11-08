import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from './utils/Navbar';
import Redirect from './utils/Redirect';

class App extends Component {
  render() {
    return (
      <div>
        {
          this.props.logged ?
            <BrowserRouter>
              <div>
                <Navbar />
                <Route path="/" exact component={Home} />
              </div>
            </BrowserRouter>
            :
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route component={Redirect} />
              </Switch>
            </BrowserRouter>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged
  }
}

export default connect(mapStateToProps)(App);
