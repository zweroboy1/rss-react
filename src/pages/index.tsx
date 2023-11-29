import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Header } from '@/components/Header';
import { Pagination } from '@/components/Pagination';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Beers } from '@/components/Beers';
import { BeerBottle } from '@/components/BeerBottle';
import {
  getItemList,
  getDetails,
  getRunningQueriesThunk,
} from '@/services/BeerApi';
import { wrapper } from '@/store/store';
import { Beer } from '@/types';
import { ITEMS_PER_PAGE } from '@/constants';

export const getServerSideProps: GetServerSideProps<{
  data?: Beer[];
  beer?: Beer;
}> = wrapper.getServerSideProps((store) => async (context) => {
  const { limit, page, details, query } = context.query;

  if (!page) {
    return {
      redirect: {
        destination: `/?query=${query || ''}&page=1&limit=${
          limit || ITEMS_PER_PAGE
        }${details ? `&details=${details} ` : ''}`,
        permanent: false,
      },
    };
  }

  store.dispatch(
    getItemList.initiate({
      page: Number(page || 1),
      limit: Number(limit || ITEMS_PER_PAGE),
      searchValue: query?.toString() || '',
    })
  );

  if (details) {
    store.dispatch(getDetails.initiate(details.toString()));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      data: store.getState().itemListReducer.items,
      beer: store.getState().itemListReducer.currentItem,
    },
  };
});
export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props?.data) {
    return null;
  }
  const { data, beer } = props;

  return (
    <ErrorBoundary>
      <main className="main">
        <Header />
        <Pagination />
        <div className="content">
          <Beers data={data} />
          <div className="right">
            <BeerBottle beer={beer} />
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
