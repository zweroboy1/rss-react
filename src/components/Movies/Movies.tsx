import { Component } from 'react';
import { Tmdb } from '../../services/Tmdb';
import { Movie } from '../../types';
import styles from './Movies.module.scss';
import { MovieCard } from '../MovieCard';

interface MoviesProps {
  query: string;
}

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

class Movies extends Component<MoviesProps, MoviesState> {
  private tmdb: Tmdb;

  constructor(props: MoviesProps) {
    super(props);

    this.state = {
      movies: [],
      loading: false,
      error: null,
    };

    this.tmdb = new Tmdb();
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps: MoviesProps) {
    if (this.props.query !== prevProps.query) {
      this.fetchMovies();
    }
  }

  async fetchMovies() {
    this.setState({ loading: true });

    try {
      const { query } = this.props;
      const movies = await this.tmdb.getSearchMovies(query);

      this.setState({
        movies,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error: 'An error occurred while fetching data',
        loading: false,
      });
      console.error(error);
    }
  }

  render() {
    const { movies, loading, error } = this.state;
    const { query } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (movies.length > 0) {
      return (
        <div className={styles['movies__container']}>
          <h1 className={styles['movies__title']}>
            {query !== '' ? 'Search query: ' + query : 'Upcoming movies'}
          </h1>
          <ul className={styles['movies__list']}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No movies found.</div>;
    }
  }
}

export default Movies;
