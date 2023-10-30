import { ServerResponse } from '../types';

export class DataFetcher {
  async fetchData(url: string): Promise<ServerResponse> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
