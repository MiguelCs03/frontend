import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BusinessProfileHeader } from "@/components/business-profile-header"
import { AuthProvider } from "@/contexts/AuthContext"
import { SimpleAuthProvider } from "@/contexts/SimpleAuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Weltivation - Transform Your Business",
  description: "Revolutionary technology solutions that drive growth and innovation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('weltivation-theme') || 'dark';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
                document.documentElement.style.colorScheme = resolvedTheme;
              } catch (e) {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
              }
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SimpleAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <BusinessProfileHeader />
            {children}
          </ThemeProvider>
        </SimpleAuthProvider>
      </body>
    </html>
  )
}
