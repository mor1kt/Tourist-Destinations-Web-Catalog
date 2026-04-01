import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>
        Return to <Link to="/">home</Link>.
      </p>
    </section>
  );
}
