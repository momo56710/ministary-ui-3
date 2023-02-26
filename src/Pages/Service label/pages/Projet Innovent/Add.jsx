import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useRef } from 'react';

import activities from '../../../assets/data/activities';
import TagInput from '../../assets/input';
import {
  Text,
  Input,
  Button,
  Textarea,
  Select,
  Grid,
  Flex,
  Box,
  Center,
  background,
  color,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios'
import { getSession } from '../../../components/utils/auth';
import NavBar from '../../../components/nav';
import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import Wilaya from '../../../assets/data/wilaya';
import { Stack, useColorModeValue } from '@chakra-ui/react';

export default () => {
  const toast = useToast()
  const [session, setSession] = useState('');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const text = useColorModeValue('dark', 'light');
  const options = Wilaya();
  const navigate = useNavigate();
  const [coFounder, setCoFounder] = useState([]);
  const [fileName, setfileName] = useState([]);
  const [otherActivities, setOtherActivities] = useState([]);
  const [coFounders, setCoFounders] = useState([]);
  const [payload, setPayload] = useState({
    type: 'PI',
    num_label: '',
    year: '',
    role: 'founder',
    first_name: '',
    last_name: '',
    sex: 'male',
    email: '',
    phone: '',
    website: '',
    project_name: '',
    activity: 'Fintech',
    description: '',
    presentation: '',
    advancement: 'Concept/Idée',
    cv: '',
    certificate: '',
    recompense: '',
    state: 'Adrar',
    address: '',
    other: '',
  });
  const handleTagsChange = useCallback((event, tags) => {
    setCoFounder(tags);
  }, []);

  const display = (other, display) => {
    other === 'Autre' || other === 'coFounder'
      ? (display = 'inline')
      : (display = 'none');
    return display;
  };
  useEffect(() => {
    if (!getSession()?.token) navigate('/login');
    else setSession(getSession());
  },[]);
  return (
    <>
      <NavBar email={session.email} d={'none'} />
      <Center>
        <Box>
          <Box w="80vw" h="100%" borderWidth="1px" borderRadius="lg">
            <Text fontSize="2xl" p={5} textAlign={'center'} fontWeight="bold">
              Ajouter Label Projet Innovent
            </Text>
            <Box
              w="100%"
              h="100%"
              borderTopLeftRadius="lg"
              borderTopRightRadius="lg"
              p={4}
            >
              <Grid
                gap={6}
                templateColumns={isLargerThan800 ? '1fr 3fr' : '1fr'}
              >
                <Text fontSize="xl" fontWeight="bold">
                  Année
                </Text>
                <Input
                  placeholder="20XX"
                  onChange={e => {
                    setPayload({ ...payload, year: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Numero de label
                </Text>
                <Input
                  placeholder="XXXXXXXXX"
                  onChange={e => {
                    setPayload({ ...payload, num_label: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Nom/اللقب
                </Text>
                <Input
                  placeholder="Nom"
                  type={'text'}
                  onChange={e => {
                    setPayload({ ...payload, last_name: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Prénom /الاسم
                </Text>
                <Input
                  placeholder="Prenom"
                  onChange={e => {
                    setPayload({ ...payload, first_name: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Genre
                </Text>
                <Select
                  placeholder=""
                  onChange={e => {
                    setPayload({ ...payload, sex: e.target.value });
                  }}
                >
                  <option value="male" selected>
                    Homme
                  </option>
                  <option value="female">femme</option>
                </Select>
                <Text fontSize="xl" fontWeight="bold">
                  Vous êtes/ صفتك
                </Text>
                <Grid gap={5}>
                  <Select
                    placeholder=""
                    onChange={e => {
                      setPayload({ ...payload, role: e.target.value });
                      setCoFounders(e.target.value);
                    }}
                  >
                    <option value="founder">fondateur</option>
                    <option value="coFounder">co-fonadteur</option>
                  </Select>
                  <TagInput
                    display={display(coFounders, display)}
                    placeholder={'Autres co-fondateurs / المؤسسون الاخرون'}
                    tags={coFounder}
                    colorScheme="teal"
                    onTagsChange={handleTagsChange}
                  />
                </Grid>
                <Text fontSize="xl" fontWeight="bold">
                  E-mail / البريد الالكتروني
                </Text>

                <Input
                  placeholder="email"
                  onChange={e => {
                    setPayload({ ...payload, email: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Téléphone / الهاتف
                </Text>

                <Input
                  placeholder="phone"
                  type={'number'}
                  onChange={e => {
                    setPayload({ ...payload, phone: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Site Web/ الموقع الالكتروني
                </Text>

                <Input
                  placeholder="mysite"
                  onChange={e => {
                    setPayload({ ...payload, website: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Nom du projet / اسم المشروع
                </Text>
                <Input
                  placeholder="name"
                  onChange={e => {
                    setPayload({ ...payload, project_name: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Secteur d'activité / مجال العمل
                </Text>
                <Flex gap={4}>
                  <Select
                    value={otherActivities}
                    onChange={e => {
                      setPayload({ ...payload, activity: e.target.value });
                      setOtherActivities(e.target.value);
                    }}
                  >
                    {activities().map((val, i) => {
                      return <option value={val}>{`${val}`}</option>;
                    })}
                    <option value="Autre">Autre</option>
                  </Select>
                  <Input
                    placeholder={otherActivities}
                    display={e => display(otherActivities, display)}
                    onChange={e => {
                      setPayload({ ...payload, activity: e.target.value });
                    }}
                  ></Input>
                </Flex>
                <Text fontSize="xl" fontWeight="bold">
                  Description courte du projet/ شرح مختصر للمشروع
                </Text>
                <Textarea
                  placeholder="Description"
                  onChange={e => {
                    setPayload({ ...payload, description: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Présentation détaillé du projet et ses aspects d'innovation /
                  العرض التفصيلي للمشروع وجوانب الابتكار فيه
                </Text>
                <Textarea
                  placeholder="Présentation"
                  onChange={e => {
                    setPayload({ ...payload, presentation: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Avancement du projet / مدى تقدم المشروع
                </Text>
                <Select
                  onChange={e => {
                    setPayload({ ...payload, advancement: e.target.value });
                  }}
                >
                  <option value={'Concept/Idée'}>Concept/Idée</option>
                  <option value={'Prototype en dévloppement'}>
                    Prototype en dévloppement
                  </option>
                  <option value={'Prototype prét'}>Prototype prét</option>
                  <option value={'Produit sur le marché'}>
                    Produit sur le marché
                  </option>
                </Select>
                <Text fontSize="xl" fontWeight="bold">
                  CV du/des fondateurs / السيرة الذاتية للمؤسسين
                </Text>

                <Input
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, cv: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Brevet (si il y en a) / براءة الاختراع ان وجدت
                </Text>

                <Input
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, certificate: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Concours/récompenses / الجوائز و المسابقات
                </Text>

                <Input
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, recompense: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Wilaya / الولاية
                </Text>
                <Select
                  onChange={e => {
                    setPayload({ ...payload, state: e.target.value });
                  }}
                >
                  {Object.keys(options).map(option => {
                    return (
                      <option
                        value={options[option].name}
                      >{`${options[option].code}-${options[option].name}`}</option>
                    );
                  })}
                </Select>
                <Text fontSize="xl" fontWeight="bold">
                  Adresse / العنوان
                </Text>
                <Input
                  placeholder="Adresse"
                  onChange={e => {
                    setPayload({ ...payload, address: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  label(PDF)
                </Text>
                <Grid
                  gap={2}
                  templateColumns={isLargerThan800 ? '1fr 3fr' : '1fr'}
                >
                  <label
                    for="pdf"
                    style={{
                      borderRadius: '5px',
                      padding: '0.5em 0',
                      border: '1px solid rgba(200,200,200,0.4)',
                      cursor: 'pointer',
                      display: 'grid',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Import
                    <Input
                      id="pdf"
                      display={'none'}
                      placeholder="Upload"
                      type={'file'}
                      pt={'0.3em'}
                      onChange={e => {
                        setfileName(e.target.value);
                      }}
                    />
                  </label>
                  <Input
                    type="text"
                    readOnly
                    textAlign={'center'}
                    value={fileName.toString().substring(12, 1000)}
                  />
                </Grid>
                <Text fontSize="xl" fontWeight="bold">
                  situation
                </Text>
                <Select>
                  <option value="admis">admis</option>
                  <option value="pas admis">pas admis</option>
                  <option value="en attend">en attend</option>
                </Select>
                <Text fontSize="xl" fontWeight="bold">
                  Autre
                </Text>
                <Input
                  placeholder=""
                  onChange={e => {
                    setPayload({ ...payload, other: e.target.value });
                  }}
                />
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'md'}
                  onClick={async () => {
                    try {
                      console.log({ ...payload, coFondateur: coFounder });
                      const res = await axios.post(
                        "https://api.stingo.vip/api/create",
                        { ...payload, coFounders: coFounder },
                        {
                          headers: {
                            Authorization: `Bearer ${session.token}`,
                          },
                        }
                      );
                      console.log({ res });
                      if (res.data.success == true){
                        navigate('/service-label/projet-innovent')
                      }
                      else{
                        toast({
                          title: 'probelm',
                          description: res.data.error,
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                       }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                 
                >
                  Add
                </Button>

                <Button
                  onClick={() => navigate('/service-label/projet-innovent')}
                  variant={'solid'}
                  size={'md'}
                >
                  Return To Manager
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
};
