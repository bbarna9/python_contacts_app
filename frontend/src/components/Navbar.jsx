import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import CreateContactModal from './CreateContactModal';

const Navbar = ({ setContacts }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={'900px'}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue('gray.200', 'gray.700')}
      >
        <Flex h="16" alignItems={'center'} justifyContent={'space-between'}>
          {/* Left side */}
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            gap={3}
            display={{ base: 'none', sm: 'flex' }}
          >
            <Text fontSize={'30px'} marginBottom={'5px'}>
              My first
            </Text>
            <img src="/python.png" alt="Python logo" width={40} height={30} />
            <Text fontSize={'30px'} marginBottom={'5px'}>
              app
            </Text>
          </Flex>
          {/* Right side */}
          <Flex gap={3} alignItems={'center'}>
            <Text
              fontSize={'lg'}
              fontWeight={500}
              display={{ base: 'none', md: 'block' }}
            >
              E-contacts 🔗
            </Text>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <IoMoon /> : <LuSun />}
            </Button>
            <CreateContactModal setContacts={setContacts} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
