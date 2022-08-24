import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function PendingWrites(props) {

  const pendingWrites = useSelector(store => store.pendingWrites);
  const dispatch = useDispatch();
  const openStatus = "open";

  return (
    <ul className={`submenu submenu--pending-writes ${openStatus}`}>
      {pendingWrites.map(pendingWrite => {
        return (                  
            <li>{pendingWrite.query} <br></br>Status: {pendingWrite.status}</li>
          );
      })}
    </ul>
  );
}
export default PendingWrites;
