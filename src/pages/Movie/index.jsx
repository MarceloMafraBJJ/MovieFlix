import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

import "./movie.css";

export const Movie = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "479a72257fd53b4108f578b167301702",
            language: "pt-BR",
          },
        })
        .then((res) => {
          setMovie(res.data);
          setLoading(false);
        })
        .catch(() => {
          navigation("/", { replace: true });
        });
    }
    loadMovie();
  }, [navigation, id]);

  function saveMovie() {
    const myList = localStorage.getItem("@movieFlix");
    let savedMovies = JSON.parse(myList) || [];
    const hasMovie = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (hasMovie) {
      toast.warn("Esse filme já existe na lista!");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@movieFlix", JSON.stringify(savedMovies));
    toast.success("filme salvo com sucesso");
  }

  if (loading) {
    return (
      <div className="movieInfo">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="movieInfo">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview.substring(0, 350) + ".."}</span>
      <strong>Avaliação: {movie.vote_average.toFixed(1)} / 10</strong>

      <div className="areaButtons">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="extenal"
            href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};
