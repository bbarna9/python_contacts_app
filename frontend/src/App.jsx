import { Container, Stack, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import ContactGrid from './components/ContactGrid';
import { useState } from 'react';

export const BASE_URL = 'http://localhost:5000/api';

function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <Stack minH={'100vh'}>
      <Navbar setContacts={setContacts} />

      <Container maxW={'1200px'} my={4}>
        <Text
          fontSize={{ base: '3xl', md: '50' }}
          fontWeight={'bold'}
          letterSpacing={'2px'}
          textTransform={'uppercase'}
          textAlign={'center'}
          mb={8}
        >
          <Text as={'span'}>
            <Text
              as={'span'}
              bgGradient={'linear(to-r, cyan.400, blue.500)'}
              bgClip={'text'}
              marginRight={1}
            >
              My Contacts
            </Text>
            🤝
          </Text>
        </Text>
        <ContactGrid contacts={contacts} setContacts={setContacts} />
      </Container>
    </Stack>
  );
}

export default App;
