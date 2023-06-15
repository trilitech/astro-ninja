import { Inter } from "next/font/google";
import { Box, Button, Image, Flex, Text } from "@chakra-ui/react";
import { useConnection } from "@/packages/providers";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, callcontract } = useConnection();
  const [balance, setBalance] = useState(null);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.tzkt.io/v1/accounts/${address}/balance`
        );
        const data = await response.json();
        setBalance(data / 1000000);

        if (data < 1) {
          setShowInsufficientBalance(true);
        } else {
          setShowInsufficientBalance(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [address]);

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

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lacus eget est consectetur ornare. Praesent imperdiet porta ligula a dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lacus eget est consectetur ornare. Praesent imperdiet porta ligula a dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lacus eget est consectetur ornare. Praesent imperdiet porta ligula a dapibus.";

  const getLinesToShow = () => {
    const lineHeight = 24;
    const containerHeight = 3 * lineHeight;
    const containerStyle = {
      height: containerHeight,
      overflow: "hidden",
    };

    return (
      <Box style={containerStyle}>
        <Text>{text}</Text>
      </Box>
    );
  };

  return (
    <>
      <main>
        <Flex width="100%" flexDirection={["column", "column", "row"]}>
          <Flex
            flex={1}
            padding="10vw"
            background="#F4F8F7"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Image
                src="/astroninja.png"
                alt="Astro Ninja"
                width={360}
                height={360}
                borderRadius={10}
              />
            </Box>
          </Flex>
          <Flex
            flex={1}
            padding="10vw"
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
            {expanded ? <Text>{text}</Text> : getLinesToShow()}
            {text.split("\n").length > 3 && (
              <Button mt="2vh" colorScheme="blue" onClick={handleToggle}>
                {expanded ? "Show Less" : "Show More"}
              </Button>
            )}
            <Box
              mt="2vh"
              border="1px solid #D7D7D7"
              borderRadius="5px"
              padding="15px"
            >
              <Text fontSize="3xl" fontWeight="bold">
                1.00 ꜩ
              </Text>
              <Text mb="1.5vw">Includes relevant fees</Text>
              <Button
                className="btn"
                width="100%"
                borderRadius="full"
                onClick={!showInsufficientBalance ? purchase : undefined}
                fontWeight="700"
                disabled={showInsufficientBalance}
                bg={showInsufficientBalance ? "#C5C5C5" : ""}
                color={showInsufficientBalance ? "white" : ""}
                _hover={{ bg: "#C5C5C5", color: "white" }}
                _focus={{ bg: "#C5C5C5", color: "white" }}
                _active={{ bg: "#C5C5C5", color: "white" }}
                _disabled={{
                  bg: "#C5C5C5",
                  color: "white",
                  cursor: "not-allowed",
                }}
              >
                Pay with Tez
              </Button>

              {showInsufficientBalance && (
                <Text color="red" mt="1.5vw">
                  Insufficient balance in your Tezos wallet, top up your
                  account. <a href="/learn-more">Learn how</a>
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
        <Footer />
      </main>
    </>
  );
}
