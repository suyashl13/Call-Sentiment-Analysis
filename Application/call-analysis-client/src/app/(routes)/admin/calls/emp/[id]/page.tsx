'use client'

import CallListEmployeeTable from '@/app/_components/CallListEmployeeTable'
import { getEmployeeCallsById } from '@/helpers/call_helper'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { id: employeeId }: { id: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['employee-calls', ],
    queryFn: () => getEmployeeCallsById(employeeId),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })

  return (
    isLoading === false ? <CallListEmployeeTable calls={data as any[]} /> : null
  )
}
