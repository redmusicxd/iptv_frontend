import { Link, Outlet, useLocation } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ArrowBackIcon } from "@chakra-ui/icons";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <Box h="100%">
        <Toolbar />
        <Flex align="center" ml="5" mb="4" mt="4">
          {location.pathname != "/" && <Button  w="30px" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button>}
          <Text ml="2" fontSize="lg">
            {location.pathname != "/" && (location.state?.[
              location.pathname.split("/").filter((i) => i)[
                location.pathname.split("/").filter((i) => i).length - 1
              ]
            ] ||
              location.pathname
                .split("/")
                .filter((i) => i)
                [
                  location.pathname.split("/").filter((i) => i).length - 1
                ]?.split("-")
                .map((a: string) => a[0].toUpperCase() + a.substring(1))
                .join(" "))}
          </Text>
        </Flex>
        <Outlet />
      </Box>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
