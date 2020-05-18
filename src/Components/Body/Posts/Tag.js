import React from 'react';

const Tag = props => {
  
  if(props.onFeed) {
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

export default Tag;