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
import { ConnectionProvider, useConnection } from '@/packages/providers'
import Avatar from '@/components/Avatar'

export const App = ({ Component }: AppProps) => {
  return (
    <ChakraProvider>
      <ConnectionProvider>
        <NavBar/>
        <Component/>
      </ConnectionProvider>
    </ChakraProvider>
  )
}

const NavBar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const {address, connect} = useConnection()
  
  
  return <Box as="section" pb={{ base: '12', md: '24' }}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Box px='48px' py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
            <Text>AstroNinja</Text>      
              { address ? <Avatar address={address} /> : <Flex justify="right" flex="1">
                <HStack spacing="10">
                  <Button variant="primary" onClick= { connect }>Connect</Button>
                </HStack>
              </Flex>
              }            
          </HStack>
        </Box>
      </Box>
    </Box>
}

export default App
