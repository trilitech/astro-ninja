import React, { useEffect, useState } from "react";
import { Box, Button, Image, Flex, Text, Link } from "@chakra-ui/react";
import { useConnection } from "@/packages/providers";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import AlertIcon from "@/icons/AlertIcon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, callcontract } = useConnection();
  const [balance, setBalance] = useState(null);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lacus eget est consectetur ornare. Praesent imperdiet porta ligula a dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lacus eget est consectetur ornare. Praesent imperdiet porta ligula a dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lacus eget est consectetur ornare. Praesent imperdiet porta ligula a dapibus.";

  const getLinesToShow = () => {
    const lineHeight = 24;
    const containerHeight = expanded ? "auto" : 3 * lineHeight;
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

  const linesToShow = expanded ? text : text.split("\n").slice(0, 3).join("\n");

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
            {getLinesToShow()}
            {text.split("\n").length < 3 && !expanded && (
              <Link color="#0B8378" onClick={handleToggle}>
                <u>Show More</u>
              </Link>
            )}
            {text.split("\n").length < 3 && expanded && (
              <Link color="#0B8378" onClick={handleToggle}>
                <u>Show Less</u>
              </Link>
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
                <Flex alignItems="center" mt="1.5vw">
                  <AlertIcon />
                  <Text color="red">
                    Insufficient balance in your Tezos wallet, top up your
                    account.
                    <Link href="/learn-more">
                      <u>Learn how</u>
                    </Link>
                  </Text>
                </Flex>
              )}
            </Box>
          </Flex>
        </Flex>
        <Footer />
      </main>
    </>
  );
}
