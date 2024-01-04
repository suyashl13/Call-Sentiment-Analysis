'use client'

import React from 'react'
import {NextUIProvider} from "@nextui-org/react";
import AuthProvider from './_providers/AuthProvider';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <NextUIProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NextUIProvider>
  )
}