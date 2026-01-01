import {createLazyFileRoute, redirect} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__root/anggota")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/root/anggota"!</div>;
}
