import React from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import Signin from './Signin';
import Header from './Header';
import FooterNav from './FooterNav';
import Body from './Body';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

let App = props => {
  return(
    <Router>
      <Switch>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/'>
          <Header />
          <h1>App</h1>
          <p>{props.userSignedIn ? 'true' : 'false'}</p>
          <p>{props.currentUser === null ? 'null' : props.currentUser}</p>
          <Body />    
          <FooterNav />
        </Route>
      </Switch>
    </Router>
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