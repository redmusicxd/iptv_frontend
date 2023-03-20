import { ArrowBackIcon, ChevronRightIcon, HamburgerIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  useColorModeValue,
  useColorMode,
  Spacer,
  LightMode,
  DarkMode,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Toolbar() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const btnRef = React.useRef(null);
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      display="flex"
      pos="sticky"
      top="0"
      flexShrink="0"
      zIndex={999}
      h="var(--toolbar-size)"
      bgColor={colorMode == "dark" ? "gray.900" : "gray.50"}
      borderRadius="2px"
      alignContent="center"
      alignItems="center"
      shadow="sm"
      // mt="4px"
    >
      <IconButton
        ref={btnRef}
        aria-label="Menu"
        icon={<HamburgerIcon />}
        onClick={onDrawerOpen}
        alignSelf="center"
        ml="5"
      ></IconButton>
        <Breadcrumb
        pl="5"
        overflow={['auto']}
          // pt="2"
          // pb="5"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          {/* <Button mr="4" as={Link} to=".." relative="path">
            <ArrowBackIcon color="white.500" />
          </Button> */}
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {location.pathname
            .split("/")
            .filter((i) => i)
            .map((item, i, array) => (
              <BreadcrumbItem key={i} isCurrentPage={i == array.length - 1}>
                <BreadcrumbLink
                  as={Link}
                  to={`${location.pathname.substring(
                    0,
                    location.pathname.indexOf(item)
                  )}${item}`}
                  state={{ ...location.state }}
                >
                  <Text noOfLines={1}>
                    {location.state?.[item] ||
                      item
                        .split("-")
                        .map((a: string) => a[0].toUpperCase() + a.substring(1))
                        .join(" ")}
                  </Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
      </Breadcrumb>
      <Spacer />
      <Button
        // variant="ghost"
        // shadow="sm"
        onClick={toggleColorMode}
        style={{ WebkitTapHighlightColor: "transparent" }}
        mx="5"
        // bg={colorMode === "dark" ? "blackAlpha.400" : "whiteAlpha.400"}
      >
        <Icon w="4" h="4" as={colorMode === "light" ? SunIcon : MoonIcon} />
      </Button>
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
            <Card as={Link} to="/live" state={{...location.state, live: "Live TV"}}>
              <CardBody>
                <Text>Live TV</Text>
              </CardBody>
            </Card>
            <Card as={Link} to="/vod" state={{...location.state, vod: "VOD"}}>
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
