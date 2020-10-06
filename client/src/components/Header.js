import React from "react";
import {
  Box,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Icon,
  Image,
  // useColorMode,
  // useTheme,
  Divider,
} from "@chakra-ui/core";
import "../App.css";
import {
  BsList,
  BsBookmark,
  BsPeople,
  BsLock,
  BsPerson,
  BsGear,
  BsPersonPlus,
} from "react-icons/bs";
import { AiOutlineNotification, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlinePhone } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";

function Header() {
  // const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="header">
      <Box
        h={["50px", "50px", "50px", "80px"]}
        w="100%"
        backgroundColor="#112147"
      >
        <Box d="flex" justifyContent="space-between" pl="20px" pr="10px">
          <Box mt={["10px", "10px", "10px", "20px"]} d="flex">
            <Image
              w="30px"
              h="30px"
              border="1px solid white"
              borderRadius="50%"
              src={`http://localhost:1234/${Cookie.get("userImage")}`}
              onClick={onOpen}
            />
            <Text color="white" ml={["20px", "20px", "35px", "50px"]}>
              {Cookie.get("userName")}
            </Text>
          </Box>
          <Button
            backgroundColor="#112147"
            mt={["5px", "5px", "5px", "25px"]}
            onClick={() => history.push("/search")}
          >
            <Icon
              name="search"
              color="white"
              size={["25px", "25px", "30px", "40px"]}
            />
          </Button>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size={["xs", "sm", "lg", "xl"]}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color="white" />
            <DrawerHeader backgroundColor="#112147">
              <Image
                border="1px solid white"
                borderRadius="50%"
                w="50px"
                h="50px"
                src={`http://localhost:1234/${Cookie.get("userImage")}`}
                mb={2}
              />
              <Text color="white">{Cookie.get("userName")}</Text>
              {/* <IconButton
                icon={colorMode === "light" ? "moon" : "sun"}
                onClick={toggleColorMode}
              ></IconButton> */}
            </DrawerHeader>
            <DrawerBody>
              <Box d="flex" flexDirection="column">
                <Button
                  variant="unstyled"
                  d="flex"
                  justifyContent="flex-start"
                  onClick={() => history.push("/newgroup")}
                >
                  <BsPeople />
                  New Group
                </Button>
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <BsLock />
                  New Secret Chat
                </Button>
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <AiOutlineNotification />
                  New Channel
                </Button>
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <BsPerson />
                  Contacts
                </Button>
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <HiOutlinePhone />
                  Calls
                </Button>
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <BsBookmark />
                  Saved Messages
                </Button>
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <BsGear />
                  Settings
                </Button>
                <Divider />
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <BsPersonPlus />
                  Invite Friends
                </Button>
                <Button variant="unstyled" d="flex" justifyContent="flex-start">
                  <AiOutlineQuestionCircle />
                  Faq
                </Button>
              </Box>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </div>
  );
}

export default Header;
