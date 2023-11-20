import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BeerCard } from '../BeerCard';
import { Loader } from '../Loader';
import { Message } from '../Message';
import { RootState } from '../../store/store';
import { beerApi } from '../../services/BeerApi';
import { ITEMS_PER_PAGE } from '../../constants';

import styles from './Beers.module.scss';

const Beers: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const loadingStatus = useSelector(
    (state: RootState) => state.loading.loadingList
  );

  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 1;
  const currentLimit = Number(queryParams.get('limit')) || ITEMS_PER_PAGE;

  const { data, isError } = beerApi.useGetItemListQuery({
    page: currentPage,
    limit: currentLimit,
    searchValue: searchQuery,
  });

  if (loadingStatus) {
    return <Loader />;
  }

  if (isError) {
    return <Message message={`Error: An error occurred while fetching data`} />;
  }

  return (
    <div className={styles['beers__container']}>
      <div
        className={styles['beers__link']}
        onClick={() => {
          navigate('/' + location.search);
        }}
      >
        <ul className={styles['beers__list']}>
          {data && data.length > 0 ? (
            data.map((beer) => <BeerCard key={beer.id} beer={beer} />)
          ) : (
            <Message message={`No beers found for "${searchQuery}"`} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Beers;
