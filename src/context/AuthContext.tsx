"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, ReactNode, useEffect } from 'react'
import { authConfig } from '../config/authConfig'
import axios from 'axios'
import url from '@/config/url'
import type { AuthProvider, Login } from './types'

export const defaultProvider: AuthProvider = {
  login : () => Promise.resolve(),
  logout : () => Promise.resolve(),
  confirmAuth : () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

export type Props = {
  children: ReactNode
}

const AuthProvider = ({children}: Props) => {

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    confirmAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const confirmAuth = async (): Promise<void> => {
    const storedToken = localStorage.getItem(authConfig.accessToken)!
    const headers = { Authorization: `Bearer ${storedToken}` };
    if ( ! storedToken ){
      
      if ( pathname !== '/register')  router.push("/login")
      
    } else {
        const response = axios.post(`${url.serverUrl}/user/test_auth_check`,{},{headers})
        .then(res => {
          const { access_token , data} = res.data;
          localStorage.setItem(authConfig.accessToken, access_token)
          localStorage.setItem('role', data.role)
          localStorage.setItem('user_id', data._id)
        })
        .catch(() => {
          localStorage.removeItem('user_id')
          localStorage.removeItem('role')
          localStorage.removeItem(authConfig.accessToken)

          const redirectURL = '/login'
          router.replace(redirectURL)
        })
    }
  }

  const handleLogin = async (params: Login, error ?: (err: string) => void): Promise<void> => {
    axios.post(`${url.serverUrl}/user/login`,params).then(res => {
      const { access_token , data} = res.data;
      localStorage.setItem(authConfig.accessToken, access_token)
      localStorage.setItem('role', data.role)
      localStorage.setItem('user_id', data._id)
      {
      data.role === "admin" ? router.push("/dashboard") : router.push("/")
      }
    }).catch ( err => {
      if (error) error(err)
    })  
  }

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem(authConfig.accessToken)
    localStorage.removeItem("role")
    localStorage.removeItem("user_id")
    router.push("/login")
  }

  const values = {
    confirmAuth,
    login : handleLogin,
    logout : handleLogout
  }


  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
