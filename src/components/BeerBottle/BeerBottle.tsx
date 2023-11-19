import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { Message } from '../Message';
import { beerApi } from '../../services/BeerApi';
import { RootState } from '../../store/store';

import styles from './BeerBottle.module.scss';

const BeerBottle: React.FC = () => {
  const location = useLocation();
  const { productId = '' } = useParams();
  const { data, isError } = beerApi.useGetDetailsQuery(productId);
  const loadingStatus = useSelector(
    (state: RootState) => state.loading.loadingDetails
  );

  if (loadingStatus) {
    return (
      <div className={styles['beer-bottle__loader']}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <Message message={`Error: I can't fecth the data, sorry`} />;
  }

  if (!data) {
    return null;
  }
  return (
    <div className={styles['beer-bottle']}>
      <Link to={'/' + location.search}>close</Link>
      <div className={styles['beer-bottle__title']}>{data.title}</div>

      <div className={styles['beer-bottle__image-container']}>
        <img
          src={data.image}
          alt={data.title}
          className={styles['beer-bottle__image']}
        />
      </div>
      <div className={styles['beer-bottle__text']}>{data.description}</div>
    </div>
  );
};

export default BeerBottle;
