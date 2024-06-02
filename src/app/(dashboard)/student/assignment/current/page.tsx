"use client"

import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@nextui-org/react'

import axios from "axios"

const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {data: session} = useSession()

  const fetchAssignment = async () => {
    try {
      setIsLoading(true)

      const res = await axios.get(`/api/student/assignment/get-assignment/${session?.user?._id}`)
      console.log(res.data.assignments)
    } catch (error:any) {
      console.log("Error while acquiring the assignment: ", error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Button isLoading={isLoading} onClick={fetchAssignment}>Get Assignment</Button>
  )
}

export default Page