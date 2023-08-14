import React from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "./Footer.styles";
import TezosIcon from "@/icons/TezosIcon";

const Footer = () => {
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
      <Box style={styles.svg}>
        <TezosIcon />
      </Box>
    </Box>
  );
};

export default Footer;
