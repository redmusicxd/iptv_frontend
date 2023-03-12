import { Box, Text } from "@chakra-ui/react";

export default function Index() {
  return (
    <Box
      w="100%"
      h="calc(100% - var(--toolbar-size))"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="rgba(255, 255, 255, 0.7)">
        Select a category from the menu
      </Text>
    </Box>
  );
}
