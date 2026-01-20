import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles/index.css";
import {RouterProvider, createRouter} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import {AuthProvider, useAuth} from "./context";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
  },
});

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{auth}} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
