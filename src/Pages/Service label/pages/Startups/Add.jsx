import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import activities from '../../../assets/data/activities';
import axios from 'axios';

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
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { getSession } from '../../../components/utils/auth';
import React from 'react';
import NavBar from '../../../components/nav';
import Wilaya from '../../../assets/data/wilaya';
export default () => {
  useEffect(() => {
    if (!getSession()?.token) navigate('/login');
    else setSession(getSession());
  }, []);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [session, setSession] = useState('');
  const toast = useToast();
  const options = Wilaya();
  const navigate = useNavigate();
  const [serials, setSerials] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [file, setFile] = useState([]);
  const [otherActivities, setOtherActivities] = useState([]);
  const [payload, setPayload] = useState({
    type: 'ST',
    num_label: '',
    year: '',
    creation_date: '',
    num_employees: '',
    first_name: '',
    last_name: '',
    sex: 'male',
    qualifications: '',
    status: 'admis',
    email: '',
    phone: '',
    startup_name: '',
    activity: 'Fintech',
    description: '',
    juridic_status: '',
    nif: '',
    presentation: '',
    register: '',
    advancement: 'Concept/Idée',
    certificate: '',
    recompense: '',
    state: 'adrar',
    address: '',
    result: '',
    other: '',
  });
  const handleTagsChange = useCallback((event, tags) => {
    setSerials(tags);
  }, []);

  const display = (other, display) => {
    other === 'Autre' ? (display = 'inline') : (display = 'none');
    return display;
  };
  useEffect(() => {
    if (!getSession()?.token) navigate('/login');
    else setSession(getSession());
  }, []);
  return (
    <>
      <NavBar email={session.email} d={'none'} />
      <Box>
        <Center>
          <Box w="80vw" h="100%" borderWidth="1px" borderRadius="lg">
            <Text fontSize="2xl" p={5} textAlign={'center'} fontWeight="bold">
              Ajouter Label Startup
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
                  type={'number'}
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
                  Dénomination commerciale / الاسم التجاري
                </Text>
                <Input
                  placeholder="Dénomination commerciale"
                  type={'text'}
                  onChange={e => {
                    setPayload({ ...payload, startup_name: e.target.value });
                  }}
                />
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
                    onChange={e => {
                      setPayload({ ...payload, activity: e.target.value });
                    }}
                    placeholder={otherActivities}
                    display={e => display(otherActivities, display)}
                  ></Input>
                </Flex>
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
                  Les qualifications scientifiques et techniques des fondateurs
                  / المؤهلات العلمية والفنية للمؤسسين
                </Text>

                <Input
                  className="fileInput"
                  placeholder="qualifications scientifiques et techniques"
                  onChange={e => {
                    setPayload({
                      ...payload,
                      qualifications: e.target.value,
                    });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Business Plan et présentation de la startup /خطة العمل وعرض
                  الشركة الناشئة
                </Text>

                <Input
                  placeholder="Plan et présentation de la startup"
                  onChange={e => {
                    setPayload({ ...payload, presentation: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Brevet (si il y en a) / براءة الاختراع ان وجدت
                </Text>

                <Input
                  placeholder="Brevet"
                  onChange={e => {
                    setPayload({ ...payload, certificate: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Concours/récompenses / الجوائز و المسابقات
                </Text>

                <Input
                  placeholder="récompenses"
                  onChange={e => {
                    setPayload({ ...payload, recompense: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Copie du registre de commerce / نسخة من السجل التجاري
                </Text>

                <Input
                  placeholder="registre de commerce"
                  onChange={e => {
                    setPayload({ ...payload, register: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Nombre d'employés / عدد العمال
                </Text>
                <Input
                  type={'number'}
                  placeholder="XX"
                  onChange={e => {
                    setPayload({ ...payload, num_employees: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Date de création / تاريخ الانشاء
                </Text>
                <Input
                  type={'date'}
                  onChange={e => {
                    setPayload({ ...payload, creation_date: e.target.value });
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
                  <option value="male">Homme</option>
                  <option value="female">femme</option>
                </Select>
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
                  Forme juridique/ الشكل القانوني
                </Text>
                <Input
                  placeholder="Forme juridique"
                  onChange={e => {
                    setPayload({ ...payload, juridic_status: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  NIF (numéro d'identification fiscale)
                </Text>
                <Input
                  placeholder="nif"
                  onChange={e => {
                    setPayload({ ...payload, nif: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Resultat
                </Text>
                <Input
                  placeholder="resultat"
                  onChange={e => {
                    setPayload({ ...payload, result: e.target.value });
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
                        setFileName(e.target.value);
                        setFile(e.target.files[0]);
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
                <Select
                  onChange={e => {
                    setPayload({ ...payload, status: e.target.value });
                  }}
                >
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
                  colorScheme={'teal'}
                  size={'md'}
                  onClick={async () => {
                    try {
                      let data = new FormData();
                      data.append('upload-pdf', file);
                      const { data: fileUid } = await axios.post(
                        'https://api.stingo.vip/api/upload-file',
                        data
                        
                      );
                      if(!fileUid ){
                        toast({
                          title: 'error',
                          description: 'Adding file faild',
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                      }
                      console.log({ ...payload,pdf:fileUid });
                      const res = await axios.post(
                        'https://api.stingo.vip/api/create',
                        { ...payload,pdf:fileUid },
                        {
                          headers: {
                            Authorization: `Bearer ${session.token}`,
                          },
                        }
                      );
                      // console.log({ res });
                      if (res.data.success == true) {
                        navigate('/service-label/startups');
                      } else {
                        toast({
                          title: 'error',
                          description: res.data.error || res.data.message,
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                      }
                    } catch (error) {
                      // console.log(error);
                    }
                  }}
                >
                  Add
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={() => navigate('/service-label/startups')}
                  variant={'solid'}
                  size={'md'}
                >
                  Return To Manager
                </Button>
              </Grid>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
};
// Annee
// Numero de label
// Dénomination commerciale / الاسم التجاري
// Description courte du projet/ شرح مختصر للمشروع
// Secteur d'activité / مجال العمل
// Avancement du projet / مدى تقدم المشروع
// Les qualifications scientifiques et techniques des fondateurs / المؤهلات العلمية والفنية للمؤسسين
// Business Plan et présentation de la startup /خطة العمل وعرض الشركة الناشئة
// Brevet (si il y en a) / براءة الاختراع ان وجدت
// Concours/récompenses /  الجوائز و المسابقات
// Copie du registre de commerce / نسخة من السجل التجاري
// Nombre d'employés / عدد العمال
// Date de création / تاريخ الانشاء
// Nom/اللقب
// Prénom /الاسم
// Genre
// E-mail / البريد الالكتروني
// Téléphone / الهاتف
// Wilaya / الولاية
// Adresse / العنوان
// Forme juridique/ الشكل القانوني
// NIF (numéro d'identification fiscale)
// Resultat
