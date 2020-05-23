import React from 'react';

const Modal = props => {
  return (
    <div className='behindModal'>
      <div className='modal'>
        <h3>{props.currentProfileInput}</h3>
        <p>Does this look correct?</p>
        <button className='modalButton confirmModalButton' onClick={props.handleProfileConfirmation}>Confirm</button>
        <button className='modalButton backModalButton' onClick={() => props.setShowConfirmationWindow(false)}>Close</button>
      </div>
    </div>
  )
}

export default Modal;