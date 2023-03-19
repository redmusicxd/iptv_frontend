import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Box
      w="100%"
      h="calc(100% - var(--toolbar-size))"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/* <Text color="rgba(255, 255, 255, 0.7)">
        Select a category from the menu
      </Text> */}
      <Wrap spacing="50px" justify="center">
        <WrapItem>
          <Card as={Link} to="/live">
            <CardBody display="flex" alignItems="center">
              <Text fontSize="4xl" align="center">Live TV</Text>
              <ArrowForwardIcon fontSize="4xl"/>
            </CardBody>
          </Card>
        </WrapItem>
        <WrapItem>
          <Card as={Link} to="/vod">
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
