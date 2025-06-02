import { useQuery } from '@tanstack/react-query';
import { fetchMovies, MovieApiResponse } from '../services/movieService';

export const useMovies = (query: string, page: number) => {
  return useQuery<MovieApiResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query.trim(),
    placeholderData: previousData => previousData,
  });
};
