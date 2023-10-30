import { ServerResponse } from '../types';

export class DataFetcher {
  async fetchData(url: string): Promise<ServerResponse> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
