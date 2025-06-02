import axios from 'axios';
import { MovieApiResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieApiResponse> => {
  const response = await axios.get<MovieApiResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};
