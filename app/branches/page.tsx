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
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface WorkingDay {
  day: string
  open: string
  close: string
  isClosed: boolean
}

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
  workingHours: WorkingDay[]
}

const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']

const createWorkingHours = (open: string, close: string, closedDay?: string): WorkingDay[] => {
  return daysOfWeek.map((day) => ({
    day,
    open,
    close,
    isClosed: closedDay ? day === closedDay : false,
  }))
}

const formatHoursSummary = (schedule: WorkingDay[]) => {
  const firstWorkingDay = schedule.find((day) => !day.isClosed)
  if (!firstWorkingDay) {
    return 'مغلق مؤقتاً'
  }
  return `${firstWorkingDay.open} - ${firstWorkingDay.close}`
}

const parseHours = (value: string) => {
  if (!value.includes('-')) {
    return { open: '9:00 ص', close: '12:00 ص' }
  }
  const [open = '9:00 ص', close = '12:00 ص'] = value.split('-').map((part) => part.trim())
  return { open, close }
}

const initialBranches: Branch[] = [
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
    lat: 23.588,
    lng: 58.3829,
    workingHours: createWorkingHours('9:00 ص', '12:00 ص'),
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
    lat: 17.015,
    lng: 54.0924,
    workingHours: createWorkingHours('10:00 ص', '1:00 ص'),
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
    workingHours: createWorkingHours('9:00 ص', '11:00 م'),
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
    workingHours: createWorkingHours('9:00 ص', '11:00 م', 'الجمعة'),
  },
]

const getStatusColor = (status: Branch['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700'
    case 'busy':
      return 'bg-yellow-100 text-yellow-700'
    case 'closed':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getStatusIcon = (status: Branch['status']) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4" />
    case 'busy':
      return <AlertCircle className="w-4 h-4" />
    case 'closed':
      return <XCircle className="w-4 h-4" />
    default:
      return null
  }
}

const getStatusText = (status: Branch['status']) => {
  switch (status) {
    case 'active':
      return 'نشط'
    case 'busy':
      return 'مشغول'
    case 'closed':
      return 'مغلق'
    default:
      return 'غير معروف'
  }
}

type Feedback = { type: 'success' | 'error'; message: string } | null

