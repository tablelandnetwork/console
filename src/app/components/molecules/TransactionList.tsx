import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/pageStateSlice";
import PendingWrites from "./PendingWrites";
import { RootState } from '../../store/store';

// TODO: More clear logic (perhaps comments) explaining pending icon

function TransactionList() {
  const pendingWrites = useSelector((store: RootState) => store.pendingWrites);
  const dispatch = useDispatch();
  if(pendingWrites.length < 1) return null;

  let awaitingWallet = !!pendingWrites.filter(write => write.status==='pending-wallet').length;
  let pending = pendingWrites.filter(write => (write.status!=='complete' && write.status!=='cancelled')).length;
  let icon = awaitingWallet ? <i className="fa-solid fa-circle-exclamation" title="Awaiting Wallet"></i> : <i className="fas fa-circle-notch fa-spin"></i>;
  if(!pending) {
    icon = <i className="fa-solid fa-check"></i>;
  }
  return (
    <li>
      <button className="button-default" onClick={() => {
        dispatch(toggleMenu("transactionsMenu"));
      }}>Commits {!pending ? "Complete" : "Pending"}: {pending || pendingWrites.length}/{pendingWrites.length} {icon}</button>
      <PendingWrites />
    </li>
  )
}

export default TransactionList
