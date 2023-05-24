import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  ChakraProvider,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'
import { Logo } from './Logo'

export const App = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            <Logo />
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <HStack spacing="3">
                  <Button variant="primary">Connect</Button>
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}

export default App
