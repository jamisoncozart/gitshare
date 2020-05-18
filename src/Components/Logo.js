import React from 'react';
import { useHistory } from 'react-router-dom';

const Logo = props => {
  const history = useHistory();
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
    <div onClick={() => history.push('/home')} className='logo'>
      <img style={imageStyle} src='https://i.imgur.com/Lta1Npc.png' />
      <h1 style={props.darkMode ? darkTextStyle : textStyle}>git share</h1>
    </div>
  );
}

export default Logo;