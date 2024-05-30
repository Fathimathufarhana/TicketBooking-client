import { AuthProvider } from "@/context/AuthContext";
import Providers from "@/redux/Provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import '@/components/global.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
