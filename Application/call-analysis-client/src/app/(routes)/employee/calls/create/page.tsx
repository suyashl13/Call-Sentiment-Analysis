"use client";
import { CallType, CreateCallInterface } from "@/types/call.types";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useFormik } from "formik";
import React from "react";
import { useMutation } from "@tanstack/react-query";

export default function CreateCallPage() {
  const toast = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: (callDetails: CreateCallInterface) =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/employee/phone-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          customerName: callDetails.customerName,
          customerPhone: callDetails.customerPhone,
          callRecordingUrl: callDetails.callRecordingUrl,
          callType: callDetails.callType,
          callDateTime: callDetails.callDateTime,
        }),
      }),
    onSuccess: async (data) => {
      console.log(await data.json());
      toast({
        title: "Call Created",
        description: "Call Created Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Call Creation Failed",
        description: `Call Creation Failed (${error.message})`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const createCallFormikObject = useFormik<CreateCallInterface>({
    initialValues: {
      customerName: "",
      customerPhone: "",
      callRecordingUrl: "",
      callType: null,
      callDateTime: new Date(Date.now()),
    },
    validationSchema: yup.object({
      customerName: yup.string().required("Required").min(2, "Too short"),
      customerPhone: yup
        .string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .length(10, "Must be exactly 10 digits"),
      callRecordingUrl: yup.string().required("Required"),
      callType: yup
        .string()
        .required("Required")
        .oneOf([CallType.INCOMING, CallType.OUTGOING]),
      callDateTime: yup.string().required("Required"),
    }),
    onSubmit: (values: CreateCallInterface, { resetForm }) => {
      console.log("first");
      mutateAsync(values).then(() => {
        resetForm();
      });
    },
  });

  return (
    <chakra.form
      p={{ sm: 2, md: 4 }}
      onSubmit={createCallFormikObject.handleSubmit}
    >
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
          <FormControl
            isRequired
            isInvalid={
              !!(
                createCallFormikObject.errors.customerName &&
                createCallFormikObject.touched.customerName
              )
            }
            isDisabled={createCallFormikObject.isSubmitting}
          >
            <FormLabel htmlFor="customerName">Customer Name</FormLabel>
            <Input
              id="customerName"
              value={createCallFormikObject.values.customerName}
              onChange={createCallFormikObject.handleChange}
              name="customerName"
              type="text"
              placeholder="Suyash Lawand"
            />
            <FormErrorMessage>
              {createCallFormikObject.errors.customerName}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isDisabled={createCallFormikObject.isSubmitting}
            isRequired
            isInvalid={
              !!(
                createCallFormikObject.errors.customerPhone &&
                createCallFormikObject.touched.customerPhone
              )
            }
          >
            <FormLabel>Customer Phone</FormLabel>
            <InputGroup>
              <InputLeftAddon>🇮🇳</InputLeftAddon>
              <Input
                value={createCallFormikObject.values.customerPhone}
                onChange={createCallFormikObject.handleChange}
                name="customerPhone"
                type="text"
                placeholder="9545XXXXXX"
              />
            </InputGroup>
            <FormErrorMessage>
              {createCallFormikObject.errors.customerPhone}
            </FormErrorMessage>
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
          <FormControl
            isDisabled={createCallFormikObject.isSubmitting}
            isRequired
            isInvalid={
              !!(
                createCallFormikObject.errors.callRecordingUrl &&
                createCallFormikObject.touched.callRecordingUrl
              )
            }
          >
            <FormLabel>Call Recording</FormLabel>
            <chakra.input
              type="file"
              name="callRecordingUrl"
              w="100%"
              onChange={createCallFormikObject.handleChange}
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
            <FormErrorMessage>
              {createCallFormikObject.errors.callRecordingUrl}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isDisabled={createCallFormikObject.isSubmitting}
            isRequired
            isInvalid={
              !!(
                createCallFormikObject.errors.callType &&
                createCallFormikObject.touched.callType
              )
            }
          >
            <FormLabel>Call Type</FormLabel>
            <InputGroup>
              <Select
                onChange={createCallFormikObject.handleChange}
                name="callType"
                placeholder="Select Call Type"
              >
                <option value={CallType.INCOMING}>Incoming</option>
                <option value={CallType.OUTGOING}>Outgoing</option>
              </Select>
            </InputGroup>
            <FormErrorMessage>
              {createCallFormikObject.errors.callType}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isDisabled={createCallFormikObject.isSubmitting}
            isRequired
            isInvalid={
              !!(
                createCallFormikObject.errors.callDateTime &&
                createCallFormikObject.touched.callDateTime
              )
            }
          >
            <FormLabel>Call Datetime</FormLabel>
            <Input
              value={createCallFormikObject.values.callDateTime as any}
              onChange={createCallFormikObject.handleChange}
              name="callDateTime"
              type="datetime-local"
            />
          </FormControl>
        </Stack>
        <Divider my={4} />
        <Divider my={4} display={{ sm: "none", md: "block" }} />
        <Box display={{ sm: "none", md: "block" }}></Box>
        <Box display="flex" flexDir="row-reverse">
          <Button
            isLoading={createCallFormikObject.isSubmitting}
            alignSelf="end"
            w={{ sm: "100%", md: "auto" }}
            size="lg"
            colorScheme="blue"
            type="submit"
          >
            Create Call
          </Button>
        </Box>
      </SimpleGrid>
    </chakra.form>
  );
}
