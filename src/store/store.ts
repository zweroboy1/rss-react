import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { searchReducer } from './slices/searchSlice';
import itemListReducer from './slices/itemListSlice';
import { loadingReducer } from './slices/loadingSlice';
import { beerApi } from '../services/BeerApi';

const rootReducer = combineReducers({
  search: searchReducer,
  itemListReducer,
  loading: loadingReducer,
  [beerApi.reducerPath]: beerApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type Dispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
