import React, { useEffect, useState } from "react";
import "../css/Banner.css";
import axios from "../axios";
import requests from "../request";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // 3 petits points pour les longs textes.
  function truncate(string, n) {
    return string && string.length > n
      ? string.substr(0, n - 1) + "..."
      : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie && (movie.title || movie.name || movie.original_name)}
        </h1>
        <div className="banner__butttons">
          <button className="banner__buttton">Play</button>
          <button className="banner__buttton">My list</button>
        </div>
        <h1 className="banner__description">
          {movie && truncate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
