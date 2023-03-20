import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Wrap spacing="50px" justify="center">
        <WrapItem>
          <Card as={Link} to="/live" state={{live: "Live TV"}}>
            <CardBody display="flex" alignItems="center">
              <Text fontSize="4xl" align="center">Live TV</Text>
              <ArrowForwardIcon fontSize="4xl"/>
            </CardBody>
          </Card>
        </WrapItem>
        <WrapItem>
          <Card as={Link} to="/vod" state={{vod: "VOD"}}>
            <CardBody display="flex" alignItems="center">
              <Text fontSize="4xl">VOD</Text>
              <ArrowForwardIcon fontSize="4xl"/>
            </CardBody>
          </Card>
        </WrapItem>
      </Wrap>
    </Box>
  );
}
