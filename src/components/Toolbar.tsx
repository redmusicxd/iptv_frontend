import { HamburgerIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Toolbar() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <Box
      display="flex"
      pos="sticky"
      top="0"
      zIndex={999}
      h="var(--toolbar-size)"
      bgColor="chakra-body-bg"
      borderRadius="2px"
      alignContent="center"
      // mt="4px"
    >
      <IconButton
        ref={btnRef}
        aria-label="Menu"
        icon={<HamburgerIcon />}
        onClick={onDrawerOpen}
        alignSelf="center"
        ml="1.2rem"
      ></IconButton>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Select category</DrawerHeader>

          <DrawerBody display="flex" flexDirection="column" gap={4}>
            <Card bgColor="#262626" as={Link} to="/live">
              <CardBody>
                <Text>Live TV</Text>
              </CardBody>
            </Card>
            <Card bgColor="#262626" as={Link} to="/vod">
              <CardBody>
                <Text>VOD</Text>
              </CardBody>
            </Card>
          </DrawerBody>

          {/* <DrawerFooter>
        <Button variant='outline' mr={3} onClick={onDrawerClose}>
          Cancel
        </Button>
        <Button colorScheme='blue'>Save</Button>
      </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
