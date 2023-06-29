import { createSlice } from "@reduxjs/toolkit";

enum PendingWriteStatus {
  unsent = "unsent",
  validating = "validating",
  wallet = "pending-wallet",
  pendingNetwork = "pending-network",
  pendingValidator = "pending-validator",
  complete = "complete",
  cancelled = "cancelled",
}

interface PendingWrite {
  status: PendingWriteStatus;
  query: string;
}

const initialState: PendingWrite[] = [];

const pendingWritesSlice = createSlice({
  name: "pendingWrites",
  initialState,
  reducers: {
    addPendingWrite(state, action) {
      state.push({
        query: action.payload.query,
        status: PendingWriteStatus.wallet,
      });
    },
    updatePendingWrite(state, action) {
      const indexOfCurrent = state.findIndex((pendingWrite) => {
        return pendingWrite.query === action.payload.query;
      });
      state[indexOfCurrent].status = action.payload.status;
    },
  },
});

export const { addPendingWrite, updatePendingWrite } =
  pendingWritesSlice.actions;
export default pendingWritesSlice.reducer;
