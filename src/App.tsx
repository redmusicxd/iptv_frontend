import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NoMatch from "./routes/NoMatch";
import VodRoute from "./routes/vod/VodProvidersList";
import Toolbar from "./components/Toolbar";
import { Box } from "@chakra-ui/react";
import Index from "./routes/Index";
import ProvidersList from "./routes/livetv/LiveProvidersList";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProviderChannels from "./routes/livetv/ProviderChannels";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box h="100%">
        <Toolbar />
        <Outlet />
      </Box>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
