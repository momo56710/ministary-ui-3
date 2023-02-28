import React from 'react';
import NavBar from '../components/nav';
import Chart from './assets/chart';
import Card from './assets/card';
import { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { getSession } from '../components/utils/auth';

import { Box, Grid, Text , Center} from '@chakra-ui/react';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [documentPI, setDocumentPI] = useState([]);
  const [session, setSession] = useState('');
  const [documentST, setDocumentST] = useState([]);
  const [documentIN, setDocumentIN] = useState([]);
  let [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const session = getSession();

  //   axios
  //     .get('https://api.stingo.vip/api/list', {
  //       headers: {
  //         Authorization: `Bearer ${session.token}`,
  //       },
  //     })
  //     .then(res => {
  //       setDocumentPI(res.data.PI);
  //       setDocumentST(res.data.ST);
  //       setDocumentIN(res.data.IN);
  //       setLoading(false);
  //     })
  // }, []);
  useEffect(() => {
    if (!getSession()?.token) navigate('/login');
    else setSession(getSession());
  },[]);
  return (
    <>
      <NavBar email={session.email} d={'none'} />
      <Center><Text fontSize={'2em'} mb={8} fontWeight={'bold'}>Comite de labilisation</Text></Center>
      <Grid
        gap={8}
        gridTemplateColumns={'repeat(auto-fit, 300px)'}
        justifyContent={'space-around'}
      >
        <Box>
          <Card title={'projet innovent'} count={documentPI.length} link={'projet-innovent'}/>
        </Box>

        <Box>
          <Card title={'stratups'} count={documentST.length} link={'startups'}/>
        </Box>

        <Box>
          <Card title={'incubateur'} count={documentIN.length} link={'incubateur'}/>
        </Box>
      </Grid>

      <Box
        mt={'2em'}
        p={'1em 3em'}
        borderRadius={'3xl'}
        shadow={'0 0 10px rgba(0,0,0,0.2)'}
      >
        <Text fontSize={'2em'} fontWeight={'bold'} ml={5}>
          startup.dz chart
        </Text>
        <Chart />
      </Box>
    </>
  );
}

export default Home;
