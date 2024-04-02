'use client'

import EmployeeList from '@/app/_components/EmployeeList';
import { getEmployees } from '@/helpers/call_helper';
import { Box, Center, Divider, Spinner, Text, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function Page() {
  const {
    data,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployees(),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    throw error;
  }

  return (
    <Box>
      <VStack align="flex-start" mb='2'>
        <Text fontWeight="bold" fontSize={"2xl"}>
          Employee Calls
        </Text>
        <Divider />
      </VStack>
      <Box>
        {isLoading ?  <Center><Spinner /></Center> : <EmployeeList showCallsColumn={true} employeeList={data} />}
      </Box>
    </Box>
  )
}
