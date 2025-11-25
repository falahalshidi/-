'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { useSidebar } from '@/contexts/SidebarContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  
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

