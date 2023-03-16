import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Key } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import getChannels from "../../apis/GetChannels";

export default function ProviderChannels() {
    let { provider } = useParams();
  const { data, status, isError, isFetching, error, isSuccess } = useQuery("getChannels", async () => getChannels(provider || null), {});

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
      <Heading color="rgba(255,255,255, 0.7)">No channels available!</Heading>
    </Box>
    )
  }
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      m="20px"
      pb="50px"
    >
      {(isSuccess && !isFetching) &&
        data?.data.map((item: any, i: Key | null | undefined) => (
          <Card key={i} as={Link} to={`/live/${provider}/${item}`}>
            <CardBody>
              <Text>
                {item
                  .split("-")
                  .map((a: string) => a[0].toUpperCase() + a.substring(1))
                  .join(" ")}
              </Text>
            </CardBody>
          </Card>
        ))}
    </SimpleGrid>
  );
}
