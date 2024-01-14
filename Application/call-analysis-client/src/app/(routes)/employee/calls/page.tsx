"use client";
import CallListEmployeeTable from "@/app/_components/CallListEmployeeTable";
import { getCalls } from "@/helpers/call_helper";
import { CallsResponse } from "@/types/call.types";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

export default function EmployeeCallsPage() {
  const [page, setPage] = React.useState<number>(0);
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    error,
    isError,
    isLoading,
    isFetching,
  } = useInfiniteQuery<CallsResponse, Error>({
    queryKey: ["calls"],
    queryFn: ({ pageParam }) => getCalls(pageParam as any),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.paging.next,
    getPreviousPageParam: (lastPage) => lastPage.paging.previous,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    throw error;
  }

  return (
    <Box>
      <Flex mb={2} justifyContent={"space-between"} align="flex-end">
        <Text fontWeight="bold" fontSize={"2xl"}>
          Your Calls
        </Text>
        <HStack mb={1}>
          <Input size="sm" borderRadius="md" type="date" />
          <Text fontSize="small" fontWeight='semibold'>To</Text>
          <Input size="sm" borderRadius="md" type="date" />
        </HStack>
      </Flex>
      {isLoading || isFetching ? (
        <Center p={5} m={5}>
          <Spinner />
        </Center>
      ) : (
        <CallListEmployeeTable calls={data?.pages[page]?.data!} />
      )}
      <Center>
        <Stack direction={"row"} mt={5}>
          <Button
            isDisabled={page === 0}
            onClick={() => {
              fetchPreviousPage();
              setPage((page) => page - 1);
            }}
          >
            Previous
          </Button>
          <Button
            isDisabled={data?.pages[0].paging.pages! <= page + 1}
            onClick={() => {
              setPage((page) => page + 1);
              fetchNextPage();
            }}
          >
            Next
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
