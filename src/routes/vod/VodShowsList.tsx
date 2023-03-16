import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Key } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import getVodShows from "../../apis/GetVodShows";

export default function VodShowsList() {
  let { provider } = useParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isError,
    isSuccess,
    isLoading
  } = useInfiniteQuery({
    queryKey: "getShowsList",
    queryFn: async ({ pageParam }) => getVodShows(provider || null, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.pagination.current_page + 1;
    },
    refetchOnWindowFocus: false,
  });

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

  if (isLoading)
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

  if (data && data?.pages[0]?.data?.length == 0) {
    return (
      <Box
        w="100%"
        h="calc(100% - var(--toolbar-size))"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="rgba(255,255,255, 0.7)">No VODs available!</Heading>
      </Box>
    );
  }
  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        m="20px"
        // pb="50px"
      >
        {isSuccess &&
          data.pages.map((page, i) =>
            page.data.data.map((item: any, i: Key | null | undefined) => (
              <Card
                maxW="sm"
                key={i}
                as={Link}
                to={`/vod/${provider}/${item.id}`}
              >
                <CardBody>
                  <Image src={item.img} alt={item.name} borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.name}</Heading>
                    <Text>
                      {item.date &&
                        new Date(item.date as Date).toLocaleString()}
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            ))
          )}
      </SimpleGrid>
      <Flex pb="5rem" pt="2rem" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
      {/* <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
    </>
  );
}
