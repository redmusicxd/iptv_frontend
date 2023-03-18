import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import getChannelStream from "../../apis/GetChannelStream";
import VideoJS from "../../components/Player.jsx";
// @ts-ignore
// import 'videojs-contrib-eme';

export default function ChannelStream() {
  let { provider, channel } = useParams();
  const { data, status, error, isFetching, isSuccess, isError, isFetched, isFetchedAfterMount, isLoading } = useQuery("getStream", async () =>
    getChannelStream(provider || null, channel || null),
    {retry: 2, refetchOnMount: true, refetchOnWindowFocus: false, }
  );

  const playerRef = React.useRef(null);
  const videoJsOptions = {
    src: data?.data?.stream.includes(".m3u8") ? `${import.meta.env.VITE_API_BASE_URL}/${provider}/live/${channel}/index.m3u8?cf_bypass=1` : `${import.meta.env.VITE_API_BASE_URL}/cors/${data?.data?.stream}`,
    keySystems: {
      'com.widevine.alpha': `${import.meta.env.VITE_API_BASE_URL}/cors/${data?.data?.drm?.url}`
    },
  };

  const handlePlayerReady = (player: any) => {
    playerRef!.current = player;

    // You can handle player events here, for example:
    player?.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player?.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

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
          <AlertDescription>
            {(error as any)?.message}
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  if ((isFetched && !isFetchedAfterMount) || isLoading)
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
  
  return (
    <>
      {isSuccess && (
        <Card mb="2">
          <CardBody>
            {/* <Text>{data?.data?.stream}</Text> */}
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </CardBody>
        </Card>
      )}
      {/* {(isSuccess && !isFetching) && data?.data?.drm && (
        <Card>
          <CardBody>
            <Text>{data?.data.drm.url}</Text>
          </CardBody>
        </Card>
      )} */}
    </>
  );
}
