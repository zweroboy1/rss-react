import React from 'react';
import { useRouter } from 'next/router';
import { BeerCard } from '../BeerCard';
import { Message } from '../Message';

import styles from './Beers.module.scss';
import { Beer } from '@/types';

const Beers = ({ data }: { data: Beer[] }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const closeItemDetails = () => {
    delete query.details;
    router.push({
      pathname,
      query,
    });
  };

  const searchQuery = query.query;

  return (
    <div className={styles['beers__container']}>
      <div className={styles['beers__link']} onClick={closeItemDetails}>
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
