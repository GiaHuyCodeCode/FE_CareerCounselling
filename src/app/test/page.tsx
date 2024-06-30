"use client";

import MainLayout from '@/src/Components/layouts/main-layout'
import TestDisplay from '@/src/Components/test/test-display'
import React from 'react'

type Props = {}

export default function Test({}: Props) {
  return (
    <MainLayout>
    <TestDisplay />
    
  </MainLayout>
  )
}