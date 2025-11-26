'use client'

import DashboardLayout from '@/components/DashboardLayout'
import StatCard from '@/components/StatCard'
import { 
  Users, 
  Eye, 
  Phone, 
  MapPin, 
  TrendingUp, 
  Star,
  DollarSign,
  ShoppingCart,
  AlertCircle
} from 'lucide-react'
import dynamic from 'next/dynamic'
import LandingPage from '@/components/LandingPage'
import { useAuth } from '@/contexts/AuthContext'

// Import Recharts dynamically to avoid SSR issues
const Chart = dynamic(() => import('@/components/Chart'), { 
  ssr: false,
  loading: () => <div className="w-full h-[300px] flex items-center justify-center text-gray-400">جاري تحميل الرسم البياني...</div>
})

const topDishes = [
  { name: 'برجر كلاسيك', views: 1234, orders: 456, rating: 4.8 },
  { name: 'بيتزا مارغريتا', views: 1123, orders: 389, rating: 4.7 },
  { name: 'سلطة سيزر', views: 987, orders: 312, rating: 4.6 },
  { name: 'باستا الفريدو', views: 876, orders: 289, rating: 4.5 },
  { name: 'ستيك لحم', views: 765, orders: 267, rating: 4.9 },
]

const alerts = [
  { id: 1, type: 'warning', message: 'طبق "سلطة خضراء" لم يحصل على طلبات منذ 5 أيام', action: 'تعديل السعر' },
  { id: 2, type: 'info', message: 'فرع جدة يحتاج تحديث ساعات العمل', action: 'تحديث' },
  { id: 3, type: 'success', message: 'حملة "خصم 20%" حققت 150 طلب جديد', action: 'عرض التفاصيل' },
]

export default function HomePage() {
  const { user } = useAuth()

  if (!user) {
    return <LandingPage />
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم الرئيسية</h1>
          <p className="text-gray-600">نظرة شاملة على أداء مطاعمك</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="إجمالي الزيارات"
            value="24,532"
            change={12.5}
            icon={Users}
            trend="up"
          />
          <StatCard
            title="مشاهدات المنيو"
            value="18,743"
            change={8.2}
            icon={Eye}
            trend="up"
          />
          <StatCard
            title="نقرات الاتصال"
            value="1,234"
            change={-2.4}
            icon={Phone}
            trend="down"
          />
          <StatCard
            title="نقرات الموقع"
            value="3,456"
            change={15.8}
            icon={MapPin}
            trend="up"
          />
        </div>

        {/* Charts Row */}
        <Chart />

        {/* Top Dishes & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Dishes */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">الأطباق الأكثر مشاهدة</h3>
                <p className="text-sm text-gray-500">أفضل 5 أطباق هذا الأسبوع</p>
              </div>
              <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                عرض الكل ←
              </button>
            </div>
            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{dish.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {dish.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4" />
                        {dish.orders}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {dish.rating}
                      </span>
                    </div>
                  </div>
                  <button className="btn-ghost text-xs">
                    التفاصيل
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Alerts */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">التنبيهات الذكية</h3>
                <p className="text-sm text-gray-500">توصيات تحتاج اهتمامك</p>
              </div>
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                {alerts.length} جديد
              </span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-r-4 ${
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                    alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                    'bg-green-50 border-green-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'info' ? 'text-blue-600' :
                      'text-green-600'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-2">{alert.message}</p>
                      <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                        {alert.action} ←
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 mb-2">متوسط سعر الطلب</p>
                <p className="text-3xl font-bold">33 ريال</p>
                <p className="text-primary-100 text-sm mt-2">↑ 5.2% من الشهر الماضي</p>
              </div>
              <DollarSign className="w-12 h-12 text-primary-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-2">معدل الرضا</p>
                <p className="text-3xl font-bold">4.7/5</p>
                <p className="text-green-100 text-sm mt-2">↑ 0.3 من الشهر الماضي</p>
              </div>
              <Star className="w-12 h-12 text-green-200 fill-green-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-2">نمو الطلبات</p>
                <p className="text-3xl font-bold">+23%</p>
                <p className="text-purple-100 text-sm mt-2">مقارنة بالشهر الماضي</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
