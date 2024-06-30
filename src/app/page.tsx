// "use client"

import MainLayout from '@/src/Components/layouts/main-layout'
import { Button, Flex, Heading, Highlight, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Image from "next/image";
import { auth, currentUser } from '@clerk/nextjs/server'




type Props = {}

export default  function page({}: Props) {
  
    // const { userId } = auth();
    // const user = await currentUser();
  
    
  return (
   
    <MainLayout>
    
    <Flex
      w={{
        base: "full",
        lg: "50%",
      }}
      alignSelf="center"
      px={4}
      gap={8}
      minH="full"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
        

      <Heading
        as="h1"
        lineHeight="tall"
        textAlign="center"
      >
       
        <Highlight
          query="MBTI Personality Test"
          styles={{
            py: 1,
            px: 4,
            rounded: "full",
            bg: "primary.500",
            color: "white",
          }}
        >
          Welcome to MBTI Personality Test
        </Highlight>
      </Heading>
      <Text
        fontSize="xl"
        align="center"
      >
        Learn to know yourself better with this personality test.
      </Text>
      <Link href="/test">
        <Button
          w="min-content"
          colorScheme="primary"
          variant="outline"
          rightIcon={<FiArrowRight size={20} />}
        >
          Take Test
        </Button>
      </Link>
    </Flex>
  </MainLayout>

  )
}

