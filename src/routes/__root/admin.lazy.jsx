import {createLazyFileRoute} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__root/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__root/admin"!</div>;
}
