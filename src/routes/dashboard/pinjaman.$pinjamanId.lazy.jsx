import {createLazyFileRoute} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/pinjaman/$pinjamanId")({
  component: RouteComponent,
});

function RouteComponent() {
  const {pinjamanId} = Route.useParams();

  return <div>Hello "/dashboard/pinjaman/{pinjamanId}"!</div>;
}
