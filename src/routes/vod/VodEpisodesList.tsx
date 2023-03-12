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
import { Key } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import getEpisodesList from "../../apis/GetEpisodesList";

export default function VodEpisodesList() {
  let { provider, show } = useParams();
  const { data, status, isError, isFetching, error, isSuccess } = useQuery(
    "getShows",
    async () => getEpisodesList(provider || null, show || null),
    {}
  );

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
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      </Box>
    );
  }

  if (isFetching)
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
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      m="20px"
      pb="50px"
    >
      {isSuccess &&
        !isFetching &&
        data?.data.data.map((item: any, i: Key | null | undefined) => (
          <Card maxW="sm" as={Link} to={`/vod/${provider}/${show}/${item.id}`}>
            <CardBody>
              <Image
                src={item.img}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{item.name }</Heading>
                <Text>
                  {new Date((item.date as Date)).toLocaleString()}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
    </SimpleGrid>
  );
}
