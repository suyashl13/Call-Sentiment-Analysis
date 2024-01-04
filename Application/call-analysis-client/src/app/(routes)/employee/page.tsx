'use client'
import { Button } from '@nextui-org/react';
import React from 'react'

export default function EmployeePage() {

  const handleClick = async () => {
    const a = await fetch('http://localhost:3000/employee-phone-call/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    console.log(await a.json())
  }

  return (
    <div><Button size="lg" onClick={handleClick}>Fetch Data</Button></div>
  );
}
