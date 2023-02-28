import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from './assets/table';
import NavBar from '../../../components/nav';
import { useParams } from 'react-router-dom';

import { getSession } from '../../../components/utils/auth';
import { Center, Input, Heading, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import client from './assets/client';
export default function App() {
  const [session, setSession] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getItemsSlicedByIndex = (products, index) =>
    products.slice((index - 1) * 6, 6 * index);
  const getMaxPageIndex = products =>
    products.length % 6 === 0
      ? Math.floor(products.length / 6)
      : Math.floor(products.length / 6) + 1;

  useEffect(() => {
    if (!getSession()?.token) navigate('/login');
  });
  const [document, setDocument] = useState([]);
  const { _id } = useParams();
  // useEffect(() => {
  //   const session = getSession();

  //   axios
  //     .get('https://api.stingo.vip/api/list', {
  //       headers: {
  //         Authorization: `Bearer ${session.token}`,
  //       },
  //     })
  //     .then(res => {
  //       setDocument(res.data.PI);
  //       setLoading(false);
  //     })
  //     // .catch(err => console.log(err));
  // }, []);
  useEffect(() => {
    if (!getSession()?.token) navigate('/login');
    else setSession(getSession());
  },[]);
  // if (loading) return <h1>Loading ...</h1>;
  return (
    <>
      <NavBar email={session.email} addBtn={'ajouter projet innovent'}/>
      <Center>
        <Heading as="h2" size="3xl" marginBlock={4} textAlign={'center'}>
        </Heading>
      </Center>
      <Center marginBlock={8}>
        <Input
          placeholder="Search"
          size="lg"
          maxW={'80vw'}
          variant="filled"
          onChange={e => {}}
        />
      </Center>

      <Table clients={getItemsSlicedByIndex(client(),pageIndex)} session={session}></Table>
      <Center mt={8}>
        <Button
          mr={4}
          onClick={() => {
            pageIndex <= 1 ? setPageIndex(1) : setPageIndex(pageIndex - 1);
          }}
        >
          Previous
        </Button>
        <Button disabled mr={1}>
          {pageIndex}
        </Button>
        <ChevronRightIcon color="gray.500" />
        <Button disabled ml={1}>
          {getMaxPageIndex(document)}
        </Button>
        <Button
          ml={4}
          onClick={() => {
            pageIndex >= getMaxPageIndex(document)
              ? setPageIndex(getMaxPageIndex(document))
              : setPageIndex(pageIndex + 1);
          }}
        >
          Next
        </Button>
      </Center>
    </>
  );
}
