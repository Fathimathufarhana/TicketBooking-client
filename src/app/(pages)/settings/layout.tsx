
import React from 'react'
import { Inter } from 'next/font/google';
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

const inter = Inter({ subsets: ["latin"] });


const Layout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  )
}

export default Layout