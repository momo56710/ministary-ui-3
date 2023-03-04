import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default ({ clients }) => {
  const navigate = useNavigate();
  return (
    <Center display={'block'} overflowX={'auto'} whiteSpace={'nowrap'}>
      <Table variant="simple" maxW={'80vw'} m={'auto'}>
        <Thead>
          <Tr>
            <Th> Année</Th>

            <Th>Numero de label</Th>

            <Th>Nom de l'incubateur</Th>

            <Th>Description courte de l'incubateur</Th>

            <Th>List des équipements et des services</Th>

            <Th>le plan d'aménagement de l'incubateur</Th>

            <Th>Présentation du programme d'incubation</Th>

            <Th>Liste des statups incubées</Th>

            <Th>CV des fondateurs, et/ou formateurs</Th>

            <Th>Nombre d'employés</Th>

            <Th>Nom</Th>

            <Th>Prénom</Th>

            <Th>Genre</Th>

            <Th>Autres co-fondateurs</Th>

            <Th>Forme juridique</Th>

            <Th>Wilaya</Th>

            <Th>Adresse</Th>

            <Th>E-mail</Th>

            <Th>Téléphone</Th>

            <Th> Date de création</Th>

            <Th> NIF (numéro d'identification fiscale)</Th>

            <Th> Copie du registre de commerce</Th>

            <Th> Copie des statuts de la societé</Th>

            <Th> Agrément de l'association/fondation</Th>

            <Th>label(PDF)</Th>

            <Th>situation</Th>

            <Th>Autre</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((cli, i) => (
            <Tr>
              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.year}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.num_label}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.incubator_name}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.description}</Td>
              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{[...cli.services].join(', ')}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.plan}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.presentation}</Td>
              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{[...cli.incubed_st].join(', ')}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.cv}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.num_employees}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.last_name}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.first_name}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.sex}</Td>
              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{[...cli.coFounders].join(', ')}</Td>
              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.juridic_status}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.state}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.address}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.email}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.phone}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.creation_date}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.nif}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.register}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.social_status}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.agreement}</Td>
              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}></Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.status}</Td>

              <Td maxW={'15em'} mx={'2em'} overflowX={'scroll'}>{cli.other}</Td>

              <Td>
                <Center gap={4}>
                  <Button
                    onClick={() => {
                      navigate(`edit/${cli._id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`make-pdf/${cli._id}`);
                    }}
                  >
                    Download PDF
                  </Button>
                </Center>
              </Td>

              {/* <Th>
                   <Center>
                    <Button onClick={() => router('/product/' + product.pid)}>
                      Edit Here
                    </Button>
                    <Button
                      colorScheme={'whatsapp'}
                      ml={2}
                      onClick={() => router('/sell/product/' + product.pid)}
                    >
                      Sell Product
                    </Button> 
                  </Center> 
                </Th> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Center>
  );
};
