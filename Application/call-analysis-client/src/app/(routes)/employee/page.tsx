"use client";

import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import React from "react";

export default function EmployeePage() {
  redirect("/employee/calls");
  return <Box>HomePage</Box>;
}
