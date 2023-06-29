import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flags } from "react-feature-flags";
import { useCloseOnClickOutside } from "../../hooks/clickOutside";
import { toggleMenu } from "../../store/pageStateSlice";
import { type RootState } from "../../store/store";

function SettingsMenu(): React.JSX.Element {
  const settingsMenuOpen = useSelector(
    (store: RootState) => store.pageState.settingsMenu
  );
  const ref = useRef();
  const dispatch = useDispatch();
  useCloseOnClickOutside(ref, "settingsMenu");

  return (
    <Flags authorizedFlags={["customValidator"]}>
      <li>
        <button
          className="button-default"
          onClick={() => dispatch(toggleMenu("settingsMenu"))}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>
        <ul
          className={`submenu ${settingsMenuOpen ? "open" : "closed"}`}
          ref={ref as any}
        >
          <li></li>
        </ul>
      </li>
    </Flags>
  );
}

export default SettingsMenu;
