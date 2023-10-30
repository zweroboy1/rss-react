import { Component } from 'react';
import { Movie } from '../../types';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

class MovieCard extends Component<MovieCardProps> {
  render() {
    const { movie } = this.props;

    return (
      <li key={movie.id} className={styles['movie__card']}>
        <img
          src={movie.image}
          alt={movie.title}
          className={styles['movie__image']}
        />
        <h2 className={styles['movie__title']}>{movie.title}</h2>
        <p className={styles['movie__description']}>{movie.description}</p>
      </li>
    );
  }
}

export default MovieCard;
