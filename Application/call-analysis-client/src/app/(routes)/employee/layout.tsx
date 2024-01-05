"use client";
import { EmployeeShell } from "@/app/_components/EmployeeAppShell";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <EmployeeShell>{children}</EmployeeShell>;
}
