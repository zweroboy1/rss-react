import { Movie, MovieTmdb } from '../types';
import { IMAGES_PATH, NO_IMAGE_PLACEHOLDER } from '../constants';

export function mapper(el: MovieTmdb): Movie {
  const image: string = el.poster_path
    ? IMAGES_PATH + el.poster_path
    : NO_IMAGE_PLACEHOLDER;
  const poster: string = el.backdrop_path
    ? IMAGES_PATH + el.backdrop_path
    : NO_IMAGE_PLACEHOLDER;

  return {
    id: el.id,
    title: el.title,
    image,
    poster,
    description: el.overview,
    date: el.release_date,
  };
}
