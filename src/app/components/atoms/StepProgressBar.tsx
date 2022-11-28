import React from 'react';

function StepProgressBar(props) {

  const steps = new Array(props.steps);
  steps.fill(0);

  return (
    <div className='step-progress-bar'>
      {steps.map((step, key) => {
        if(key===0) {
          return (
            <div key={key} className='step-progress-bar--stop active'></div>
          );        
        }
        const activeState = key>=props.step ? "" : "active";
        return (
          <React.Fragment key={key}>
            <div className={`step-progress-bar--gap ${activeState}`}></div>
            <div className={`step-progress-bar--stop ${activeState}`}></div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default StepProgressBar;
