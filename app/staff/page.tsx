'use client'

import DashboardLayout from '@/components/DashboardLayout'
import {
  Users,
  UserPlus,
  Shield,
  Key,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Search,
  UserCheck,
  Settings,
  FileText,
  AlertTriangle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  color: string
}

interface Staff {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive' | 'suspended'
  branches: string[]
  lastActive: string
  joinDate: string
  tasksCompleted: number
}

interface ActivityItem {
  user: string
  action: string
  time: string
  type: 'edit' | 'create' | 'campaign' | 'export'
}

const initialRoles: Role[] = [
  {
    id: 'owner',
    name: 'مالك',
    description: 'صلاحيات كاملة لجميع الوظائف',
    permissions: ['all'],
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'manager',
    name: 'مدير عام',
    description: 'إدارة الفروع والموظفين والعمليات',
    permissions: ['branches', 'staff', 'menu', 'campaigns', 'reports'],
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'menu_manager',
    name: 'مسؤول منيو',
    description: 'إدارة قائمة الطعام والأسعار',
    permissions: ['menu', 'items', 'prices'],
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'marketing',
    name: 'مدير عروض',
    description: 'إنشاء وإدارة الحملات التسويقية',
    permissions: ['campaigns', 'analytics', 'content'],
    color: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'analyst',
    name: 'محلل بيانات',
    description: 'الوصول للتحليلات والتقارير فقط',
    permissions: ['analytics', 'reports', 'view_only'],
    color: 'bg-gray-100 text-gray-700',
  },
]

const initialStaff: Staff[] = [
  {
    id: 1,
    name: 'أحمد محمد السالم',
    email: 'ahmed@restaurant.com',
    phone: '0501234567',
    role: 'manager',
    status: 'active',
    branches: ['مسقط', 'صلالة'],
    lastActive: '2025-11-25T10:30:00',
    joinDate: '2024-01-15',
    tasksCompleted: 145,
  },
  {
    id: 2,
    name: 'فاطمة عبدالله',
    email: 'fatima@restaurant.com',
    phone: '0502345678',
    role: 'menu_manager',
    status: 'active',
    branches: ['جميع الفروع'],
    lastActive: '2025-11-25T09:15:00',
    joinDate: '2024-03-20',
    tasksCompleted: 89,
  },
  {
    id: 3,
    name: 'خالد عبدالعزيز',
    email: 'khalid@restaurant.com',
    phone: '0503456789',
    role: 'marketing',
    status: 'active',
    branches: ['مسقط'],
    lastActive: '2025-11-24T16:45:00',
    joinDate: '2024-06-10',
    tasksCompleted: 67,
  },
  {
    id: 4,
    name: 'نورة أحمد',
    email: 'noura@restaurant.com',
    phone: '0504567890',
    role: 'analyst',
    status: 'active',
    branches: ['جميع الفروع'],
    lastActive: '2025-11-25T11:20:00',
    joinDate: '2024-08-05',
    tasksCompleted: 52,
  },
  {
    id: 5,
    name: 'سعود الحربي',
    email: 'saud@restaurant.com',
    phone: '0505678901',
    role: 'manager',
    status: 'inactive',
    branches: ['صحار'],
    lastActive: '2025-11-20T14:00:00',
    joinDate: '2023-11-01',
    tasksCompleted: 198,
  },
]

const initialActivity: ActivityItem[] = [
  { user: 'أحمد محمد', action: 'قام بتعديل سعر "برجر كلاسيك"', time: 'منذ 5 دقائق', type: 'edit' },
  { user: 'فاطمة عبدالله', action: 'أضافت طبق جديد "سلطة الكينوا"', time: 'منذ 15 دقيقة', type: 'create' },
  { user: 'خالد عبدالعزيز', action: 'أطلق حملة "خصم نهاية الأسبوع"', time: 'منذ 30 دقيقة', type: 'campaign' },
  { user: 'نورة أحمد', action: 'صدّرت تقرير التحليلات الشهري', time: 'منذ ساعة', type: 'export' },
]

const availableBranches = ['مسقط', 'صلالة', 'صحار', 'نزوى', 'جدة', 'الرياض']

