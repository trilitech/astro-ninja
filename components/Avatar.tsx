import { Box, Text, BoxProps, HStack, IconButton, Image } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
  import { ConnectionProvider, useConnection } from '@/packages/providers'

const sizes = {
  '50px': {
    innerSizeSocial: '35px',
    innerSizeProfile: '36px'
  },
  '68px': {
    innerSizeSocial: '50px',
    innerSizeProfile: '50px'
  },
  '80px': {
    innerSizeSocial: '55px',
    innerSizeProfile: '60px'
  }
}

const stringToColour = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff    
    colour += (value.toString(16).substring(-2)).padEnd(2, '0');
  }
  return colour
}

const invertColor = (hex: string) => {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + r.padEnd(2, '0') + g.padEnd(2, '0') + b.padEnd(2, '0');
}

export const Avatar = ({ address }: {
    address: string
}) => {
  const color1 = stringToColour(address ?? '')
  const { disconnect } = useConnection()
  
  return (
    <Menu>
        <MenuButton>
      <HStack spacing='-1' mr='6px'>        
        <OuterCircle
          w='120px'
          h='50px'
          bg='background'>
          <InnerCircle background={color1}>
            <Text fontWeight="bold" color={invertColor(color1)}>{address.substring(0, 3) + ".." + address.slice(-5)}</Text>
          </InnerCircle>
        </OuterCircle>
      </HStack>    
      </MenuButton>
      <MenuList>    
    <MenuItem onClick={() => alert('TODO')}>View Collection</MenuItem>
    <MenuItem onClick={disconnect}>Disconnect</MenuItem>
  </MenuList>
    </Menu>
  )
}
const OuterCircle = ({
  displayHover,
  hideBorder,
  ...props
}: BoxProps & { hideBorder?: boolean; displayHover?: boolean }) => {
  const withBorderProps = hideBorder
    ? { backgroundColor: 'transparent' }
    : {
        borderColor: 'neutral.4',
        borderWidth: '1px',
        p: '6px',
        borderRadius: 'full'
      }

  return (
    <Box
      overflow='hidden'
      _hover={{
        borderColor: 'interaction'
      }}
      pointerEvents={displayHover ? 'none' : 'auto'}
      {...props}
      {...withBorderProps}
    />
  )
}
const InnerCircle = (props: BoxProps) => {
  return (
    <Box
      borderRadius='full'
      {...props}
      w='100%'
      h='100%'
      display={'flex'}
      alignItems='center'
      justifyContent='center'
    />
  )
}

export default Avatar
