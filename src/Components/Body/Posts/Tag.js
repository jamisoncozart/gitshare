import React from 'react';

const Tag = props => {
  return (
    <div onClick={() => props.filterFeedByTag(props.name)} className='tag'>
      {props.name}
    </div>
  )
}

export default Tag;