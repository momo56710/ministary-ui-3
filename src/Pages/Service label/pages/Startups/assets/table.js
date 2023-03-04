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

            <Th>Dénomination commerciale</Th>

            <Th> Description courte du projet</Th>

            <Th>Secteur d'activité</Th>

            <Th>Avancement du projet</Th>

            <Th>
              Les qualifications scientifiques et techniques des fondateurs
            </Th>

            <Th> Business Plan et présentation de la startup</Th>

            <Th> Brevet</Th>

            <Th> Concours/récompenses</Th>

            <Th> Copie du registre de commerce</Th>

            <Th> Nombre d'employés</Th>

            <Th> Date de création</Th>

            <Th>Nom</Th>

            <Th>Prénom</Th>

            <Th>Genre</Th>

            <Th>E-mail</Th>

            <Th>Téléphone</Th>

            <Th>Wilaya</Th>

            <Th>Adresse</Th>

            <Th>Forme juridique</Th>

            <Th>NIF (numéro d'identification fiscale)</Th>

            <Th>Resultat</Th>
            <Th>label(PDF)</Th>

            <Th>situation</Th>

            <Th>Autre</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((cli, i) => (
            <Tr>
              <Td overflowX={'scroll'} maxW={'15em'}>{cli.year}</Td>
          
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.num_label}</Td>
               
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.startup_name}</Td>
            
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.description}</Td>
             
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.activity}</Td>
                
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.advancement}</Td>
             
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.qualifications}</Td>
          
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.presentation}</Td>
            
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.certificate}</Td>
             
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.recompense}</Td>
              
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.register}</Td>
                
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.num_employees}</Td>
           
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.creation_date}</Td>
           
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.last_name}</Td>
               
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.first_name}</Td>
              
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.sex}</Td>
                    
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.email}</Td>
                   
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.phone}</Td>
                   
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.state}</Td>
                   
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.address}</Td>
                 
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.juridic_status}</Td>
          
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.nif}</Td>
                    
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.result}</Td>
                  
          <Td overflowX={'scroll'} maxW={'15em'}></Td>
                   
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.status}</Td>
                  
          <Td overflowX={'scroll'} maxW={'15em'}>{cli.other}</Td>
                   
              <Td >
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
