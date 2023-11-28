import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  loadingList: boolean;
  loadingDetails: boolean;
}

const initialState: LoadingState = {
  loadingList: false,
  loadingDetails: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingList(state, action: PayloadAction<boolean>) {
      state.loadingList = action.payload;
    },
    setLoadingDetails(state, action: PayloadAction<boolean>) {
      state.loadingDetails = action.payload;
    },
  },
});

export const { setLoadingList, setLoadingDetails } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
