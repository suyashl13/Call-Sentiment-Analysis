"use client";

import React from "react";
import AuthProvider from "./_providers/AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
