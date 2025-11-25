'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Plus,
  Calendar,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Power,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  BarChart,
  Gift,
  Percent,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useState } from 'react'

interface Campaign {
  id: number
  name: string
  type: 'discount' | 'bundle' | 'freeItem' | 'seasonal'
  description: string
  discount: number
  status: 'active' | 'scheduled' | 'ended' | 'paused'
  startDate: string
  endDate: string
  views: number
  conversions: number
  revenue: number
  branches: string[]
  items: string[]
}

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'خصم 20% على الوجبات الرئيسية',
    type: 'discount',
    description: 'خصم خاص على جميع الوجبات الرئيسية لفترة محدودة',
    discount: 20,
    status: 'active',
    startDate: '2025-11-20',
    endDate: '2025-11-30',
    views: 5234,
    conversions: 856,
    revenue: 42800,
    branches: ['مسقط', 'صلالة', 'صحار'],
    items: ['برجر كلاسيك', 'بيتزا مارغريتا', 'باستا الفريدو'],
  },
  {
    id: 2,
    name: 'وجبة الإفطار الخاصة',
    type: 'bundle',
    description: 'وجبة إفطار كاملة بسعر مخفض من 8 صباحاً حتى 10 صباحاً',
    discount: 30,
    status: 'active',
    startDate: '2025-11-15',
    endDate: '2025-12-15',
    views: 3421,
    conversions: 723,
    revenue: 18075,
    branches: ['مسقط', 'صلالة'],
    items: ['باقة إفطار 1', 'باقة إفطار 2'],
  },
  {
    id: 3,
    name: 'مشروب مجاني مع كل وجبة',
    type: 'freeItem',
    description: 'احصل على مشروب مجاني عند طلب أي وجبة رئيسية',
    discount: 0,
    status: 'scheduled',
    startDate: '2025-12-01',
    endDate: '2025-12-10',
    views: 0,
    conversions: 0,
    revenue: 0,
    branches: ['مسقط', 'صلالة', 'صحار', 'نزوى'],
    items: ['جميع الوجبات الرئيسية'],
  },
  {
    id: 4,
    name: 'عروض رمضان الكريم',
    type: 'seasonal',
    description: 'عروض خاصة لشهر رمضان المبارك',
    discount: 25,
    status: 'scheduled',
    startDate: '2026-03-01',
    endDate: '2026-03-30',
    views: 0,
    conversions: 0,
    revenue: 0,
    branches: ['مسقط', 'صلالة', 'صحار', 'نزوى'],
    items: ['جميع الأصناف'],
  },
  {
    id: 5,
    name: 'عرض نهاية الأسبوع',
    type: 'discount',
    description: 'خصم 15% على جميع الطلبات يومي الخميس والجمعة',
    discount: 15,
    status: 'paused',
    startDate: '2025-11-01',
    endDate: '2025-11-24',
    views: 8956,
    conversions: 1245,
    revenue: 62250,
    branches: ['مسقط', 'صلالة'],
    items: ['جميع الأصناف'],
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'discount': return <Percent className="w-5 h-5" />
    case 'bundle': return <Gift className="w-5 h-5" />
    case 'freeItem': return <Gift className="w-5 h-5" />
    case 'seasonal': return <Calendar className="w-5 h-5" />
    default: return <Target className="w-5 h-5" />
  }
}

