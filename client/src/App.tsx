import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./helpers/routes";
import { MainPage } from "./pages";

const queryClient = new QueryClient();
const App = () => {
  const { home } = routes;
  const router = createBrowserRouter([
    {
      path: home,
      element: <MainPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
