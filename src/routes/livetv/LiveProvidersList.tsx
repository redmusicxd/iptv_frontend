import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Key } from "react";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
// import IApiResponse from "../../ApiResponse";
import getProviders from "../../apis/GetProviders";

export default function ProvidersList() {
  const { data, status } = useQuery("getLiveProviders", getProviders);
  if (status === "error") {
    return (
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
    )
  }
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      m="20px"
      pb="50px"
    >
      {status == "success" &&
        data.data.live.map((item: any, i: Key | null | undefined) => (
          <Card key={i} as={Link} to={`/live/${item}`}>
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
