import { DataFetcher } from './DataFetcher';
import { API_KEY, SEARCH_MOVIES_ENDPOINT } from '../constants';
import { Movie, ServerResponse } from '../types';
import { buildUrl } from '../utils/buildUrl';
import { mapper } from '../utils/mapper';

export class Tmdb {
  private dataFetcher: DataFetcher;

  constructor() {
    this.dataFetcher = new DataFetcher();
  }

  public async getMovies(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<Movie[]> {
    try {
      const urlParams: Record<string, string> = { api_key: API_KEY, ...params };
      const moviesSource: string = buildUrl(endpoint, urlParams);
      const data: ServerResponse =
        await this.dataFetcher.fetchData(moviesSource);
      const movies: Movie[] = data.results.map((el) => mapper(el));
      return movies;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public async getSearchMovies(query: string): Promise<Movie[]> {
    try {
      const movies = await this.getMovies(SEARCH_MOVIES_ENDPOINT, { query });
      return movies;
    } catch (error) {
      throw error;
    }
  }
}
