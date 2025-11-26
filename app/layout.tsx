import type { Metadata } from 'next'
import './globals.css'
import AppProviders from './providers'

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
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
