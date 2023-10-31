'use client'

import { Box, Center, Divider, Heading, Spinner } from '@chakra-ui/react'
import React from 'react'
import CallList from './components/CallList'

export default function DashboardPage() {

  return (
    <Center>
        <Box
            px={{ sm: '2.5'}}
            mt={{ sm: '2', md: '5', lg: 10, xl: 10}}
            w={{
                'xl': 'container.xl',
                'md': 'container.md',
                'lg': 'container.lg',
                'sm': 'container.sm'
            }}
        >
            <Heading>Your Calls</Heading>
            <Divider my='2' mb='6' />
            <React.Suspense fallback={<Spinner/>}>
                <CallList />
            </React.Suspense>
        </Box>
    </Center>
  )
}
