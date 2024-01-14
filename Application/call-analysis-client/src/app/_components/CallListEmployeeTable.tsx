'use client'

import { ResponseCallInterface } from '@/types/call.types';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'

export default function CallListEmployeeTable({ calls }:{ calls: ResponseCallInterface[] }) {
  return (
    <Table bgColor='white' shadow='sm' borderRadius='md' variant='simple'>
      <Thead>
        <Th fontWeight='bold'>Cust. Name</Th>
        <Th fontWeight='bold'>Cust. Phone</Th>
        <Th fontWeight='bold'>Call Type</Th>
        <Th fontWeight='bold'>Call Date</Th>
        <Th fontWeight='bold'>Sentiment</Th>
        <Th fontWeight='bold'>Status</Th>
      </Thead>
      <Tbody>
        {calls?.map((call) => (
          <Tr key={call.id}>
            <Td>{call.customerName}</Td>
            <Td>{call.customerPhone}</Td>
            <Td>{call.callType[0]}{call.callType.toLocaleLowerCase().slice(1)}</Td>
            <Td>{call.callDateTime.toLocaleString()}</Td>
            <Td>{call.generatedCallSentiment}</Td>
            <Td>{call.callRecordingStatus.slice(0, 1).toUpperCase()}{call.callRecordingStatus.slice(1)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
