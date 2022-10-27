import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/pageStateSlice";
import PendingWrites from "./PendingWrites";


function TransactionList() {
  const pendingWrites = useSelector(store => store.pendingWrites);
  const dispatch = useDispatch();
  if(pendingWrites.length < 1) return null;

  let awaitingWallet = !!pendingWrites.filter(write => write.status==='pending-wallet').length;
  let pending = pendingWrites.filter(write => write.status!=='complete').length;
  let icon = awaitingWallet ? <i className="fa-solid fa-circle-exclamation" title="Awaiting Wallet"></i> : <i className="fas fa-circle-notch fa-spin"></i>;
  if(!pending) {
    icon = <i className="fa-solid fa-check"></i>;
  }
  return (
    <li>
      <button onClick={() => {
        dispatch(toggleMenu("transactionsMenu"));
      }}>Commits {!pending ? "Complete" : "Pending"}: {pending || pendingWrites.length}/{pendingWrites.length} {icon}</button>
      <PendingWrites />
    </li>
  )
}

export default TransactionList
