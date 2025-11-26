'use client'

import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { Clock } from 'lucide-react'

export type AnalyticsRange = 'today' | 'week' | 'month' | 'year'

export interface AnalyticsTrendChartsProps {
  currentRange: AnalyticsRange
}

type VisitorTrendPoint = {
  date: string
  visitors: number
  pageViews: number
  calls: number
}

const RANGE_LABELS: Record<AnalyticsRange, string> = {
  today: 'اليوم',
  week: 'آخر أسبوع',
  month: 'آخر شهر',
  year: 'آخر سنة',
}

const WEEK_TREND: VisitorTrendPoint[] = [
  { date: '1 نوفمبر', visitors: 1200, pageViews: 3400, calls: 89 },
  { date: '5 نوفمبر', visitors: 1800, pageViews: 4200, calls: 112 },
  { date: '10 نوفمبر', visitors: 1500, pageViews: 3800, calls: 95 },
  { date: '15 نوفمبر', visitors: 2200, pageViews: 5100, calls: 143 },
  { date: '20 نوفمبر', visitors: 2600, pageViews: 6200, calls: 178 },
  { date: '25 نوفمبر', visitors: 3100, pageViews: 7300, calls: 201 },
]

const MONTH_TREND: VisitorTrendPoint[] = [
  { date: 'الأسبوع 1', visitors: 4300, pageViews: 9600, calls: 270 },
  { date: 'الأسبوع 2', visitors: 5100, pageViews: 10700, calls: 295 },
  { date: 'الأسبوع 3', visitors: 4700, pageViews: 10100, calls: 280 },
  { date: 'الأسبوع 4', visitors: 5400, pageViews: 11500, calls: 320 },
  { date: 'الأسبوع 5', visitors: 5900, pageViews: 12400, calls: 355 },
]

const YEAR_TREND: VisitorTrendPoint[] = [
  { date: 'مارس', visitors: 5200, pageViews: 12300, calls: 310 },
  { date: 'يونيو', visitors: 5800, pageViews: 13800, calls: 345 },
  { date: 'سبتمبر', visitors: 6100, pageViews: 14500, calls: 370 },
  { date: 'نوفمبر', visitors: 6700, pageViews: 15800, calls: 400 },
]

const TODAY_TREND: VisitorTrendPoint[] = [
  { date: 'الآن', visitors: 3200, pageViews: 4100, calls: 65 },
]

const CITY_DISTRIBUTION = [
  { name: 'مسقط', value: 4500, percentage: 45 },
  { name: 'صلالة', value: 3000, percentage: 30 },
  { name: 'صحار', value: 1500, percentage: 15 },
  { name: 'نزوى', value: 1000, percentage: 10 },
]

const TIME_DISTRIBUTION = [
  { time: '6-9', orders: 120 },
  { time: '9-12', orders: 340 },
  { time: '12-15', orders: 580 },
  { time: '15-18', orders: 280 },
  { time: '18-21', orders: 720 },
  { time: '21-24', orders: 450 },
  { time: '0-3', orders: 80 },
]

const PERFORMANCE_METRICS = [
  { metric: 'سرعة الخدمة', value: 85, fullMark: 100 },
  { metric: 'جودة الطعام', value: 92, fullMark: 100 },
  { metric: 'النظافة', value: 88, fullMark: 100 },
  { metric: 'خدمة العملاء', value: 90, fullMark: 100 },
  { metric: 'القيمة مقابل السعر', value: 78, fullMark: 100 },
]

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']

const visitorTrendMap: Record<AnalyticsRange, VisitorTrendPoint[]> = {
  today: TODAY_TREND,
  week: WEEK_TREND,
  month: MONTH_TREND,
  year: YEAR_TREND,
}

const getTrendData = (range: AnalyticsRange) => visitorTrendMap[range] ?? WEEK_TREND

export default function AnalyticsTrendCharts({ currentRange }: AnalyticsTrendChartsProps) {
  const trendData = useMemo(() => getTrendData(currentRange), [currentRange])
  const rangeLabel = RANGE_LABELS[currentRange]

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">اتجاهات الزوار</h3>
            <p className="text-sm text-gray-500">تحليل الزيارات والمشاهدات والمكالمات عبر الزمن</p>
          </div>
          <span className="text-xs text-gray-500">
            {rangeLabel} · {trendData.length} نقاط
          </span>
        </div>
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#3b82f6"
              fill="url(#colorVisitors)"
              fillOpacity={1}
              name="الزوار"
            />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke="#60a5fa"
              fill="url(#colorViews)"
              fillOpacity={1}
              name="المشاهدات"
            />
            <Area
              type="monotone"
              dataKey="calls"
              stroke="#34d399"
              fill="url(#colorCalls)"
              fillOpacity={1}
              name="المكالمات"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">التوزيع الجغرافي</h3>
            <p className="text-sm text-gray-500">خريطة حرارية للمدن الرئيسية</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={CITY_DISTRIBUTION}
                cx="50%"
                cy="50%"
                dataKey="value"
                outerRadius={100}
                labelLine={false}
                label={(entry) => `${entry.name} ${entry.percentage}%`}
              >
                {CITY_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {CITY_DISTRIBUTION.map((city, index) => (
              <div key={city.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-semibold text-gray-900">{city.name}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">{city.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{city.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">التوزيع الزمني</h3>
              <p className="text-sm text-gray-500">ذروة الطلبات حسب الوقت</p>
            </div>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={TIME_DISTRIBUTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} name="الطلبات" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">ذروة النشاط</span>
            </div>
            <p className="text-sm text-blue-700">
              أكثر الأوقات ازدحاماً: <strong>6:00 م - 9:00 م</strong> بمعدل 720 طلب
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AnalyticsRadarChart() {
  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">مؤشرات الأداء</h3>
        <p className="text-sm text-gray-500">تحليل شامل لجودة الخدمة</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={PERFORMANCE_METRICS}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
          <Radar name="الأداء" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
