import {createFileRoute, Link} from "@tanstack/react-router";
import {FiArrowRight, FiLogIn} from "react-icons/fi";
import "../../styles/root-home.css";

export const Route = createFileRoute("/__root/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="root-home">
      <main className="root-home__main" aria-label="Koperasi app entry">
        <div className="root-home__top">
          <span className="root-home__badge">Beta Internal</span>
        </div>

        <div className="root-home__copy">
          <h1>Koperasi</h1>
          <p>Sistem operasional kas koperasi.</p>
        </div>

        <nav className="root-home__actions" aria-label="Akses aplikasi">
          <Link className="button-primary" to="/login">
            <FiLogIn /> Masuk ke aplikasi <FiArrowRight className="root-home__arrow" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
