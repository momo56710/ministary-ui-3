import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
export default function Cards({ title, count ,link}) {
const navigate = useNavigate()
  return (
    <Card
      shadow={"0 0 20px rgba(0,0,0,0.2)"}
      borderRadius={"30px"}
      direction={{ base: "row"}}
      overflow="hidden"
      variant="outline"
      alignItems={"center"}
    >
      <CardBody direction={{ base: "row"}}>
        <Heading size="md">{title}</Heading>

        <Text py="2">
          people signed in
        </Text>
        <Text fontWeight={"bold"} fontSize={"2em"}>
          {count}
        </Text>
      </CardBody>

      <CardFooter>
        <Button variant="solid" colorScheme="blue" onClick={() =>{
          navigate(`${link}`)
        }}>
          view
        </Button>
      </CardFooter>
    </Card>
  );
}
