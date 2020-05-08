import React from 'react';
import { connect } from 'react-redux';

let App = props => {
  return(
    <React.Fragment>
      <h1>App</h1>
      <p>{props.userSignedIn ? 'true' : 'false'}</p>
      <p>{props.currentUser === null ? 'null' : props.currentUser}</p>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userSignedIn: state.userSignedIn,
    currentUser: state.currentUser
  }
}

App = connect(mapStateToProps)(App);

export default App;