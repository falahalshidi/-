'use client'

import { Bell, Search, Menu } from 'lucide-react'
import { useState, memo } from 'react'

function Header() {
  const [notifications] = useState(3)

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 transition-all duration-300">
      <div className="h-full px-6 flex items-center justify-between" style={{ paddingRight: '4rem' }}>
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن الفروع، الأطباق، الحملات..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mr-6">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">
              إضافة طبق جديد
            </button>
            <button className="btn-primary text-sm">
              حملة جديدة
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)

