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
function Pdf() {
    const navigate = useNavigate(); 
  const pdfTable = useRef();
  let [session, setSession] = useState('');
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState();
  const [coFounder, setCoFounder] = useState();
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
        Label Projet Innovent
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
            <Th>Vous êtes</Th>
            <Td>{document.role}</Td>
          </Tr>
          <Tr>
            <Th>Autres co-fondateurs</Th>
            <Td>{[...coFounder].join(", ")}</Td>
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
            <Th>Site Web</Th>
            <Td>{document.website}</Td>
          </Tr>
          <Tr>
            <Th>Nom du projet</Th>
            <Td>{document.project_name}</Td>
          </Tr>
          <Tr>
            <Th> Description courte du projet</Th>
            <Td>{document.description}</Td>
          </Tr>
          <Tr>
            <Th>Secteur d'activité</Th>
            <Td>{document.activity}</Td>
          </Tr>
          <Tr>
            <Th>Description courte du projet</Th>
            <Td>{document.description}</Td>
          </Tr>
          <Tr>
            <Th>
              {' '}
              Présentation détaillé du projet et ses aspects d'innovation
            </Th>
            <Td>{document.presentation}</Td>
          </Tr>
          <Tr>
            <Th> Avancement du projet</Th>
            <Td>{document.advancement}</Td>
          </Tr>
          <Tr>
            <Th> Brevet</Th>
            <Td>{document.certificate}</Td>
          </Tr>
          <Tr>
            <Th> Concours/récompenses</Th>
            <Td>{document.recompense}</Td>
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
            navigate('/service-label/projet-innovent')
          }}
        >
          Return
        </Button>
      </Center>
    </>
  );
}

export default Pdf;
