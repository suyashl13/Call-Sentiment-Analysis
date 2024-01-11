"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import React from "react";

export default function CreateCallPage() {
  return (
    <chakra.form p={{ sm: 2, md: 4 }}>
      {" "}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }}>
        <Box mb={{ sm: 4 }}>
          <Text fontSize="md" fontWeight="semibold">
            Customer Details
          </Text>
          <Text fontSize="sm">
            Customer details refer to the information and data related to a
            particular customer.
          </Text>
        </Box>
        <Stack
          spacing={3}
          bgColor="white"
          shadow="sm"
          borderRadius={"lg"}
          p="4"
        >
          <FormControl isRequired>
            <FormLabel>Customer Name</FormLabel>
            <Input type="text" placeholder="Suyash Lawand" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Customer Phone</FormLabel>
            <InputGroup>
              <InputLeftAddon>🇮🇳</InputLeftAddon>
              <Input type="text" placeholder="9545XXXXXX" />
            </InputGroup>
          </FormControl>
        </Stack>
        <Divider my={4} />
        <Divider my={4} display={{ sm: "none", md: "block" }} />
        <Box mb={{ sm: 4 }}>
          <Text fontSize="md" fontWeight="semibold">
            Call Details
          </Text>
          <Text fontSize="sm">
            Call details typically refer to information related to phone calls,
            including details about incoming and outgoing calls.{" "}
          </Text>
        </Box>
        <Stack
          spacing={3}
          bgColor="white"
          shadow="sm"
          borderRadius={"lg"}
          p="4"
        >
          <FormControl isRequired>
            <FormLabel>Call Recording</FormLabel>
            <chakra.input
              type="file"
              w="100%"
              p="2"
              borderColor="grey.100"
              borderRadius="md"
              textColor="gray.500"
              borderWidth="1px"
              as={"input"}
              css={{
                "&::file-selector-button": {
                  alignItems: "center",
                  textAlign: "center",
                  display: "none",
                  backgroundColor: "blue.400",
                  _hover: {
                    backgroundColor: "blue.500",
                  },
                  _active: {
                    backgroundColor: "blue.600",
                  },
                },
              }}
              placeholder="Suyash"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Call Type</FormLabel>
            <InputGroup>
              <Select placeholder="Select Call Type">
                <option value="0">Incoming</option>
                <option value="1">Outgoing</option>
              </Select>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Call Type</FormLabel>
            <Input type="datetime-local" />
          </FormControl>
        </Stack>
        <Divider my={4} />
        <Divider my={4} display={{ sm: "none", md: "block" }} />
        <Box display={{ sm: "none", md: "block" }}></Box>
        <Box display="flex" flexDir="row-reverse">
          <Button
            alignSelf="end"
            w={{ sm: "100%", md: "auto" }}
            size="lg"
            colorScheme="blue"
          >
            Create Call
          </Button>
        </Box>
      </SimpleGrid>
    </chakra.form>
  );
}
