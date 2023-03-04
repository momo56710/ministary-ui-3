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
  const [otherActivities, setOtherActivities] = useState([]);
  const [fileName, setfileName] = useState([]);
  const [coFounders, setCoFounders] = useState([]);
  const [payload, setPayload] = useState({});
  const toast = useToast();
  const display = (other, display) => {
    other === 'Autre' || other === 'coFounder'
      ? (display = 'inline')
      : (display = 'none');
    return display;
  };
  const handleTools = useCallback((event, tags) => {
    setTools(tags);
  }, []);
  const handleIncubed = useCallback((event, tags) => {
    setIncubed(tags);
  }, []);
  const handleCofounders = useCallback((event, tags) => {
    setCoFounder(tags);
  }, []);
  const [editable, setEditable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState();
  const [coFounder, setCoFounder] = useState([]);
  const [visibale, setVisibale] = useState('none');
  const [incubed, setIncubed] = useState([]);
  const [tools, setTools] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    session = getSession();

    axios
      .get('https://api.stingo.vip/api/document/in/' + _id, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })
      .then(res => {
        console.log(res)
        
        setDocument(res.data.doc);
        setLoading(false);
        setCoFounder([...res.data.doc.coFounders]);
      
        setTools([...res.data.doc.services]);
        setIncubed([...res.data.doc.incubed_st]);
        setPayload(res.data.doc);
        setSession(getSession());
      });
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
              Editer Label Icubateur
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
                  disabled={editable}
                  defaultValue={document.year}
                  placeholder="20XX"
                  onChange={e => {
                    setPayload({ ...payload, year: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Numero de label
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.num_label}
                  placeholder="XXXXXXXXX"
                  onChange={e => {
                    setPayload({ ...payload, num_label: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Nom de l'incubateur / اسم الحاضنة
                </Text>
                <Input
                  disabled={editable}
                  defaultValue={document.incubator_name}
                  placeholder="Nom de l'incubateur"
                  onChange={e => {
                    setPayload({ ...payload, incubator_name: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Description courte de l'incubateur / وصف موجز للحاضنة
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
                  List des équipements et des services / قائمة المعدات والخدمات
                </Text>
                <TagInput
                  disabled={editable}
                  placeholder={'List des équipements et des services'}
                  tags={tools}
                  colorScheme="teal"
                  onTagsChange={handleTools}
                />
                <Text fontSize="xl" fontWeight="bold">
                  le plan d'aménagement de l'incubateur / المساحات المستعملة
                </Text>
                <Textarea
                  disabled={editable}
                  defaultValue={document.plan}
                  placeholder="Description"
                  onChange={e => {
                    setPayload({ ...payload, plan: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Présentation du programme d'incubation / برنامج الحضانة
                </Text>
                <Textarea
                  disabled={editable}
                  defaultValue={document.presentation}
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
                  onTagsChange={handleIncubed}
                />
                <Text fontSize="xl" fontWeight="bold">
                  CV des fondateurs, et/ou formateurs / السير الذاتية للمؤسسين و
                  / أو المدربين
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.cv}
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, cv: e.target.value });
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
                    onTagsChange={handleCofounders}
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
                  Copie du registre de commerce / نسخة من السجل التجاري
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.register}
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, register: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Copie des statuts de la societé / القـانون الأسـاسي لشـركة
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.social_status}
                  placeholder="link"
                  onChange={e => {
                    setPayload({ ...payload, social_status: e.target.value });
                  }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Agrément de l'association/fondation
                </Text>

                <Input
                  disabled={editable}
                  defaultValue={document.agreement}
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
                  disabled={editable}
                  defaultValue={document.other}
                  placeholder=""
                  onChange={e => {
                    setPayload({ ...payload, other: e.target.value });
                  }}
                />
                <Button
                  colorScheme="pink" 
                  display={visibale}
                  size={'md'}
                  onClick={async () => {
                    const s = { ...payload ,services : tools,incubed_st:incubed,coFounders:coFounder};
                    delete s.__v;
                    try {
                      console.log({ ...payload,  services : tools, coFounders:coFounder});
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
                        navigate('/service-label/incubateur');
                        // console.log('hello');
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
                      // console.log(error);
                    }
                  }}
                >
                  Edit
                </Button>
                <Button
                colorScheme="pink" 
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
                        navigate('/service-label/incubateur');
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
                <Button    onClick={() => {
                    navigate(`/service-label/incubateur/make-pdf/${_id}`);
                  }}colorScheme="teal"
                >Download PDF</Button>
                <Button
                  colorScheme="teal"
                  onClick={() => navigate('/service-label/incubateur')}
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
