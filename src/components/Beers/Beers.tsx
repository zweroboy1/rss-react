import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PunkApi } from '../../services/PunkApi';
import { Beer } from '../../types';
import { BeerCard } from '../BeerCard';
import { Loader } from '../Loader';
import { Message } from '../Message';
import { ITEMS_PER_PAGE } from '../../constants';

import styles from './Beers.module.scss';

interface BeersProps {
  query: string;
}

const Beers: React.FC<BeersProps> = ({ query }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;
  const limit = Number(queryParams.get('limit')) || ITEMS_PER_PAGE;
  const [beers, setBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateURL = (page: number, limit: number) => {
    queryParams.set('page', String(page));
    queryParams.set('limit', String(limit));
    navigate(`/?${queryParams.toString()}`);
  };

  useEffect(() => {
    const fetchBeers = async () => {
      setLoading(true);
      try {
        const punkApi = new PunkApi();
        const beers = await punkApi.getSearchBeers(query, page, limit);
        if (beers.length === 0 && page > 1) {
          updateURL(1, limit);
        }
        setBeers(beers);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchBeers();
  }, [query, page, limit]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message message={`Error: ${error}`} />;
  }

  return (
    <div className={styles['beers__container']}>
      <Link to={'/' + location.search} className={styles['beers__link']}>
        <ul className={styles['beers__list']}>
          {beers.length > 0 ? (
            beers.map((beer) => <BeerCard key={beer.id} beer={beer} />)
          ) : (
            <Message message={`No beers found for "${query}"`} />
          )}
        </ul>
      </Link>
    </div>
  );
};

export default Beers;
