"use client"

import React from "react"

import { Button } from "@nextui-org/react"
import {SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Page = () => {
  return(
    <div><header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header></div>
  )
}

export default Page