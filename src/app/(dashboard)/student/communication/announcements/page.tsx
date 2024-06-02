"use client"

import React, {useState} from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react'

const Page = () => {
  const pathname = usePathname()
  const pathnameValue = pathname.split("/")
  return (
    <div className="lg:flex hidden h-screen w-1/3 bg-secondary-400">
				<Button
					onClick={() => {
						console.log(pathnameValue);
					}}
				>
					Change Loaded
				</Button>
			</div>
  )
}

export default Page