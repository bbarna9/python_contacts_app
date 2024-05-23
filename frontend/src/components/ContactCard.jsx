import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
import { BASE_URL } from '../App';

const ContactCard = ({ contact, setContacts }) => {
  const toast = useToast();
  const handleDeleteContact = async () => {
    try {
      const res = await fetch(BASE_URL + '/cards/' + contact.id, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setContacts((prev) => prev.filter((c) => c.id !== contact.id));
      toast({
        title: 'Contact deleted sucessfully',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        status: 'error',
        description: error.message,
        isClosable: true,
        duration: 4000,
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={1} gap={4} alignItems={'center'}>
            <Avatar src={contact.imgUrl} />
            <Box>
              <Heading size="sm">{contact.name}</Heading>
              <Text>{contact.role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditModal contact={contact} setContacts={setContacts} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={'sm'}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
              onClick={() => handleDeleteContact()}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{contact.description}</Text>
      </CardBody>
    </Card>
  );
};

export default ContactCard;
