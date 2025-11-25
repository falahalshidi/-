'use client'

import { Bell, Search, Menu } from 'lucide-react'
import { useState, memo } from 'react'
import { useRouter } from 'next/navigation'

function Header() {
  const [notifications] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // يمكن تنفيذ البحث هنا
      console.log('البحث عن:', searchQuery)
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 transition-all duration-300">
      <div className="h-full px-6 flex items-center justify-between" style={{ paddingRight: '4rem' }}>
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن الفروع، الأطباق، الحملات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mr-6">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900">الإشعارات</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <p className="text-sm text-gray-900 font-semibold">طلب جديد من فرع مسقط</p>
                    <p className="text-xs text-gray-500 mt-1">منذ 5 دقائق</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <p className="text-sm text-gray-900 font-semibold">تم تفعيل حملة جديدة</p>
                    <p className="text-xs text-gray-500 mt-1">منذ ساعة</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-900 font-semibold">مراجعة جديدة من عميل</p>
                    <p className="text-xs text-gray-500 mt-1">منذ ساعتين</p>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 text-center">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    عرض جميع الإشعارات
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button 
              onClick={() => router.push('/branches')}
              className="btn-primary text-sm"
            >
              إضافة فرع جديد
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)

