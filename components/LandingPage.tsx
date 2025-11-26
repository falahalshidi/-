'use client'

import { UtensilsCrossed, Store, Megaphone, BarChart3, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const features = [
  {
    title: 'منيو تفاعلي',
    description: 'تحكم كامل بالأصناف والأسعار وربطها مع الفروع في ثوانٍ.',
    icon: UtensilsCrossed,
  },
  {
    title: 'تتبّع الفروع',
    description: 'راقب الأداء اللحظي لكل فرع مع تنبيهات ذكية عند حدوث أي خلل.',
    icon: Store,
  },
  {
    title: 'حملات تسويقية',
    description: 'أنشئ حملات وعروض احترافية وشاركها عبر جميع قنوات التواصل.',
    icon: Megaphone,
  },
  {
    title: 'تقارير مفصلة',
    description: 'لوحات تحليلية شاملة للمبيعات، الطلبات، وأداء كل فرع على حدة.',
    icon: BarChart3,
  },
]

export default function LandingPage() {
  const { openAuthModal } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-amber-50">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            مط
          </div>
          <div>
            <p className="text-xs text-gray-500">نظام تشغيل المطاعم</p>
            <h1 className="text-xl font-bold text-gray-900">Restaurant OS</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost" onClick={() => openAuthModal('login')}>
            تسجيل الدخول
          </button>
          <button className="btn-primary" onClick={() => openAuthModal('register')}>
            جرّبه مجاناً
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16 space-y-16">
        <section className="relative min-h-[600px] flex items-center justify-center">
          {/* 3D Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-200/40 to-primary-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Floating shapes */}
            <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-primary-300/20 rounded-2xl rotate-12 backdrop-blur-sm" style={{ animation: 'float 6s ease-in-out infinite' }} />
            <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-amber-300/20 rounded-full backdrop-blur-sm" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '1s' }} />
            <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-green-300/20 rounded-lg rotate-45 backdrop-blur-sm" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }} />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md text-primary-700 rounded-full text-sm font-medium shadow-lg border border-primary-100">
              <Sparkles className="w-4 h-4" />
              منصة عمانية 100% لإدارة المطاعم
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-black leading-relaxed text-gray-900 font-heading">
              كل ما يحتاجه مطعمك في
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent block mt-2">
                لوحة واحدة جميلة وسهلة
              </span>
            </h2>
            
            <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium font-arabic">
              صممنا التجربة لتكون بسيطة، سريعة، وتمكّنك من تشغيل المنيو، الفروع، الحملات والموظفين بدون الحاجة لأي أنظمة متفرقة.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                onClick={() => openAuthModal('register')}
              >
                ابدأ نسخة تجريبية مجانية
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-8 justify-center pt-8">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                <p className="text-4xl font-bold text-gray-900">+220</p>
                <p className="text-sm text-gray-600">مطعم فعّال</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                <p className="text-4xl font-bold text-gray-900">97%</p>
                <p className="text-sm text-gray-600">رضا العملاء</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                <p className="text-4xl font-bold text-gray-900">14 يوم</p>
                <p className="text-sm text-gray-600">تجربة مجانية</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600 font-semibold mb-3">المزايا الأساسية</p>
            <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 font-heading">
              تحكم كامل في كل ما يتعلق بالمطعم
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-arabic">
              جميع الأدوات التي تحتاجها لإدارة مطعمك بكفاءة عالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-green-400 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors font-heading">
                    {feature.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 leading-relaxed font-arabic">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute top-4 left-4 w-20 h-20 bg-primary-100/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
