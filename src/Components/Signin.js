import React from 'react';
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <React.Fragment>
      <h1>Signin</h1>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </React.Fragment>
  );
}

export default Signin;