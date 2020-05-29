import React, { useState } from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import Signin from './Signin';
import Header from './Header';
import FooterNav from './FooterNav';
import LandingPage from './LandingPage';
import Body from './Body/Body';
import { Switch, Route, useHistory } from 'react-router-dom';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import '../App.css';

let App = props => {
  const [authToggle, setAuthToggle] = useState(false);
  const [onSignIn, setOnSignIn] = useState(false);
  const history = useHistory();
  const [sortByTop, setSortByTop] = useState(false);
  const [sortByNew, setSortByNew] = useState(false);
  const [sortByFollow, setSortByFollow] = useState(false);
  const handleNavToFeed = () => {
    const action = {
      type: 'HIDE_DETAILS'
    }
    props.dispatch(action);
  }
  const [userSignedIn, setUserSignedIn] = useState(false);
  const auth = props.firebase.auth();
  let authContent = null;
  if(!isLoaded(auth)) {
    authContent = <h1>Loading...</h1>;
  } else if((isLoaded(auth)) && (auth.currentUser == null)) {
    if(!onSignIn) {
      setOnSignIn(true);
      history.push('/home');
    }
  } else if((isLoaded(auth)) && (auth.currentUser != null)) {
    authContent = <Body
      sortFeedObj={{sortByTop, sortByNew, sortByFollow}}
      currentlyLoggedUser={{
        name: auth.currentUser.displayName,
        id: auth.currentUser.photoURL,
        currentUserProfile: true
      }}/>;
    if(!userSignedIn) {

      const action = {
        type: 'SET_CURRENT_USER',
        name: auth.currentUser.displayName,
        id: auth.currentUser.photoURL,
        currentUserProfile: true
      }
      props.dispatch(action);
      setUserSignedIn(true);
    }
  }

  const handlePressingSidebarButton = button => {
    if(button === 'top') {
      setSortByTop(!sortByTop);
    } else if(button === 'new') {
      setSortByNew(!sortByNew);
    } else if(button === 'follow') {
      setSortByFollow(!sortByFollow);
    }
  }

  function handleRedirectToSignin() {
    if(auth.currentUser == null) {
      history.push('/home');
    }
    return null;
  }

  return(
    <Switch>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/signin'>
        <Signin setOnSignIn={setOnSignIn} handleSignIn={setAuthToggle}/>
      </Route>
      <Route path='/home'>
        <LandingPage />
      </Route>
      <Route path='/'>
        <React.Fragment>
          <Header 
            handleRedirectToSignin={handleRedirectToSignin}
            currentUser={auth.currentUser !== null ? auth.currentUser.displayName : ''} 
            handleSignOut={setAuthToggle}
            handlePressingSidebarButton={handlePressingSidebarButton}/>
          <FooterNav 
            currentLoggedUser={auth.currentUser ? { 
                name: auth.currentUser.displayName, 
                id: auth.currentUser.photoURL
              } : {
                name: '',
                id: ''
              }
            }
            handleNavToFeed={handleNavToFeed} />
          {authContent}   
        </React.Fragment>
      </Route>
    </Switch>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentPost: state.currentPost
  }
}

App = connect(mapStateToProps)(App);

export default withFirestore(App);