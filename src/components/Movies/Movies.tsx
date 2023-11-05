import React, { useState, useEffect } from 'react';
import { Tmdb } from '../../services/Tmdb';
import { Movie } from '../../types';
import { MovieCard } from '../MovieCard';
import { Loader } from '../Loader';
import { Message } from '../Message';

import styles from './Movies.module.scss';

interface MoviesProps {
  query: string;
}

const Movies: React.FC<MoviesProps> = ({ query }) => {
  const tmdb = new Tmdb();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const movies = await tmdb.getSearchMovies(query);

        setMovies(movies);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message message={`Error: ${error}`} />;
  }

  return (
    <div className={styles['movies__container']}>
      <h1 className={styles['movies__title']}>
        {query !== '' ? 'Search query: ' + query : 'Upcoming movies'}
      </h1>
      <ul className={styles['movies__list']}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <Message message={`No movies found for "${query}"`} />
        )}
      </ul>
    </div>
  );
};

export default Movies;
