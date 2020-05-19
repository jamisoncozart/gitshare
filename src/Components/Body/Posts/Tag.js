import React from 'react';
import { connect } from 'react-redux';

let Tag = props => {
  if(props.onFeed && props.currentView !== '/profile') {
    return (
      <div onClick={() => props.filterFeedByTag(props.name)} className={props.darkMode ? 'darkTag' : 'tag'}>
        {props.name}
      </div>
    )
  } else {
    return (
      <div className={props.darkMode ? 'darkTag' : 'tag'}>
        {props.name}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentView: state.currentView
  }
}

Tag = connect(mapStateToProps)(Tag);

export default Tag;