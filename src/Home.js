import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./hooks/useMovies";
import { Navigation } from "./components/navigation/Navigation";
import { Loader } from "./components/Loader";
import Boxer from "./components/Boxer";

import Main from "./components/Main";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovie from "./components/WatchedMovie";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "f8398f5f ";

export default function Home() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);


  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>📛</span>
      {message}
    </p>
  );
} 


  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function deleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  const key ="watched";
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : [];
  });
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [[], key]);


  return (
    <>
      <Navigation query={query} setQuery={setQuery} movies={movies} />

      <Main>
        <Boxer>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Boxer>
        <Boxer>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatch={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={deleteWatched}
              />
            </>
          )}
        </Boxer>
      </Main>
    </>
  );
}

