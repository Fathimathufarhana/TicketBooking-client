import Navbar from '@/components/dashboard/navbar/Navbar'
import Sidebar from '@/components/dashboard/sidebar/Sidebar'
import React from 'react'
import styles from '@/components/dashboard/dashboard.module.css'

const Layout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className={styles.container}>
        <div className={styles.menu}>
            <Sidebar />
        </div>
        <div className={styles.content}>
            <Navbar />
            {children}
        </div>
    </div>
  )
}

export default Layout