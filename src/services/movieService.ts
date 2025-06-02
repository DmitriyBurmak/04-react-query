import axios from 'axios';
import { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const fetchMovies = async (query: string): Promise<MovieApiResponse> => {
  const response = await axios.get<MovieApiResponse>(BASE_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};
