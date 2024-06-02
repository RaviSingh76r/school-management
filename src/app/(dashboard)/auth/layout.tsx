"use client"

import React, {FC, ReactNode} from "react"

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  return(
    <div className="min-h-screen min-w-full flex items-center justify-center">
      {children}
    </div>
  )
}

export default AuthLayout