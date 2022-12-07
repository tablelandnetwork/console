import { configureStore } from '@reduxjs/toolkit'
import selectedCellReducer from './selectedCellSlice';
import browseReducer from './browseSlice';
import tablesReducer from './tablesSlice';
import pendingWritesReducer from './pendingWritesSlice';
import walletConnectionReducer from './walletConnectionSlice';
import pageStateReducer from './pageStateSlice';
import tabsReducer from './tabsSlice';
import sidebarReducer from './sidebarSlice';
import flagsReducer from './flagSlice';
import toastsReducer from './toastsSlice';


export const store = configureStore({
  reducer: {
    walletConnection: walletConnectionReducer,
    selectedCell: selectedCellReducer,
    browse: browseReducer,
    tables: tablesReducer,
    pendingWrites: pendingWritesReducer,
    pageState: pageStateReducer,
    tabs: tabsReducer,
    sidebar: sidebarReducer,
    flags: flagsReducer,
    toasts: toastsReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
