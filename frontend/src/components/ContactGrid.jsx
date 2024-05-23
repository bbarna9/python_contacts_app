import { Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ContactCard from './ContactCard';
import { BASE_URL } from '../App';

const ContactGrid = ({ contacts, setContacts }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await fetch(BASE_URL + '/cards');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setContacts(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getContacts();
  }, [setContacts]);

  return (
    <>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        {contacts.map((c) => (
          <ContactCard key={c.id} contact={c} setContacts={setContacts} />
        ))}
      </Grid>
      {loading && (
        <Flex justifyContent={'center'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!loading && contacts.length === 0 && (
        <Flex justifyContent={'center'}>
          <Text fontSize={'xl'}>
            <Text as={'span'} fontSize={'2xl'} fontWeight={'bold'} mr={2}>
              Poor me! 😔
            </Text>
            I am antisocial.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default ContactGrid;
