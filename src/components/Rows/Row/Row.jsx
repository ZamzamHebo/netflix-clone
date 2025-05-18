import React, { useState, useEffect, useCallback } from "react";
import axios from "../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const base_url = "https://image.tmdb.org/t/p/original/";

  // Use useCallback to memoize the fetchData function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching:", fetchUrl);
      const request = await axios.get(fetchUrl);
      console.log("Response:", request);
      setMovies(request.data.results);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load movies.");
      setMovies([]); // Ensure movies array is empty on error
    } finally {
      setLoading(false);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Depend on fetchData

  const handleClick = useCallback(
    (movie) => {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        setLoading(true); // Indicate loading trailer
        movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
          .then((url) => {
            setLoading(false);
            if (url) {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            } else {
              setError(
                `Trailer not found for ${
                  movie?.name || movie?.title || movie?.original_name
                }`
              );
            }
          })
          .catch((err) => {
            setLoading(false);
            console.error("Error fetching trailer:", err);
            setError(
              `Error fetching trailer for ${
                movie?.name || movie?.title || movie?.original_name
              }`
            );
          });
      }
    },
    [trailerUrl]
  );

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      {loading && <div className="row__loading">Loading movies...</div>}
      {error && <div className="row__error">{error}</div>}

      {!loading && !error && (
        <div className="row_posters">
          {movies?.map((movie, index) => (
            <img
              onClick={() => handleClick(movie)}
              key={index}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={
                movie.name ||
                movie.title ||
                movie.original_name ||
                "Movie Poster"
              }
            />
          ))}
        </div>
      )}

      <div className="row__trailer-container" style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        {loading && trailerUrl && (
          <div className="row__loading">Loading trailer...</div>
        )}
        {error && trailerUrl && <div className="row__error">{error}</div>}
      </div>
    </div>
  );
};

export default Row;
