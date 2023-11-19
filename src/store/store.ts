import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { searchReducer } from './slices/searchSlice';
import { itemListReducer } from './slices/itemListSlice';
import { loadingReducer } from './slices/loadingSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  items: itemListReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
