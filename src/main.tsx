import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  StyleFunctionProps,
  type ThemeConfig,
} from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import NoMatch from "./routes/NoMatch";
import Index from "./routes/Index";
import ProviderChannels from "./routes/livetv/ProviderChannels";
import ProvidersList from "./routes/livetv/LiveProvidersList";
import VodRoute from "./routes/vod/VodProvidersList";
import ChannelStream from "./routes/livetv/ChannelStream";
import VodShowsList from "./routes/vod/VodShowsList";
import VodEpisodesList from "./routes/vod/VodEpisodesList";
import VodStream from "./routes/vod/VodStream";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme(
  { config },
  {
    components: {
      Card: {
        // The styles all Cards have in common
        baseStyle: (props: StyleFunctionProps) => ({
          container: {
            bg:
              props.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
            shadow: "sm"
          },
        }),
      },
      Button: {
        baseStyle: {
          shadow: "sm",
        },
      },
    },
  }
);

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "live",
        element: <ProvidersList />,
      },
      {
        path: "live/:provider",
        element: <ProviderChannels />,
      },
      {
        path: "live/:provider/:channel",
        element: <ChannelStream />,
      },
      {
        path: "vod",
        element: <VodRoute />,
      },
      {
        path: "vod/:provider",
        element: <VodShowsList />,
      },
      {
        path: "vod/:provider/:show",
        element: <VodEpisodesList />,
      },
      {
        path: "vod/:provider/:show/:epid",
        element: <VodStream />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} fallbackElement={<NoMatch />} />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {/* <App /> */}
    </ChakraProvider>
  </React.StrictMode>
);
