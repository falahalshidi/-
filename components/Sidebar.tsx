'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { useSidebar } from '@/contexts/SidebarContext'
import {
  LayoutDashboard,
  Store,
  MenuSquare,
  Target,
  BarChart3,
  Bot,
  Image,
  Users,
  Settings,
  FileText,
  TrendingUp,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

const navigation = [
  { name: 'لوحة التحكم', href: '/', icon: LayoutDashboard },
  { name: 'الفروع', href: '/branches', icon: Store },
  { name: 'المنيو', href: '/menu', icon: MenuSquare },
  { name: 'الحملات', href: '/campaigns', icon: Target },
  { name: 'الإحصائيات', href: '/analytics', icon: BarChart3 },
  { name: 'المساعد الذكي', href: '/ai-assistant', icon: Bot },
  { name: 'الموظفين', href: '/staff', icon: Users },
  { name: 'التقارير', href: '/reports', icon: FileText },
]

function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggleSidebar, isMobile } = useSidebar()

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 z-50 w-10 h-10 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-lg flex items-center justify-center transition-all duration-300"
        style={{ right: isOpen ? '260px' : '16px' }}
      >
        {isOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`h-screen bg-white border-l border-gray-200 fixed right-0 top-0 flex flex-col z-40 transition-all duration-300 overflow-hidden ${
          isOpen ? 'w-64' : 'w-0'
        }`}
        style={{
          willChange: 'width',
          transform: 'translateZ(0)',
        }}
      >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-xs text-gray-500">إدارة المطاعم</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600 font-semibold shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-semibold">م</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">مدير النظام</p>
            <p className="text-xs text-gray-500">admin@restaurant.com</p>
          </div>
          <Settings className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
    </>
  )
}

export default memo(Sidebar)

