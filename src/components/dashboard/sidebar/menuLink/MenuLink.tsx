"use client"
import React from 'react'
import styles from './menuLink.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Item {
  item: {
    icon: React.JSX.Element
    path: string
    title: string
  }
}

const MenuLink = ({item}: Item) => {
  const pathname = usePathname()

  return (
    
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink