import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  ChakraProvider,
  Flex,
  Text,
  HStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ConnectionProvider, useConnection } from "@/packages/providers";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/router";

export const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <title>Astro Ninja NFT</title>
        <meta
          name="description"
          content="Sample dApp to deploy and mint Boring NFTs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <ConnectionProvider>
          <NavBar />
          <Component />
        </ConnectionProvider>
      </ChakraProvider>
    </>
  );
};

const NavBar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { address, connect } = useConnection();
  const router = useRouter();

  const gotohome = () => {
    router.push("/");
  };

  return (
    <Box as="section">
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Box px="48px" py={{ base: "4", lg: "5" }}>
          <HStack spacing="10" justify="space-between">
            <Text fontWeight="bold" fontSize="1.2rem" onClick={gotohome}>
              ✨AstroNinja
            </Text>
            {address ? (
              <Avatar address={address} />
            ) : (
              <Flex justify="right" flex="1">
                <HStack spacing="10">
                  <Button
                    className="btn"
                    variant="primary"
                    onClick={connect}
                    borderRadius="full"
                    fontWeight="700"
                  >
                    Connect
                  </Button>
                </HStack>
              </Flex>
            )}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
