import { changeEmployeeStatus } from "@/helpers/call_helper";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function SwitchEmployeeStatusButton({
  buttonText,
  employeeId,
  ...rest
}: {
  buttonText: string;
  employeeId: string;
  [key: string]: any;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["change-employee-status", employeeId],
    mutationFn: changeEmployeeStatus,
    onSuccess: async (data) => {
      toast({
        title: "Employee Status Changed",
        description: "Employee Status Changed Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      queryClient.refetchQueries({
        queryKey: ['employees'],
      });
    },
    onError: (error) => {
      toast({
        title: "Employee Status Change Failed",
        description: `Employee Status Change Failed (${error.message})`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  });

  return (
    <Button onClick={() => mutate(employeeId)} disabled={isPending} {...rest} size="sm" textColor={"white"}>
      {" "}
      {isPending ?? <Spinner size="sm" mr="2" />} {buttonText}
    </Button>
  );
}
