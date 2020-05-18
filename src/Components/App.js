import React, { useState } from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import Signin from './Signin';
import Header from './Header';
import FooterNav from './FooterNav';
import LandingPage from './LandingPage';
import Body from './Body/Body';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import '../App.css';

let App = props => {

  const [authToggle, setAuthToggle] = useState(false);
  const [onSignIn, setOnSignIn] = useState(false);
  const [userViewingOwnProfile, setUserViewingOwnProfile] = useState(true);
  const [viewingDetails, setViewingDetails] = useState(false);
  const history = useHistory();

  const [sortByTop, setSortByTop] = useState(false);
  const [sortByNew, setSortByNew] = useState(false);
  const [sortByFollow, setSortByFollow] = useState(false);

  const handleNavToProfile = (bool) => {
    setUserViewingOwnProfile(bool)
  }

  const handleNavToFeed = () => {
    setViewingDetails(false);
  }

  console.log('App rendered 😀');

  const auth = props.firebase.auth();
  let authContent = null;
  if(!isLoaded(auth)) {
    authContent = <h1>Loading...</h1>;
  } else if((isLoaded(auth)) && (auth.currentUser == null)) {
    if(!onSignIn) {
      setOnSignIn(true);
      history.push('/signin');
    }
  } else if((isLoaded(auth)) && (auth.currentUser != null)) {
    authContent = <Body 
      userViewingOwnProfile={userViewingOwnProfile} 
      handleNavToProfile={handleNavToProfile} 
      currentUser={{name: auth.currentUser.displayName, id: auth.currentUser.photoURL}}
      setViewingDetails={setViewingDetails}
      viewingDetails={viewingDetails}
      sortFeedObj={{sortByTop, sortByNew, sortByFollow}}/>;
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
        {auth.currentUser == null ? () => {
            setOnSignIn(true);
            history.push('/signin');
          } : null}
        <Header 
          currentUser={auth.currentUser !== null ? auth.currentUser.displayName : ''} 
          handleSignOut={setAuthToggle}
          handlePressingSidebarButton={handlePressingSidebarButton}/>
        {authContent}   
        <FooterNav 
          handleNavToProfile={handleNavToProfile} 
          handleNavToFeed={handleNavToFeed} />
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