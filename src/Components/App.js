import React from 'react';
import { connect } from 'react-redux';

let App = props => {
  return(
    <h1>App</h1>
  );
}

App = connect()(App);

export default App;