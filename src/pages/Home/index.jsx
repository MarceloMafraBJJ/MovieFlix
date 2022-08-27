import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilms() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "479a72257fd53b4108f578b167301702",
          language: "pt-BR",
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 10));
      setLoading(false); // após pegar todos os filmes, o loading fica falso, ou seja, pode proseguir.
    }
    loadFilms();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="listMovie">
        {movies.map((item, key) => {
          return (
            <article key={key}>
              <strong>{item.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              />
              <Link to={`/movie/${item.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};
