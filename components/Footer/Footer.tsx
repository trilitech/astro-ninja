import React from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "./Footer.styles";
import TezosIcon from "@/icons/TezosIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" style={styles.footer} position="relative" py={4} px={6}>
      <Box
        position="absolute"
        top="-4px"
        left="0"
        right="0"
        height="4px"
        boxShadow="sm"
      />
      <Text style={styles.paragraph}>Powered By</Text>
      <TezosIcon style={styles.svg} />
      <Text style={styles.rightText}>&copy; {currentYear} Tezos</Text>
    </Box>
  );
};

export default Footer;
