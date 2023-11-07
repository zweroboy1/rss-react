import { Beer, BeerApi } from '../types';
import { NO_IMAGE_PLACEHOLDER } from '../constants';

export function mapper(el: BeerApi): Beer {
  const image: string = el.image_url || NO_IMAGE_PLACEHOLDER;
  return {
    id: el.id,
    title: el.name,
    tag: el.tagline,
    date: el.first_brewed,
    description: el.description,
    image: image,
  };
}
