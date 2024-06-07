"use client"

import {useState, useEffect, createContext, useContext, ReactNode} from "react"

interface IAuthContextProps {
  login: (formData: any) => void;
  logout: ()=>void;
  userData: string[];
  setUserData: (userDate:any) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean)=>void
}

export const authContext = createContext<IAuthContextProps>({
  login: ()=>{},
  logout: ()=>{},
  userData: [],
  setUserData: () => {},
  isLoading: false,
  setIsLoading: ()=>{} 
})

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [userData, setUserData] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const login = async () => {}
  
  const logout = async () => {}

  return(
    <authContext.Provider
      value={{userData, setUserData, login, logout, isLoading, setIsLoading}}
    > 
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  const {login, logout, userData, setUserData, isLoading, setIsLoading} = useContext(authContext)
  return {login, logout, userData, setUserData, isLoading, setIsLoading}
}