import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PunkApi } from '../../services/PunkApi';
import { Beer } from '../../types';
import { Loader } from '../Loader';
import { Message } from '../Message';
import styles from './BeerBottle.module.scss';

const BeerBottle: React.FC = () => {
  const { productId = '' } = useParams();
  const [beer, setBeer] = useState<Beer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const punkApi = new PunkApi();
  useEffect(() => {
    const fetchBeer = async () => {
      setLoading(true);
      try {
        const beer = await punkApi.getBeer(productId);
        setBeer(beer);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchBeer();
  }, [productId]);

  if (loading) {
    return (
      <div className={styles['beer-bottle__loader']}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Message message={`Error: ${error}`} />;
  }

  return beer ? (
    <div className={styles['beer-bottle']}>
      <Link to="..">close</Link>
      <div className={styles['beer-bottle__title']}>{beer.title}</div>

      <div className={styles['beer-bottle__image-container']}>
        <img
          src={beer.image}
          alt={beer.title}
          className={styles['beer-bottle__image']}
        />
      </div>
      <div className={styles['beer-bottle__text']}>{beer.description}</div>
    </div>
  ) : (
    ''
  );
};

export default BeerBottle;
