import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContextProvider';
import { BeerCard } from '../BeerCard';
import { Loader } from '../Loader';
import { Message } from '../Message';

import styles from './Beers.module.scss';

const Beers: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { beerList, loadingStatus } = useContext(AppContext);
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  if (loadingStatus === 'loading') {
    return <Loader />;
  }

  if (loadingStatus === 'error') {
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
          {beerList.length > 0 ? (
            beerList.map((beer) => <BeerCard key={beer.id} beer={beer} />)
          ) : (
            <Message message={`No beers found for "${searchQuery}"`} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Beers;
