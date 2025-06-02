import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import { Movie } from '../../types/movie';

import styles from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovies(query);

        if (data.results.length === 0) {
          toast('No movies found for your request.');
        }

        setMovies(data.results);
      } catch {
        setError('Failed to fetch movies.');
        toast.error('Failed to fetch movies.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') {
      toast('Please enter your search query.');
      return;
    }

    setQuery(newQuery);
    setMovies([]);
    setError(null);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}{' '}
      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
