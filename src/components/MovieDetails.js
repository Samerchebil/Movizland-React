import React, { useState, useEffect, useRef } from 'react';

import { Loader } from './Loader';
import { useKey } from '../hooks/useKey';
import StarRating from '../StarRating';

const KEY = "f8398f5f ";

function MovieDetails({ selectedId, onCloseMovie, onAddWatch, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const counterRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      counterRef.current = counterRef.current + 1;
    }
  }, [userRating]);

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: releasedDay,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ')[0]),
      userRating,
      countRatingDecisions: counterRef.current,
    };
    onAddWatch(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const rest = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await rest.json();
      setIsLoading(false);
      setMovie(data);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = 'Movizland';
      console.log(`Clean up effect for a movie ${title}`);
    };
  }, [title]);

  useKey('Escape', onCloseMovie);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {releasedDay} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🫖</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating size={26} maxRating={10} onSetRating={setUserRating} />
                  {userRating && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated this movie {watchedUserRating}👌</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
