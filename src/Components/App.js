import React from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import Signin from './Signin';
import Header from './Header';
import FooterNav from './FooterNav';
import Body from './Body';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withFirestore, isLoaded } from 'react-redux-firebase';

let App = props => {

  const auth = this.props.firebase.auth();
  let authContent = null;
  if(!isLoaded(auth)) {
    authContent = <h1>Loading...</h1>
  } else if((isLoaded(auth)) && (auth.currentUser == null)) {
    authContent = <h1>You must be signed in to access this content! <Link to='/signin'>Sign In</Link></h1>
  }

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
    currentUser: state.currentUser,
    firebase: state.firebase
  }
}

App = connect(mapStateToProps)(App);

export default App;