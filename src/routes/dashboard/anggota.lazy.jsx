import {createLazyFileRoute} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/anggota")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/anggota"!</div>;
}
