'use client'

import dynamic from 'next/dynamic'
import type { AnalyticsRange, AnalyticsTrendChartsProps } from '@/components/AnalyticsCharts'
import DashboardLayout from '@/components/DashboardLayout'
import {
  TrendingUp,
  Users,
  Eye,
  MapPin,
  Phone,
  Share2,
  Star,
  Clock,
  Filter,
  Download,
} from 'lucide-react'
import { useState } from 'react'

// تأكد من تحميل jspdf فقط في المتصفح
const exportToPDF = async () => {
  const { jsPDF } = await import('jspdf')
  
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  
  // إعداد الخط العربي (يمكن تحسينه بإضافة خط عربي مخصص)
  doc.setLanguage('ar')
  
  // الخلفية الملونة للعنوان
  doc.setFillColor(59, 130, 246) // primary blue
  doc.rect(0, 0, pageWidth, 50, 'F')
  
  // العنوان
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.text('تقرير الإحصائيات الشامل', pageWidth / 2, 25, { align: 'center' })
  
  doc.setFontSize(14)
  doc.text('نظام إدارة المطاعم', pageWidth / 2, 35, { align: 'center' })
  
  // التاريخ
  doc.setFontSize(10)
  const today = new Date().toLocaleDateString('ar-SA')
  doc.text(`تاريخ التقرير: ${today}`, pageWidth / 2, 43, { align: 'center' })
  
  // المحتوى
  doc.setTextColor(0, 0, 0)
  let yPos = 60
  
  // قسم الإحصائيات الرئيسية
  doc.setFillColor(240, 240, 240)
  doc.rect(15, yPos, pageWidth - 30, 10, 'F')
  doc.setFontSize(16)
  doc.setTextColor(59, 130, 246)
  doc.text('الإحصائيات الرئيسية', 20, yPos + 7)
  
  yPos += 20
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  
  // البيانات
  const stats = [
    { label: 'إجمالي الزوار', value: '24.5K', change: '+12.5%' },
    { label: 'مشاهدات الصفحة', value: '68.2K', change: '+8.3%' },
    { label: 'مكالمات الاتصال', value: '1.8K', change: '-2.1%' },
    { label: 'المشاركات', value: '892', change: '+18.7%' }
  ]
  
  stats.forEach((stat, index) => {
    doc.setFillColor(249, 250, 251)
    doc.rect(15, yPos + (index * 15), pageWidth - 30, 12, 'F')
    doc.text(`${stat.label}: ${stat.value}`, 20, yPos + (index * 15) + 8)
    doc.setTextColor(34, 197, 94)
    doc.text(stat.change, pageWidth - 40, yPos + (index * 15) + 8)
    doc.setTextColor(0, 0, 0)
  })
  
  yPos += 70
  
  // قسم التوزيع الجغرافي
  doc.setFillColor(240, 240, 240)
  doc.rect(15, yPos, pageWidth - 30, 10, 'F')
  doc.setFontSize(16)
  doc.setTextColor(59, 130, 246)
  doc.text('التوزيع الجغرافي', 20, yPos + 7)
  
  yPos += 20
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  
  const cities = [
    { name: 'مسقط', value: '4,500', percentage: '45%' },
    { name: 'صلالة', value: '3,000', percentage: '30%' },
    { name: 'صحار', value: '1,500', percentage: '15%' },
    { name: 'نزوى', value: '1,000', percentage: '10%' }
  ]
  
  cities.forEach((city, index) => {
    doc.setFillColor(249, 250, 251)
    doc.rect(15, yPos + (index * 12), pageWidth - 30, 10, 'F')
    doc.text(`${city.name}: ${city.value} زائر (${city.percentage})`, 20, yPos + (index * 12) + 7)
  })
  
  yPos += 60
  
  // قسم الرؤى الذكية
  doc.setFillColor(240, 240, 240)
  doc.rect(15, yPos, pageWidth - 30, 10, 'F')
  doc.setFontSize(16)
  doc.setTextColor(59, 130, 246)
  doc.text('الرؤى والتوصيات', 20, yPos + 7)
  
  yPos += 20
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)
  
  const insights = [
    '✓ نمو ممتاز: الزيارات زادت بنسبة 12.5% هذا الأسبوع',
    '✓ ذروة المساء: أعلى طلبات بين 6-9 مساءً',
    '✓ توسع محتمل: 45% من الزوار من مسقط',
    '✓ رضا العملاء: متوسط التقييم 4.7'
  ]
  
  insights.forEach((insight, index) => {
    doc.text(insight, 20, yPos + (index * 10))
  })
  
  // الذيل
  yPos = pageHeight - 20
  doc.setFillColor(59, 130, 246)
  doc.rect(0, yPos, pageWidth, 20, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text('نظام إدارة المطاعم - جميع الحقوق محفوظة', pageWidth / 2, yPos + 12, { align: 'center' })
  
  // حفظ الملف
  doc.save(`تقرير-الإحصائيات-${today}.pdf`)
}

const ChartsLoader = () => (
  <div className="space-y-6">
    <div className="card h-[360px] bg-gray-100/70 animate-pulse" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card h-[320px] bg-gray-100/70 animate-pulse" />
      <div className="card h-[320px] bg-gray-100/70 animate-pulse" />
    </div>
  </div>
)

