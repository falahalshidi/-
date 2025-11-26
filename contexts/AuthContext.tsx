'use client'

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

export type AuthMode = 'login' | 'register'

export interface AuthUser {
  id: string
  name: string
  email: string
  restaurantName: string
  password: string
  branches: number
  createdAt: string
  onboardingCompleted: boolean
}

export interface OnboardingAnswers {
  cuisineType: string
  branchesCount: string
  averageOrderValue: string
  deliveryChannels: string[]
  primaryGoal: string
}

interface AuthContextValue {
  user: AuthUser | null
  authMode: AuthMode
  isAuthModalOpen: boolean
  authError: string | null
  openAuthModal: (mode?: AuthMode) => void
  closeAuthModal: () => void
  switchAuthMode: (mode: AuthMode) => void
  login: (payload: { email: string; password: string }) => Promise<void>
  register: (payload: { name: string; email: string; password: string; restaurantName: string; branches: number }) => Promise<void>
  logout: () => void
  completeOnboarding: (answers?: OnboardingAnswers) => void
  shouldShowOnboarding: boolean
  onboardingData: OnboardingAnswers | null
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const ACCOUNTS_KEY = 'rd_accounts'
const CURRENT_USER_KEY = 'rd_current_user'
const ONBOARDING_KEY = 'rd_onboarding_answers'

const defaultAccount: AuthUser = {
  id: 'demo-user',
  name: 'مدير النظام',
  email: 'admin@restaurant.com',
  password: '123456',
  restaurantName: 'مطاعم النجاح',
  branches: 4,
  createdAt: new Date().toISOString(),
  onboardingCompleted: true,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<AuthUser[]>([defaultAccount])
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [authError, setAuthError] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, OnboardingAnswers>>({})
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedAccounts = localStorage.getItem(ACCOUNTS_KEY)
    let parsedAccounts: AuthUser[] = []

    if (storedAccounts) {
      try {
        parsedAccounts = JSON.parse(storedAccounts) as AuthUser[]
      } catch {
        parsedAccounts = [defaultAccount]
      }
    } else {
      parsedAccounts = [defaultAccount]
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(parsedAccounts))
    }

    const storedAnswers = localStorage.getItem(ONBOARDING_KEY)
    if (storedAnswers) {
      try {
        setAnswers(JSON.parse(storedAnswers) as Record<string, OnboardingAnswers>)
      } catch {
        setAnswers({})
      }
    }

    const storedUserId = localStorage.getItem(CURRENT_USER_KEY)
    if (storedUserId) {
      const existingUser = parsedAccounts.find((account) => account.id === storedUserId)
      if (existingUser) {
        setUser(existingUser)
      }
    }

    setAccounts(parsedAccounts)
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  }, [accounts, isHydrated])

  useEffect(() => {
    if (!isHydrated) return

    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, user.id)
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [user, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(answers))
  }, [answers, isHydrated])

  const openAuthModal = useCallback((mode: AuthMode = 'login') => {
    setAuthMode(mode)
    setAuthError(null)
    setIsAuthModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false)
    setAuthError(null)
  }, [])

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    setAuthError(null)
    const existingUser = accounts.find((account) => account.email.toLowerCase() === email.toLowerCase())

    if (!existingUser) {
      setAuthError('لا يوجد حساب بهذا البريد الإلكتروني')
      throw new Error('User not found')
    }

    if (existingUser.password !== password) {
      setAuthError('كلمة المرور غير صحيحة')
      throw new Error('Invalid password')
    }

    setUser(existingUser)
    closeAuthModal()
  }, [accounts, closeAuthModal])

  const register = useCallback(async ({ name, email, password, restaurantName, branches }: { name: string; email: string; password: string; restaurantName: string; branches: number }) => {
    setAuthError(null)
    const isDuplicate = accounts.some((account) => account.email.toLowerCase() === email.toLowerCase())

    if (isDuplicate) {
      setAuthError('يوجد حساب مسجل بهذا البريد الإلكتروني')
      throw new Error('Duplicate email')
    }

    const newAccount: AuthUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      restaurantName,
      branches,
      createdAt: new Date().toISOString(),
      onboardingCompleted: false,
    }

    setAccounts((prev) => [...prev, newAccount])
    setUser(newAccount)
    closeAuthModal()
  }, [accounts, closeAuthModal])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const completeOnboarding = useCallback((data?: OnboardingAnswers) => {
    if (!user) return

    const updatedUser = { ...user, onboardingCompleted: true }
    setAccounts((prev) => prev.map((account) => (account.id === updatedUser.id ? updatedUser : account)))
    setUser(updatedUser)

    if (data) {
      setAnswers((prev) => ({
        ...prev,
        [updatedUser.id]: data,
      }))
    }
  }, [user])

  const shouldShowOnboarding = Boolean(user && !user.onboardingCompleted)

  const switchAuthMode = useCallback((mode: AuthMode) => {
    setAuthMode(mode)
    setAuthError(null)
  }, [])

  const contextValue: AuthContextValue = useMemo(
    () => ({
      user,
      authMode,
      isAuthModalOpen,
      authError,
      openAuthModal,
      closeAuthModal,
      switchAuthMode,
      login,
      register,
      logout,
      completeOnboarding,
      shouldShowOnboarding,
      onboardingData: user ? answers[user.id] ?? null : null,
    }),
    [answers, authError, authMode, closeAuthModal, completeOnboarding, isAuthModalOpen, login, logout, openAuthModal, register, shouldShowOnboarding, switchAuthMode, user]
  )

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