const cloneBranch = (branch: Branch): Branch => ({
  ...branch,
  workingHours: branch.workingHours.map((day) => ({ ...day })),
})

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(initialBranches)
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(initialBranches[0]?.id ?? null)
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [showAddBranchModal, setShowAddBranchModal] = useState(false)
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    manager: '',
    hours: '9:00 ص - 12:00 ص',
  })
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null)
  const [hoursBranch, setHoursBranch] = useState<Branch | null>(null)
  const [statusBranch, setStatusBranch] = useState<Branch | null>(null)
  const [feedback, setFeedback] = useState<Feedback>(null)

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === selectedBranchId) ?? null,
    [branches, selectedBranchId]
  )

  useEffect(() => {
    if (!feedback) return
    const timeout = setTimeout(() => setFeedback(null), 4000)
    return () => clearTimeout(timeout)
  }, [feedback])

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ type, message })
  }

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.address || !newBranch.phone || !newBranch.manager) {
      showFeedback('الرجاء تعبئة جميع الحقول المطلوبة', 'error')
      return
    }

    const parsed = parseHours(newBranch.hours)
    const newBranchData: Branch = {
      id: Date.now(),
      name: newBranch.name,
      address: newBranch.address,
      phone: newBranch.phone,
      status: 'active',
      hours: newBranch.hours,
      manager: newBranch.manager,
      todayOrders: 0,
      rating: 4.7,
      lat: 0,
      lng: 0,
      workingHours: createWorkingHours(parsed.open, parsed.close),
    }

    setBranches((prev) => [...prev, newBranchData])
    setSelectedBranchId(newBranchData.id)
    setShowAddBranchModal(false)
    setNewBranch({
      name: '',
      address: '',
      phone: '',
      manager: '',
      hours: '9:00 ص - 12:00 ص',
    })
    showFeedback('تمت إضافة الفرع الجديد بنجاح')
  }

  const handleSaveBranch = () => {
    if (!editingBranch) return
    if (!editingBranch.name || !editingBranch.address || !editingBranch.phone) {
      showFeedback('تأكد من تعبئة كل البيانات قبل الحفظ', 'error')
      return
    }

    setBranches((prev) => prev.map((branch) => (branch.id === editingBranch.id ? editingBranch : branch)))
    setEditingBranch(null)
    showFeedback('تم تحديث بيانات الفرع')
  }

  const handleSaveWorkingHours = () => {
    if (!hoursBranch) return

    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === hoursBranch.id
          ? {
              ...hoursBranch,
              hours: formatHoursSummary(hoursBranch.workingHours),
            }
          : branch
      )
    )
    setHoursBranch(null)
    showFeedback('تم تحديث ساعات العمل')
  }

  const confirmStatusToggle = () => {
    if (!statusBranch) return
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === statusBranch.id
          ? { ...branch, status: branch.status === 'closed' ? 'active' : 'closed' }
          : branch
      )
    )
    showFeedback(
      statusBranch.status === 'closed' ? 'تم تفعيل الفرع من جديد' : 'تم إيقاف الفرع مؤقتاً'
    )
    setStatusBranch(null)
  }

  const handleQuickReport = (branch: Branch | null) => {
    if (!branch) {
      showFeedback('اختر فرعاً لمشاهدة تقريره', 'error')
      return
    }
    showFeedback(`سيتم توليد تقرير تفصيلي لفرع ${branch.name}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الفروع</h1>
            <p className="text-gray-600">مراقبة وإدارة جميع فروع المطعم</p>
          </div>
          <div className="flex gap-3 flex-wrap">
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
            <button onClick={() => setShowAddBranchModal(true)} className="btn-primary">
              + إضافة فرع جديد
            </button>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl border ${
              feedback.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {feedback.message}
          </div>
        )}

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
                  {branches.filter((branch) => branch.status === 'active').length}
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
                  {branches.reduce((sum, branch) => sum + branch.todayOrders, 0)}
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
                  {branches.length
                    ? (branches.reduce((sum, branch) => sum + branch.rating, 0) / branches.length).toFixed(1)
                    : '0.0'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="card hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer"
                onClick={() => setSelectedBranchId(branch.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
                      <span
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(branch.status)}`}
                      >
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
                  <button
                    className="flex-1 btn-ghost text-sm"
                    onClick={() => setEditingBranch(cloneBranch(branch))}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </button>
                  <button
                    className="flex-1 btn-ghost text-sm"
                    onClick={() => setHoursBranch(cloneBranch(branch))}
                  >
                    <Clock className="w-4 h-4 ml-2" />
                    ساعات العمل
                  </button>
                  <button
                    className="flex-1 btn-ghost text-sm"
                    onClick={() => setStatusBranch(branch)}
                  >
                    <Power className="w-4 h-4 ml-2" />
                    {branch.status === 'closed' ? 'تفعيل' : 'تعطيل'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">خريطة المواقع</h3>
                <p className="text-sm text-gray-500">جميع فروع المطعم على الخريطة</p>
              </div>
              <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">خريطة تفاعلية</p>
                      <p className="text-sm text-gray-500 mt-2">موصول جاهز مع Google Maps API</p>
                    </div>
                  </div>
                  {branches.map((branch, index) => (
                    <div
                      key={branch.id}
                      className="absolute cursor-pointer transform hover:scale-110 transition-transform"
                      style={{
                        top: `${20 + index * 20}%`,
                        right: `${20 + index * 15}%`,
                      }}
                      onClick={() => setSelectedBranchId(branch.id)}
                    >
                      <div
                        className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${
                          branch.status === 'active'
                            ? 'bg-green-500'
                            : branch.status === 'busy'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        } ${selectedBranchId === branch.id ? 'ring-4 ring-white' : ''}`}
                      >
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

            <div className="space-y-4">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الفرع</h3>
                {selectedBranch ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-900">{selectedBranch.name}</h4>
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            selectedBranch.status
                          )}`}
                        >
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
                      <button className="w-full btn-primary" onClick={() => handleQuickReport(selectedBranch)}>
                        عرض التقرير الكامل
                      </button>
                      <button className="w-full btn-secondary" onClick={() => setEditingBranch(cloneBranch(selectedBranch))}>
                        تعديل البيانات
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">اختر فرعاً من الخريطة</p>
                )}
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
                <div className="space-y-2">
                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-right"
                    onClick={() => {
                      if (!selectedBranch) {
                        showFeedback('اختر فرعاً لتعديل ساعات العمل', 'error')
                        return
                      }
                      setHoursBranch(cloneBranch(selectedBranch))
                    }}
                  >
                    <Clock className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-gray-900">تعديل ساعات العمل</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-right"
                    onClick={() => {
                      if (!selectedBranch) {
                        showFeedback('اختر فرعاً لتحديث بياناته', 'error')
                        return
                      }
                      setEditingBranch(cloneBranch(selectedBranch))
                    }}
                  >
                    <Settings className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-gray-900">إعدادات الفرع</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-right"
                    onClick={() => handleQuickReport(selectedBranch)}
                  >
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اسم الفرع *
                </label>
                <input
                  type="text"
                  value={newBranch.name}
                  onChange={(event) => setNewBranch({ ...newBranch, name: event.target.value })}
                  className="input-field"
                  placeholder="مثال: فرع مسقط - القرم"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  العنوان الكامل *
                </label>
                <input
                  type="text"
                  value={newBranch.address}
                  onChange={(event) => setNewBranch({ ...newBranch, address: event.target.value })}
                  className="input-field"
                  placeholder="مثال: شارع السلطان قابوس، حي القرم، مسقط"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  value={newBranch.phone}
                  onChange={(event) => setNewBranch({ ...newBranch, phone: event.target.value })}
                  className="input-field"
                  placeholder="24123456"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اسم المدير *
                </label>
                <input
                  type="text"
                  value={newBranch.manager}
                  onChange={(event) => setNewBranch({ ...newBranch, manager: event.target.value })}
                  className="input-field"
                  placeholder="مثال: أحمد محمد"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ساعات العمل *
                </label>
                <input
                  type="text"
                  value={newBranch.hours}
                  onChange={(event) => setNewBranch({ ...newBranch, hours: event.target.value })}
                  className="input-field"
                  placeholder="9:00 ص - 12:00 ص"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setShowAddBranchModal(false)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleAddBranch} className="btn-primary">
                <MapPin className="w-4 h-4 ml-2" />
                إضافة الفرع
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Branch Modal */}
      {editingBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">تعديل {editingBranch.name}</h2>
                <p className="text-sm text-gray-500">حدّث بيانات الفرع وحفظها مباشرة</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الفرع</label>
                <input
                  type="text"
                  value={editingBranch.name}
                  className="input-field"
                  onChange={(event) => setEditingBranch({ ...editingBranch, name: event.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان</label>
                <input
                  type="text"
                  value={editingBranch.address}
                  className="input-field"
                  onChange={(event) => setEditingBranch({ ...editingBranch, address: event.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الهاتف</label>
                  <input
                    type="tel"
                    value={editingBranch.phone}
                    className="input-field"
                    onChange={(event) => setEditingBranch({ ...editingBranch, phone: event.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المدير</label>
                  <input
                    type="text"
                    value={editingBranch.manager}
                    className="input-field"
                    onChange={(event) => setEditingBranch({ ...editingBranch, manager: event.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ساعات العمل المختصرة</label>
                <input
                  type="text"
                  value={editingBranch.hours}
                  className="input-field"
                  onChange={(event) => setEditingBranch({ ...editingBranch, hours: event.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">يمكنك تعديل الجدول التفصيلي من تبويب ساعات العمل</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setEditingBranch(null)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleSaveBranch} className="btn-primary">
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Working Hours Modal */}
      {hoursBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">ساعات العمل - {hoursBranch.name}</h2>
              <p className="text-sm text-gray-500 mt-2">قم بتعديل أوقات الدوام لكل يوم على حدة</p>
            </div>
            <div className="p-6 space-y-4">
              {hoursBranch.workingHours.map((day, index) => (
                <div key={day.day} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center border rounded-lg p-3">
                  <span className="font-semibold text-gray-800">{day.day}</span>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={day.isClosed}
                      onChange={(event) => {
                        const updated = [...hoursBranch.workingHours]
                        updated[index] = { ...updated[index], isClosed: event.target.checked }
                        setHoursBranch({ ...hoursBranch, workingHours: updated })
                      }}
                    />
                    مغلق
                  </label>
                  {!day.isClosed && (
                    <>
                      <input
                        type="text"
                        value={day.open}
                        className="input-field"
                        placeholder="وقت الافتتاح"
                        onChange={(event) => {
                          const updated = [...hoursBranch.workingHours]
                          updated[index] = { ...updated[index], open: event.target.value }
                          setHoursBranch({ ...hoursBranch, workingHours: updated })
                        }}
                      />
                      <input
                        type="text"
                        value={day.close}
                        className="input-field"
                        placeholder="وقت الإغلاق"
                        onChange={(event) => {
                          const updated = [...hoursBranch.workingHours]
                          updated[index] = { ...updated[index], close: event.target.value }
                          setHoursBranch({ ...hoursBranch, workingHours: updated })
                        }}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setHoursBranch(null)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleSaveWorkingHours} className="btn-primary">
                حفظ الساعات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Modal */}
      {statusBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">تأكيد الإجراء</h2>
              <p className="text-sm text-gray-500 mt-2">
                {statusBranch.status === 'closed'
                  ? 'سيتم إعادة تشغيل الفرع واستقباله للطلبات.'
                  : 'سيتم تعطيل الفرع مؤقتاً ولن يستقبل الطلبات.'}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 font-semibold">{statusBranch.name}</p>
              <p className="text-sm text-gray-500">{statusBranch.address}</p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setStatusBranch(null)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={confirmStatusToggle} className="btn-primary">
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
