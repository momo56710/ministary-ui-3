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
            <Th>Nom</Th>
            <Th>Prénom</Th>
            <Th>Genre</Th>
            <Th>Vous êtes</Th>
            <Th>Autres co-fondateurs</Th>
            <Th>E-mail</Th>
            <Th>Téléphone</Th>
            <Th>Site Web</Th>
            <Th>Nom du projet</Th>
            <Th> Description courte du projet</Th>
            <Th>Secteur d'activité</Th>
            <Th> Avancement du projet</Th>
            <Th> Brevet</Th>
            <Th> Concours/récompenses</Th>
            <Th>Wilaya</Th>
            <Th>Adresse</Th>
            <Th>label(PDF)</Th>
            <Th>situation</Th>
            <Th>Autre</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((cli, i) => (
            <Tr>
              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.year}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.num_label}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.last_name}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.first_name}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.sex}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.role}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {[...cli.coFounders].join(', ')}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.email}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.phone}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.website}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.project_name}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.description}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.activity}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.advancement}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.certificate}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.recompense}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.state}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.address}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}></Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.status}
              </Td>

              <Td overflowX={'scroll'} maxW={'15em'}>
                {cli.other}
              </Td>

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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Center>
  );
};
