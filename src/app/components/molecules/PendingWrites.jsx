import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCloseOnClickOutside, useOnClickOutside } from '../../hooks/clickOutside';

function PendingWrites(props) {
  const ref = useRef();
  const pendingWrites = useSelector(store => store.pendingWrites);
  const openState = useSelector(store => store.pageState.transactionsMenu);
  const openStatus = openState ? "open" : "closed"; 
  useCloseOnClickOutside(ref, "transactionsMenu");
  

  return (
    <ul ref={ref} className={`submenu submenu--pending-writes ${openStatus}`}>
      {pendingWrites.map(pendingWrite => {
        return (                  
            <li key={pendingWrite.query}>{pendingWrite.query} <br></br>Status: {pendingWrite.status}</li>
          );
      })}
    </ul>
  );
}
export default PendingWrites;
