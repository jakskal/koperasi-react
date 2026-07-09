import {createFileRoute, Link} from "@tanstack/react-router";

export const Route = createFileRoute("/__root/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center"}}>
      <h1>Koperasi</h1>
      <Link style={{color: "black", border: "2px solid black"}} to="/login">
        Masuk ke aplikasi
      </Link>
    </div>
  );
}
