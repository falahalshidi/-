import type { Metadata } from 'next'
import './globals.css'
import { SidebarProvider } from '@/contexts/SidebarContext'

export const metadata: Metadata = {
  title: 'لوحة تحكم المطعم - نظام إدارة متكامل',
  description: 'منصة إدارة مطاعم متكاملة مع ذكاء اصطناعي وتحليلات متقدمة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}

