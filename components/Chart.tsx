'use client'

import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

// Sample Data
const visitData = [
  { name: 'السبت', visits: 4000, orders: 2400 },
  { name: 'الأحد', visits: 3000, orders: 1398 },
  { name: 'الاثنين', visits: 2000, orders: 9800 },
  { name: 'الثلاثاء', visits: 2780, orders: 3908 },
  { name: 'الأربعاء', visits: 1890, orders: 4800 },
  { name: 'الخميس', visits: 2390, orders: 3800 },
  { name: 'الجمعة', visits: 3490, orders: 4300 },
]

const branchPerformance = [
  { name: 'فرع مسقط', value: 400 },
  { name: 'فرع صلالة', value: 300 },
  { name: 'فرع صحار', value: 200 },
  { name: 'فرع نزوى', value: 100 },
]

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']

export default function Chart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visits & Orders Chart */}
      <div className="lg:col-span-2 card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">الزيارات والطلبات الأسبوعية</h3>
          <p className="text-sm text-gray-500">آخر 7 أيام</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={visitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                direction: 'rtl'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="visits" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="الزيارات"
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#60a5fa" 
              strokeWidth={2}
              name="الطلبات"
              dot={{ fill: '#60a5fa', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Branch Performance */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">أداء الفروع</h3>
          <p className="text-sm text-gray-500">توزيع الطلبات</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={branchPerformance}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => entry.name}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {branchPerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                direction: 'rtl'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

