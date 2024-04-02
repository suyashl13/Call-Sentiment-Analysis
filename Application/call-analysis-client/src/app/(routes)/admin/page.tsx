'use client'

import CallListEmployeeTable from "@/app/_components/CallListEmployeeTable";
import { getAdminHomeScreenCalls } from "@/helpers/call_helper";
import { Box, Center, Divider, Spinner, Text, VStack } from "@chakra-ui/react";
import { useQuery } from '@tanstack/react-query'
import React from "react";

export default function AdminPage() {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['calls'],
    queryFn: () => getAdminHomeScreenCalls(),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  return (
    <Box>
      <VStack align="flex-start">
        <Text fontWeight="bold" fontSize={"2xl"}>
          Recent Calls
        </Text>
        <Divider />
      </VStack>
      <Box>
        {isLoading ?  <Center p={16}><Spinner /></Center> : <CallListEmployeeTable calls={data} showAddedBy={true} />}
      </Box>
    </Box>
  );
}
