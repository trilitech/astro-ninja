import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Button, Image, ButtonGroup } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import { connectBeacon } from '../packages/beacon'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Astro Ninja NFT</title>
        <meta name="description" content="Sample dApp to deploy and mint Boring NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>Astronaut Ninja NFT Collection</p>
          <Button colorScheme='blue'>Connect</Button>
        </div>

        <div className={styles.center}>
          <Image
            src="/astroninja.png"
            width={360}
            height={360}            
          />
        </div>

      </main>
    </>
  )
}
