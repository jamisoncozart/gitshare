import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <React.Fragment>
      <h1>Signup</h1>
      <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
    </React.Fragment>
  );
}

export default Signup;