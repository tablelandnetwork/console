import React from 'react';
import { changeValidatorHost } from '../../store/walletConnectionSlice';
import { Flags } from 'react-feature-flags';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';


function CustomValidatorOptions(props) {
  const dispatch = useDispatch();
  const { customHost } = useSelector((store: RootState) => store.walletConnection);

  function setCustomValidator() {
    localStorage.setItem("validator", customHost);
    location.reload();
  }

  function clearCustomValidator() {
    localStorage.setItem("validator", "");
    location.reload();  
  }

  function hostTextUpdate(e) {
    dispatch(changeValidatorHost(e.target.value));
  }

  return (
    <div>
      <label htmlFor="validatorUrl">
        Validator Url
        <input 
          type="text" 
          name="validatorUrl" 
          defaultValue={customHost}
          onKeyUp={hostTextUpdate}
        />
      </label>
      <button className="button-default" onClick={setCustomValidator}>Change Validator</button>
      {customHost && (
        <button className="button-default" onClick={clearCustomValidator}>
          Clear Custom Validator
        </button>
      )}
    </div>
  );
}
export default CustomValidatorOptions;
