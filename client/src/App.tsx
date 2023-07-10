import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./helpers/routes";
import ToasterProvider from "./providers/ToastProvider";
import TimesPage from "./pages/TimesPage";
import { useAuth } from "./hooks/useAuth";
import { MainPage } from "./pages";

const queryClient = new QueryClient();
const App = () => {
  const isLogin = useAuth();
  console.log(isLogin);

  const { home, times } = routes;

  const router = createBrowserRouter([
    {
      path: home,
      element: <MainPage />,
    },
    {
      path: times,
      element: isLogin ? <TimesPage /> : <MainPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToasterProvider />

      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
