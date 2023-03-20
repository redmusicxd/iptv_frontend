import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { Key } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import getProviders from "../../apis/GetProviders";

export default function ProvidersList() {
  const location = useLocation()
  const { data, status, isFetched, isFetchedAfterMount, isLoading } = useQuery(
    "getLiveProviders",
    getProviders,
    {
      retry: 2,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (status === "error") {
    return (
      <>
        <Box
          w="100%"
          h="calc(100% - var(--toolbar-size))"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading>Error</Heading>
        </Box>
      </>
    );
  }

  if ((isFetched && !isFetchedAfterMount) || isLoading)
    return (
      <>
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

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        m="20px"
        pb="50px"
      >
        {status == "success" &&
          data.data.live.map((item: any, i: Key | null | undefined) => (
            <Card
              key={i}
              as={Link}
              to={`/live/${item.id}`}
              state={{...location.state,
                [item.id]: item.id
                  .split("-")
                  .map((a: string) => a[0].toUpperCase() + a.substring(1))
                  .join(" "),
              }}
            >
              <CardBody
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
              >
                <Image
                  src={
                    item.logo ||
                    "https://www.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg"
                  }
                  width="100%"
                  maxH="90px"
                  objectFit="contain"
                  alt={item.id}
                  borderRadius="lg"
                />
                <Heading size="md" pt="2" alignSelf="center">
                  {item.id
                    .split("-")
                    .map((a: string) => a[0].toUpperCase() + a.substring(1))
                    .join(" ")}
                </Heading>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
}
