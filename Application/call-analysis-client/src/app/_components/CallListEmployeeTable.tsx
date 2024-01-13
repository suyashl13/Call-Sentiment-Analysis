'use client'

import { ResponseCallInterface } from '@/types/call.types';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'

export default function CallListEmployeeTable({ calls }:{ calls: ResponseCallInterface[] }) {
  return (
    <Table bgColor='white' shadow='sm' borderRadius='md'>
      <Thead>
        <Th>Cust. Name</Th>
        <Th>Cust. Phone</Th>
        <Th>Call Type</Th>
        <Th>Call Date</Th>
        <Th>Sentiment</Th>
        <Th>Status</Th>
      </Thead>
      <Tbody>
        {calls?.map((call) => (
          <Tr key={call.id}>
            <Td>{call.customerName}</Td>
            <Td>{call.customerPhone}</Td>
            <Td>{call.callType[0]}{call.callType.toLocaleLowerCase().slice(1)}</Td>
            <Td>{call.callDateTime.toLocaleString()}</Td>
            <Td>{call.generatedCallSentiment}</Td>
            <Td>{call.callRecordingStatus}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
