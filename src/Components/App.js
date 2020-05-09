import React, { useState } from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import Signin from './Signin';
import Header from './Header';
import FooterNav from './FooterNav';
import Body from './Body/Body';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import '../App.css';

let App = props => {

  const [authToggle, setAuthToggle] = useState(false);
  const [onSignIn, setOnSignIn] = useState(false);
  const history = useHistory();

  console.log('App rendered 😀');

  const auth = props.firebase.auth();
  let authContent = null;
  if(!isLoaded(auth)) {
    authContent = <h1>Loading...</h1>;
  } else if((isLoaded(auth)) && (auth.currentUser == null)) {
   // If the user is not signed in, redirect to signin page
    if(!onSignIn) {
      setOnSignIn(true);
      history.push('/signin');
    }
  } else if((isLoaded(auth)) && (auth.currentUser != null)) {
    authContent = <Body />;
  }

  return(
    <Switch>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/signin'>
        <Signin handleSignIn={setAuthToggle}/>
      </Route>
      <Route path='/'>
        {/* ADD TO currentUser WHEN TESTING AUTH */}
        {/* auth.currentUser !== null ? auth.currentUser.displayName :  */}
        <Header currenUser={auth.currentUser !== null ? auth.currentUser.displayName : ''} handleSignOut={setAuthToggle}/>
        {authContent}   
        <FooterNav />
      </Route>
    </Switch>
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