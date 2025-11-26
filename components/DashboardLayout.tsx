'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  const { user, openAuthModal } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">تحتاج لتسجيل الدخول</h2>
          <p className="text-gray-600 text-sm">
            يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول للوحة التحكم.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="btn-primary" onClick={() => openAuthModal('login')}>
              تسجيل الدخول
            </button>
            <button className="btn-secondary" onClick={() => openAuthModal('register')}>
              إنشاء حساب
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div 
        className="transition-all duration-300"
        style={{ 
          marginRight: isOpen ? '256px' : '0px',
          willChange: 'margin-right',
          transform: 'translateZ(0)',
        }}
      >
        <Header />
        <main className="pt-16 min-h-screen">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
