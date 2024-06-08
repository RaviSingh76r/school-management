"use client"

import React from "react"

import {Spinner} from "@nextui-org/react"

const Loading = () => {
  return(
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <Spinner/>
    </div>
  )
}

export default Loading