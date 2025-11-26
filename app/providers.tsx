'use client'

import { SidebarProvider } from '@/contexts/SidebarContext'
import { AuthProvider } from '@/contexts/AuthContext'
import AuthModal from '@/components/auth/AuthModal'
import OnboardingModal from '@/components/auth/OnboardingModal'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
      <AuthModal />
      <OnboardingModal />
    </AuthProvider>
  )
}
