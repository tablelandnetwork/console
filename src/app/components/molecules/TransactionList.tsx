import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { toggleMenu } from "../../store/pageStateSlice";
import PendingWrites from "./PendingWrites";

// TODO: More clear logic (perhaps comments) explaining pending icon

function TransactionList(): React.JSX.Element {
  const pendingWrites = useSelector((store: RootState) => store.pendingWrites);
  const dispatch = useDispatch();
  // @ts-expect-error TransactionList returns null
  if (pendingWrites.length < 1) return null;

  const awaitingWallet = !!pendingWrites.filter(
    (write) => write.status === "pending-wallet"
  ).length;
  const pending = pendingWrites.filter(
    (write) => write.status !== "complete" && write.status !== "cancelled"
  ).length;
  let icon = awaitingWallet ? (
    <i className="fa-solid fa-circle-exclamation" title="Awaiting Wallet"></i>
  ) : (
    <i className="fas fa-circle-notch fa-spin"></i>
  );
  if (!pending) {
    icon = <></>; // <i className="fa-solid fa-check"></i>;
  }
  return (
    <li>
      <button
        className="button-default"
        onClick={() => {
          dispatch(toggleMenu("transactionsMenu"));
        }}
      >
        Commits {!pending ? "" : "Pending"}
        {
          // : {pending || pendingWrites.length}/{pendingWrites.length}
        }{" "}
        {icon}
      </button>
      <PendingWrites />
    </li>
  );
}

export default TransactionList;
