import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  ChakraProvider,
  Flex,
  Text,
  HStack,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'

export const App = ({ Component }: AppProps) => {
  return (
    <ChakraProvider>
      <NavBar/>
      <Component/>
    </ChakraProvider>
  )
}

const NavBar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Box px='48px' py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            <Text>AstroNinja</Text>
            {isDesktop ? (
              <Flex justify="right" flex="1">
                <HStack spacing="10">
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
        </Box>
      </Box>
    </Box>
}

export default App
