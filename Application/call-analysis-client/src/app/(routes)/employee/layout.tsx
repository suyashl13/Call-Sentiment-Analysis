'use client'
import { EmployeeShell } from '@/app/_components/EmployeeNavbar'
import React from 'react'

export default function layout({ children }: {children: React.ReactNode}) {
  return (
    <>
    <EmployeeShell>
        <div>Employee</div>
        {children}
        </EmployeeShell>
    </>
  )
}
