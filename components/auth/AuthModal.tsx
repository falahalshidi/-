'use client'

import { FormEvent, useState } from 'react'
import { X, Loader2, Lock, Mail, User, Building2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authMode,
    closeAuthModal,
    switchAuthMode,
    login,
    register,
    authError,
  } = useAuth()

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })

  const [registerForm, setRegisterForm] = useState({
    name: '',
    restaurantName: '',
    email: '',
    password: '',
    branches: '1',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isAuthModalOpen) {
    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      if (authMode === 'login') {
        await login({
          email: loginForm.email,
          password: loginForm.password,
        })
      } else {
        await register({
          name: registerForm.name,
          restaurantName: registerForm.restaurantName,
          email: registerForm.email,
          password: registerForm.password,
          branches: Number(registerForm.branches) || 1,
        })
      }
    } catch {
      // تم التعامل مع الأخطاء داخل سياق المصادقة
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Form Section */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {authMode === 'login' ? 'أهلاً بعودتك' : 'انضم لعائلة نظامنا'}
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  {authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب مطعم'}
                </h2>
              </div>
              <button
                onClick={closeAuthModal}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6 bg-gray-100 rounded-lg p-1">
              <button
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                  authMode === 'login' ? 'bg-white shadow text-primary-600' : 'text-gray-500'
                }`}
                onClick={() => switchAuthMode('login')}
              >
                تسجيل الدخول
              </button>
              <button
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                  authMode === 'register' ? 'bg-white shadow text-primary-600' : 'text-gray-500'
                }`}
                onClick={() => switchAuthMode('register')}
              >
                إنشاء حساب
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {authMode === 'register' && (
                <>
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700 mb-2 block">اسمك الكامل</span>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="input-field pr-10"
                        placeholder="مثال: أحمد محمد"
                        value={registerForm.name}
                        onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))}
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700 mb-2 block">اسم المطعم</span>
                    <div className="relative">
                      <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="input-field pr-10"
                        placeholder="مثال: مطاعم النجاح"
                        value={registerForm.restaurantName}
                        onChange={(event) => setRegisterForm((prev) => ({ ...prev, restaurantName: event.target.value }))}
                      />
                    </div>
                  </label>
                </>
              )}

              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-2 block">البريد الإلكتروني</span>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="input-field pr-10"
                    placeholder="example@restaurant.com"
                    value={authMode === 'login' ? loginForm.email : registerForm.email}
                    onChange={(event) => {
                      if (authMode === 'login') {
                        setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                      } else {
                        setRegisterForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                    }}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-2 block">كلمة المرور</span>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="input-field pr-10"
                    placeholder="••••••••"
                    value={authMode === 'login' ? loginForm.password : registerForm.password}
                    onChange={(event) => {
                      if (authMode === 'login') {
                        setLoginForm((prev) => ({ ...prev, password: event.target.value }))
                      } else {
                        setRegisterForm((prev) => ({ ...prev, password: event.target.value }))
                      }
                    }}
                  />
                </div>
              </label>

              {authMode === 'register' && (
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">عدد الفروع الحالية</span>
                  <input
                    type="number"
                    min="1"
                    className="input-field"
                    value={registerForm.branches}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, branches: event.target.value }))}
                  />
                </label>
              )}

              {authError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
              </button>
            </form>

            {authMode === 'login' && (
              <p className="text-xs text-gray-500 mt-4">
                نصيحة: يمكنك تجربة الدخول مباشرة باستخدام بريد{' '}
                <span className="font-semibold">admin@restaurant.com</span> وكلمة المرور <span className="font-semibold">123456</span>
              </p>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-b from-primary-600 to-primary-500 text-white p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-primary-100 mb-2">المنصة المتكاملة لإدارة المطاعم</p>
              <h3 className="text-2xl font-bold mb-4">ذكاء أكثر، جهد أقل</h3>
              <p className="text-sm text-primary-100 leading-6">
                صممنا كل شيء ليعمل فوراً بدون تعقيد. متابعة الفروع، تحديث المنيو، وقياس الأداء—all في مكان واحد.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-sm text-primary-100 mb-1">استخدمه 220+ مطعم في دول مجلس التعاون</p>
                <p className="text-lg font-bold">جاهز للتشغيل في أقل من 5 دقائق</p>
              </div>
              <ul className="space-y-3 text-sm text-primary-100">
                <li>• دعم كامل للغة العربية من اليمين لليسار</li>
                <li>• أسئلة ترحيبية سريعة لتخصيص التجربة</li>
                <li>• يمكنك الإلغاء أو إعادة تفعيل الحساب في أي وقت</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
