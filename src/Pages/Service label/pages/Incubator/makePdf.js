import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../../../components/nav';
import { getSession } from '../../../components/utils/auth';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Text, Td, Tr, Th, Table, Button, Center } from '@chakra-ui/react';
import { useCallback } from 'react';
function Pdf() {
  const handleTools = useCallback((event, tags) => {
    setTools(tags);
  }, []);
  const handleIncubed = useCallback((event, tags) => {
    setIncubed(tags);
  }, []);
  const handleCofounders = useCallback((event, tags) => {
    setCoFounder(tags);
  }, []);
    const navigate = useNavigate(); 
  const pdfTable = useRef();
  let [session, setSession] = useState('');
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState();
  const [coFounder, setCoFounder] = useState();
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
  function printDocument(pdfTable) {
    const doc = new jsPDF();
    var html = htmlToPdfmake(pdfTable);
    const documenTdefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documenTdefinition).open();
  }

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
    <NavBar email={session.email} d={'none'}/>
      <div ref={pdfTable}>
        <Text fontSize={'2em'} fontWeight={'bold'} textAlign={'center'} my={8}>
        Label Incubateur
        </Text>

        <Table w={'70vw'} m={'auto'}>
          <Tr>
            <Th> Année</Th>
            <Td>{document.year}</Td>
          </Tr>
          <Tr>
            <Th>Numero de label</Th>
            <Td>{document.num_label}</Td>
          </Tr>
          <Tr>
            <Th>Nom de l'incubateur</Th>
            <Td>{document.incubator_name}</Td>
          </Tr>
          <Tr>
            <Th>Description courte de l'incubateur</Th>
            <Td>{document.description}</Td>
          </Tr>
          <Tr>
            <Th>List des équipements et des services</Th>
            <Td>{[...tools].join(", ")}</Td>
          </Tr>
          <Tr>
            <Th>le plan d'aménagement de l'incubateur</Th>
            <Td>{document.plan}</Td>
          </Tr>
          <Tr>
            <Th>Présentation du programme d'incubation</Th>
            <Td>{document.presentation}</Td>
          </Tr>
          <Tr>
            <Th>Liste des statups incubées</Th>
            <Td>{[...incubed].join(", ")}</Td>
          </Tr>
          <Tr>
            <Th>CV des fondateurs, et/ou formateurs</Th>
            <Td>{document.cv}</Td>
          </Tr>
          <Tr>
            <Th>Nombre d'employés</Th>
            <Td>{document.num_employees}</Td>
          </Tr>
          <Tr>
            <Th>Nom</Th>
            <Td>{document.last_name}</Td>
          </Tr>
          <Tr>
            <Th>Prénom</Th>
            <Td>{document.first_name}</Td>
          </Tr>
          <Tr>
            <Th>Genre</Th>
            <Td>{document.sex}</Td>
          </Tr>
          <Tr>
            <Th>Autres co-fondateurs</Th>
            <Td>{[...coFounder].join(", ")}</Td>
          </Tr>
          <Tr>
            <Th>Forme juridique</Th>
            <Td>{document.juridic_status}</Td>
          </Tr>
          <Tr>
            <Th>Wilaya</Th>
            <Td>{document.state}</Td>
          </Tr>
          <Tr>
            <Th>Adresse</Th>
            <Td>{document.address}</Td>
          </Tr>
          <Tr>
            <Th>E-mail</Th>
            <Td>{document.email}</Td>
          </Tr>
          <Tr>
            <Th>Téléphone</Th>
            <Td>{document.phone}</Td>
          </Tr>
          <Tr>
            <Th> Date de création</Th>
            <Td>{document.creation_date}</Td>
          </Tr>
          <Tr>
            <Th> NIF (numéro d'identification fiscale)</Th>
            <Td>{document.nif}</Td>
          </Tr>
          <Tr>
            <Th> Copie du registre de commerce</Th>
            <Td>{document.register}</Td>
          </Tr>
          <Tr>
            <Th> Copie des statuts de la societé</Th>
            <Td>{document.social_status}</Td>
          </Tr>
          <Tr>
            <Th> Agrément de l'association/fondation</Th>
            <Td>{document.agreement}</Td>
          </Tr>
          <Tr>
            <Th>label(PDF)</Th>
            <Td></Td>
          </Tr>
          <Tr>
            <Th>situation</Th>
            <Td>{document.status}</Td>
          </Tr>
          <Tr>
            <Th>Autre</Th>
            <Td>{document.other}</Td>
          </Tr>
        </Table>
      </div>
      <Center gap={'4em'}>
        <Button
          my={8}
          onClick={() => {
            printDocument(pdfTable.current.innerHTML);
          }}
        >
          Export To PDF
        </Button>
        <Button
          my={8}
          onClick={() => {
            navigate('/service-label/incubateur')
          }}
        >
          Return
        </Button>
      </Center>
    </>
  );
}

export default Pdf;
