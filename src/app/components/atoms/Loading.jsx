import React from 'react';

function Loading(props) {
  return (
    <div className={`loading-please ${props.show ? 'open' : 'closed'}`}>
      <i className="fas fa-circle-notch fa-spin"></i>
    </div>
  );
}

export default Loading;
