import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Key } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import getChannels from "../../apis/GetChannels";

export default function ProviderChannels() {
  let { provider } = useParams();
  let location = useLocation();
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
  } = useQuery("getChannels", async () => getChannels(provider || null), {
    refetchOnWindowFocus: false,
  });

  if (isError && !isFetching) {
    return (
      <>
        <Box
          w="100%"
          h="100%"
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

  if ((isFetched && !isFetchedAfterMount) || isLoading)
    return (
      <Flex wrap="wrap" justify="center" gap="4">
        {Array.from({ length: 8 }, (_: any, i: number) => i + 1).map((_, i) => (
          <Skeleton maxW="218px" h="218px" m="0" key={i} borderRadius="4">
            <Card maxW="sm">
              <CardBody w="218px" h="219px"></CardBody>
            </Card>
          </Skeleton>
        ))}
      </Flex>
    );

  if (Object.keys(data.data).length === 0 || data?.data?.length == 0) {
    return (
      <>
        <Box
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="rgba(255,255,255, 0.7)">
            No channels available!
          </Heading>
        </Box>
      </>
    );
  }
  const cardHover = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  return (
    <SimpleGrid minChildWidth={["150px", "180px"]} spacing="20px" mx="20px" pb="6">
      {isSuccess &&
        !isFetching &&
        Object.keys(data?.data)?.map((item: any, i: Key | null | undefined) => (
          <Card
            key={i}
            as={Link}
            to={`/live/${provider}/${item}`}
            state={{ ...location.state, [item]: data.data[item].name }}
            // minW="200px"
            maxW="220px"
            _hover={{ bg: cardHover }}
          >
            <CardBody
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <Image
                src={
                  data.data[item].img ||
                  "https://www.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg"
                }
                width="100%"
                maxH="90px"
                objectFit="contain"
                alt={data.data[item].name}
                borderRadius="lg"
              />
              <Heading size="md" pt="2" alignSelf="center">
                {data.data[item].name}
              </Heading>
            </CardBody>
          </Card>
        ))}
    </SimpleGrid>
  );
}
