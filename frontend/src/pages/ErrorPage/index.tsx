import { Link } from "react-router-dom";
import "./index.css";

const ErrorPage = () => {
  return (
    <main className="error-main">
      <h1>Error 404</h1>
      <h2>Page not Found</h2>
      {/* <button>Go Back?</button> */}
      <Link to="/" className={"error-link"}>
        Go Back?
      </Link>
    </main>
  );
};

export default ErrorPage;
