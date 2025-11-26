'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Sparkles, ClipboardList, ArrowRight } from 'lucide-react'
import { OnboardingAnswers } from '@/contexts/AuthContext'
import { useAuth } from '@/contexts/AuthContext'

const deliveryOptions = ['طلب عبر الموقع', 'تطبيقات التوصيل', 'الطلبات الهاتفية', 'الطلبات داخل المطعم']

export default function OnboardingModal() {
  const { shouldShowOnboarding, completeOnboarding } = useAuth()
  const [form, setForm] = useState<OnboardingAnswers>({
    cuisineType: '',
    branchesCount: '',
    averageOrderValue: '',
    deliveryChannels: [],
    primaryGoal: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = useMemo(() => {
    return Boolean(
      form.cuisineType.trim() &&
        form.branchesCount.trim() &&
        form.averageOrderValue.trim() &&
        form.primaryGoal.trim()
    )
  }, [form])

  if (!shouldShowOnboarding) {
    return null
  }

  const toggleChannel = (option: string) => {
    setForm((prev) => {
      const exists = prev.deliveryChannels.includes(option)
      return {
        ...prev,
        deliveryChannels: exists
          ? prev.deliveryChannels.filter((item) => item !== option)
          : [...prev.deliveryChannels, option],
      }
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)
    try {
      completeOnboarding(form)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[998] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-gradient-to-b from-primary-600 to-primary-500 text-white p-8 hidden lg:flex flex-col justify-between">
            <div>
              <p className="text-sm text-primary-100 mb-2">لنستعد لخدمتكم بشكل أفضل</p>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                خطوات بسيطة وننطلق
              </h3>
              <p className="text-primary-100 leading-7">
                نطرح عليك عدة أسئلة سريعة حتى نضبط قائمة المهام والتوصيات بناءً على حجم مطعمك وطريقة عمله.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-sm text-primary-100 mb-1">مثال على التخصيص</p>
                <p className="text-lg font-semibold">"مطعم بخمس فروع ويركز على الإيصالات الرقمية"</p>
              </div>
              <p className="text-sm text-primary-100">
                يمكنك تغيير هذه البيانات لاحقاً من الإعدادات في أي وقت.
              </p>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <ClipboardList className="w-4 h-4" />
                  أسئلة التعريف السريعة
                </p>
                <h4 className="text-xl font-bold text-gray-900">لنخصص تجربتك</h4>
              </div>
              <button
                className="text-sm text-gray-500 hover:text-gray-900"
                onClick={() => completeOnboarding()}
              >
                سأكمل لاحقاً
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  نوع المطبخ الرئيسي
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="مثال: مطبخ عماني عصري"
                  value={form.cuisineType}
                  onChange={(event) => setForm((prev) => ({ ...prev, cuisineType: event.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    عدد الفروع الحالية
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="مثال: 4 فروع"
                    value={form.branchesCount}
                    onChange={(event) => setForm((prev) => ({ ...prev, branchesCount: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    متوسط قيمة الطلب (ر.ع)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="مثال: 12 ر.ع"
                    value={form.averageOrderValue}
                    onChange={(event) => setForm((prev) => ({ ...prev, averageOrderValue: event.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  أهم قنوات الطلب
                </label>
                <div className="flex flex-wrap gap-2">
                  {deliveryOptions.map((option) => {
                    const isActive = form.deliveryChannels.includes(option)
                    return (
                      <button
                        type="button"
                        key={option}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 border-primary-200'
                            : 'text-gray-600 border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => toggleChannel(option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ما هو هدفك الأول مع المنصة؟
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="مثال: تحسين أداء الفروع وزيادة الطلبات الرقمية"
                  value={form.primaryGoal}
                  onChange={(event) => setForm((prev) => ({ ...prev, primaryGoal: event.target.value }))}
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-gray-500">
                  نستخدم هذه البيانات لتخصيص اللوحات والتوصيات الذكية لك فقط.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => completeOnboarding()}
                  >
                    لاحقاً
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className={`btn-primary flex items-center gap-2 ${(!canSubmit || isSubmitting) ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    متابعة الواجهة
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
