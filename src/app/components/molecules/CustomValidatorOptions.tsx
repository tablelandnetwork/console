import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeValidatorHost } from "../../store/walletConnectionSlice";
import { type RootState } from "../../store/store";

function CustomValidatorOptions(props: any): React.JSX.Element {
  const dispatch = useDispatch();
  const { customHost } = useSelector(
    (store: RootState) => store.walletConnection
  );

  function setCustomValidator(): void {
    localStorage.setItem("validator", customHost as any);
    location.reload();
  }

  function clearCustomValidator(): void {
    localStorage.setItem("validator", "");
    location.reload();
  }

  function hostTextUpdate(e: any): void {
    dispatch(changeValidatorHost(e.target.value));
  }

  return (
    <div>
      <label htmlFor="validatorUrl">
        Validator Url
        <input
          type="text"
          name="validatorUrl"
          defaultValue={customHost as any}
          onKeyUp={hostTextUpdate}
        />
      </label>
      <button className="button-default" onClick={setCustomValidator}>
        Change Validator
      </button>
      {customHost && (
        <button className="button-default" onClick={clearCustomValidator}>
          Clear Custom Validator
        </button>
      )}
    </div>
  );
}
export default CustomValidatorOptions;
