import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import activities from '../../../assets/data/activities';
import axios from 'axios';
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
  const [coFounders, setCoFounders] = useState([]);
  const [coFounder, setCoFounder] = useState([]);
  const [incubed, setIncubed] = useState([]);
  const [fileName, setfileName] = useState([]);
  const [tools, setTools] = useState([]);
  const [payload, setPayload] = useState({
    type: 'IN',
    num_label: '',
    year: '',
    incubator_name: '',
    description: '',
    services: '',
    status : 'admis',
    plan: '',
    presentation: '',
    incubed_st: '',
    cv: '',
    num_employees: '',
    juridic_status: '',
    first_name: '',
    last_name: '',
    sex: 'male',
    state: 'adrar',
    address: '',
    email: '',
    phone: '',
    creation_date: '',
    nif: '',
    register: '',
    social_status: '',
    agreement: '',
    other: '',
  });
  const handleTools = useCallback((event, tags) => {
    setTools(tags);
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
  }, []);
  return (
    <>
      <NavBar email={session.email} d={'none'} />
      <Center>
        <Box>
          <Box w="80vw" h="100%" borderWidth="1px" borderRadius="lg">
            <Text fontSize="2xl" p={5} textAlign={'center'} fontWeight="bold">
              Ajouter Label incubateur
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
                  Nom de l'incubateur / اسم الحاضنة
                </Text>
                <Input
                  placeholder="Nom de l'incubateur"
                  onChange={e => {
                    setPayload({ ...payload, incubator_name: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Description courte de l'incubateur / وصف موجز للحاضنة
                </Text>
                <Textarea
                  placeholder="Description"
                  onChange={e => {
                    setPayload({ ...payload, description: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  List des équipements et des services / قائمة المعدات والخدمات
                </Text>
                <TagInput
                  placeholder={'List des équipements et des services'}
                  tags={tools}
                  colorScheme="teal"
                  onTagsChange={handleTools}
                />
                <Text fontSize="xl" fontWeight="bold">
                  le plan d'aménagement de l'incubateur / المساحات المستعملة
                </Text>
                <Textarea
                  placeholder="Description"
                  onChange={e => {
                    setPayload({ ...payload, plan: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Présentation du programme d'incubation / برنامج الحضانة
                </Text>
                <Textarea
                  placeholder="Présentation"
                  onChange={e => {
                    setPayload({ ...payload, presentation: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Liste des statups incubées (si il y en a) / قائمة الشركات
                  الناشئة المحتضنة (إن وجدت)
                </Text>
                <TagInput
                  placeholder={'Liste des statups incubées'}
                  tags={incubed}
                  colorScheme="teal"
                  onTagsChange={useCallback((event, tags) => {
                    setIncubed(tags);
                  }, [])}
                />
                <Text fontSize="xl" fontWeight="bold">
                  CV des fondateurs, et/ou formateurs / السير الذاتية للمؤسسين و
                  / أو المدربين
                </Text>

                <Input
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, cv: e.target.value });
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
                Autres co-fondateurs / المؤسسون الاخرون
                </Text>
                  <TagInput
                
                    placeholder={'Autres co-fondateurs / المؤسسون الاخرون'}
                    tags={coFounder}
                    colorScheme="teal"
                    onTagsChange={useCallback((event, tags) => {
                      setCoFounder(tags);
                    }, [])}
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
                  Date de création / تاريخ الانشاء
                </Text>
                <Input
                  type={'date'}
                  onChange={e => {
                    setPayload({ ...payload, creation_date: e.target.value });
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
                  Copie du registre de commerce / نسخة من السجل التجاري
                </Text>

                <Input
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, register: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Copie des statuts de la societé / القـانون الأسـاسي لشـركة
                </Text>

                <Input
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, social_status: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Agrément de l'association/fondation
                </Text>

                <Input
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, agreement: e.target.value });
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
                <Select
              
                onChange={(e)=>{
                  setPayload({ ...payload, status: e.target.value });
                }}>
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
                      const res = await axios.post(
                        'https://api.stingo.vip/api/create',
                        {
                          ...payload,
                          coFounders: coFounder,
                          services: tools,
                          incubed_st: incubed,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${session.token}`,
                          },
                        }
                      );

                      if (res.data.success == true) {
                        navigate('/service-label/incubateur');
                      } else {
                        toast({
                          title: 'error',
                          description: res.data.error || res.data.message,
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                        
                      }
                    } catch (error) {}
                  }}
                >
                  Add
                </Button>

                <Button
                colorScheme={'teal'}
                  onClick={() => navigate('/service-label/incubateur')}
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
