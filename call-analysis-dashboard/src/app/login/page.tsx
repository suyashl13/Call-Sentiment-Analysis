"use client";

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import preparedFetch from "../helpers/fetch_helper";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: preparedFetch({
      url: "http://127.0.0.1:8000/api/v1/login/",
      headers: {},
      method: "POST",
      includeCredentials: false,
    }),
    onSuccess(data, variables, context) {
      router.replace('/dashboard')
    },
    onError(error, variables, context) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message
      });
    },
  });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(body)=>{
              mutate(body);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required("Email is required"),
              password: Yup.string().required("Password is required").min(5).max(20),
            })}
          >
            {({ handleSubmit, handleChange, touched, errors }) => <form onSubmit={handleSubmit}>
            <FormControl id="email" isInvalid={!!(touched.email && errors.email)}>
              <FormLabel>Email address</FormLabel>
              <Input name="email" onChange={handleChange} type="email" />
              { (touched.email && errors.email) ?? <FormErrorMessage>{errors.email}</FormErrorMessage> }
            </FormControl>
            <FormControl isInvalid={!!(touched.password && errors.password)} id="password">
              <FormLabel>Password</FormLabel>
              <Input name="password" onChange={handleChange} type="password" />
              { (touched.password && errors.password) ?? <FormErrorMessage>{errors.email}</FormErrorMessage> }
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text></Text>
                <Text color={"blue.500"}>Forgot password?</Text>
              </Stack>
              <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                Sign in
              </Button>
            </Stack>
          </form>}
          </Formik>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
