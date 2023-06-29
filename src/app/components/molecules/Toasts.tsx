import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { removeToast } from "../../store/toastsSlice";

function Toast(props: any): React.JSX.Element {
  const { type, message, id, active } = props.toast;
  const [activeStarted, setActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
    setTimeout(() => {
      dispatch(removeToast({ id }));
    }, 8000);
  }, []);

  return (
    <div
      className={`toast ${type as string} ${
        active && activeStarted ? "active" : ""
      }`}
      onClick={() => {
        dispatch(removeToast({ id }));
      }}
    >
      {message}
    </div>
  );
}

function Toasts(props: any): React.JSX.Element {
  const toasts = useSelector((store: RootState) => store.toasts);

  return (
    <div className="toasts">
      {toasts.map((toast) => (
        <Toast toast={toast} />
      ))}
    </div>
  );
}
export default Toasts;
