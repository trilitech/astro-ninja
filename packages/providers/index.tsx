// todo: this shouldnt know about nextjs
// the email modal should live in @kanvas/client/ui
// and we should simply handle it here
import { Context, createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { connectBeacon } from './beacon'
import { WalletApi, WalletConnection } from './types'

interface ConnectionContextType extends Partial<WalletApi> {
  connect: () => Promise<WalletConnection>
}

const ConnectionContext = createContext<ConnectionContextType | null>(null)

export const ConnectionProvider = ({ children }: { children: any }) => {
  const setCookies = useCookies(['viewer-address'])[1]

  const [wallet, setWallet] = useState<WalletApi | undefined>()

  const setWalletCookie = (address: string | undefined) => {
    setCookies('viewer-address', address, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10)
    })
  }

  useEffect(() => {
    setWalletCookie(wallet?.address)
  }, [wallet?.address])

  useEffect(() => {
    connectBeacon(false)
          .then(setWallet)
          .catch(() => {
            console.log('no existing beacon connection')
          })
  }, [])

  const onInitialConnectionComplete = async (
    wallet: WalletApi
  ): Promise<WalletConnection> => {
    setWallet(wallet)    
    const { address, connection } = wallet
    return connection;
    }
  
  const disconnect = async function () {
    console.log("disconnecting");
    setWallet(undefined)
    setWalletCookie(undefined)
  }

  return (
    <ConnectionContext.Provider
      value={{
        connect: async () => {          
          return await connectBeacon(true)
            .then(onInitialConnectionComplete)
            .catch(() => {
              void disconnect()
              throw new Error(
                'Error connecting to wallet, please try again later'
              )
            })
        },
        ...wallet,
        disconnect: async () => {
          await disconnect()
          await wallet?.disconnect()
        }
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export type NotNothing<T> = T extends null | undefined ? never : T

/**
 * Managing wallet connects and disconnects with kukai and beacon
 * and registering the connection with kanvas
 */
export const useConnection = (): ConnectionContextType => {
  if (!ConnectionContext) throw new Error('WalletContext not initialized')
  return useContext(
    ConnectionContext as NotNothing<Context<ConnectionContextType>>
  )
}