import React, { useState } from "react";
import {
  Box,
  Text,
  BoxProps,
  HStack,
  IconButton,
  Image,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ConnectionProvider, useConnection } from "@/packages/providers";
import { useRouter } from "next/router";
import ChevronIcon from "@/icons/ChevronIcon";
import CopyFileIcon from "@/icons/CopyFileIcon";
import WindowIcon from "@/icons/WindowIcon";

const sizes = {
  "50px": {
    innerSizeSocial: "35px",
    innerSizeProfile: "36px",
  },
  "68px": {
    innerSizeSocial: "50px",
    innerSizeProfile: "50px",
  },
  "80px": {
    innerSizeSocial: "55px",
    innerSizeProfile: "60px",
  },
};

const stringToColour = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).substring(-2).padEnd(2, "0");
  }
  return colour;
};

const invertColor = (hex: string) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + r.padEnd(2, "0") + g.padEnd(2, "0") + b.padEnd(2, "0");
};

export const Avatar = ({ address }: { address: string }) => {
  const color1 = stringToColour(address ?? "");
  const { disconnect } = useConnection();
  const router = useRouter();

  const viewcollection = () => {
    router.push("/collections?address=" + address);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const account = router.query.address as string;
  const [copied, setCopied] = useState(false);

  const CopyToClipboard = () => {
    const addressToCopy = account;
    navigator.clipboard
      .writeText(addressToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  return (
    <Stack direction="row" alignItems="center">
      <Box
        ml="-15px"
        fontWeight="bold"
        fontSize="20px"
        onClick={viewcollection}
      >
        My profile
      </Box>
      <Menu>
        <MenuButton>
          <HStack spacing="-1" mr="6px">
            <OuterCircle w="50px" h="50px" bg="background">
              <InnerCircle
                w="30px"
                h="30px"
                style={{
                  background: "linear-gradient(to right, red, yellow)",
                }}
              ></InnerCircle>
            </OuterCircle>
          </HStack>
        </MenuButton>
        <MenuList
          style={{
            width: "30vw",
            margin: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <OuterCircle w="50px" h="50px" margin="15px" bg="background">
            <InnerCircle
              w="30px"
              h="30px"
              style={{
                background: "linear-gradient(to right, red, yellow)",
              }}
            ></InnerCircle>
          </OuterCircle>

          <Box style={{ position: "relative" }}>
            <Text
              mt="2"
              border="1px solid #C5C5C5"
              borderRadius="70px"
              padding="5px"
              textAlign="center"
              width="177px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={toggleDropdown}
              cursor="pointer"
              mb="4"
            >
              <span>{address.substring(0, 3) + ".." + address.slice(-5)}</span>
              <Box marginLeft="5px">
                <ChevronIcon />
              </Box>
            </Text>

            {isOpen && (
              <Box
                width="100%"
                position="absolute"
                top="100%"
                left="0"
                marginTop="5px"
                borderRadius="md"
                padding="2"
                backgroundColor="#FFFFFF"
                boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                zIndex="999"
              >
                <Button width="100%" background="transparent">
                  <span
                    style={{ display: "inline-flex", alignItems: "flex-start" }}
                    onClick={CopyToClipboard}
                  >
                    <CopyFileIcon />
                    {copied ? "Copied!" : "Copy wallet address"}
                  </span>
                </Button>
                <Button
                  width="100%"
                  paddingRight="50px"
                  background="transparent"
                  onClick={() =>
                    window.open(`https://tzkt.io/${account}`, "_blank")
                  }
                >
                  <span
                    style={{ display: "inline-flex", alignItems: "flex-start" }}
                  >
                    <WindowIcon /> Open in tzkt.io
                  </span>
                </Button>
              </Box>
            )}
          </Box>

          <Flex flexWrap="wrap"></Flex>
          <Box
            marginTop="15px"
            width="80%"
            borderBottom="1px solid #DBDBDB"
            margin="auto"
            marginBottom="25px"
            position="relative"
          ></Box>
          <MenuItem
            onClick={disconnect}
            mt="2"
            fontWeight="700"
            border="1px solid #95949A"
            borderRadius="70px"
            padding="5px"
            textAlign="center"
            width="80%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="10px"
            cursor="pointer"
            mb="4"
          >
            Disconnect wallet
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};
const OuterCircle = ({
  displayHover,
  hideBorder,
  ...props
}: BoxProps & { hideBorder?: boolean; displayHover?: boolean }) => {
  const withBorderProps = hideBorder
    ? { backgroundColor: "transparent" }
    : {
        borderColor: "neutral.4",
        borderWidth: "1px",
        p: "6px",
        borderRadius: "full",
      };

  return (
    <Box
      overflow="hidden"
      _hover={{
        borderColor: "interaction",
      }}
      pointerEvents={displayHover ? "none" : "auto"}
      {...props}
      {...withBorderProps}
    />
  );
};
const InnerCircle = (props: BoxProps) => {
  return (
    <Box
      borderRadius="full"
      {...props}
      w="100%"
      h="100%"
      display={"flex"}
      alignItems="center"
      justifyContent="center"
    />
  );
};

export default Avatar;
