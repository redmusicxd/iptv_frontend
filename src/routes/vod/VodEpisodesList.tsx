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
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Key } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import getEpisodesList from "../../apis/GetEpisodesList";

export default function VodEpisodesList() {
  let location = useLocation();
  let { provider, show } = useParams();
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
    isFetchedAfterMount,
    isFetched,
    isLoading,
  } = useInfiniteQuery({
    queryKey: "getEpisodesList",
    queryFn: async ({ pageParam }) =>
      getEpisodesList(provider || null, show || null, pageParam),

    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.pagination.current_page !=
        lastPage.data.pagination.total_pages
        ? lastPage.data.pagination.current_page + 1
        : null;
    },
    refetchOnWindowFocus: false,
  });

  if (isError && !isFetching) {
    return (
      <>
        <Breadcrumb
          pl="5"
          pt="2"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <Button mr="4" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/vod">
              VOD
            </BreadcrumbLink>
          </BreadcrumbItem>{" "}
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/vod/${provider}`}>
              {provider
                ?.split("-")
                .map((a: string) => a[0].toUpperCase() + a.substring(1))
                .join(" ")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}`}
              state={{ show: location.state?.show }}
            >
              {location.state?.show || show}
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

  if ((isFetched && !isFetchedAfterMount) || isLoading)
    return (
      <>
        <Breadcrumb
          pl="5"
          pt="2"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <Button mr="4" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/vod">
              VOD
            </BreadcrumbLink>
          </BreadcrumbItem>{" "}
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/vod/${provider}`}>
              {provider
                ?.split("-")
                .map((a: string) => a[0].toUpperCase() + a.substring(1))
                .join(" ")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}`}
              state={{ show: location.state?.show }}
            >
              {location.state?.show || show}
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

  if (data && data?.pages[0].data?.length == 0) {
    return (
      <>
        <Breadcrumb
          pl="5"
          pt="2"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <Button mr="4" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/vod">
              VOD
            </BreadcrumbLink>
          </BreadcrumbItem>{" "}
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/vod/${provider}`}>
              {provider
                ?.split("-")
                .map((a: string) => a[0].toUpperCase() + a.substring(1))
                .join(" ")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={Link}
              to={`/vod/${provider}/${show}`}
              state={{ show: location.state?.show }}
            >
              {location.state?.show || show}
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
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <Button mr="4" as={Link} to=".." relative="path">
          <ArrowBackIcon color="white.500" />
        </Button>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/vod">
            VOD
          </BreadcrumbLink>
        </BreadcrumbItem>{" "}
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={`/vod/${provider}`}>
            {provider
              ?.split("-")
              .map((a: string) => a[0].toUpperCase() + a.substring(1))
              .join(" ")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            as={Link}
            to={`/vod/${provider}/${show}`}
            state={{ show: location.state?.show }}
          >
            {location.state?.show || show}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        m="20px"
        pb="50px"
      >
        {isSuccess &&
          data.pages.map((page, i) =>
            page?.data.data.map((item: any, i: Key | null | undefined) => (
              <Card
                maxW="sm"
                as={Link}
                to={`/vod/${provider}/${show}/${item.id}`}
                state={{ show: location.state?.show, epname: item.name }}
              >
                <CardBody>
                  <Image
                    src={
                      item.img ||
                      "https://www.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg"
                    }
                    width="100%"
                    height={item.img ? "auto" : "90px"}
                    objectFit="cover"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.name}</Heading>
                    <Text>{new Date(item.date as Date).toLocaleString()}</Text>
                  </Stack>
                </CardBody>
              </Card>
            ))
          )}
      </SimpleGrid>
      <Flex pb="5rem" pt="2rem" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isDisabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </>
  );
}
