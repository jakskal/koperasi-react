import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/__root/")({
  component: Index,
});

function Index() {
  return <div>Home</div>;
}
