"use client";

import { handleGoogleLogin } from "@/actions/auth-action";

import {
  Flex,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Divider,
  Image,
} from "@chakra-ui/react";
import logo from "@/../public/assets/logo.png";
import { FcGoogle } from "react-icons/fc";

export default function SimpleCard() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Image src={logo.src} mb={-200} mt={-200} alt={""} />
        <Stack align={"center"}>
          <Divider />
          <Heading fontSize={"4xl"} mt={2}>
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as="span" color={"blue.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <Center>
          <form action={handleGoogleLogin}>
            <Center>
              <Button
              type='submit'
                bgColor={"white"}
                shadow='sm'
                p={5}
                w={"full"}
                colorScheme="telegram"
                maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Center>
          </form>
        </Center>
      </Stack>
    </Flex>
  );
}
