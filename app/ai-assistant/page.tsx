'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { 
  Bot,
  Sparkles,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  BarChart,
  Lightbulb,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Download,
  Wand2,
  Brain,
  Target
} from 'lucide-react'
import { useState, useTransition } from 'react'

interface AIInsight {
  id: number
  type: 'analysis' | 'recommendation' | 'optimization' | 'content'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  category: string
  action?: string
}

const aiInsights: AIInsight[] = [
  {
    id: 1,
    type: 'optimization',
    title: 'تحسين سعر البرجر الكلاسيك',
    description: 'بناءً على تحليل المنافسين ونسبة المبيعات، يمكنك رفع السعر بـ 5 ريال دون التأثير على المبيعات',
    impact: 'high',
    category: 'تسعير',
    action: 'تطبيق التوصية'
  },
  {
    id: 2,
    type: 'recommendation',
    title: 'باقة الغداء التنفيذية',
    description: 'اقتراح باقة جديدة من 12-3 مساءً تجمع بين الطبق الرئيسي والسلطة والمشروب بسعر 65 ريال',
    impact: 'high',
    category: 'عروض',
    action: 'إنشاء العرض'
  },
  {
    id: 3,
    type: 'analysis',
    title: 'طبق "السلطة الخضراء" بحاجة لتحسين',
    description: 'الطبق حصل على 234 مشاهدة فقط و12 طلب. يُنصح بتحسين الصورة والوصف أو خفض السعر',
    impact: 'medium',
    category: 'منيو',
    action: 'عرض التفاصيل'
  },
  {
    id: 4,
    type: 'content',
    title: 'أفكار محتوى تسويقي',
    description: 'تم توليد 5 أفكار منشورات لوسائل التواصل الاجتماعي بناءً على الأطباق الأكثر طلباً',
    impact: 'medium',
    category: 'تسويق',
    action: 'عرض الأفكار'
  },
  {
    id: 5,
    type: 'recommendation',
    title: 'توسيع قائمة المشروبات',
    description: 'العملاء يبحثون عن خيارات صحية أكثر. يُنصح بإضافة عصائر طبيعية وديتوكس',
    impact: 'low',
    category: 'منيو',
    action: 'عرض المقترحات'
  }
]

const reviewAnalysis = {
  totalReviews: 1456,
  avgRating: 4.6,
  sentimentScore: 85,
  categories: [
    { name: 'جودة الطعام', positive: 92, neutral: 6, negative: 2 },
    { name: 'سرعة الخدمة', positive: 78, neutral: 15, negative: 7 },
    { name: 'النظافة', positive: 88, neutral: 10, negative: 2 },
    { name: 'القيمة مقابل السعر', positive: 75, neutral: 18, negative: 7 },
  ],
  commonComplaints: [
    { issue: 'وقت الانتظار طويل', count: 89 },
    { issue: 'قلة خيارات نباتية', count: 67 },
    { issue: 'التغليف يحتاج تحسين', count: 45 },
  ]
}

type AITab = 'insights' | 'content' | 'reviews' | 'chat'

