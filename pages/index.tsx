import { Inter } from "next/font/google";
import { Box, Button, Image, Flex } from "@chakra-ui/react";
import { useConnection } from "@/packages/providers";
import { useRouter } from "next/router";

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
      <main>
        <Flex width="100%" height="400px">
          <Flex
            flex={1}
            padding="10px"
            direction="column"
            justifyContent="center"
          >
            <p>
              Astronaut Ninja NFT Collection, Click here to claim your
              collectible
            </p>
            <Box>
              <Button colorScheme="blue" onClick={claim}>
                Claim
              </Button>
            </Box>
          </Flex>
          <Box flex={1} padding="10px">
            <Image src="/astroninja.png" width={360} height={360} />
          </Box>
        </Flex>
      </main>
    </>
  );
}
