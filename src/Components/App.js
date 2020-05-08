import React, { useState } from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import Signin from './Signin';
import Header from './Header';
import FooterNav from './FooterNav';
import Body from './Body/Body';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import '../App.css';

let App = props => {

  const [authToggle, setAuthToggle] = useState(false);
  const history = useHistory();

  console.log('App rendered 😀');

  const auth = props.firebase.auth();
  let authContent = null;
  if(!isLoaded(auth)) {
    authContent = <h1>Loading...</h1>;
  } else if((isLoaded(auth)) && (auth.currentUser == null)) {
    // authContent = <h1>You must be signed in to access this content! <Link to='/signin'>Sign In</Link></h1>;
    history.push('/signin');
  } else if((isLoaded(auth)) && (auth.currentUser != null)) {
    authContent = <Body />;
  }

  return(
    <Router>
      <Switch>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/signin'>
          <Signin handleSignIn={setAuthToggle}/>
        </Route>
        <Route path='/'>
          <Header currenUser={auth.currentUser !== null ? auth.currentUser.displayName : ''} handleSignOut={setAuthToggle}/>
          {authContent}   
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
  }
}

App = connect(mapStateToProps)(App);

export default withFirestore(App);