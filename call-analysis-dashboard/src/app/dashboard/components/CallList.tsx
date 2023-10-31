"use client";

import getCookie from "@/app/helpers/cookie_helper";
import preparedFetch from "@/app/helpers/fetch_helper";
import { Badge, Box, Button, HStack, Spacer, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import React from "react";

export default function CallList() {
  const { data } = useQuery({
    queryKey: ["calls"],
    queryFn: () =>
      preparedFetch({
        headers: {},
        includeCredentials: true,
        method: "GET",
        url: "http://127.0.0.1:8000/api/v1/call/",
      })(),
  });
  return (
    <Stack divider={<StackDivider />}>
      {data?.map((item: any) => (
        <Stack
        justifyContent={'stretch'}
        alignContent='stretch'
        direction={'row'} key={item._id}>
          <Text>{item.customer_name ? item.customer_name : 'Unknown'}</Text>
          <Spacer/>
            <HStack>
                <Badge>{item.status}</Badge>
                <Button size='xs'>See Analysis</Button>
                <Button colorScheme='blue' onClick={()=> {
                    window.open(item.audio_sample, '_blank');
                }} size='xs'>Download</Button>
                <Button colorScheme='blue' size='xs'>Listen</Button>
            </HStack>
        </Stack>
      ))}
    </Stack>
  );
}
