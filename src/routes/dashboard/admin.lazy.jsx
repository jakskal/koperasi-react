import {createLazyFileRoute} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/admin"!</div>;
}
