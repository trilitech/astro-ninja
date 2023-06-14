import { Inter } from "next/font/google";
import { Box, Button, Image, Flex } from "@chakra-ui/react";
import { useConnection } from "@/packages/providers";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, callcontract } = useConnection();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  const purchase = async () => {
    await callcontract?.({
      amountMutez: 1,
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
      id: "asd",
    }).catch((e) => {
      console.error(e);
    });
    console.log("done");
  };

  return (
    <>
      <main>
        <Flex width="100%" height="400px">
          <Flex>
            <Box flex={1} padding="10px">
              <Image
                src="/astroninja.png"
                alt="Astro Ninja"
                width={360}
                height={360}
              />
            </Box>
          </Flex>
          <Flex
            flex={1}
            padding="10px"
            direction="column"
            justifyContent="center"
          >
            <p>Purchase your collectible</p>
            <Box>
              <Button colorScheme="blue" onClick={purchase}>
                Buy for 1 tez
              </Button>
            </Box>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
