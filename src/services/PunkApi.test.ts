import { expect, vi, it, describe } from 'vitest';
import { DataFetcher } from './DataFetcher';

const mockFetch = vi.spyOn(globalThis, 'fetch');

describe('DataFetcher', () => {
  it('should fetch data successfully', async () => {
    const mockResponse = {
      data: 'test data',
    };
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    const dataFetcher = new DataFetcher();
    const testUrl = 'https://example.com/api/data';

    const result = await dataFetcher.fetchData(testUrl);
    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(testUrl);
  });
});
