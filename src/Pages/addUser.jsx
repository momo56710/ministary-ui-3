import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { getSession } from './components/utils/auth';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
export default function AddUser() {
  const navigate = useNavigate();
  const [session, setSession] = useState('');
  const AuthUser = async payload => {
    if (pass === confirmPass){
        setLoading(true);
        try {
          const { data, error } = await axios.post(
            'https://api.stingo.vip/api/signup',
            payload
          );
          setLoading(false);

          return data;
        } catch (error) {
          setLoading(false);
          return error;
        }
    }
    else {
        toast({
            title: 'creating user field',
            description: 'confirm same password',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
   
  };
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });
  const [pass, setPass] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (!getSession()?.token) navigate('/login');
    else setSession(getSession());
  }, []);
  return (
    <>
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} minW={'40vw'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Add Another User</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={e => {
                    setPayload({ ...payload, email: e.target.value });
                  }}
                />
              </FormControl>
              <FormControl >
                <FormLabel>Password</FormLabel>
                <Input
                  type={checked ? 'text' : 'password'}
                  onChange={e => {
                    setPayload({ ...payload, password: e.target.value })
                    setPass(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl >
                <FormLabel>confirm Password</FormLabel>
                <Input
                  type={checked ? 'text' : 'password'}
                  onChange={e => {
                    setconfirmPass(e.target.value);
                  }}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox
                    onChange={e => {
                      e.target.checked ? setChecked(true) : setChecked(false);
                    }}
                  >
                    Show Password
                  </Checkbox>
                </Stack>

                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={loading}
                  onClick={
                    async () => {
                      const res = await AuthUser(payload);
                      if (res.status == 'success') {
                        toast({
                          title: 'user created',
                          description: "created successfully",
                          status: 'success',
                          duration: 9000,
                          isClosable: true,
                        });
                        navigate('/service-label')
                      } else if (!res.sucess || res.error) {
                        toast({
                          title: 'creating user field',
                          description: res?.error
                            ? res.error
                            : 'Invalid Credentials',
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                      }
                    }
                  }
                >
                  Add
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
