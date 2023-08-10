import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Image,
  Flex,
  Text,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useConnection } from "@/packages/providers";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import AlertIcon from "@/icons/AlertIcon";

const inter = Inter({ subsets: ["latin"] });

export default function Purchase() {
  const router = useRouter();
  const { address, callcontract } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        if (data / 1000000 < 1) {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/collections?address=" + address);
  };

  const gotohome = () => {
    router.push("/");
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
                alt="AstroNinja"
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
              <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
                <ModalOverlay />
                <ModalContent style={{ display: "flex", alignItems: "center" }}>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    height="100%"
                  >
                    <ModalHeader>
                      <Text
                        onClick={gotohome}
                        fontSize={"1.35rem"}
                        fontWeight={700}
                      >
                        ✨AstroNinja
                      </Text>
                      <Flex justifyContent="flex-end">
                        <ModalCloseButton
                          margin="15px"
                          borderRadius="50%"
                          border="2px solid #DBDBDB"
                        />
                      </Flex>
                    </ModalHeader>
                    <ModalBody textAlign="center">
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        mt="18vh"
                        maxWidth="300px"
                        wordBreak="break-word"
                      >
                        Congratulations!
                      </Text>
                      <Text
                        fontSize="md"
                        mt={4}
                        maxWidth="300px"
                        wordBreak="break-word"
                      >
                        You have successfully purchased your collectible
                      </Text>
                      <Flex alignItems="center" justifyContent="center" mt={4}>
                        <Image
                          src="/astroninja.png"
                          alt="Astro Ninja"
                          width={300}
                          height={300}
                        />
                      </Flex>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        onClick={closeModal}
                        width="100%"
                        background="transparent"
                        textDecoration="underline"
                        color="#0B8378"
                        _hover={{ background: "transparent" }}
                      >
                        View in your Collection
                      </Button>
                    </ModalFooter>
                  </Flex>
                </ModalContent>
              </Modal>
              <Button
                className="btn"
                width="100%"
                borderRadius="full"
                onClick={openModal}
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
                <Flex alignItems="center" mt="15px">
                  <AlertIcon />
                  <Text color="red" mb="15px">
                    Insufficient balance.
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
