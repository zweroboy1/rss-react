export interface Movie {
  id: number;
  title: string;
  image?: string;
  poster?: string;
  description: string;
  date: string;
}

export interface MovieTmdb {
  id: number;
  title: string;
  image: string;
  overview: string;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
}

export type ServerResponse = {
  page: number;
  results: MovieTmdb[];
  total_pages: number;
  total_results: number;
};
