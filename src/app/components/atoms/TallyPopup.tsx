import React, { useState } from 'react';

function TallyPopup(props) {


  function openPopup() {
    // @ts-ignore
    window.TallyConfig = {
      "formId": "mJ9WNz",
      "hideTitle": true,
      "popup": {
        "width": 300,
        "hideTitle": true,
        "open": {
          "trigger": "scroll",
          "scrollPercent": 80
        },
        "autoClose": 5000
        }
      };
      const formId = 'mJ9WNz';
      const popupKey = `popup_${formId}`;
      // @ts-ignore
      Tally.openPopup(formId, TallyConfig);
  }


  return (
    <button className='tally-popup-prompt' onClick={openPopup}>
      <i className="fa-regular fa-comment"></i>
    </button>
  );
}
export default TallyPopup;
