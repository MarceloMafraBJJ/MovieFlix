import { Link } from "react-router-dom";
import "./error.css";

export const Error = () => {
  return (
    <div className="notFound">
      <h1>404 Error</h1>
      <h2>Page Not Found</h2>
      <Link to="/">See all movies</Link>
    </div>
  );
};
