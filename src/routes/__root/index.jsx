import {createFileRoute, Link} from "@tanstack/react-router";

export const Route = createFileRoute("/__root/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/login">To login page</Link>
    </div>
  );
}
