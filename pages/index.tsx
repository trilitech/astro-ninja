import { Inter } from "next/font/google";
import {
  Box,
  Button,
  Image,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useConnection } from "@/packages/providers";
import { useRouter } from "next/router";
import Footer from "../components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, connect } = useConnection();
  const router = useRouter();
  const displayBelow768 = useBreakpointValue({ base: true, md: false });

  const claim = () => {
    if (!address) {
      connect();
    } else {
      router.push("/purchase");
    }
  };

  return (
    <>
      <main>
        <Flex direction={displayBelow768 ? "column" : "row"} className="hero">
          <Flex
            flex={1}
            padding="10px"
            direction="column"
            justifyContent="center"
          >
            <Flex alignItems="center">
              <Box
                boxSize="40px"
                borderRadius="full"
                border="1px"
                overflow="hidden"
                mr={2}
              >
                <Image src="/contractimg.png" alt="Contract Profile Image" />
              </Box>
              <Text fontWeight="bold">AstroNinja</Text>
            </Flex>
            <Text fontSize="4xl" fontWeight="bold" mb="2vh">
              AstroNinja NFT
            </Text>
            <Text fontSize="3xl" mb="2vh">
              1.00 ꜩ
            </Text>
            <Text maxWidth="380px" fontSize="medium" mb="4vh">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              sed lacus eget est consectetur ornare. Praesent imperdiet porta
              ligula a dapibus...
            </Text>
            <Box>
              <Button
                className="btn"
                width="50%"
                variant="primary"
                borderRadius="full"
                onClick={claim}
                fontWeight="700"
              >
                Buy now
              </Button>
            </Box>
          </Flex>
          {!displayBelow768 && (
            <Image src="/astroninja.png" alt="Astro Ninja" width="45%" />
          )}
          {displayBelow768 && (
            <Image
              src="/astroninja.png"
              alt="Astro Ninja"
              height="auto"
              maxH="75vh"
              alignSelf="center"
              mt="15px"
            />
          )}
        </Flex>
        <Footer />
      </main>
    </>
  );
}
