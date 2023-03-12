import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <Box
      w="100%"
      h="calc(100% - var(--toolbar-size))"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Nothing to see here!</Heading>
      <Text>
        <Link to="/">Go to the home page</Link>
      </Text>
    </Box>
  );
}
