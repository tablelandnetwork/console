import { createSlice } from '@reduxjs/toolkit'

enum PendingWriteStatus {
  unsent = "unsent",
  validating = "validating",
  pendingNetwork = "pending-network",
  pendingValidator = "pending-validator",
  complete = "complete"
}

interface PendingWrite {
  status: PendingWriteStatus
}

const initialState: Array<PendingWrite> = [];

const pendingWritesSlice = createSlice({
  name: 'pendingWrites',
  initialState: [], 
  reducers: {
    addPendingWrite (state, action) {
      state.push({
        query: action.payload.query,
        status: "validating"
      });
    },
    updatePendingWrite (state, action) {
      const indexOfCurrent = state.findIndex(pendingWrite => {
        return pendingWrite.query = action.payload.query;
      });
      state[indexOfCurrent].status = action.payload.status;

    },
    pendingWritesSet (state, action) {
      return action.payload
    },
  }
})

export const { pendingWritesSet, addPendingWrite, updatePendingWrite } = pendingWritesSlice.actions
export default pendingWritesSlice.reducer