const getTypeText = (type: string) => {
  switch (type) {
    case 'discount': return 'خصم'
    case 'bundle': return 'باقة'
    case 'freeItem': return 'هدية مجانية'
    case 'seasonal': return 'موسمي'
    default: return 'عرض'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700'
    case 'scheduled': return 'bg-blue-100 text-blue-700'
    case 'ended': return 'bg-gray-100 text-gray-700'
    case 'paused': return 'bg-yellow-100 text-yellow-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'نشط'
    case 'scheduled': return 'مجدول'
    case 'ended': return 'منتهي'
    case 'paused': return 'موقوف مؤقتاً'
    default: return 'غير معروف'
  }
}

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)

  const handleToggleStatus = (campaignId: number) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === campaignId) {
        let newStatus: Campaign['status'] = c.status
        if (c.status === 'active') newStatus = 'paused'
        else if (c.status === 'paused') newStatus = 'active'
        else if (c.status === 'scheduled') newStatus = 'active'
        return { ...c, status: newStatus }
      }
      return c
    }))
  }

  const handleDuplicate = (campaign: Campaign) => {
    const newCampaign = {
      ...campaign,
      id: Math.max(...campaigns.map(c => c.id)) + 1,
      name: campaign.name + ' (نسخة)',
      status: 'scheduled' as const
    }
    setCampaigns([...campaigns, newCampaign])
  }

  const handleEdit = (campaignId: number) => {
    console.log('تعديل حملة:', campaignId)
    // هنا يمكن فتح مودال التعديل
  }

  const activeCampaigns = campaigns.filter(c => c.status === 'active')
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgConversionRate = campaigns.filter(c => c.views > 0).reduce((sum, c) => sum + (c.conversions / c.views * 100), 0) / campaigns.filter(c => c.views > 0).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">الحملات والعروض</h1>
            <p className="text-gray-600">إنشاء وإدارة العروض الترويجية</p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 ml-2" />
            حملة جديدة
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الحملات النشطة</p>
                <p className="text-3xl font-bold text-green-600">{activeCampaigns.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-gray-900">{(totalRevenue / 1000).toFixed(1)}k</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">التحويلات</p>
                <p className="text-3xl font-bold text-gray-900">{totalConversions.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">معدل التحويل</p>
                <p className="text-3xl font-bold text-yellow-600">{avgConversionRate.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Builder Shortcut */}
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">صانع العروض الذكي</h3>
              <p className="text-primary-100 mb-4">أنشئ عرضاً احترافياً في دقائق مع توصيات الذكاء الاصطناعي</p>
              <div className="flex gap-3">
                <button className="bg-white text-primary-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                  إنشاء عرض بالذكاء الاصطناعي
                </button>
                <button className="border-2 border-white text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                  إنشاء يدوي
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Target className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="card hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedCampaign(campaign)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                      {getTypeIcon(campaign.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                      <p className="text-xs text-gray-500">{getTypeText(campaign.type)}</p>
                    </div>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                  {getStatusText(campaign.status)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>

              {campaign.discount > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600 text-center">
                    خصم {campaign.discount}%
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-gray-500">من</p>
                    <p className="font-semibold">{new Date(campaign.startDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-gray-500">إلى</p>
                    <p className="font-semibold">{new Date(campaign.endDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
              </div>

              {campaign.status === 'active' && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">المشاهدات</p>
                    <p className="text-lg font-bold text-gray-900">{campaign.views.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">التحويلات</p>
                    <p className="text-lg font-bold text-primary-600">{campaign.conversions}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">الإيرادات</p>
                    <p className="text-lg font-bold text-green-600">{(campaign.revenue / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">الفروع ({campaign.branches.length})</p>
                <div className="flex flex-wrap gap-1">
                  {campaign.branches.map((branch) => (
                    <span key={branch} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {branch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {campaign.status === 'active' && (
                  <>
                    <button 
                      onClick={() => handleToggleStatus(campaign.id)}
                      className="flex-1 btn-ghost text-xs"
                    >
                      <Pause className="w-3 h-3 ml-1" />
                      إيقاف
                    </button>
                    <button className="flex-1 btn-ghost text-xs">
                      <BarChart className="w-3 h-3 ml-1" />
                      التقرير
                    </button>
                  </>
                )}
                {campaign.status === 'scheduled' && (
                  <button 
                    onClick={() => handleToggleStatus(campaign.id)}
                    className="flex-1 btn-ghost text-xs"
                  >
                    <Play className="w-3 h-3 ml-1" />
                    تفعيل الآن
                  </button>
                )}
                {campaign.status === 'paused' && (
                  <button 
                    onClick={() => handleToggleStatus(campaign.id)}
                    className="flex-1 btn-ghost text-xs"
                  >
                    <Play className="w-3 h-3 ml-1" />
                    استئناف
                  </button>
                )}
                <button 
                  onClick={() => handleEdit(campaign.id)}
                  className="flex-1 btn-ghost text-xs"
                >
                  <Edit className="w-3 h-3 ml-1" />
                  تعديل
                </button>
                <button 
                  onClick={() => handleDuplicate(campaign)}
                  className="flex-1 btn-ghost text-xs"
                >
                  <Copy className="w-3 h-3 ml-1" />
                  نسخ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar View */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">تقويم الحملات</h3>
              <p className="text-sm text-gray-500">عرض جميع الحملات المجدولة</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost text-sm">← الشهر السابق</button>
              <button className="btn-ghost text-sm">نوفمبر 2025</button>
              <button className="btn-ghost text-sm">الشهر التالي →</button>
            </div>
          </div>

          {/* Compact Calendar */}
          <div className="grid grid-cols-7 gap-1">
            {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
                {day.substring(0, 3)}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const hasCampaign = campaigns.some(c => {
                const start = new Date(c.startDate).getDate()
                const end = new Date(c.endDate).getDate()
                return day >= start && day <= end
              })
              
              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded text-xs cursor-pointer transition-colors ${
                    hasCampaign 
                      ? 'bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

