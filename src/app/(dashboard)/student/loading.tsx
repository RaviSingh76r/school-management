"use client"

import React from "react"

import { Spinner } from "@nextui-org/react"

export default function Loading(){
  return(
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}