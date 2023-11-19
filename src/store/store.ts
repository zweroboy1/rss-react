import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { searchReducer } from './slices/searchSlice';
import { itemListReducer } from './slices/itemListSlice';
import { loadingReducer } from './slices/loadingSlice';
import { beerApi } from '../services/BeerApi';

const rootReducer = combineReducers({
  search: searchReducer,
  items: itemListReducer,
  loading: loadingReducer,
  beerApi: beerApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(beerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
