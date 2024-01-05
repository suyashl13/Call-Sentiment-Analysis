'use client'
import { useAuth } from '@/app/_providers/AuthProvider';
import { Button } from '@chakra-ui/react';
import React from 'react'

export default function EmployeePage() {

  const handleClick = async () => {
    const a = await fetch('http://localhost:3000/employee/phone-call/sdaasd', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    console.log((await a.json()));
  }

  const { user, status } = useAuth();

  return (
    <div>
      {status}
      <Button size="lg" onClick={handleClick}>Fetch Data</Button></div>
  );
}
