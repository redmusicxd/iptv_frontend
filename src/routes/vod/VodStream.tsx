import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
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
import {  useParams } from "react-router-dom";
import videojs from "video.js";
import getVodStream from "../../apis/GetVodStream";
import VideoJS from '../../components/Player';
// import "videojs-contrib-eme";

export default function VodStream() {
  const playerRef = React.useRef(null);

  let { provider, show, epid } = useParams();
  const { data, status, isError, isFetching, error, isSuccess, isFetched, isFetchedAfterMount, isLoading } = useQuery(
    "getEpisodeStream",
    async () => getVodStream(provider || null, show || null, epid || null),
    {retry: 2, refetchOnMount: true, refetchOnWindowFocus: false, refetchOnReconnect: false}
  );
  const videoJsOptions = {
    src: data?.data?.stream.includes(".m3u8") ? `${import.meta.env.VITE_API_BASE_URL}/${provider}/vod/${show}/${epid}/index.m3u8?cf_bypass=1` : `${import.meta.env.VITE_API_BASE_URL}/cors/${data?.data?.stream}`,
    keySystems: {
      'com.widevine.alpha': `${import.meta.env.VITE_API_BASE_URL}/cors/${data?.data?.drm?.url}`
    }
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player?.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player?.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };
  // if (isSuccess) {
  //   window.location.href = data.data.stream;
  // }

  if (isError && !isFetching) {
    return (
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
    );
  }

  if ((isFetching && !isFetchedAfterMount) || isLoading)
    return (
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
    );

  if (data && data?.data?.length == 0) {
    return (
      <Box
        w="100%"
        h="calc(100% - var(--toolbar-size))"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="rgba(255,255,255, 0.7)">No Episodes available!</Heading>
      </Box>
    );
  }
  return (
    <>
    {(isSuccess) && (
      <Card mb="2">
        <CardBody>
            {/* <Text>{data?.data?.stream}</Text> */}
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </CardBody>
      </Card>
    )}
    {(isSuccess) && data?.data?.drm && (
      <Card>
        <CardBody>
          <Text>{data?.data.drm.url}</Text>
        </CardBody>
      </Card>
    )}
  </>
  );
}
