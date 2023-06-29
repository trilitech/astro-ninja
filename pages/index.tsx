import { Inter } from "next/font/google";
import { Box, Button, Image, Flex } from "@chakra-ui/react";
import { useConnection } from "@/packages/providers";
import { useRouter } from "next/router";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, connect } = useConnection();
  const router = useRouter();
  const claim = () => {
    if (!address) {
      connect();
    } else {
      router.push("/purchase");
    }
  };

  return (
    <>
      <main style={{ display: "flex", alignItems: "center", height: "100vh" }}>
        <Flex
          width="100%"
          height="400px"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            flex={1}
            padding="10px"
            direction="column"
            justifyContent="center"
          >
            <Box
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <p>
                Astronaut Ninja NFT Collection, Click here to claim your
                collectible
              </p>
              <Box mt={4}>
                <Button colorScheme="blue" onClick={claim}>
                  Claim
                </Button>
              </Box>
            </Box>
          </Flex>
          <Box flex={1} padding="10px">
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src="/astroninja.png" width={360} height={360} />
            </Box>
          </Box>
        </Flex>
      </main>
      <Footer />
    </>
  );
}
