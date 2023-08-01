import { Inter } from "next/font/google";
import {
  Box,
  Center,
  Flex,
  Image,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  BoxProps,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { defaults } from "@tzkt/sdk-api";

defaults.baseUrl = `https://api.${process.env.NEXT_PUBLIC_NETWORK}.tzkt.io/`;

import { tokensGetTokenBalances } from "@tzkt/sdk-api";
import { useRouter } from "next/router";
import { TezosToolkit } from "@taquito/taquito";
import { TzktExtension } from "@tzkt/ext-taquito";
import { useEffect, useState } from "react";
import ChevronIcon from "@/icons/ChevronIcon";
import OpenLinkIcon from "@/icons/OpenLinkIcon";
import CopyFileIcon from "@/icons/CopyFileIcon";
import WindowIcon from "@/icons/WindowIcon";

const Tezos = new TezosToolkit(process.env.NEXT_PUBLIC_TEZOS_NODE_URL ?? "");
Tezos.addExtension(new TzktExtension() as any);
const inter = Inter({ subsets: ["latin"] });

type Token = {
  name?: string;
  description: string;
  imageUrl: string;
  contractAddress: string;
  mintDate: string;
};

export default function Home() {
  const router = useRouter();
  const account = router.query.address as string;
  const [data, setData] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 48;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savedContractAddress, setSavedContractAddress] = useState("");
  const [savedDescription, setSavedDescription] = useState("");
  const [savedMintDate, setSavedMintDate] = useState("");

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!account) {
      return;
    }

    setIsLoading(true);
    tokensGetTokenBalances({
      account: {
        eq: account,
      },
      balance: {
        gt: 0,
      },
      limit,
    })
      .then((output) => {
        const formattedData: Token[] = output
          .map((current) => {
            const thumbnailUri = current.token?.metadata
              ?.thumbnailUri as string;
            if (!thumbnailUri) return null;
            const cid = thumbnailUri.split("//");
            return {
              name: current.token?.metadata?.name,
              description: current.token?.metadata?.description,
              imageUrl: `https://ipfs.io/ipfs/${cid[1]}`,
              contractAddress: current.token?.contract?.address,
              mintDate: current.firstTime,
            };
          })
          .filter((e) => !!e) as Token[];

        setData(formattedData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [account]);

  const formattedAddress =
    account &&
    `${account.substring(0, 5)}...${account.substring(account.length - 5)}`;

  const numCollectibles = data.length;

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

  return (
    <>
      <main>
        <Flex flexDirection="column" alignItems="center" margin="50px">
          <OuterCircle w="100px" h="100px" bg="background">
            <InnerCircle
              w="500px"
              h="500px"
              style={{
                background: "linear-gradient(to right, red, yellow)",
              }}
            ></InnerCircle>
          </OuterCircle>
          <Box style={{ position: "relative" }}>
            <Text
              mt="4"
              border="1px solid #C5C5C5"
              borderRadius="70px"
              padding="5px"
              textAlign="center"
              width="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={toggleDropdown}
              cursor="pointer"
            >
              <span>{formattedAddress}</span>
              <ChevronIcon />
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
                  background="transparent"
                  paddingRight="50px"
                  onClick={() =>
                    window.open(
                      `https://${process.env.NEXT_PUBLIC_NETWORK}.tzkt.io/${account}`,
                      "_blank"
                    )
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
        </Flex>

        <Text width="70%" margin="25px auto" marginTop="25px" fontSize="2xl">
          <b>Collection</b>
        </Text>
        <Flex flexWrap="wrap"></Flex>
        <Box
          width="70%"
          borderBottom="1px solid #DBDBDB"
          margin="auto"
          marginBottom="25px"
          position="relative"
        >
          <Box
            position="absolute"
            bottom="-1px"
            left="0"
            width="120px"
            height="2px"
            background="#45E8DC"
          />
        </Box>
        <>
          <Text
            width="70%"
            margin="25px auto"
            marginTop="25px"
            fontWeight="400"
            color="#95949A"
          >
            Total of {numCollectibles} collectible{numCollectibles !== 1 && "s"}
          </Text>
          {numCollectibles === 0 ? (
            <>
              <Text
                width="70%"
                margin="0 auto"
                marginTop="10px"
                fontSize="5xl"
                fontWeight="600"
              >
                No items to show
              </Text>
              <Text
                width="70%"
                margin="0 auto"
                marginTop="10px"
                fontWeight="400"
                color="#95949A"
              >
                Your digital collectibles will appear here...
              </Text>
            </>
          ) : null}
        </>

        <Flex
          flexWrap="wrap"
          width="70%"
          margin="25px auto"
          marginTop="25px"
          sx={{
            "@media screen and (max-width: 768px)": {
              width: "80%",
            },
          }}
        >
          {data?.map((t, outerIndex) => (
            <Box
              key={outerIndex}
              width={{ base: "100%", md: "28%" }}
              height="auto"
              bg="white"
              borderRadius="md"
              mb="2"
              marginRight={{ base: "0", md: "5%" }}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
              onClick={() => {
                setIsModalOpen(true);
                localStorage.setItem("imageUrl", t.imageUrl);
                localStorage.setItem("contractAddress", t.contractAddress);
                localStorage.setItem("description", t.description);
                localStorage.setItem("mintDate", t.mintDate);
                if (t.name) {
                  localStorage.setItem("name", t.name);
                  setSavedName(t.name);
                } else {
                  localStorage.setItem("name", "");
                  setSavedName("");
                }
                setSavedImageUrl(t.imageUrl);
                setSavedContractAddress(t.contractAddress);
                setSavedDescription(t.description);
                setSavedMintDate(t.mintDate);
              }}
            >
              <Image
                src={t.imageUrl}
                alt=""
                w="100%"
                h="100%"
                borderTopLeftRadius="md"
                borderTopRightRadius="md"
                objectFit="contain"
              />
              <Text margin="15px" fontWeight="bold">
                {t.name}
              </Text>
            </Box>
          ))}
          {data.length === 0 && null}
        </Flex>
      </main>
      {data?.map((t, innerIndex) => (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="50%"
          key={innerIndex}
        >
          <ModalOverlay />
          <ModalContent maxW="60%">
            <ModalCloseButton />
            <ModalBody padding="0">
              <Flex
                flexDirection={["column", "column", "row"]}
                alignItems="center"
              >
                <Box flex={["0 0 100%", "0 0 100%", "0 0 50%"]}>
                  <Image
                    src={savedImageUrl}
                    alt=""
                    borderTopLeftRadius="md"
                    boxSize="100%"
                    maxHeight="50vh"
                    objectFit="contain"
                  />
                </Box>
                <Box margin="15px">
                  <Text
                    mt="4"
                    mb="4"
                    border="1px solid #C5C5C5"
                    borderRadius="70px"
                    textAlign="center"
                    display="flex"
                    width="210px"
                    alignItems="center"
                    justifyContent="center"
                    onClick={toggleDropdown}
                    cursor="pointer"
                  >
                    <Box display="flex" alignItems="center">
                      <OuterCircle border="0" w="40px" h="40px">
                        <InnerCircle
                          style={{
                            background:
                              "linear-gradient(to right, red, yellow)",
                          }}
                        ></InnerCircle>
                      </OuterCircle>
                      <Box
                        ml="2"
                        fontSize="small"
                      >{`Collected by ${formattedAddress}`}</Box>
                    </Box>
                  </Text>
                  <Text fontWeight="bold" fontSize="2xl">
                    {savedName}
                  </Text>
                  <Text>{savedDescription}</Text>
                </Box>
              </Flex>

              {isDetailsOpen && (
                <Box mt={4} display="flex" justifyContent="center">
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap={4}
                    textAlign="center"
                    fontSize="1.2vh"
                  >
                    <GridItem>
                      <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        height="100%"
                      >
                        <Flex justifyContent="flex-start" alignItems="center">
                          <Text>BLOCKCHAIN</Text>
                          <OpenLinkIcon />
                        </Flex>
                        <Text>Tezos</Text>
                      </Flex>
                    </GridItem>
                    <GridItem>
                      <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        height="100%"
                      >
                        <Flex justifyContent="flex-start" alignItems="center">
                          <Text>CONTRACT</Text>
                          <OpenLinkIcon />
                        </Flex>
                        <Text color="#0B8378" textDecoration="underline">
                          <a
                            href={`https://${process.env.NEXT_PUBLIC_NETWORK}.tzkt.io/${savedContractAddress}`}
                          >
                            {savedContractAddress}
                          </a>
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem>
                      <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        height="100%"
                      >
                        <Flex justifyContent="flex-start" alignItems="center">
                          <Text>IPFS</Text>
                          <OpenLinkIcon />
                        </Flex>
                        <Text color="#0B8378" textDecoration="underline">
                          <a href={`${savedImageUrl}`}>
                            {savedImageUrl.length > 39
                              ? `${savedImageUrl.slice(0, 39)}...`
                              : savedImageUrl}
                          </a>
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem>
                      <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        height="100%"
                      >
                        <Flex justifyContent="flex-start" alignItems="center">
                          <Text>NETWORK</Text>
                          <OpenLinkIcon />
                        </Flex>
                        <Text>{process.env.NEXT_PUBLIC_NETWORK}</Text>
                      </Flex>
                    </GridItem>
                    <GridItem>
                      <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        height="100%"
                      >
                        <Flex justifyContent="flex-start" alignItems="center">
                          <Text>MINTED</Text>
                          <OpenLinkIcon />
                        </Flex>
                        <Text>
                          
                        {savedMintDate.length > 10
                              ? `${savedMintDate.slice(0, 10)}`
                              : savedMintDate}</Text>
                      </Flex>
                    </GridItem>
                    <GridItem>
                      <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        height="100%"
                      >
                        <Flex justifyContent="flex-start" alignItems="center">
                          <Text>METADATA</Text>
                          <OpenLinkIcon />
                        </Flex>
                        <Text color="#0B8378" textDecoration="underline">
                          <a
                            href={`
                            https://${process.env.NEXT_PUBLIC_NETWORK}.tzkt.io/${savedContractAddress}/tokens/0/metadata`}
                          >
                            {savedContractAddress}
                          </a>
                        </Text>
                      </Flex>
                    </GridItem>
                  </Grid>
                </Box>
              )}

              <Flex justifyContent="center" mb={4} mt={4}>
                <Button
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  bg="transparent"
                  color="#0B8378"
                  _hover={{ bg: "transparent" }}
                >
                  {isDetailsOpen ? "Close" : "Collectible Details"}
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      ))}
    </>
  );
}
