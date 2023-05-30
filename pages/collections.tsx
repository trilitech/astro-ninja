import { Inter } from 'next/font/google'
import { Box, Button, Image, Flex, SimpleGrid, GridItem } from '@chakra-ui/react'
import { tokensGetTokenBalances } from '@tzkt/sdk-api'
import { useRouter } from 'next/router'
import { TezosToolkit } from '@taquito/taquito';
import { TzktExtension } from '@tzkt/ext-taquito';
import { useEffect, useState } from 'react';

const Tezos = new TezosToolkit(process.env.NEXT_PUBLIC_TEZOS_NODE_URL ?? "");
// TODO (this may create issues, incorrect documentation perhaps)
Tezos.addExtension(new TzktExtension() as any);
const inter = Inter({ subsets: ['latin'] })

type Token = {
  name?: string,
  imageUrl: string
}
export default function Home() {
  const router = useRouter()
  const account = router.query.address as string
  const [data, setData] = useState<Token[]>()
  const [isLoading, setIsLoading] = useState(false)
  const limit = 48
  useEffect(() => {
    if (!account) {
      return 
    } 
    setIsLoading(true)
    tokensGetTokenBalances({
      account: {
        eq: account
      },    
      limit
    }).then((output) => {      
      setData(output.map(current => {
        const thumbnailUri = current.token?.metadata.thumbnailUri as string
        if(!thumbnailUri) return null
        const cid = thumbnailUri.split('//')
        return {
          name: current.token?.metadata.name,
          imageUrl: `https://ipfs.io/ipfs/${cid[1]}`
        }
      }).filter(e => !!e) as Token[])      
    }).finally(() => {setIsLoading(false)})
  }, [account])

  return (
    <>     
      <main>        
        <Box>Your Collected NFTs</Box>
        <SimpleGrid columns={[2, 2, 4]} width='100%' >
        {data?.map(t => <GridItem ><Image src={t.imageUrl} padding="2px" w='100%' h='100%'/></GridItem>)}    
        </SimpleGrid>   
      </main>
    </>
  )
  
}
