import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class MyRedirect extends Component {
  render() {
    return (
      <Redirect to="/" />
    )
  }
}

export default MyRedirect;