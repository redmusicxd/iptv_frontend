import { ArrowBackIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import videojs from "video.js";
import getVodStream from "../../apis/GetVodStream";
import VideoJS from "../../components/Player";
// import "videojs-contrib-eme";

export default function VodStream() {
  const playerRef = React.useRef(null);

  const location = useLocation();

  let { provider, show, epid } = useParams();
  const {
    data,
    status,
    isError,
    isFetching,
    error,
    isSuccess,
    isFetched,
    isFetchedAfterMount,
    isLoading,
  } = useQuery(
    "getEpisodeStream",
    async () => getVodStream(provider || null, show || null, epid || null),
    {
      retry: 2,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const videoJsOptions = {
    src: data?.data?.stream.includes(".m3u8")
      ? `${
          import.meta.env.VITE_API_BASE_URL
        }/${provider}/vod/${show}/${epid}/index.m3u8?cf_bypass=1`
      : `${import.meta.env.VITE_API_BASE_URL}/cors/${data?.data?.stream}`,
    keySystems: {
      "com.widevine.alpha": `${import.meta.env.VITE_API_BASE_URL}/cors/${
        data?.data?.drm?.url
      }`,
    },
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player?.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player?.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  // if (isSuccess) {
  //   window.location.href = data.data.stream;
  // }

  if (isError && !isFetching) {
    return (
      <>
        <Breadcrumb
          pl="5"
          pt="2"
          pb="4"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <Button mr="4" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/"
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/vod"
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              VOD
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {provider
                ?.split("-")
                .map((a: string) => a[0].toUpperCase() + a.substring(1))
                .join(" ")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {location.state?.show || show}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}/${epid}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {location.state?.epname || epid}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          w="100%"
          h="calc(100% - var(--toolbar-size))"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Alert status="error" w="50%">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{(error as any)?.message}</AlertDescription>
          </Alert>
        </Box>
      </>
    );
  }

  if ((isFetching && !isFetchedAfterMount) || isLoading)
    return (
      <>
        <Breadcrumb
          pl="5"
          pt="2"
          pb="4"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <Button mr="4" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/"
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/vod"
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              VOD
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {provider
                ?.split("-")
                .map((a: string) => a[0].toUpperCase() + a.substring(1))
                .join(" ")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {location.state?.show || show}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}/${epid}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {location.state?.epname || epid}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          w="100%"
          h="calc(100% - var(--toolbar-size))"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading>Loading...</Heading>
        </Box>
      </>
    );

  if (data && data?.data?.length == 0) {
    return (
      <>
        <Breadcrumb
          pl="5"
          pt="2"
          pb="4"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <Button mr="4" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/"
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/vod"
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              VOD
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {provider
                ?.split("-")
                .map((a: string) => a[0].toUpperCase() + a.substring(1))
                .join(" ")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {location.state?.show || show}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}/${epid}`}
              state={{
                show: location.state?.show,
                epname: location.state?.epname,
              }}
            >
              {location.state?.epname || epid}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          w="100%"
          h="calc(100% - var(--toolbar-size))"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="rgba(255,255,255, 0.7)">
            No Episodes available!
          </Heading>
        </Box>
      </>
    );
  }
  return (
    <>
      <Breadcrumb
        pl="5"
        pt="2"
        pb="4"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <Button mr="4" as={Link} to=".." relative="path">
          <ArrowBackIcon color="white.500" />
        </Button>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/"
            state={{
              show: location.state?.show,
              epname: location.state?.epname,
            }}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/vod"
            state={{
              show: location.state?.show,
              epname: location.state?.epname,
            }}
          >
            VOD
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to={`/vod/${provider}`}
            state={{
              show: location.state?.show,
              epname: location.state?.epname,
            }}
          >
            {provider
              ?.split("-")
              .map((a: string) => a[0].toUpperCase() + a.substring(1))
              .join(" ")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to={`/vod/${provider}/${show}`}
            state={{
              show: location.state?.show,
              epname: location.state?.epname,
            }}
          >
            {location.state?.show || show}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            as={Link}
            to={`/vod/${provider}/${show}/${epid}`}
            state={{
              show: location.state?.show,
              epname: location.state?.epname,
            }}
          >
            {location.state?.epname || epid}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {isSuccess && (
        <Card mb="2">
          <CardBody>
            {/* <Text>{data?.data?.stream}</Text> */}
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </CardBody>
        </Card>
      )}
      {isSuccess && data?.data?.stream && (
        <Card>
          <CardBody>
            <Text>{data?.data.stream}</Text>
          </CardBody>
        </Card>
      )}
      {isSuccess && data?.data?.drm && (
        <Card>
          <CardBody>
            <Text>{data?.data.drm.url}</Text>
          </CardBody>
        </Card>
      )}
    </>
  );
}
