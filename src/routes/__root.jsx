import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {createRootRouteWithContext, Outlet} from "@tanstack/react-router";

export const Route = createRootRouteWithContext()({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
