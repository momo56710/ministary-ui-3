import React from 'react';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { getSession } from '../../../components/utils/auth';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import activities from '../../../assets/data/activities';

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
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import NavBar from '../../../components/nav';
import Wilaya from '../../../assets/data/wilaya';
import { Stack, useColorModeValue } from '@chakra-ui/react';

export default () => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  let [session, setSession] = useState('');
  const [problem, setProblem] = useState('');
  const text = useColorModeValue('dark', 'light');
  const options = Wilaya();
  const navigate = useNavigate();
  const [fileName, setfileName] = useState([]);
  const [otherActivities, setOtherActivities] = useState([]);
  const [payload, setPayload] = useState({});
  const handleTagsChange = useCallback((event, tags) => {
    setCoFounder(tags);
  }, []);

  const display = (other, display) => {
    other === 'Autre' || other === 'coFounder'
      ? (display = 'inline')
      : (display = 'none');
    return display;
  };
  const [editable, setEditable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState();
  const [coFounder, setCoFounder] = useState();
  const [visibale, setVisibale] = useState('none');
  const [serials, setSerials] = useState([]);
  const { _id } = useParams();
  const toast = useToast();
  useEffect(() => {
    session = getSession();

    axios
      .get('https://api.stingo.vip/api/document/st/' + _id, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })
      .then(res => {
        setDocument(res.data.doc);
        setLoading(false);
        setPayload(res.data.doc);
        setSession(getSession());
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      <NavBar email={session.email} d={'none'}></NavBar>
      {console.log(document)}
      <Box>
        <Center>
          <Box w="80vw" h="100%" borderWidth="1px" borderRadius="lg">
            <Text fontSize="2xl" p={5} textAlign={'center'} fontWeight="bold">
              Editer startup
            </Text>

            <Box
              w="100%"
              h="100%"
              borderTopLeftRadius="lg"
              borderTopRightRadius="lg"
              p={4}
            >
              <Checkbox
                mb={8}
                onChange={e => {
                  e.target.checked ? setEditable(false) : setEditable(true);
                  e.target.checked
                    ? setVisibale('inline')
                    : setVisibale('none');
                }}
              >
                <Text fontSize="xl" fontWeight="bold">
                  Edit
                </Text>
              </Checkbox>
              <Grid
                gap={6}
                templateColumns={isLargerThan800 ? '1fr 3fr' : '1fr'}
              >
                <Text fontSize="xl" fontWeight="bold">
                  Année
                </Text>
                <Input
                  placeholder="20XX"
                  disabled={editable}
                  defaultValue={document.year}
                  onChange={e => {
                    setPayload({ ...payload, year: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Numero de label
                </Text>
                <Input
                  defaultValue={document.num_label}
                  disabled={editable}
                  placeholder="XXXXXXXXX"
                  onChange={e => {
                    setPayload({ ...payload, num_label: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Dénomination commerciale / الاسم التجاري
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.startup_name}
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
                  disabled={editable}
                  defaultValue={document.description}
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
                    disabled={editable}
                    defaultValue={document.activity}
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
                  disabled={editable}
                  defaultValue={document.advancement}
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
                  disabled={editable}
                  defaultValue={document.qualifications}
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
                  disabled={editable}
                  defaultValue={document.presentation}
                  placeholder="Plan et présentation de la startup"
                  onChange={e => {
                    setPayload({ ...payload, presentation: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Brevet (si il y en a) / براءة الاختراع ان وجدت
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.certificate}
                  placeholder="Brevet"
                  onChange={e => {
                    setPayload({ ...payload, certificate: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Concours/récompenses / الجوائز و المسابقات
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.recompense}
                  placeholder="récompenses"
                  onChange={e => {
                    setPayload({ ...payload, recompense: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Copie du registre de commerce / نسخة من السجل التجاري
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.register}
                  placeholder="registre de commerce"
                  onChange={e => {
                    setPayload({ ...payload, register: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Nombre d'employés / عدد العمال
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.num_employees}
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
                  disabled={editable}
                  defaultValue={document.creation_date}
                  type={'date'}
                  onChange={e => {
                    setPayload({ ...payload, creation_date: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Nom/اللقب
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.last_name}
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
                  disabled={editable}
                  defaultValue={document.first_name}
                  placeholder="Prenom"
                  onChange={e => {
                    setPayload({ ...payload, first_name: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Genre
                </Text>
                <Select
                  disabled={editable}
                  defaultValue={document.sex}
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
                  disabled={editable}
                  defaultValue={document.email}
                  placeholder="email"
                  onChange={e => {
                    setPayload({ ...payload, email: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Téléphone / الهاتف
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.phone}
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
                  disabled={editable}
                  defaultValue={document.state}
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
                  disabled={editable}
                  defaultValue={document.address}
                  placeholder="Adresse"
                  onChange={e => {
                    setPayload({ ...payload, address: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Forme juridique/ الشكل القانوني
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.juridic_status}
                  placeholder="Forme juridique"
                  onChange={e => {
                    setPayload({ ...payload, juridic_status: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  NIF (numéro d'identification fiscale)
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.nif}
                  placeholder="nif"
                  onChange={e => {
                    setPayload({ ...payload, nif: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Resultat
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.result}
                  placeholder="resultat"
                  onChange={e => {
                    setPayload({ ...payload, result: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Autre
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.other}
                  onChange={e => {
                    setPayload({ ...payload, other: e.target.value });
                  }}
                />
                <Button
                  display={visibale}
                  size={'md'}
                  onClick={async () => {
                    const s = { ...payload };
                    delete s.__v;
                    try {
                      console.log({ ...payload, coFondateur: coFounder });
                      const res = await axios.post(
                        'https://api.stingo.vip/api/update',
                        s,
                        {
                          headers: {
                            Authorization: `Bearer ${session.token}`,
                          },
                        }
                      );
                      console.log({ res });
                      if (res.data.success == true) {
                        navigate('/service-label/startups');
                      } else {
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
                  Edit
                </Button>
                <Button
                  display={visibale}
                  size={'md'}
                  onClick={async () => {
                    try {
                      console.log({ ...payload, coFondateur: coFounder });
                      const res = await axios.post(
                        'https://api.stingo.vip/api/delete',
                        { type: document.type, _id: document._id },
                        {
                          headers: {
                            Authorization: `Bearer ${session.token}`,
                          },
                        }
                      );
                      console.log({ res });
                      console.log(res.data.success);
                      if (res.data.success == true) {
                        navigate('/service-label/startups');
                        console.log('hello');
                      } 
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  delete
                </Button>
                <Button colorScheme={'red'}>Download PDF</Button>
                <Button
                  onClick={() => navigate('/service-label/startups')}
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
