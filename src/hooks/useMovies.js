import { useState, useEffect } from "react";
const KEY = "f8398f5f ";

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    callback?.();
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const rest = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );

        if (!rest.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await rest.json();
        if (data.Response === "False") throw new Error("Movie Not found");
        setMovies(data.Search);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
    // Cleanup function to cancel the fetch request when component unmounts
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