const RadarLoader = () => (
  <div className="card h-[420px] bg-gray-100/70 animate-pulse" />
)

const AnalyticsTrendCharts = dynamic<AnalyticsTrendChartsProps>(
  () => import('@/components/AnalyticsCharts').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ChartsLoader />,
  }
)

const AnalyticsRadarChart = dynamic(
  () => import('@/components/AnalyticsCharts').then((mod) => mod.AnalyticsRadarChart),
  {
    ssr: false,
    loading: () => <RadarLoader />,
  }
)

const branchComparison = [
  { branch: 'مسقط', visits: 5200, orders: 1340, revenue: 89000, satisfaction: 4.8 },
  { branch: 'صلالة', visits: 4100, orders: 1120, revenue: 76000, satisfaction: 4.7 },
  { branch: 'صحار', visits: 2800, orders: 780, revenue: 52000, satisfaction: 4.6 },
  { branch: 'نزوى', visits: 1900, orders: 520, revenue: 35000, satisfaction: 4.5 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<AnalyticsRange>('week')
  const [selectedMetric, setSelectedMetric] = useState('visitors')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">التحليلات المتقدمة</h1>
            <p className="text-gray-600">تحليل شامل لأداء المطعم وسلوك العملاء</p>
          </div>
          <div className="flex gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as AnalyticsRange)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="today">اليوم</option>
              <option value="week">آخر أسبوع</option>
              <option value="month">آخر شهر</option>
              <option value="year">آخر سنة</option>
            </select>
            <button className="btn-secondary">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </button>
            <button 
              onClick={exportToPDF}
              className="btn-primary"
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير التقرير
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            onClick={() => setSelectedMetric('visitors')}
            className={`stat-card cursor-pointer transition-all ${selectedMetric === 'visitors' ? 'ring-2 ring-primary-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الزوار</p>
                <p className="text-3xl font-bold text-gray-900">24.5K</p>
                <p className="text-sm text-green-600 mt-2">↑ 12.5%</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedMetric('views')}
            className={`stat-card cursor-pointer transition-all ${selectedMetric === 'views' ? 'ring-2 ring-primary-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">مشاهدات الصفحة</p>
                <p className="text-3xl font-bold text-gray-900">68.2K</p>
                <p className="text-sm text-green-600 mt-2">↑ 8.3%</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedMetric('calls')}
            className={`stat-card cursor-pointer transition-all ${selectedMetric === 'calls' ? 'ring-2 ring-primary-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">مكالمات الاتصال</p>
                <p className="text-3xl font-bold text-gray-900">1.8K</p>
                <p className="text-sm text-red-600 mt-2">↓ 2.1%</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedMetric('shares')}
            className={`stat-card cursor-pointer transition-all ${selectedMetric === 'shares' ? 'ring-2 ring-primary-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">المشاركات</p>
                <p className="text-3xl font-bold text-gray-900">892</p>
                <p className="text-sm text-green-600 mt-2">↑ 18.7%</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Share2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <AnalyticsTrendCharts currentRange={timeRange} />

        {/* Branch Comparison */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">مقارنة أداء الفروع</h3>
            <p className="text-sm text-gray-500">تحليل شامل لجميع الفروع</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الفرع</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الزيارات</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الطلبات</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الإيرادات</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">معدل التحويل</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الرضا</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">الأداء</th>
                </tr>
              </thead>
              <tbody>
                {branchComparison.map((branch, index) => {
                  const conversionRate = ((branch.orders / branch.visits) * 100).toFixed(1)
                  const performance = (branch.satisfaction / 5 * 100).toFixed(0)
                  
                  return (
                    <tr key={branch.branch} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-bold">{index + 1}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{branch.branch}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{branch.visits.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-900">{branch.orders.toLocaleString()}</td>
                      <td className="py-4 px-4 font-semibold text-green-600">{branch.revenue.toLocaleString()} ر.ع</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {conversionRate}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{branch.satisfaction}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ width: `${performance}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{performance}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsRadarChart />

          {/* Insights & Recommendations */}
          <div className="card">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">رؤى ذكية</h3>
              <p className="text-sm text-gray-500">توصيات مدعومة بالبيانات</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-r-4 border-green-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">نمو ممتاز</h4>
                    <p className="text-sm text-green-700">
                      الزيارات زادت بنسبة 12.5% هذا الأسبوع. استمر في تطبيق استراتيجياتك الحالية.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-r-4 border-blue-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">ذروة المساء</h4>
                    <p className="text-sm text-blue-700">
                      أعلى طلبات بين 6-9 مساءً. فكر في إطلاق عروض خاصة في هذا الوقت.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border-r-4 border-yellow-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">توسع محتمل</h4>
                    <p className="text-sm text-yellow-700">
                      45% من الزوار من الرياض. فكر في فتح فرع إضافي في الأحياء الشمالية.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border-r-4 border-purple-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1">رضا العملاء</h4>
                    <p className="text-sm text-purple-700">
                      متوسط التقييم 4.7. ركز على تحسين سرعة الخدمة لرفع التقييم إلى 4.9.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
