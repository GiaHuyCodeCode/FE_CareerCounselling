"use client"
import Link from "next/link";
import { Flex, Button } from "@chakra-ui/react";
import { BiHistory } from "react-icons/bi";
import { UserButton } from "@clerk/nextjs";

interface HeaderProps{
  userId: string | null;
}

const Nav = ({userId} : HeaderProps) =>{
  return (
    <Flex
      as="nav"
      py={2}
      px={5}
      w="full"
      h={20}
      justifyContent="space-between"
      alignItems="center"
      overflowX="hidden"
    >
      <Link href="/">
        <Button
          colorScheme="black"
          variant="link"
          fontWeight="bold"
          textTransform="uppercase"
        >
         CareerCounselling
        </Button>
      </Link>
      <div className="flex items-center justify-center flex-grow">
    <div className="mx-8 hover:transition-all hover:text-teal-500 hover:duration-300 cursor-pointer text-[1A202C] text-base font-bold uppercase">
    <Link href="/blog" className="py-3 block">
      Blog
      </Link>
    </div>
<div  className="mx-8 hover:transition-all hover:text-teal-500 hover:duration-300 cursor-pointer text-[1A202C] text-base font-bold uppercase">
<Link href="/test" className="py-3 block">
      Test
      </Link>
</div>
  <div  className="mx-8 hover:transition-all hover:text-teal-500 hover:duration-300 cursor-pointer text-[1A202C] text-base font-bold uppercase">
  <Link href="/predict" className="py-3 block">
      Predict
      </Link>
  </div>
  {/* <div  className="mx-8 hover:transition-all hover:text-teal-500 hover:duration-300 cursor-pointer text-[1A202C] text-base font-bold uppercase">
  <Link href="/sign-in" className="py-3 block">
      Signin
      </Link>
  </div> */}
  
      </div>

      <Link href="/test/result/history">
        <Button
          variant="outline"
          leftIcon={<BiHistory size={24} />}
        >
          Test Result History
        </Button>
      </Link>
      <div className="mx-8 hover:transition-all hover:text-teal-500 hover:duration-300 cursor-pointer text-[1A202C] text-base font-bold uppercase">
      {/* <Link href="/test/result/history">
        <Button
          variant="outline"
          leftIcon={<BiHistory size={24} />}
        >
          Test Result History
        </Button>
      </Link> */}
      <Button>
          {userId ? (
            <div className='flex gap-4 items-center'>
              
              <UserButton />
            </div>
          ) : (
            <div className='flex gap-4 items-center'>
              
              <Link href='/sign-in'>Sign In</Link>
            </div>
          )}
       </Button>
      </div>
      {/* {userId ? (
        <div className="ml-4 flex items-center space-x-4">
                        <UserButton afterSignOutUrl="/"/>
        </div>
                ) : (
                   
                        <Link href={"/sign-in"}>
                            <Button variant="outline">Sign in</Button>
                        </Link>
                       
                    
                )}

                {userId}       */}
            

    </Flex>
  );
}
export default Nav;