type Feedback = { type: 'success' | 'error'; message: string } | null

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) return 'منذ أقل من ساعة'
  if (hours < 24) return `منذ ${hours} ساعة`
  return `منذ ${Math.floor(hours / 24)} يوم`
}

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<Staff[]>(initialStaff)
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showAddStaffModal, setShowAddStaffModal] = useState(false)
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'manager',
    branches: [] as string[],
    status: 'active' as Staff['status'],
  })
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null)
  const [staffRoleModal, setStaffRoleModal] = useState<Staff | null>(null)
  const [staffDetails, setStaffDetails] = useState<Staff | null>(null)
  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: '' })

  useEffect(() => {
    if (!feedback) return
    const timeout = setTimeout(() => setFeedback(null), 4000)
    return () => clearTimeout(timeout)
  }, [feedback])

  const filteredStaff = useMemo(() => {
    return staffMembers.filter((member) => {
      const matchesSearch =
        member.name.includes(searchQuery) || member.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = selectedRole === 'all' || member.role === selectedRole
      return matchesSearch && matchesRole
    })
  }, [searchQuery, selectedRole, staffMembers])

  const getRoleInfo = (roleId: string) => roles.find((role) => role.id === roleId) || roles[0]

  const addActivityEntry = (entry: ActivityItem) => {
    setActivity((prev) => [entry, ...prev].slice(0, 20))
  }

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email) {
      setFeedback({ type: 'error', message: 'الرجاء تعبئة الاسم والبريد الإلكتروني' })
      return
    }
    const staffMember: Staff = {
      id: Date.now(),
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      status: newStaff.status,
      branches: newStaff.branches.length ? newStaff.branches : ['جميع الفروع'],
      lastActive: new Date().toISOString(),
      joinDate: new Date().toISOString(),
      tasksCompleted: 0,
    }
    setStaffMembers((prev) => [...prev, staffMember])
    addActivityEntry({
      user: staffMember.name,
      action: 'تمت إضافته إلى الفريق',
      time: 'قبل لحظات',
      type: 'create',
    })
    setShowAddStaffModal(false)
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: 'manager',
      branches: [],
      status: 'active',
    })
    setFeedback({ type: 'success', message: 'تم إضافة الموظف الجديد' })
  }

  const handleSaveStaff = () => {
    if (!editingStaff) return
    setStaffMembers((prev) => prev.map((member) => (member.id === editingStaff.id ? editingStaff : member)))
    addActivityEntry({
      user: editingStaff.name,
      action: 'تم تحديث بياناته',
      time: 'قبل لحظات',
      type: 'edit',
    })
    setEditingStaff(null)
    setFeedback({ type: 'success', message: 'تم تحديث بيانات الموظف' })
  }

  const handleDeleteStaff = () => {
    if (!staffToDelete) return
    setStaffMembers((prev) => prev.filter((member) => member.id !== staffToDelete.id))
    addActivityEntry({
      user: staffToDelete.name,
      action: 'تم حذف حسابه من النظام',
      time: 'قبل لحظات',
      type: 'export',
    })
    setStaffToDelete(null)
    setFeedback({ type: 'success', message: 'تم حذف الموظف' })
  }

  const handleRoleAssignment = () => {
    if (!staffRoleModal) return
    setStaffMembers((prev) =>
      prev.map((member) => (member.id === staffRoleModal.id ? staffRoleModal : member))
    )
    setStaffRoleModal(null)
    setFeedback({ type: 'success', message: 'تم تحديث صلاحيات الموظف' })
  }

  const handleAddRole = () => {
    if (!newRole.name.trim()) {
      setFeedback({ type: 'error', message: 'اسم الدور مطلوب' })
      return
    }
    const role: Role = {
      id: `custom-${Date.now()}`,
      name: newRole.name.trim(),
      description: newRole.description.trim() || 'دور مخصص',
      permissions: newRole.permissions ? newRole.permissions.split(',').map((item) => item.trim()) : [],
      color: 'bg-indigo-100 text-indigo-700',
    }
    setRoles((prev) => [...prev, role])
    setNewRole({ name: '', description: '', permissions: '' })
    setFeedback({ type: 'success', message: 'تم إنشاء الدور الجديد' })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الموظفين</h1>
            <p className="text-gray-600">إدارة الفريق والصلاحيات</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowRoleModal(true)} className="btn-secondary">
              <Shield className="w-4 h-4 ml-2" />
              إدارة الأدوار
            </button>
            <button onClick={() => setShowAddStaffModal(true)} className="btn-primary">
              <UserPlus className="w-4 h-4 ml-2" />
              إضافة موظف
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الموظفين</p>
                <p className="text-3xl font-bold text-gray-900">{staffMembers.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">النشطون</p>
                <p className="text-3xl font-bold text-green-600">
                  {staffMembers.filter((member) => member.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الأدوار</p>
                <p className="text-3xl font-bold text-gray-900">{roles.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">المهام المنجزة</p>
                <p className="text-3xl font-bold text-gray-900">
                  {staffMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">الأدوار والصلاحيات</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${role.color}`}>
                    {role.name}
                  </span>
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-600 mb-3">{role.description}</p>
                <p className="text-xs text-gray-500">
                  {staffMembers.filter((member) => member.role === role.id).length} موظف
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن موظف..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedRole('all')}
                className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  selectedRole === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                الكل
              </button>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    selectedRole === role.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الموظف</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الدور</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الفروع</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">آخر نشاط</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">المهام</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => {
                  const roleInfo = getRoleInfo(member.role)
                  return (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-bold">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleInfo.color}`}>
                          {roleInfo.name}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {member.branches.slice(0, 2).map((branch) => (
                            <span key={branch} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {branch}
                            </span>
                          ))}
                          {member.branches.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{member.branches.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                            member.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : member.status === 'inactive'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {member.status === 'active' && <CheckCircle className="w-3 h-3" />}
                          {member.status === 'inactive' && <XCircle className="w-3 h-3" />}
                          {member.status === 'suspended' && <AlertTriangle className="w-3 h-3" />}
                          {member.status === 'active' ? 'نشط' : member.status === 'inactive' ? 'غير نشط' : 'موقوف'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{formatRelativeTime(member.lastActive)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-gray-900">{member.tasksCompleted}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="تعديل"
                            onClick={() => setEditingStaff({ ...member })}
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="الصلاحيات"
                            onClick={() => setStaffRoleModal({ ...member })}
                          >
                            <Key className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="السجل"
                            onClick={() => setStaffDetails(member)}
                          >
                            <FileText className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                            onClick={() => setStaffToDelete(member)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">سجل النشاط</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                عرض الكل ←
              </button>
            </div>
            <div className="space-y-3">
              {activity.map((item, index) => (
                <div key={`${item.user}-${index}`} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === 'edit'
                        ? 'bg-blue-100'
                        : item.type === 'create'
                        ? 'bg-green-100'
                        : item.type === 'campaign'
                        ? 'bg-purple-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {item.type === 'edit' && <Edit className="w-4 h-4 text-blue-600" />}
                    {item.type === 'create' && <UserPlus className="w-4 h-4 text-green-600" />}
                    {item.type === 'campaign' && <Settings className="w-4 h-4 text-purple-600" />}
                    {item.type === 'export' && <FileText className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <strong>{item.user}</strong> {item.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">إدارة الصلاحيات</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border-r-4 border-blue-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <Key className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">صلاحيات دقيقة</h4>
                    <p className="text-sm text-blue-700">تحكم في كل تفاصيل الصلاحيات لكل دور على حدة</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 border-r-4 border-green-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">سجل تدقيق كامل</h4>
                    <p className="text-sm text-green-700">تتبع جميع التغييرات والإجراءات التي يقوم بها الموظفون</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 border-r-4 border-purple-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1">أدوار مخصصة</h4>
                    <p className="text-sm text-purple-700">أنشئ أدوار مخصصة بصلاحيات تناسب احتياجات فريقك</p>
                  </div>
                </div>
              </div>
              <button className="w-full btn-primary" onClick={() => setShowRoleModal(true)}>
                <Shield className="w-4 h-4 ml-2" />
                إنشاء دور جديد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">إضافة موظف جديد</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل *</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(event) => setNewStaff({ ...newStaff, name: event.target.value })}
                  className="input-field"
                  placeholder="مثال: أحمد محمد السالم"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني *</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(event) => setNewStaff({ ...newStaff, email: event.target.value })}
                  className="input-field"
                  placeholder="example@restaurant.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  value={newStaff.phone}
                  onChange={(event) => setNewStaff({ ...newStaff, phone: event.target.value })}
                  className="input-field"
                  placeholder="0501234567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الدور الوظيفي *</label>
                <select
                  value={newStaff.role}
                  onChange={(event) => setNewStaff({ ...newStaff, role: event.target.value })}
                  className="input-field"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name} - {role.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الحالة</label>
                <select
                  value={newStaff.status}
                  onChange={(event) =>
                    setNewStaff({ ...newStaff, status: event.target.value as Staff['status'] })
                  }
                  className="input-field"
                >
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="suspended">موقوف</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الفروع المخصصة</label>
                <div className="space-y-2">
                  {availableBranches.map((branch) => (
                    <label key={branch} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={newStaff.branches.includes(branch)}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setNewStaff({ ...newStaff, branches: [...newStaff.branches, branch] })
                          } else {
                            setNewStaff({
                              ...newStaff,
                              branches: newStaff.branches.filter((b) => b !== branch),
                            })
                          }
                        }}
                      />
                      <span className="text-sm text-gray-900">{branch}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setShowAddStaffModal(false)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleAddStaff} className="btn-primary">
                <UserPlus className="w-4 h-4 ml-2" />
                إضافة الموظف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {editingStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">تعديل {editingStaff.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم</label>
                  <input
                    type="text"
                    value={editingStaff.name}
                    onChange={(event) => setEditingStaff({ ...editingStaff, name: event.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">البريد</label>
                  <input
                    type="email"
                    value={editingStaff.email}
                    onChange={(event) => setEditingStaff({ ...editingStaff, email: event.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الهاتف</label>
                  <input
                    type="tel"
                    value={editingStaff.phone}
                    onChange={(event) => setEditingStaff({ ...editingStaff, phone: event.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الحالة</label>
                  <select
                    value={editingStaff.status}
                    onChange={(event) =>
                      setEditingStaff({ ...editingStaff, status: event.target.value as Staff['status'] })
                    }
                    className="input-field"
                  >
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="suspended">موقوف</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الفروع</label>
                <div className="flex flex-wrap gap-2">
                  {availableBranches.map((branch) => (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => {
                        const exists = editingStaff.branches.includes(branch)
                        setEditingStaff({
                          ...editingStaff,
                          branches: exists
                            ? editingStaff.branches.filter((b) => b !== branch)
                            : [...editingStaff.branches, branch],
                        })
                      }}
                      className={`px-3 py-1 rounded-full text-xs ${
                        editingStaff.branches.includes(branch)
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setEditingStaff(null)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleSaveStaff} className="btn-primary">
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Assignment Modal */}
      {staffRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">تحديث صلاحيات {staffRoleModal.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">اختيار الدور</label>
                <select
                  value={staffRoleModal.role}
                  onChange={(event) => setStaffRoleModal({ ...staffRoleModal, role: event.target.value })}
                  className="input-field"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500">
                صلاحيات هذا الدور: {getRoleInfo(staffRoleModal.role).permissions.join(', ')}
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setStaffRoleModal(null)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleRoleAssignment} className="btn-primary">
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Details Modal */}
      {staffDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{staffDetails.name}</h2>
                <p className="text-sm text-gray-500">{getRoleInfo(staffDetails.role).name}</p>
              </div>
              <span className="text-sm text-gray-500">منذ {formatRelativeTime(staffDetails.joinDate)}</span>
            </div>
            <div className="p-6 space-y-3 text-sm text-gray-700">
              <p>
                <strong className="text-gray-900">البريد الإلكتروني:</strong> {staffDetails.email}
              </p>
              <p>
                <strong className="text-gray-900">الهاتف:</strong> {staffDetails.phone}
              </p>
              <p>
                <strong className="text-gray-900">الفروع:</strong> {staffDetails.branches.join('، ')}
              </p>
              <p>
                <strong className="text-gray-900">الحالة:</strong>{' '}
                {staffDetails.status === 'active' ? 'نشط' : staffDetails.status === 'inactive' ? 'غير نشط' : 'موقوف'}
              </p>
              <p>
                <strong className="text-gray-900">المهام المنجزة:</strong> {staffDetails.tasksCompleted}
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setStaffDetails(null)} className="btn-primary">
                تم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {staffToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">تأكيد الحذف</h2>
              <p className="text-sm text-gray-500 mt-2">
                سيتم حذف حساب {staffToDelete.name} وجميع صلاحياته. هل أنت متأكد؟
              </p>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-sm text-gray-600">البريد: {staffToDelete.email}</p>
              <p className="text-sm text-gray-600">الفروع: {staffToDelete.branches.join('، ')}</p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={() => setStaffToDelete(null)} className="btn-secondary">
                إلغاء
              </button>
              <button onClick={handleDeleteStaff} className="btn-primary bg-red-500 hover:bg-red-600">
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Management Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">إدارة الأدوار</h2>
                <p className="text-sm text-gray-500">أنشئ أدواراً جديدة وحدد صلاحياتها</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${role.color}`}>{role.name}</span>
                      <span className="text-xs text-gray-400">{role.permissions.length} إذن</span>
                    </div>
                    <p className="text-sm text-gray-600">{role.description}</p>
                    <p className="text-xs text-gray-500">
                      الصلاحيات: {role.permissions.length ? role.permissions.join(', ') : 'حسب الطلب'}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                <h3 className="font-semibold text-gray-900">إضافة دور جديد</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="اسم الدور"
                    value={newRole.name}
                    onChange={(event) => setNewRole({ ...newRole, name: event.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="وصف مختصر"
                    value={newRole.description}
                    onChange={(event) => setNewRole({ ...newRole, description: event.target.value })}
                    className="input-field"
                  />
                </div>
                <input
                  type="text"
                  placeholder="الصلاحيات (افصل بينها بفاصلة)"
                  value={newRole.permissions}
                  onChange={(event) => setNewRole({ ...newRole, permissions: event.target.value })}
                  className="input-field"
                />
                <div className="flex justify-end">
                  <button onClick={handleAddRole} className="btn-primary">
                    إضافة الدور
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setShowRoleModal(false)} className="btn-primary">
                تم
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
