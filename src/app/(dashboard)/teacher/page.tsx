"use client"

import React from 'react'

import { signOut } from 'next-auth/react'
import { Button } from '@nextui-org/react'

const Page = () => {
  return(
    <Button onClick={()=>signOut()}>
      Logout
    </Button>
  )
}

export default Page