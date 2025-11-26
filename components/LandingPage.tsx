'use client'

import { CheckCircle2, ShieldCheck, TrendingUp, Bot, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const features = [
  {
    title: 'منيو تفاعلي',
    description: 'تحكم كامل بالأصناف والأسعار وربطها مع الفروع في ثوانٍ.',
    icon: Sparkles,
  },
  {
    title: 'تتبّع الفروع',
    description: 'راقب الأداء اللحظي لكل فرع مع تنبيهات ذكية عند حدوث أي خلل.',
    icon: ShieldCheck,
  },
  {
    title: 'ذكاء اصطناعي للمحتوى',
    description: 'اقتراحات جاهزة للحملات التسويقية ورسائل العملاء.',
    icon: Bot,
  },
  {
    title: 'تقارير فورية',
    description: 'لوحات مفصلة للزيارات، الطلبات، وقنوات التسويق في مكان واحد.',
    icon: TrendingUp,
  },
]

export default function LandingPage() {
  const { openAuthModal } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-white">
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              منصة عربية 100% لإدارة المطاعم
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">
              كل ما يحتاجه مطعمك في لوحة واحدة جميلة وسهلة
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              صممنا التجربة لتكون بسيطة، سريعة، وتمكّنك من تشغيل المنيو، الفروع، الحملات والموظفين بدون الحاجة لأي أنظمة متفرقة.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => openAuthModal('register')}
              >
                ابدأ نسخة تجريبية مجانية
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="btn-secondary"
                onClick={() => openAuthModal('login')}
              >
                شاهد المنصة من الداخل
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">+220</p>
                <p className="text-sm text-gray-500">مطعم فعّال</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-gray-900">97%</p>
                <p className="text-sm text-gray-500">رضا العملاء خلال 3 أشهر</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-white rounded-3xl blur-2xl opacity-70" />
            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">ملخص الأداء اليومي</p>
                <span className="text-sm text-green-500">+18% هذا الأسبوع</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-primary-50">
                  <p className="text-sm text-gray-500">زيارات المنصة</p>
                  <p className="text-2xl font-bold text-gray-900">12,540</p>
                  <p className="text-xs text-primary-600 mt-1">+320 زيارة اليوم</p>
                </div>
                <div className="p-4 rounded-2xl bg-green-50">
                  <p className="text-sm text-gray-500">الطلبات المؤكدة</p>
                  <p className="text-2xl font-bold text-gray-900">892</p>
                  <p className="text-xs text-green-600 mt-1">+12% عن الأمس</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">آخر التنبيهات</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                    تم تحديث المنيو للفروع الأربعة
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                    حملة "خصم نهاية الأسبوع" جاهزة للنشر
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                    تم إضافة موظف جديد إلى فرع صلالة
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">المزايا الأساسية</p>
          <h3 className="text-3xl font-bold text-gray-900">تحكم كامل في كل ما يتعلق بالمطعم</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-4 border border-gray-100 rounded-2xl hover:border-primary-100 hover:bg-primary-50/30 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-primary-500 mb-3" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-primary-600 text-white space-y-4">
            <p className="text-sm text-primary-100">تكامل وتفعيل سريع</p>
            <h4 className="text-2xl font-bold">
              جرّب المنصة الآن بدون بطاقة بنكية
            </h4>
            <p className="text-primary-100 text-sm leading-6">
              نسخة تجريبية مجانية لمدة 14 يوماً تتضمن كل المزايا من دون حدود. دعم مباشر من فريق مخصص لقطاع المطاعم.
            </p>
            <button
              className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 w-fit"
              onClick={() => openAuthModal('register')}
            >
              افتح لوحة التحكم فوراً
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-gray-900 text-white space-y-4">
            <p className="text-sm text-gray-300">تسجيل دخول تجريبي</p>
            <h4 className="text-2xl font-bold">
              لديك حساب؟ استرجعه بثانية واحدة
            </h4>
            <p className="text-gray-300 text-sm leading-6">
              جرّب بيانات الدخول الجاهزة إذا أردت مشاهدة لوحة التحكم قبل إنشاء حساب خاص بك.
            </p>
            <div className="bg-gray-800 rounded-2xl p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">البريد</span>
                <span className="font-semibold">admin@restaurant.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">كلمة المرور</span>
                <span className="font-semibold">123456</span>
              </div>
            </div>
            <button
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl w-fit border border-white/10"
              onClick={() => openAuthModal('login')}
            >
              تسجيل الدخول التجريبي
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
