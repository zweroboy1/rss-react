import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Beer, BeerApi } from '../types';
import { BEER_ENDPOINT } from '../constants/';
import {
  setLoadingList,
  setLoadingDetails,
} from '../store/slices/loadingSlice';
import { updateItemList } from '../store/slices/itemListSlice';

import { mapper } from '../utils/mapper';

interface QueryParams {
  page: number;
  limit: number;
  searchValue?: string;
}
export const beerApi = createApi({
  reducerPath: 'beerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BEER_ENDPOINT }),
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
        dispatch(setLoadingDetails(true));
        try {
          await queryFulfilled;
        } finally {
          dispatch(setLoadingDetails(false));
        }
      },
    }),
  }),
});

export const { useGetItemListQuery } = beerApi;
