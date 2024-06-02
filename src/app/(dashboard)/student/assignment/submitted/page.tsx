"use client";

import React, { useState } from 'react';
import axios from "axios";
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    attachmentId: ""
  }

  const handleSubmission = async () => {
    if (!session?.user?._id) {
      toast.error("User not authenticated");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.put(`/api/student/assignment/submit-assignment/${session.user._id}/66580b881deb32f83e067a5f`, data);
      
      if (res.data.success) {
        toast.success("Assignment submitted successfully");
        console.log(res.data.assignment);
      } else {
        toast.error(res.data.message || "Failed to submit assignment");
      }
    } catch (error:any) {
      toast.error(error.response?.data?.message || "Something went wrong while submitting the assignment");
      console.error("Error while submitting the assignment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen min-w-full flex items-center justify-center'>
      <Button onClick={handleSubmission} isLoading={isLoading} disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Assignment'}
      </Button>
      <Toaster />
    </div>
  );
};

export default Page;
