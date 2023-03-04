import React from 'react';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { getSession } from '../../../components/utils/auth';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  const text = useColorModeValue('dark', 'light');
  const options = Wilaya();
  const navigate = useNavigate();
  const [fileName, setfileName] = useState([]);
  const [otherActivities, setOtherActivities] = useState([]);
  const [coFounders, setCoFounders] = useState([]);
  const [payload, setPayload] = useState({});
  const handleTagsChange = useCallback((event, tags) => {
    setCoFounder(tags);
  }, []);
  const toast = useToast();
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
  const { _id } = useParams();

  useEffect(() => {
    session = getSession();

    axios
      .get('https://api.stingo.vip/api/document/pi/' + _id, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })
      .then(res => {
        setDocument(res.data.doc);
        setLoading(false);
        setCoFounder([...res.data.doc.coFounders]);
        setPayload(res.data.doc);
        setSession(getSession());
      })
      // .catch(err => console.log(err));
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      <NavBar email={session.email} d={'none'}></NavBar>
      <Box>
        <Center>
          <Box w="80vw" h="100%" borderWidth="1px" borderRadius="lg">
            <Text fontSize="2xl" p={5} textAlign={'center'} fontWeight="bold">
              Editer Label Projet Innovent
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
                  Nom/اللقب
                </Text>
                <Input
                  defaultValue={document.last_name}
                  disabled={editable}
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
                  defaultValue={document.first_name}
                  disabled={editable}
                  placeholder="Prenom"
                  onChange={e => {
                    setPayload({ ...payload, first_name: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Genre
                </Text>
                <Select
                  defaultValue={document.sex}
                  disabled={editable}
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
                    defaultValue={document.role}
                    disabled={editable}
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
                    disabled={editable}
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
                  defaultValue={document.email}
                  disabled={editable}
                  placeholder="email"
                  onChange={e => {
                    setPayload({ ...payload, email: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Téléphone / الهاتف
                </Text>

                <Input
                  defaultValue={document.phone}
                  disabled={editable}
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
                  defaultValue={document.website}
                  disabled={editable}
                  placeholder="mysite"
                  onChange={e => {
                    setPayload({ ...payload, website: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Nom du projet / اسم المشروع
                </Text>
                <Input
                  defaultValue={document.project_name}
                  disabled={editable}
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
                    defaultValue={document.activity}
                    disabled={editable}
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
                    defaultValue={document.activity}
                    disabled={editable}
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
                  defaultValue={document.description}
                  disabled={editable}
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
                  defaultValue={document.presentation}
                  disabled={editable}
                  placeholder="Présentation"
                  onChange={e => {
                    setPayload({ ...payload, presentation: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Avancement du projet / مدى تقدم المشروع
                </Text>
                <Select
                  defaultValue={document.advancement}
                  disabled={editable}
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
                  defaultValue={document.cv}
                  disabled={editable}
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, cv: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Brevet (si il y en a) / براءة الاختراع ان وجدت
                </Text>

                <Input
                  defaultValue={document.certificate}
                  disabled={editable}
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, certificate: e.target.value });
                  }}
                />

                <Text fontSize="xl" fontWeight="bold">
                  Concours/récompenses / الجوائز و المسابقات
                </Text>

                <Input
                  defaultValue={document.recompense}
                  disabled={editable}
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, recompense: e.target.value });
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
                  defaultValue={document.address}
                  disabled={editable}
                  placeholder="Adresse"
                  onChange={e => {
                    setPayload({ ...payload, address: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  label(PDF)
                </Text>
                <Grid templateColumns={'2fr 1fr'} gap={8}>
                  <Input
                    type="text"
                    textAlign={'center'}
                    readOnly
                    value={fileName.toString().substring(12, 1000)}
                  />
                  <label
                    className="css-wqpdoh"
                    for="pdf"
                    style={{
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
                </Grid>
                <Text fontSize="xl" fontWeight="bold">
                  situation
                </Text>
                <Select
                defaultValue={document.status}
                disabled={editable}
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
                  defaultValue={document.other}
                  disabled={editable}
                  placeholder=""
                  onChange={e => {
                    setPayload({ ...payload, other: e.target.value });
                  }}
                />

                <Button
                colorScheme='pink'
                  display={visibale}
                  size={'md'}
                  onClick={async () => {
                    const s = { ...payload ,coFounders : coFounder};
                    delete s.__v;
                    try {
                      // console.log({ ...payload, coFondateur: coFounder });
                      const res = await axios.post(
                        'https://api.stingo.vip/api/update',
                        s,
                        {
                          headers: {
                            Authorization: `Bearer ${session.token}`,
                          },
                        }
                      );
                      // console.log({ res });
                      if (res.data.success == true) {
                        navigate('/service-label/projet-innovent');
                        // console.log('hello');
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
                      // console.log(error);
                    }
                  }}
                >
                  Edit
                </Button>
                <Button
                colorScheme='pink'
                  display={visibale}
                  size={'md'}
                  onClick={async () => {
                    try {
                      // console.log({ ...payload, coFondateur: coFounder });
                      const res = await axios.post(
                        'https://api.stingo.vip/api/delete',
                        { type: document.type, _id: document._id },
                        {
                          headers: {
                            Authorization: `Bearer ${session.token}`,
                          },
                        }
                      );
                      // console.log({ res });
                      // console.log(res.data.success);
                      if (res.data.success == true) {
                        navigate('/service-label/projet-innovent');
                        // console.log('hello');
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
                  delete
                </Button>
                <Button colorScheme='teal'
                  onClick={() => {
                    navigate(`/service-label/projet-innovent/make-pdf/${_id}`);
                  }}>Download PDF</Button>
                <Button
                colorScheme='teal'
                  onClick={() => navigate('/service-label/projet-innovent')}
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
