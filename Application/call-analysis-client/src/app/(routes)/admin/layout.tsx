import { AdminAppShell } from "@/app/_components/AdminAppShell";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <AdminAppShell>{children}</AdminAppShell>;
}