export default function AIAssistantPage() {
  const [chatMessage, setChatMessage] = useState('')
  const [activeTab, setActiveTab] = useState<AITab>('insights')
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (tab: AITab) => {
    startTransition(() => setActiveTab(tab))
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return 'تأثير عالٍ'
      case 'medium': return 'تأثير متوسط'
      case 'low': return 'تأثير منخفض'
      default: return 'غير محدد'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              المساعد الذكي
            </h1>
            <p className="text-gray-600">تحليلات وتوصيات مدعومة بالذكاء الاصطناعي</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary">
              <Download className="w-4 h-4 ml-2" />
              تقرير كامل
            </button>
            <button className="btn-primary">
              <Wand2 className="w-4 h-4 ml-2" />
              تحليل جديد
            </button>
          </div>
        </div>

        {/* AI Status Card */}
        <div className="card bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-xl font-bold">AI Chef يعمل على تحليل بياناتك</h3>
              </div>
              <p className="text-purple-100 mb-4">
                تم تحليل <strong>24,532</strong> نقطة بيانات وإنشاء <strong>{aiInsights.length}</strong> توصية جديدة
              </p>
              <div className="flex gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <p className="text-xs text-purple-100">دقة التنبؤات</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <p className="text-xs text-purple-100">التوصيات المطبقة</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <p className="text-xs text-purple-100">زيادة الإيرادات</p>
                  <p className="text-2xl font-bold">+18%</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Brain className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => handleTabChange('insights')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'insights'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Lightbulb className="w-5 h-5 inline-block ml-2" />
            الرؤى والتوصيات
          </button>
          <button
            onClick={() => handleTabChange('content')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'content'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-5 h-5 inline-block ml-2" />
            توليد المحتوى
          </button>
          <button
            onClick={() => handleTabChange('reviews')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-5 h-5 inline-block ml-2" />
            تحليل المراجعات
          </button>
          <button
            onClick={() => handleTabChange('chat')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'chat'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bot className="w-5 h-5 inline-block ml-2" />
            محادثة AI
          </button>
        </div>

        {isPending && (
          <div className="h-1 w-32 bg-primary-500 rounded-full animate-pulse mt-1" />
        )}

        {/* Tab Content */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Insights Grid */}
            <div className="grid grid-cols-1 gap-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      insight.type === 'analysis' ? 'bg-blue-100' :
                      insight.type === 'recommendation' ? 'bg-green-100' :
                      insight.type === 'optimization' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      {insight.type === 'analysis' && <BarChart className="w-6 h-6 text-blue-600" />}
                      {insight.type === 'recommendation' && <Lightbulb className="w-6 h-6 text-green-600" />}
                      {insight.type === 'optimization' && <TrendingUp className="w-6 h-6 text-purple-600" />}
                      {insight.type === 'content' && <FileText className="w-6 h-6 text-orange-600" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{insight.title}</h3>
                          <p className="text-sm text-gray-600">{insight.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getImpactColor(insight.impact)}`}>
                          {getImpactText(insight.impact)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {insight.category}
                        </span>
                        {insight.action && (
                          <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                            {insight.action} ←
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">مولد المحتوى التسويقي</h3>
              <p className="text-gray-600 mb-6">أنشئ محتوى احترافي لوسائل التواصل الاجتماعي والإعلانات</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
                  <ImageIcon className="w-10 h-10 text-primary-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">بوستر ترويجي</h4>
                  <p className="text-sm text-gray-600">تصميم بوستر جذاب للعروض</p>
                </div>
                
                <div className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
                  <FileText className="w-10 h-10 text-primary-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">نص إعلاني</h4>
                  <p className="text-sm text-gray-600">كتابة نص تسويقي مؤثر</p>
                </div>
                
                <div className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
                  <MessageSquare className="w-10 h-10 text-primary-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">منشور سوشيال</h4>
                  <p className="text-sm text-gray-600">محتوى لوسائل التواصل</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">أفكار محتوى مقترحة:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-primary-500 mt-0.5" />
                    <span className="text-gray-700">"اكتشف مذاق الأصالة - برجرنا الكلاسيك المحبوب من آلاف العملاء"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-primary-500 mt-0.5" />
                    <span className="text-gray-700">"عرض خاص: اشترِ اثنين واحصل على الثالث مجاناً - لفترة محدودة"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-primary-500 mt-0.5" />
                    <span className="text-gray-700">"تجربة طعام لا تُنسى في أجواء عائلية دافئة"</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">إجمالي المراجعات</p>
                    <p className="text-3xl font-bold text-gray-900">{reviewAnalysis.totalReviews.toLocaleString()}</p>
                  </div>
                  <MessageSquare className="w-12 h-12 text-primary-500" />
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">متوسط التقييم</p>
                    <p className="text-3xl font-bold text-yellow-600">{reviewAnalysis.avgRating}</p>
                  </div>
                  <Star className="w-12 h-12 text-yellow-500 fill-yellow-500" />
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">مؤشر المشاعر</p>
                    <p className="text-3xl font-bold text-green-600">{reviewAnalysis.sentimentScore}%</p>
                  </div>
                  <ThumbsUp className="w-12 h-12 text-green-500" />
                </div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">تحليل المشاعر حسب الفئة</h3>
              <div className="space-y-4">
                {reviewAnalysis.categories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        {category.positive}% إيجابي
                      </span>
                    </div>
                    <div className="flex h-4 rounded-full overflow-hidden">
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${category.positive}%` }}
                        title={`إيجابي ${category.positive}%`}
                      />
                      <div 
                        className="bg-gray-300" 
                        style={{ width: `${category.neutral}%` }}
                        title={`محايد ${category.neutral}%`}
                      />
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${category.negative}%` }}
                        title={`سلبي ${category.negative}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Complaints */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">الشكاوى الشائعة</h3>
              <div className="space-y-3">
                {reviewAnalysis.commonComplaints.map((complaint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-gray-900 font-medium">{complaint.issue}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-red-600 font-semibold">{complaint.count} مرة</span>
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        معالجة ←
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="card">
            <div className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">AI Chef Assistant</h3>
                  <p className="text-sm text-green-600">● متصل</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg p-4">
                    <p className="text-gray-900">مرحباً! أنا AI Chef، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟</p>
                    <p className="text-sm text-gray-500 mt-2">يمكنني مساعدتك في:</p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1 mr-4">
                      <li>• تحليل أداء الأطباق والمبيعات</li>
                      <li>• اقتراح أفكار عروض وحملات</li>
                      <li>• توليد محتوى تسويقي</li>
                      <li>• تحليل تعليقات العملاء</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-primary-500 text-white rounded-lg p-4 max-w-md">
                    <p>ما هي الأطباق الأكثر ربحية لدي؟</p>
                  </div>
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">م</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg p-4">
                    <p className="text-gray-900 mb-3">بناءً على تحليل البيانات، إليك أكثر 3 أطباق ربحية:</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded-lg">
                        <p className="font-semibold text-gray-900">1. برجر كلاسيك</p>
                        <p className="text-sm text-gray-600">هامش ربح: 68% • 389 طلب هذا الأسبوع</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="font-semibold text-gray-900">2. بيتزا مارغريتا</p>
                        <p className="text-sm text-gray-600">هامش ربح: 65% • 312 طلب هذا الأسبوع</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="font-semibold text-gray-900">3. عصير برتقال طازج</p>
                        <p className="text-sm text-gray-600">هامش ربح: 82% • 456 طلب هذا الأسبوع</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="اسأل AI Chef أي سؤال..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button className="btn-primary">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
