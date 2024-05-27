import {
    Avatar,
    Button,
    HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import SwitchEmployeeStatusButton from "./SwitchEmployeeStatusButton";

export default function EmployeeList({
  employeeList,
  showCallsColumn = false,
}: {
  employeeList: any[];
  showCallsColumn?: boolean
}) {
  return (
    <Table backgroundColor={useColorModeValue("white", "gray.800")} borderRadius='md' shadow='sm'>
      <Thead>
        <Tr>
          <Th>Employee</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {employeeList.map((employee) => (
          <Tr key={employee.id}>
            <Td>
              <HStack>
              <Avatar
                    mr="4"
                    size="md"
                    name="profile-avatar"
                    src={employee.profilePicture ?? "https://bit.ly/dan-abramov"}
                    cursor="pointer"
                  />
              <VStack align="flex-start">
                <Text>{employee.name}</Text>
                <Text>{employee.email}</Text>
              </VStack>
              </HStack>
            </Td>
            <Td>{employee.isActive ? "Active" : "Disabled"}</Td>
            <Td alignItems="end">{showCallsColumn ? <Link href={`calls/emp/${employee.id}`}><Text color={'blue.500'}>See Calls</Text></Link> : <SwitchEmployeeStatusButton 
            bgColor={employee.isActive ? "red.500" : "green.500"}
            employeeId={employee.id} buttonText={employee.isActive ? "Disable" : "Enable"} />}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
