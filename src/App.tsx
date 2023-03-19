import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChevronRightIcon } from "@chakra-ui/icons";

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
