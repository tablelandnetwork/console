import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useCloseOnClickOutside } from "../../hooks/clickOutside";
import { type RootState } from "../../store/store";

function PendingWrites(props: any): React.JSX.Element {
  const ref = useRef();
  const pendingWrites = useSelector((store: RootState) => store.pendingWrites);
  const openState = useSelector(
    (store: RootState) => store.pageState.transactionsMenu
  );
  const openStatus = openState ? "open" : "closed";
  useCloseOnClickOutside(ref, "transactionsMenu");

  return (
    // @ts-expect-error PendingWrites returns JSX
    <ul ref={ref} className={`submenu submenu--pending-writes ${openStatus}`}>
      {pendingWrites.map((pendingWrite) => {
        return (
          <li className="pending-write" key={pendingWrite.query}>
            {pendingWrite.query}
            <br></br>
            Status: {pendingWrite.status}
          </li>
        );
      })}
    </ul>
  );
}
export default PendingWrites;
