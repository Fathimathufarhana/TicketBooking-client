"use client"
import React from 'react'
import styles from './sidebar.module.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import MenuLink from './menuLink/MenuLink';
import { Avatar, Box, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <DashboardIcon />,
        },
        {
          title: "Bookings",
          path: "/dashboard/bookings",
          icon: <ConfirmationNumberIcon />,
        },
        {
          title: "Events",
          path: "/dashboard/events",
          icon: <EventIcon />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "User",
          path: "/dashboard/user",
          icon: <GroupIcon />,
        },
        {
          title: "Event popularity",
          path: "/dashboard/event-popularity",
          icon: <EmojiEventsIcon />,
        },
        {
          title: "Ticket",
          path: "/dashboard/ticket",
          icon: <TrendingUpIcon />,
        },
      ],
    },
  ];

  
  const Sidebar = () => {

  const { logout } = useAuth()

  const handleLogOut = () => {
    logout()
    console.log("handleLogOut")
  }

  return (

    <div className={styles.container}>
        <div className={styles.user}>
          <Avatar src="/avatar.jpeg" className={styles.userImage}/>
          <div className={styles.userDetail}>
            <span className={styles.username}>Admin</span>
            <span className={styles.userTitle}>Administrator</span>
          </div>
        </div>
           <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    
        <Button className={styles.logout} onClick={handleLogOut}>
          <LogoutIcon />
          Logout
        </Button>
    </div>
  )
}

export default Sidebar