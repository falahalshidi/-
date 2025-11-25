'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  MapPin, 
  Clock, 
  Phone, 
  Users, 
  TrendingUp, 
  Settings,
  Power,
  Edit,
  BarChart,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useState } from 'react'

interface Branch {
  id: number
  name: string
  address: string
  phone: string
  status: 'active' | 'closed' | 'busy'
  hours: string
  manager: string
  todayOrders: number
  rating: number
  lat: number
  lng: number
}

const branches: Branch[] = [
  {
    id: 1,
    name: 'فرع مسقط - القرم',
    address: 'شارع السلطان قابوس، حي القرم، مسقط',
    phone: '24123456',
    status: 'active',
    hours: '9:00 ص - 12:00 ص',
    manager: 'أحمد محمد',
    todayOrders: 145,
    rating: 4.8,
    lat: 23.5880,
    lng: 58.3829,
  },
  {
    id: 2,
    name: 'فرع صلالة - الحافة',
    address: 'شارع السلام، منطقة الحافة، صلالة',
    phone: '23234567',
    status: 'busy',
    hours: '10:00 ص - 1:00 ص',
    manager: 'خالد عبدالله',
    todayOrders: 203,
    rating: 4.9,
    lat: 17.0150,
    lng: 54.0924,
  },
  {
    id: 3,
    name: 'فرع صحار - الوادي الكبير',
    address: 'شارع صحار، منطقة الوادي الكبير، صحار',
    phone: '26345678',
    status: 'active',
    hours: '9:00 ص - 11:00 م',
    manager: 'سعود الحربي',
    todayOrders: 98,
    rating: 4.6,
    lat: 24.3467,
    lng: 56.7085,
  },
  {
    id: 4,
    name: 'فرع نزوى - العقر',
    address: 'شارع نزوى، منطقة العقر، نزوى',
    phone: '25456789',
    status: 'closed',
    hours: 'مغلق مؤقتاً',
    manager: 'عمر السالم',
    todayOrders: 0,
    rating: 4.5,
    lat: 22.9333,
    lng: 57.5333,
  },
]

export default function BranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(branches[0])
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [showAddBranchModal, setShowAddBranchModal] = useState(false)
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    manager: '',
    hours: '9:00 ص - 12:00 ص'
  })

  const handleAddBranch = () => {
    console.log('إضافة فرع جديد:', newBranch)
    setShowAddBranchModal(false)
    // هنا يمكن إضافة الفرع للقائمة
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'busy': return 'bg-yellow-100 text-yellow-700'
      case 'closed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'busy': return <AlertCircle className="w-4 h-4" />
      case 'closed': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط'
      case 'busy': return 'مشغول'
      case 'closed': return 'مغلق'
      default: return 'غير معروف'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الفروع</h1>
            <p className="text-gray-600">مراقبة وإدارة جميع فروع المطعم</p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
                }`}
              >
                شبكة
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'map' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
                }`}
              >
                خريطة
              </button>
            </div>
            <button 
              onClick={() => setShowAddBranchModal(true)}
              className="btn-primary"
            >
              + إضافة فرع جديد
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الفروع</p>
                <p className="text-3xl font-bold text-gray-900">{branches.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الفروع النشطة</p>
                <p className="text-3xl font-bold text-green-600">
                  {branches.filter(b => b.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات اليوم</p>
                <p className="text-3xl font-bold text-gray-900">
                  {branches.reduce((sum, b) => sum + b.todayOrders, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">متوسط التقييم</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {(branches.reduce((sum, b) => sum + b.rating, 0) / branches.length).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <div key={branch.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(branch.status)}`}>
                        {getStatusIcon(branch.status)}
                        {getStatusText(branch.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {branch.address}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{branch.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>المدير: {branch.manager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BarChart className="w-4 h-4" />
                    <span>{branch.todayOrders} طلب اليوم</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 btn-ghost text-sm">
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </button>
                  <button className="flex-1 btn-ghost text-sm">
                    <Clock className="w-4 h-4 ml-2" />
                    ساعات العمل
                  </button>
                  <button className="flex-1 btn-ghost text-sm">
                    <Power className="w-4 h-4 ml-2" />
                    {branch.status === 'closed' ? 'تفعيل' : 'تعطيل'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Map View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2 card">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">خريطة المواقع</h3>
                <p className="text-sm text-gray-500">جميع فروع المطعم على الخريطة</p>
              </div>
              <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Placeholder Map - In production, use Google Maps or Mapbox */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">خريطة تفاعلية</p>
                      <p className="text-sm text-gray-500 mt-2">يتم التكامل مع Google Maps API</p>
                    </div>
                  </div>
                  {/* Sample markers */}
                  {branches.map((branch, index) => (
                    <div
                      key={branch.id}
                      className="absolute cursor-pointer transform hover:scale-110 transition-transform"
                      style={{
                        top: `${20 + index * 20}%`,
                        right: `${20 + index * 15}%`,
                      }}
                      onClick={() => setSelectedBranch(branch)}
                    >
                      <div className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${
                        branch.status === 'active' ? 'bg-green-500' :
                        branch.status === 'busy' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute top-full mt-2 right-1/2 transform translate-x-1/2 bg-white px-3 py-1 rounded shadow-lg whitespace-nowrap text-xs font-semibold">
                        {branch.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Branch Details */}
            <div className="space-y-4">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الفرع</h3>
                {selectedBranch ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-900">{selectedBranch.name}</h4>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedBranch.status)}`}>
                          {getStatusIcon(selectedBranch.status)}
                          {getStatusText(selectedBranch.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedBranch.address}</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">ساعات العمل</span>
                        <span className="text-sm font-semibold text-gray-900">{selectedBranch.hours}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">رقم الهاتف</span>
                        <span className="text-sm font-semibold text-gray-900">{selectedBranch.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">المدير</span>
                        <span className="text-sm font-semibold text-gray-900">{selectedBranch.manager}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">طلبات اليوم</span>
                        <span className="text-sm font-semibold text-primary-600">{selectedBranch.todayOrders}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">التقييم</span>
                        <span className="text-sm font-semibold text-yellow-600">⭐ {selectedBranch.rating}</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <button className="w-full btn-primary">
                        عرض التقرير الكامل
                      </button>
                      <button className="w-full btn-secondary">
                        تعديل البيانات
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">اختر فرعاً من الخريطة</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-right">
                    <Clock className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-gray-900">تعديل ساعات العمل</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-right">
                    <Settings className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-gray-900">إعدادات الفرع</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-right">
                    <BarChart className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-gray-900">تقرير الأداء</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Branch Modal */}
      {showAddBranchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">إضافة فرع جديد</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اسم الفرع *
                </label>
                <input
                  type="text"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="مثال: فرع مسقط - القرم"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  العنوان الكامل *
                </label>
                <input
                  type="text"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="مثال: شارع السلطان قابوس، حي القرم، مسقط"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  value={newBranch.phone}
                  onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="24123456"
                />
              </div>

              {/* Manager */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اسم المدير *
                </label>
                <input
                  type="text"
                  value={newBranch.manager}
                  onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="مثال: أحمد محمد"
                />
              </div>

              {/* Hours */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ساعات العمل *
                </label>
                <input
                  type="text"
                  value={newBranch.hours}
                  onChange={(e) => setNewBranch({ ...newBranch, hours: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="9:00 ص - 12:00 ص"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddBranchModal(false)}
                className="btn-secondary"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddBranch}
                className="btn-primary"
              >
                <MapPin className="w-4 h-4 ml-2" />
                إضافة الفرع
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

