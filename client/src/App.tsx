import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const App = () => {
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
};

export default App;
