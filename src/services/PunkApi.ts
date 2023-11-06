import { DataFetcher } from './DataFetcher';
import { BEER_ENDPOINT, ITEMS_PER_PAGE } from '../constants';
import { Beer, ServerResponse } from '../types';
import { buildUrl } from '../utils/buildUrl';
import { mapper } from '../utils/mapper';

export class PunkApi {
  private dataFetcher: DataFetcher;

  constructor() {
    this.dataFetcher = new DataFetcher();
  }

  public async getBeers(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<Beer[]> {
    try {
      const beerSource: string = buildUrl(endpoint, params);
      const data: ServerResponse = await this.dataFetcher.fetchData(beerSource);
      const beers: Beer[] = data.map((el) => mapper(el));
      return beers;
    } catch (error) {
      throw error;
    }
  }

  public async getBeer(id: string): Promise<Beer> {
    try {
      const data: ServerResponse = await this.dataFetcher.fetchData(
        `${BEER_ENDPOINT}/${id}`
      );
      const beer: Beer = mapper(data[0]);
      return beer;
    } catch (error) {
      throw error;
    }
  }

  public async getSearchBeers(
    query: string,
    page = 1,
    limit = ITEMS_PER_PAGE
  ): Promise<Beer[]> {
    try {
      const beers = query
        ? await this.getBeers(BEER_ENDPOINT, {
            beer_name: query,
            page: page,
            per_page: limit,
          })
        : await this.getBeers(BEER_ENDPOINT, { page: page, per_page: limit });
      return beers;
    } catch (error) {
      throw error;
    }
  }
}
