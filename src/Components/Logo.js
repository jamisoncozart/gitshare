import React from 'react';

const Logo = props => {
  const imageStyle = {
    height: props.imageHeight,
    borderRadius: '50%',
    width: 'auto',
    margin: '0 7px'
  }
  const textStyle = {
    margin: '0 7px',
    fontSize: props.fontSize,
    fontFamily: "'Roboto Mono', monospace"
  }
  const darkTextStyle = {
    color: 'white',
    margin: '0 7px',
    fontSize: props.fontSize,
    fontFamily: "'Roboto Mono', monospace"
  }
  return (
    <div className='logo'>
      <img style={imageStyle} src='https://i.imgur.com/Lta1Npc.png' />
      <h1 style={props.darkMode ? darkTextStyle : textStyle}>git share</h1>
    </div>
  );
}

export default Logo;