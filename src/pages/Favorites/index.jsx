import React, { useEffect, useState } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@movieFlix");
    setMovies(JSON.parse(myList) || []);
  }, []);

  function excluirFilme(id) {
    let filterMovies = movies.filter((item) => {
      return item.id !== id;
    });

    setMovies(filterMovies);
    localStorage.setItem("@movieFlix", JSON.stringify(filterMovies));
    toast.success("Filme removido com sucesso!");
  }

  return (
    <div className="myMovies">
      <h1>Meus Filmes</h1>

      {movies.length === 0 && <h2>Você não possui nenhum filme salvo!</h2>}

      <ul>
        {movies.map((item, key) => {
          return (
            <li key={key}>
              <span>{item.title}</span>
              <div>
                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
