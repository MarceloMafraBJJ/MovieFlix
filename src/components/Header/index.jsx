import "./header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link className="logo" to="/">
        MovieFlix
      </Link>
      <Link className="favorites" to="/favorites">
        <button>Meus Favoritos</button>
      </Link>
    </header>
  );
};
