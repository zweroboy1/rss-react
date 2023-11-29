import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Beer, BeerApi } from '@/types';
import { BEER_ENDPOINT } from '@/constants';
import {
  setLoadingList,
  setLoadingDetails,
} from '../store/slices/loadingSlice';
import { mapper } from '@/utils/mapper';
import { itemListSlice } from '@/store/slices/itemListSlice';

interface QueryParams {
  page: number;
  limit: number;
  searchValue?: string;
}
export const beerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BEER_ENDPOINT }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    getItemList: builder.query<Beer[], QueryParams>({
      query: ({ limit, page, searchValue }) => {
        const params: Record<string, string | number> = {
          page,
          per_page: limit,
        };

        if (searchValue) {
          params.beer_name = searchValue;
        }
        return { url: '', params };
      },

      transformResponse: (response: BeerApi[]) => {
        return response.map((item) => mapper(item));
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { updateItemList } = itemListSlice.actions;
        dispatch(setLoadingList(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(updateItemList(data));
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        } finally {
          dispatch(setLoadingList(false));
        }
      },
    }),

    getDetails: builder.query<Beer, string>({
      query: (detailsId) => ({
        url: `/${detailsId}`,
      }),
      transformResponse: (response: BeerApi[]) => {
        return mapper(response[0]);
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { updateCurrentItem } = itemListSlice.actions;
        dispatch(setLoadingDetails(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(updateCurrentItem(data));
        } finally {
          dispatch(setLoadingDetails(false));
        }
      },
    }),
  }),
});

export const {
  useGetItemListQuery,
  useGetDetailsQuery,
  util: { getRunningQueriesThunk },
} = beerApi;
export const { getItemList, getDetails } = beerApi.endpoints;
