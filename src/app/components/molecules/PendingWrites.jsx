import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPendingWrite } from '../../store/pendingWritesSlice';

function PendingWrites(props) {

  const pendingWrites = useSelector(store => store.pendingWrites);
  const dispatch = useDispatch();

  return (
    <div>

      {pendingWrites.map(pendingWrite => {
        return (
          <ul>
            <li>{pendingWrite.query}</li>
            <li>Status: {pendingWrite.status}</li>
          </ul>);
      })}
    </div>
  );
}
export default PendingWrites;
