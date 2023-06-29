import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import selectedCellReducer from "./selectedCellSlice";
import tablesReducer from "./tablesSlice";
import pendingWritesReducer from "./pendingWritesSlice";
import walletConnectionReducer from "./walletConnectionSlice";
import pageStateReducer from "./pageStateSlice";
import tabsReducer from "./tabsSlice";
import sidebarReducer from "./sidebarSlice";
import flagsReducer from "./flagSlice";
import toastsReducer from "./toastsSlice";

export const store = configureStore({
  reducer: {
    walletConnection: walletConnectionReducer,
    selectedCell: selectedCellReducer,
    tables: tablesReducer,
    pendingWrites: pendingWritesReducer,
    pageState: pageStateReducer,
    tabs: tabsReducer,
    sidebar: sidebarReducer,
    flags: flagsReducer,
    toasts: toastsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
