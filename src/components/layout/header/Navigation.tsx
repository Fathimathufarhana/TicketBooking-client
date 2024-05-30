import {
    MenuItem,
    MenuList,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from 'react'

const Navigation = () => {
    const router = useRouter()
  return (
    <MenuList className="menuList">
        <MenuItem onClick={() => router.push('/')}>Home</MenuItem>
        <MenuItem onClick={() => router.push('/events')}>Events</MenuItem>
        <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
    </MenuList>
  )
}

export default Navigation

