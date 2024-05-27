"use client";

import { ResponseCallInterface } from "@/types/call.types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

export default function CallListEmployeeTable({
  calls,
  showAddedBy = false,
}: {
  calls: ResponseCallInterface[];
  showAddedBy?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCall, setSelectedCall] =
    React.useState<ResponseCallInterface | null>(null);
  const cancelRef = React.useRef();

  return (
    <>
      <Table bgColor="white" shadow="sm" borderRadius="md" variant="simple">
        <Thead>
          <Th fontWeight="bold">Cust. Name</Th>
          <Th fontWeight="bold">Cust. Phone</Th>
          <Th fontWeight="bold">Call Type</Th>
          <Th fontWeight="bold">Call Date</Th>
          <Th fontWeight="bold">Status</Th>
        </Thead>
        <Tbody>
          {calls?.map((call) => (
            <Tr key={call.id}>
              <Td>{call.customerName}</Td>
              <Td>{call.customerPhone}</Td>
              <Td>
                {call.callType[0]}
                {call.callType.toLocaleLowerCase().slice(1)}
              </Td>
              <Td>{call.callDateTime.toLocaleString()}</Td>
              <Td>
                {call.callRecordingStatus.slice(0, 1).toUpperCase()}
                {call.callRecordingStatus.slice(1)}
              </Td>
              <Td>
                <Button
                  colorScheme={
                    call.callRecordingStatus.toLocaleLowerCase() !== "pending"
                      ? "blue"
                      : "red"
                  }
                  onClick={() => {
                    if (
                      call.callRecordingStatus.toLocaleLowerCase() !== "pending"
                    ) {
                      onOpen();
                      setSelectedCall(call);
                    }
                  }}
                >
                  Report
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Call Prediction Report
            </AlertDialogHeader>

            <AlertDialogBody>
              <PieChart
                label={(props) => {
                  return props.dataEntry.title;
                }}
                labelStyle={() => ({ fontSize: "4px" })}
                radius={40}
                data={
                  selectedCall
                    ? Object.keys(
                        JSON.parse(selectedCall.predictionResult)
                      ).map((key: any, index: number) => ({
                        title: `${key} ${
                          JSON.parse(selectedCall.predictionResult)[key]
                        } %`,
                        label: `${key} ${
                          JSON.parse(selectedCall.predictionResult)[key]
                        } %`,
                        value: JSON.parse(selectedCall.predictionResult)[key],
                        color: getRandomColor(),
                      }))
                    : []
                }
              />
              <Divider />
              <Table>
                <Tbody>
                  {selectedCall
                    ? Object.keys(
                        JSON.parse(selectedCall.predictionResult)
                      ).map((key: any, index: number) => (
                        <Tr key={index}>
                          <Th fontWeight={"bold"}>{key}</Th>
                          <Td>
                            {JSON.parse(selectedCall.predictionResult)[key]}%
                          </Td>
                        </Tr>
                      ))
                    : null}
                </Tbody>
              </Table>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={() => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_BASE_URI}/${selectedCall?.callRecordingUrl}`,
                    "_blank"
                  );
                  onClose();
                }}
                ml={3}
              >
                Play Audio
              </Button>
              <Button colorScheme="blue" onClick={onClose} ml={3}>
                Okay
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const getValuesMap = (data: any) => {
  const result: any = [];
  console.log(data);

  const data2 = JSON.parse(data);
  for (const key in Object.keys(data2)) {
    result.push({ title: key, value: data[key], color: "#E38627" });
  }

  return result;
};

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
